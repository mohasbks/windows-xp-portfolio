"use client";
import { useState, useEffect } from "react";
import useOSStore, { playSound } from "@/store/useOSStore";

export default function BIOS() {
  const [lines, setLines] = useState([]);
  const [showCursor, setShowCursor] = useState(true);
  const setBiosComplete = useOSStore(state => state.setBiosComplete);

  const bootSequence = [
    { text: "Award Modular BIOS v4.51PG, An Energy Star Ally", delay: 500 },
    { text: "Copyright (C) 1984-2001, Award Software, Inc.", delay: 400 },
    { text: "", delay: 300 },
    { text: "PENTIUM(R) III Processor, 733 MHz", delay: 600 },
    { text: "Checking Memory: 1048576K OK", delay: 800 },
    { text: "", delay: 200 },
    { text: "Detecting IDE Primary Master ... [Pressing F4 to skip]", delay: 500 },
    { text: "Detecting IDE Primary Slave  ... None", delay: 300 },
    { text: "", delay: 300 },
    { text: "Loading AI Engineer Modules... SUCCESS", delay: 600 },
    { text: "Initializing Al-Moatasem Core Skills... 100%", delay: 700 },
    { text: "Booting from Hard Disk...", delay: 1000 },
  ];

  useEffect(() => {
    // Blinking cursor
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 400);

    let currentLine = 0;
    let activeTimeout = null;
    
    const runSequence = () => {
      if (currentLine < bootSequence.length) {
        const textToPush = bootSequence[currentLine].text;
        const nextDelay = bootSequence[currentLine].delay;
        
        setLines(prev => [...prev, textToPush]);
        playSound('type'); // Small click sound for each line
        
        currentLine++;
        activeTimeout = setTimeout(runSequence, nextDelay);
      } else {
        // Complete
        activeTimeout = setTimeout(() => {
          setBiosComplete(true);
          playSound('boot'); // Trigger the XP boot sound right when transitioning
        }, 1200);
      }
    };

    // Start sequence after small delay
    activeTimeout = setTimeout(runSequence, 1000);

    return () => {
      clearInterval(cursorInterval);
      clearTimeout(activeTimeout);
    };
  }, []);

  return (
    <div className="absolute inset-0 bg-black text-gray-300 font-mono text-sm sm:text-base p-4 z-[999999] flex flex-col justify-start items-start select-none cursor-none tracking-wider">
      <div className="h-4"></div>
      {/* Energy Star Logo Approximation */}
      <div className="absolute top-4 right-8 opacity-70 hidden sm:block">
         <pre className="text-[10px] leading-[10px] text-gray-400">
           {`
   * * *
 *       *
* ENERGY  *
 *  STAR *
   * * *
           `}
         </pre>
      </div>

      {lines.map((line, i) => (
        <div key={i} className="min-h-[1.5rem]">{line}</div>
      ))}
      <div className="min-h-[1.5rem]">
        {showCursor ? <span className="bg-gray-300 w-2 h-4 inline-block align-middle animate-pulse"></span> : <span>&nbsp;</span>}
      </div>
    </div>
  );
}
