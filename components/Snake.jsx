"use client";
import { useState, useEffect, useRef } from "react";
import useOSStore, { playSound } from "@/store/useOSStore";

export default function Snake() {
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [food, setFood] = useState({ x: 15, y: 15 });
  const [direction, setDirection] = useState("RIGHT");
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const boardSize = 20;

  const moveSnake = () => {
    if (gameOver || !isPlaying) return;

    setSnake((prev) => {
      const newSnake = [...prev];
      const head = { ...newSnake[0] };

      switch (direction) {
        case "UP": head.y -= 1; break;
        case "DOWN": head.y += 1; break;
        case "LEFT": head.x -= 1; break;
        case "RIGHT": head.x += 1; break;
        default: break;
      }

      // Check collision with walls
      if (head.x < 0 || head.x >= boardSize || head.y < 0 || head.y >= boardSize) {
        handleGameOver();
        return prev;
      }

      // Check collision with itself
      if (newSnake.some((segment) => segment.x === head.x && segment.y === head.y)) {
        handleGameOver();
        return prev;
      }

      newSnake.unshift(head);

      // Check eating food
      if (head.x === food.x && head.y === food.y) {
        setScore(s => s + 10);
        playSound('type'); // Small tick sound
        setFood({
          x: Math.floor(Math.random() * boardSize),
          y: Math.floor(Math.random() * boardSize),
        });
      } else {
        newSnake.pop(); // Remove tail if no food eaten
      }

      return newSnake;
    });
  };

  const handleGameOver = () => {
    setGameOver(true);
    setIsPlaying(false);
    playSound('error');
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isPlaying && !gameOver) setIsPlaying(true);
      
      switch (e.key) {
        case "ArrowUp":
          if (direction !== "DOWN") setDirection("UP");
          break;
        case "ArrowDown":
          if (direction !== "UP") setDirection("DOWN");
          break;
        case "ArrowLeft":
          if (direction !== "RIGHT") setDirection("LEFT");
          break;
        case "ArrowRight":
          if (direction !== "LEFT") setDirection("RIGHT");
          break;
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [direction, isPlaying, gameOver]);

  useEffect(() => {
    const interval = setInterval(moveSnake, 120);
    return () => clearInterval(interval);
  }, [direction, isPlaying, gameOver, food]); // Depend on state to keep fresh reference

  const restartGame = () => {
    setSnake([{ x: 10, y: 10 }]);
    setFood({ x: 15, y: 15 });
    setDirection("RIGHT");
    setGameOver(false);
    setScore(0);
    setIsPlaying(false);
    playSound('nav');
  };

  return (
    <div className="flex flex-col h-full bg-[#ece9d8] select-none font-tahoma overflow-hidden items-center p-4">
      
      <div className="flex items-center justify-between w-full max-w-[400px] mb-4 bg-white p-2 border border-gray-400 shadow-inner">
         <span className="font-bold text-gray-700 text-sm">SCORE <span className="text-blue-600 bg-gray-100 px-2 py-0.5 border border-gray-300 ml-2">{score}</span></span>
         <button onClick={restartGame} className="px-4 py-1 text-xs border border-gray-500 bg-[#ece9d8] shadow-[1px_1px_2px_rgba(0,0,0,0.3)] active:bg-gray-300 active:shadow-inner font-bold">RESTART</button>
      </div>

      <div 
        className="relative bg-black border-[4px] border-gray-400 shadow-[0_0_10px_rgba(0,0,0,0.5)]" 
        style={{ width: 400, height: 400 }}
      >
         {!isPlaying && !gameOver && (
           <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center text-white z-10">
               <h2 className="text-3xl font-bold mb-4 font-mono text-green-500 animate-pulse">SNAKE XP</h2>
               <p className="text-xs text-gray-300">Press any Arrow Key to Start</p>
           </div>
         )}
         
         {gameOver && (
           <div className="absolute inset-0 bg-red-900/80 flex flex-col items-center justify-center text-white z-10 border-[4px] border-red-500">
               <h2 className="text-3xl font-bold mb-2 font-mono">GAME OVER</h2>
               <p className="text-sm">Final Score: {score}</p>
           </div>
         )}

         {/* Grid Render */}
         {snake.map((segment, i) => (
           <div 
              key={i} 
              className="absolute bg-green-500 border border-green-700" 
              style={{ width: 20, height: 20, left: segment.x * 20, top: segment.y * 20 }} 
           />
         ))}
         
         <div 
            className="absolute bg-red-500 rounded-full border border-red-700 shadow-[0_0_5px_rgba(255,0,0,0.8)]" 
            style={{ width: 18, height: 18, left: food.x * 20 + 1, top: food.y * 20 + 1 }} 
         />
      </div>

    </div>
  );
}
