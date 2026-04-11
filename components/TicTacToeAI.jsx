"use client";
import { useState, useEffect } from "react";
import useOSStore, { playSound } from "@/store/useOSStore";

export default function TicTacToeAI() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [isDraw, setIsDraw] = useState(false);
  const [showPitch, setShowPitch] = useState(false);

  // Check for winner
  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Cols
      [0, 4, 8], [2, 4, 6]             // Diagonals
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  // Minimax Algorithm for unbeatable AI (plays as 'O')
  function minimax(newBoard, player) {
    const availSpots = newBoard.map((val, idx) => val === null ? idx : null).filter(val => val !== null);
    
    if (calculateWinner(newBoard) === 'X') return { score: -10 };
    else if (calculateWinner(newBoard) === 'O') return { score: 10 };
    else if (availSpots.length === 0) return { score: 0 };
    
    const moves = [];
    for (let i = 0; i < availSpots.length; i++) {
      const move = {};
      move.index = availSpots[i];
      newBoard[availSpots[i]] = player;
      
      if (player === 'O') {
        const result = minimax(newBoard, 'X');
        move.score = result.score;
      } else {
        const result = minimax(newBoard, 'O');
        move.score = result.score;
      }
      
      newBoard[availSpots[i]] = null;
      moves.push(move);
    }
    
    let bestMove;
    if (player === 'O') {
      let bestScore = -10000;
      for (let i = 0; i < moves.length; i++) {
        if (moves[i].score > bestScore) {
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
    } else {
      let bestScore = 10000;
      for (let i = 0; i < moves.length; i++) {
        if (moves[i].score < bestScore) {
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
    }
    
    return moves[bestMove];
  }

  // AI Turn
  useEffect(() => {
    if (!isXNext && !winner && !isDraw) {
      const timer = setTimeout(() => {
        const bestMove = minimax([...board], 'O');
        const newBoard = [...board];
        newBoard[bestMove.index] = 'O';
        setBoard(newBoard);
        playSound('type');
        
        const win = calculateWinner(newBoard);
        if (win) {
          setWinner(win);
          playSound('error');
          setTimeout(() => setShowPitch(true), 1500);
        } else if (!newBoard.includes(null)) {
          setIsDraw(true);
          playSound('boot'); // XP Sound
          setTimeout(() => setShowPitch(true), 1500);
        } else {
          setIsXNext(true);
        }
      }, 600); // Artificial delay to make it feel like "thinking"
      return () => clearTimeout(timer);
    }
  }, [isXNext, board, winner, isDraw]);

  const handleClick = (i) => {
    if (board[i] || winner || !isXNext) return;
    playSound('mouse');
    
    const newBoard = [...board];
    newBoard[i] = 'X';
    setBoard(newBoard);
    
    const win = calculateWinner(newBoard);
    if (win) {
      setWinner(win);
      setTimeout(() => setShowPitch(true), 1500);
    } else if (!newBoard.includes(null)) {
      setIsDraw(true);
      playSound('boot');
      setTimeout(() => setShowPitch(true), 1500);
    } else {
      setIsXNext(false);
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
    setIsDraw(false);
    setShowPitch(false);
    playSound('nav');
  };

  return (
    <div className="flex flex-col h-full bg-[#ece9d8] select-none font-tahoma text-black overflow-hidden relative">
      <div className="p-2 border-b border-gray-400 shadow-sm bg-white shrink-0 flex justify-between items-center">
         <div>
            <h2 className="font-bold text-blue-900 leading-tight">Beat The AI Engineer</h2>
            <p className="text-xs text-gray-500 font-mono">Algorithm: Minimax (Depth ∞)</p>
         </div>
         <button onClick={resetGame} className="px-3 py-1 bg-gray-200 border border-gray-400 hover:bg-gray-300 active:shadow-inner text-xs font-bold rounded-sm shadow-sm">Restart</button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-4">
        {/* Game Info Status */}
        <div className="mb-6 px-6 py-2 bg-black border-2 border-gray-500 rounded text-center shadow-inner min-w-[200px]">
           {!winner && !isDraw ? (
               <span className={`font-mono font-bold text-xl ${isXNext ? 'text-green-400' : 'text-red-500 animate-pulse'}`}>
                  {isXNext ? "Your Turn (X)" : "AI is thinking (O)..."}
               </span>
           ) : (
               <span className="font-mono font-bold text-xl text-yellow-400">
                  {winner ? `Winner: ${winner}` : "Draw!"}
               </span>
           )}
        </div>

        {/* Board */}
        <div className="grid grid-cols-3 gap-2 bg-gray-500 p-2 shadow-xl border-4 border-gray-600 rounded">
          {board.map((square, i) => (
            <button
              key={i}
              onClick={() => handleClick(i)}
              disabled={square !== null || winner || !isXNext}
              className={`w-20 h-20 sm:w-24 sm:h-24 bg-white hover:bg-gray-100 flex items-center justify-center text-5xl font-bold border-2 border-gray-400 shadow-inner 
                 ${square === 'X' ? 'text-blue-500' : 'text-red-500'}
                 ${!square && isXNext && !winner ? 'cursor-pointer hover:bg-blue-50' : 'cursor-default'}
              `}
              style={{ textShadow: square ? '2px 2px 0px rgba(0,0,0,0.2)' : 'none' }}
            >
              <span className={square && winner ? 'animate-bounce' : ''}>{square}</span>
            </button>
          ))}
        </div>
      </div>

      {/* The Recruiting Pitch Overlay */}
      {showPitch && (
         <div className="absolute inset-0 bg-black/80 flex items-center justify-center p-4 z-50 animate-in fade-in duration-500">
            <div className="bg-[#003399] w-full max-w-sm rounded overflow-hidden shadow-[0_0_20px_rgba(255,255,255,0.2)] border border-white">
               <div className="bg-gradient-to-r from-blue-700 to-blue-500 text-white font-bold p-2 text-sm flex items-center gap-2">
                  <span className="text-xl">🤖</span> Artificial Intelligence Alert
               </div>
               <div className="p-6 bg-white flex flex-col items-center text-center">
                  <h3 className="text-xl font-bold text-black mb-2 border-b-2 border-red-500 pb-1">You can't beat Al-Moatasem's AI!</h3>
                  <p className="text-sm text-gray-700 mb-6 leading-relaxed">
                     The Minimax algorithm calculates every possible future move.<br/><br/>
                     Instead of trying to beat an unbeatable algorithm, why not just hire the engineer who built it? 😉
                  </p>
                  <div className="flex gap-4">
                     <button 
                        onClick={() => { window.open('https://wa.me/+201554637079?text=Okay,%20I%20couldn%27t%20beat%20your%20Tic-Tac-Toe%20AI...%20Let%27s%20talk!', '_blank'); resetGame(); }}
                        className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-bold rounded shadow border border-green-800"
                     >
                        Hire Engineer
                     </button>
                     <button onClick={resetGame} className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-black font-bold rounded shadow border border-gray-400">
                        Try Again
                     </button>
                  </div>
               </div>
            </div>
         </div>
      )}

    </div>
  );
}
