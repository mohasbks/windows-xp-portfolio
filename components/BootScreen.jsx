"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useOSStore, { playSound } from "@/store/useOSStore";

export default function BootScreen() {
  const bootComplete = useOSStore(state => state.bootComplete);
  const setBootComplete = useOSStore(state => state.setBootComplete);
  const biosComplete = useOSStore(state => state.biosComplete);
  const [isBooting, setIsBooting] = useState(true);

  // Automatically start loading bar when BIOS finishes
  useEffect(() => {
    if (biosComplete && !bootComplete) {
      const t = setTimeout(() => {
        setIsBooting(false); // Show welcome screen after 3.5s loading
      }, 3500);
      return () => clearTimeout(t);
    }
  }, [biosComplete, bootComplete]);

  const handleLogin = () => {
    playSound('boot'); // Play Windows startup sound upon login
    setBootComplete(true);
  };

  if (!biosComplete || bootComplete) return null;

  return (
    <AnimatePresence>
      {!bootComplete && (
        <motion.div 
          className="absolute inset-0 bg-black flex flex-col items-center justify-center z-[200] overflow-hidden select-none"
          exit={{ opacity: 0, transition: { duration: 1.5, ease: "easeInOut" } }}
        >
          {!isBooting ? (
             <div className="absolute inset-0 z-[999999] flex flex-col cursor-default font-tahoma select-none bg-[#5a7edc] overflow-hidden">
                {/* Top Bar */}
                <div className="h-24 bg-[#00309b] w-full shrink-0 relative flex items-center pr-8 justify-end shadow-md">
                   <div className="absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-white via-orange-400 to-orange-500"></div>
                </div>
                
                {/* Middle Content - Split Screen */}
                <div className="flex-1 w-full flex items-center justify-center relative">
                   <div className="flex w-full max-w-4xl">
                      
                      {/* Left Side: Logo */}
                      <div className="w-1/2 flex items-center justify-end pr-10 relative">
                         <div className="absolute right-0 top-[-200px] bottom-[-200px] w-[2px] bg-gradient-to-b from-transparent via-white to-transparent opacity-80"></div>
                         
                         <div className="flex items-center gap-4">
                            <img src="https://win98icons.alexmeub.com/icons/png/windows_slanted-1.png" className="w-16 h-16 drop-shadow-lg" alt="XP Logo" />
                            <div className="flex flex-col items-start leading-[0.8]">
                               <span className="text-white text-3xl italic font-bold drop-shadow-[2px_2px_2px_rgba(0,0,0,0.5)]">Windows<sup className="text-xl">xp</sup></span>
                               <span className="text-blue-200 text-sm italic font-semibold drop-shadow-[1px_1px_1px_rgba(0,0,0,0.5)]">Professional</span>
                            </div>
                         </div>
                      </div>

                      {/* Right Side: Users */}
                      <div className="w-1/2 flex flex-col justify-center pl-10">
                         <div className="text-white mb-6 font-semibold text-sm drop-shadow-[1px_1px_1px_rgba(0,0,0,0.8)] border-b-[2px] border-gradient-to-r from-white to-transparent pb-1 mr-20 w-3/4">
                            To begin, click your user name
                         </div>
                         
                         <div
                           onClick={handleLogin}
                           className="flex items-center gap-4 cursor-pointer p-2 rounded hover:bg-white/10 transition-colors w-max group"
                         >
                            <div className="w-14 h-14 bg-white rounded-md border-[2px] border-orange-400 overflow-hidden flex items-center justify-center shadow-[0_2px_10px_rgba(0,0,0,0.3)]">
                               <img src="/me.png" alt="User" className="w-full h-full object-cover" onError={(e) => e.target.src = "https://win98icons.alexmeub.com/icons/png/user_computer-0.png"}/>
                            </div>
                            <div className="flex flex-col justify-center h-14">
                               <span className="text-xl text-white font-bold drop-shadow-md group-hover:text-amber-100 transition-colors">Al-Moatasem</span>
                            </div>
                         </div>
                      </div>

                   </div>
                </div>

                {/* Bottom Bar */}
                <div className="h-24 bg-[#00309b] w-full shrink-0 relative flex items-center justify-start pl-12 shadow-[0_-2px_5px_rgba(0,0,0,0.3)]">
                   <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-orange-500 via-orange-400 to-white"></div>
                   
                   <div className="flex flex-col items-center gap-1 cursor-pointer group hover:scale-[1.02] transition-transform" onClick={() => window.close()}>
                      <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center border border-white/50 shadow-md group-hover:brightness-110">
                         <span className="text-white font-bold text-lg drop-shadow-md leading-none">⏻</span>
                      </div>
                      <span className="text-[11px] text-white font-tahoma group-hover:underline drop-shadow-sm font-semibold">Turn off computer</span>
                   </div>
                </div>
             </div>
          ) : (
             <div className="flex flex-col items-center mt-[-100px]">
                <div className="flex items-end mb-10 tracking-tighter">
                   <h1 className="text-5xl font-bold text-white italic mr-2" style={{ textShadow: "2px 2px 0 #000" }}>Microsoft Windows</h1>
                   <span className="text-[55px] font-bold text-[#f0613a] italic leading-none" style={{ textShadow: "2px 2px 0 #000" }}>X</span>
                   <span className="text-[55px] font-bold text-[#8ecb2f] italic leading-none" style={{ textShadow: "2px 2px 0 #000" }}>P</span>
                </div>
                
                <div className="w-64 h-5 border-[2px] border-gray-400 rounded-sm overflow-hidden bg-black p-0.5 mt-10 relative shadow-[0_0_10px_rgba(255,255,255,0.2)]">
                   <motion.div 
                     className="w-10 h-full bg-gradient-to-r from-transparent via-[#2b65ec] to-transparent rounded-[1px] absolute"
                     animate={{ left: ["-10%", "110%"] }}
                     transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                   />
                </div>
             </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
