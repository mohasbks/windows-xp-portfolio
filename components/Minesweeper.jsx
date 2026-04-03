"use client";
import { useState, useEffect } from "react";
import { playSound } from "@/store/useOSStore";

const ROWS = 9;
const COLS = 9;
const MINES = 10;

const createBoard = () => {
  let board = Array(ROWS).fill(null).map(() => Array(COLS).fill({ isMine: false, isRevealed: false, isFlagged: false, neighborMines: 0 }));
  let minesPlaced = 0;
  while (minesPlaced < MINES) {
    const r = Math.floor(Math.random() * ROWS);
    const c = Math.floor(Math.random() * COLS);
    if (!board[r][c].isMine) {
      board[r] = [...board[r]];
      board[r][c] = { ...board[r][c], isMine: true };
      minesPlaced++;
    }
  }

  const directions = [[-1,-1], [-1,0], [-1,1], [0,-1], [0,1], [1,-1], [1,0], [1,1]];
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if (board[r][c].isMine) continue;
      let count = 0;
      for (const [dr, dc] of directions) {
        const nr = r + dr, nc = c + dc;
        if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS && board[nr][nc].isMine) count++;
      }
      board[r][c] = { ...board[r][c], neighborMines: count };
    }
  }
  return board;
};

export default function Minesweeper() {
  const [board, setBoard] = useState(createBoard);
  const [gameOver, setGameOver] = useState(false);
  const [win, setWin] = useState(false);
  const [flags, setFlags] = useState(MINES);

  const revealCell = (r, c) => {
    if (gameOver || win || board[r][c].isRevealed || board[r][c].isFlagged) return;

    let newBoard = [...board];
    
    if (newBoard[r][c].isMine) {
      // Game Over
      newBoard = newBoard.map(row => row.map(cell => cell.isMine ? { ...cell, isRevealed: true } : cell));
      setBoard(newBoard);
      setGameOver(true);
      playSound('error');
      return;
    }

    const floodFill = (nr, nc) => {
      if (nr < 0 || nr >= ROWS || nc < 0 || nc >= COLS || newBoard[nr][nc].isRevealed || newBoard[nr][nc].isFlagged) return;
      newBoard[nr] = [...newBoard[nr]];
      newBoard[nr][nc] = { ...newBoard[nr][nc], isRevealed: true };
      if (newBoard[nr][nc].neighborMines === 0) {
        const directions = [[-1,-1], [-1,0], [-1,1], [0,-1], [0,1], [1,-1], [1,0], [1,1]];
        for (const [dr, dc] of directions) floodFill(nr + dr, nc + dc);
      }
    };

    floodFill(r, c);
    setBoard(newBoard);
    playSound('click');

    // Check Win
    let unrevealedSafe = 0;
    newBoard.forEach(row => row.forEach(cell => {
      if (!cell.isMine && !cell.isRevealed) unrevealedSafe++;
    }));
    if (unrevealedSafe === 0) setWin(true);
  };

  const toggleFlag = (e, r, c) => {
    e.preventDefault();
    if (gameOver || win || board[r][c].isRevealed) return;
    
    let newBoard = [...board];
    newBoard[r] = [...newBoard[r]];
    const isFlagged = !newBoard[r][c].isFlagged;
    newBoard[r][c] = { ...newBoard[r][c], isFlagged };
    setBoard(newBoard);
    setFlags(prev => isFlagged ? prev - 1 : prev + 1);
  };

  const restart = () => {
    setBoard(createBoard());
    setGameOver(false);
    setWin(false);
    setFlags(MINES);
  };

  const colors = ["", "text-blue-600", "text-green-600", "text-red-500", "text-blue-800", "text-red-800", "text-teal-600", "text-black", "text-gray-600"];

  return (
    <div className="flex flex-col h-full bg-[#c0c0c0] p-1 font-tahoma select-none border-t border-l border-white border-b-2 border-r-2 border-gray-500">
       <div className="bg-[#c0c0c0] border-t border-l border-white border-b-2 border-r-2 border-gray-600 mb-1 px-2 py-0.5 flex gap-2">
         <span className="text-xs">Game</span>
         <span className="text-xs">Help</span>
       </div>
       <div className="flex-1 flex flex-col p-2 border-t-[3px] border-l-[3px] border-b border-r border-[#808080] border-r-white border-b-white bg-[#c0c0c0]">
         
         <div className="flex justify-between items-center mb-2 bg-[#c0c0c0] p-1 border-[2px] border-[#808080] border-r-white border-b-white shadow-inner">
           <div className="bg-black text-red-500 font-mono text-2xl px-1">{flags.toString().padStart(3, '0')}</div>
           <button 
             onClick={restart}
             className="w-7 h-7 bg-[#c0c0c0] border-[2px] border-white border-r-[#808080] border-b-[#808080] active:border-t-[#808080] active:border-l-[#808080] active:border-r-white active:border-b-white flex items-center justify-center text-xl"
           >
             {gameOver ? '😵' : win ? '😎' : '🙂'}
           </button>
           <div className="bg-black text-red-500 font-mono text-2xl px-1">000</div>
         </div>

         <div className="w-fit mx-auto border-[3px] border-[#808080] border-r-white border-b-white bg-[#c0c0c0]">
           {board.map((row, r) => (
             <div key={r} className="flex">
               {row.map((cell, c) => (
                 <div 
                   key={c} 
                   onClick={() => revealCell(r, c)}
                   onContextMenu={(e) => toggleFlag(e, r, c)}
                   className={`w-4 h-4 flex items-center justify-center text-[10px] font-bold ${
                     cell.isRevealed 
                       ? 'bg-[#c0c0c0] border-[0.5px] border-gray-400' 
                       : 'bg-[#c0c0c0] border-2 border-white border-b-gray-500 border-r-gray-500 active:border active:border-gray-500 active:bg-[#c0c0c0]'
                   }`}
                 >
                   {cell.isRevealed 
                      ? cell.isMine 
                        ? '💣' 
                        : cell.neighborMines > 0 
                          ? <span className={colors[cell.neighborMines]}>{cell.neighborMines}</span>
                          : ''
                      : cell.isFlagged ? <span className="text-red-500">🚩</span> : ''}
                 </div>
               ))}
             </div>
           ))}
         </div>
       </div>
    </div>
  );
}
