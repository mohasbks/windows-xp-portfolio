"use client";
import { useEffect, useState } from "react";
import useOSStore from "@/store/useOSStore";
import { motion, AnimatePresence } from "framer-motion";

export default function Taskbar() {
  const [mounted, setMounted] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const { windows, toggleStartMenu, startMenuOpen, toggleWindow } = useOSStore();

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => setCurrentDate(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const time = mounted ? currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "";
  const dateTitle = mounted ? currentDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : "";

  return (
    <div className="absolute bottom-0 left-0 right-0 h-9 bg-[#245edb] border-t-2 border-[#3880ff] flex items-center justify-between z-[102] shadow-[0_-1px_3px_rgba(0,0,0,0.3)] select-none">
      <div className="flex h-full">
        {/* Windows XP Start Button */}
        <button 
          onClick={(e) => { e.stopPropagation(); toggleStartMenu(); }}
          className={`flex items-center justify-center gap-1.5 px-3 h-full font-bold text-white italic drop-shadow-md transition-colors 
            ${startMenuOpen 
              ? 'bg-gradient-to-b from-[#185311] to-[#36a627] shadow-[inset_1px_1px_3px_rgba(0,0,0,0.5)]' 
              : 'bg-gradient-to-b from-[#40b134] to-[#257b15] hover:opacity-90 shadow-[inset_1px_1px_3px_rgba(255,255,255,0.4)]'}`}
          style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.6)' }}
        >
          {/* Classic Windows Logo Approximation */}
          <div className="grid grid-cols-2 gap-[1px] w-4 h-4 mr-1 skew-y-[-10deg] skew-x-[-10deg]">
             <div className="bg-[#f0613a]"></div>
             <div className="bg-[#8ecb2f]"></div>
             <div className="bg-[#12b4ff]"></div>
             <div className="bg-[#fccc11]"></div>
          </div>
          start
        </button>

        <div className="w-2 h-full bg-[linear-gradient(to_right,rgba(0,0,0,0.2),rgba(0,0,0,0))]"></div>

        <div className="flex items-center gap-1 px-2 h-full overflow-x-auto scrollbar-hide">
            {windows.map(w => {
              const isActive = !w.isMinimized && w.zIndex === Math.max(...windows.map(win => win.zIndex));
              return (
                <div
                  key={w.id}
                  onClick={() => toggleWindow(w.id)}
                  className={`flex items-center px-3 w-[140px] h-[80%] rounded-sm text-white text-[11px] font-tahoma truncate cursor-default border ${
                    isActive ? 'bg-[#1546b4] border-[#0e358c] shadow-[inset_1px_1px_2px_rgba(0,0,0,0.4)]' : 'bg-[#3c81f3] border-[#5993fb] hover:bg-[#4b8df8] shadow-[inset_1px_1px_2px_rgba(255,255,255,0.3)]'
                  }`}
                >
                  {w.title}
                </div>
              );
            })}
        </div>
      </div>

      <div 
         className="h-full bg-[#0b91e9] flex items-center px-4 border-l border-[#136199] text-white text-xs font-tahoma shadow-[inset_1px_1px_1px_rgba(255,255,255,0.3)] pt-0.5 cursor-pointer hover:brightness-110"
         onDoubleClick={() => useOSStore.getState().openWindow({ id: 'datetime', title: 'Date and Time Properties', componentName: 'DateTimeProperties' })}
         title={dateTitle}
      >
        <div className="flex items-center gap-2">
           <div className="w-3 h-3 rounded-sm bg-blue-300 shadow-sm border border-blue-400"></div>
           {time}
        </div>
      </div>
    </div>
  );
}
