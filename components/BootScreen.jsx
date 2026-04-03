"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useOSStore, { playSound } from "@/store/useOSStore";

export default function BootScreen() {
  const bootComplete = useOSStore(state => state.bootComplete);
  const setBootComplete = useOSStore(state => state.setBootComplete);
  const [isBooting, setIsBooting] = useState(false);

  const handlePowerOn = () => {
    setIsBooting(true);
    playSound('boot');
    setTimeout(() => {
      setBootComplete(true);
    }, 4500);
  };

  if (bootComplete) return null;

  return (
    <AnimatePresence>
      {!bootComplete && (
        <motion.div 
          className="absolute inset-0 bg-black flex flex-col items-center justify-center z-[200] overflow-hidden"
          exit={{ opacity: 0, transition: { duration: 1.5, ease: "easeInOut" } }}
        >
          {!isBooting ? (
            <div className="absolute inset-0 bg-[#003399] flex flex-col justify-center items-center">
                <div className="w-full h-24 bg-gradient-to-r from-[#001741] via-[#003399] to-[#001741] border-y-2 border-white/20 flex flex-col justify-center items-center shadow-2xl mb-8">
                  <h1 className="text-3xl font-bold text-white italic tracking-wider drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] font-tahoma">Welcome</h1>
                </div>
                
                <div
                  onClick={handlePowerOn}
                  className="flex items-center gap-4 cursor-pointer p-4 rounded-xl border border-transparent hover:border-white/20 transition-all active:scale-95 group"
                >
                  <div className="w-20 h-20 bg-white rounded-md border-[3px] border-orange-400 overflow-hidden flex items-center justify-center shadow-[0_4px_10px_rgba(0,0,0,0.5)]">
                     <img src="/me.png" alt="User" className="w-full h-full object-cover" onError={(e) => e.target.src = "https://win98icons.alexmeub.com/icons/png/user_computer-0.png"}/>
                  </div>
                  <span className="text-2xl text-white font-semibold drop-shadow-md font-tahoma tracking-wide group-hover:underline">Al-Moatasem</span>
                </div>
                
                <div className="absolute bottom-10 text-white/80 text-sm font-tahoma italic">Click on your user name to log on</div>
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
