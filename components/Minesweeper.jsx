"use client";
import { useState, useEffect } from "react";
import useOSStore, { playSound } from "@/store/useOSStore";

const ROWS = 9;
const COLS = 9;
const MINES = 10;

export default function Minesweeper() {
  const [grid, setGrid] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [win, setWin] = useState(false);
  const [minesLeft, setMinesLeft] = useState(MINES);
  const [timer, setTimer] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [face, setFace] = useState("🙂");

  // Initialize Board
  const initGame = () => {
    let newGrid = Array(ROWS).fill(null).map((_, y) => 
      Array(COLS).fill(null).map((_, x) => ({
        x, y, isMine: false, isRevealed: false, isFlagged: false, neighborMines: 0
      }))
    );

    // Place Mines
    let minesPlaced = 0;
    while (minesPlaced < MINES) {
      const rx = Math.floor(Math.random() * COLS);
      const ry = Math.floor(Math.random() * ROWS);
      if (!newGrid[ry][rx].isMine) {
        newGrid[ry][rx].isMine = true;
        minesPlaced++;
      }
    }

    // Calculate Neighbors
    for (let y = 0; y < ROWS; y++) {
      for (let x = 0; x < COLS; x++) {
        if (!newGrid[y][x].isMine) {
          let mines = 0;
          for (let dy = -1; dy <= 1; dy++) {
            for (let dx = -1; dx <= 1; dx++) {
              if (y + dy >= 0 && y + dy < ROWS && x + dx >= 0 && x + dx < COLS) {
                if (newGrid[y + dy][x + dx].isMine) mines++;
              }
            }
          }
          newGrid[y][x].neighborMines = mines;
        }
      }
    }

    setGrid(newGrid);
    setGameOver(false);
    setWin(false);
    setMinesLeft(MINES);
    setTimer(0);
    setIsPlaying(false);
    setFace("🙂");
  };

  useEffect(() => { initGame(); }, []);

  useEffect(() => {
    let interval;
    if (isPlaying && !gameOver && !win) {
      interval = setInterval(() => setTimer(t => t + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, gameOver, win]);

  const revealCell = (x, y) => {
    if (gameOver || win || grid[y][x].isRevealed || grid[y][x].isFlagged) return;
    
    if (!isPlaying) setIsPlaying(true);
    playSound('nav');

    let newGrid = [...grid];
    if (newGrid[y][x].isMine) {
      // Game Over
      newGrid[y][x].isRevealed = true;
      setGrid(newGrid);
      setGameOver(true);
      setFace("😵");
      playSound('error');
      return;
    }

    // Flood Fill
    const stack = [[x, y]];
    while (stack.length > 0) {
      const [cx, cy] = stack.pop();
      if (!newGrid[cy][cx].isRevealed && !newGrid[cy][cx].isFlagged) {
        newGrid[cy][cx].isRevealed = true;
        if (newGrid[cy][cx].neighborMines === 0) {
          for (let dy = -1; dy <= 1; dy++) {
            for (let dx = -1; dx <= 1; dx++) {
              if (cy + dy >= 0 && cy + dy < ROWS && cx + dx >= 0 && cx + dx < COLS) {
                stack.push([cx + dx, cy + dy]);
              }
            }
          }
        }
      }
    }

    setGrid(newGrid);
    checkWin(newGrid);
  };

  const toggleFlag = (e, x, y) => {
    e.preventDefault();
    if (gameOver || win || grid[y][x].isRevealed) return;
    if (!isPlaying) setIsPlaying(true);

    let newGrid = [...grid];
    newGrid[y][x].isFlagged = !newGrid[y][x].isFlagged;
    setGrid(newGrid);
    setMinesLeft(prev => newGrid[y][x].isFlagged ? prev - 1 : prev + 1);
    playSound('nav');
  };

  const checkWin = (currentGrid) => {
    let revealed = 0;
    for (let y = 0; y < ROWS; y++) {
      for (let x = 0; x < COLS; x++) {
        if (currentGrid[y][x].isRevealed) revealed++;
      }
    }
    if (revealed === ROWS * COLS - MINES) {
      setWin(true);
      setFace("😎");
      playSound('boot'); // Win sound!
    }
  };

  const getNumberColor = (num) => {
    const colors = ["", "text-blue-600", "text-green-600", "text-red-500", "text-blue-800", "text-red-800", "text-teal-600", "text-black", "text-gray-500"];
    return colors[num] || "";
  };

  return (
    <div className="flex flex-col h-full bg-[#ece9d8] select-none font-tahoma overflow-hidden">
      
      {/* Menu Bar */}
      <div className="bg-[#ece9d8] border-b border-gray-400 p-1 flex items-center gap-1 shrink-0 px-2 py-0.5">
         <span className="text-[11px] text-black px-2 hover:bg-blue-600 hover:text-white cursor-pointer" onClick={initGame}>Game</span>
         <span className="text-[11px] text-black px-2 hover:bg-blue-600 hover:text-white cursor-pointer">Help</span>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center bg-gray-400 p-2 border-t-[2px] border-l-[2px] border-white border-b-[2px] border-r-[2px] border-gray-600 m-2 mt-4 mx-auto w-max shadow-sm">
        
        {/* Header HUD */}
        <div className="border-[2px] border-b-white border-r-white border-t-gray-600 border-l-gray-600 mb-2 p-1 px-2 flex justify-between items-center w-full bg-gray-300">
           {/* Mines Left Box */}
           <div className="bg-black text-red-500 font-mono text-xl w-10 text-center leading-none py-1 border border-gray-500">{minesLeft.toString().padStart(3, '0')}</div>
           
           {/* Face Button */}
           <button 
              className="w-8 h-8 flex items-center justify-center text-lg bg-gray-300 border-[2px] border-t-white border-l-white border-b-gray-600 border-r-gray-600 active:border-t-gray-600 active:border-l-gray-600 active:border-b-white active:border-r-white outline-none"
              onClick={initGame}
              onMouseDown={() => setFace("😮")}
              onMouseUp={() => !gameOver && !win && setFace("🙂")}
              onMouseLeave={() => !gameOver && !win && setFace("🙂")}
           >
              {face}
           </button>

           {/* Timer Box */}
           <div className="bg-black text-red-500 font-mono text-xl w-10 text-center leading-none py-1 border border-gray-500">{Math.min(timer, 999).toString().padStart(3, '0')}</div>
        </div>

        {/* Game Grid */}
        <div className="border-[3px] border-b-white border-r-white border-t-gray-600 border-l-gray-600 bg-gray-400">
           {grid.map((row, y) => (
             <div key={y} className="flex">
               {row.map((cell, x) => (
                 <div 
                    key={`${x}-${y}`} 
                    onClick={() => revealCell(x, y)}
                    onContextMenu={(e) => toggleFlag(e, x, y)}
                    className={`w-6 h-6 flex items-center justify-center font-bold text-sm select-none
                       ${cell.isRevealed 
                          ? 'bg-gray-300 border border-gray-400' 
                          : 'bg-gray-300 border-[2px] border-t-white border-l-white border-b-gray-600 border-r-gray-600 active:border-t-gray-600 active:border-l-gray-600 active:border-b-white active:border-r-white cursor-pointer hover:bg-gray-200'
                       }
                       ${cell.isRevealed && cell.isMine && !win ? 'bg-red-500' : ''}
                    `}
                 >
                    {cell.isRevealed ? (
                       cell.isMine ? '💣' : (cell.neighborMines > 0 ? <span className={getNumberColor(cell.neighborMines)}>{cell.neighborMines}</span> : '')
                    ) : (
                       cell.isFlagged ? <span className="text-red-600 drop-shadow-sm">🚩</span> : ''
                    )}
                 </div>
               ))}
             </div>
           ))}
        </div>

      </div>
    </div>
  );
}
