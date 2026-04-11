"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useOSStore, { playSound } from "@/store/useOSStore";

export default function Clippy() {
  const bootComplete = useOSStore(state => state.bootComplete);
  const [isVisible, setIsVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  
  useEffect(() => {
    if (bootComplete && !dismissed) {
      const timer = setTimeout(() => {
        setIsVisible(true);
        playSound('nav');
      }, 3000); // Wait 3 seconds after boot
      return () => clearTimeout(timer);
    }
  }, [bootComplete, dismissed]);

  if (!isVisible || dismissed) return null;

  const handleHireClick = () => {
    playSound('nav');
    setDismissed(true);
    const message = encodeURIComponent("Hi Al-Moatasem, I saw your amazing Windows XP portfolio and would love to discuss a potential project with you!");
    window.open(`https://wa.me/+201554637079?text=${message}`, '_blank');
  };

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ y: 200, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 200, opacity: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="absolute bottom-16 right-8 z-[9000] flex flex-col items-end gap-2 drop-shadow-xl select-none"
      >
        {/* Dialogue Bubble */}
        <div className="relative bg-[#ffffe1] border border-black rounded-lg p-3 text-sm font-tahoma text-black shadow-md w-64">
           {/* Bubble Pointer */}
           <div className="absolute -bottom-3 right-8 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[12px] border-t-black"></div>
           <div className="absolute -bottom-[10px] right-[33px] w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[10px] border-t-[#ffffe1]"></div>
           
           <p className="mb-3 leading-snug">
             <strong>It looks like you're trying to hire a professional AI engineer..</strong><br/>
             Would you like me to send you to Al-Moatasem's hire page?
           </p>
           
           <div className="flex flex-col gap-1 mt-2">
             <button 
               onClick={handleHireClick}
               className="text-left flex items-center gap-2 hover:bg-blue-600 hover:text-white px-2 py-1 rounded-sm border border-transparent hover:border-blue-800 transition-colors"
             >
                <div className="w-2 h-2 rounded-full border border-black bg-blue-500"></div> Yes, please!
             </button>
             <button 
               onClick={() => { playSound('nav'); setDismissed(true); }}
               className="text-left flex items-center gap-2 hover:bg-blue-600 hover:text-white px-2 py-1 rounded-sm border border-transparent hover:border-blue-800 transition-colors"
             >
                <div className="w-2 h-2 rounded-full border border-black bg-gray-400"></div> No, just browsing.
             </button>
           </div>
        </div>

        {/* Clippy Image via stable inline SVG */}
        <div className="mr-4 mt-2 right-0 flex justify-end drop-shadow-[2px_2px_2px_rgba(0,0,0,0.5)]">
           <svg width="80" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
             {/* Paperclip body */}
             <path d="M40,70 L40,35 C40,20 55,20 55,35 L55,80 C55,95 25,95 25,80 L25,40 C25,30 35,30 35,40 L35,70" fill="none" stroke="#dcdcdc" strokeWidth="8" strokeLinecap="round" />
             <path d="M40,70 L40,35 C40,20 55,20 55,35 L55,80 C55,95 25,95 25,80 L25,40 C25,30 35,30 35,40 L35,70" fill="none" stroke="#888" strokeWidth="1" strokeLinecap="round" />
             {/* Eyes */}
             <ellipse cx="65" cy="50" rx="8" ry="12" fill="white" stroke="black" strokeWidth="1" />
             <ellipse cx="48" cy="48" rx="7" ry="10" fill="white" stroke="black" strokeWidth="1" />
             {/* Pupils */}
             <circle cx="68" cy="53" r="3" fill="black" />
             <circle cx="51" cy="51" r="3" fill="black" />
             {/* Eyebrows */}
             <path d="M57,35 Q65,30 73,38" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" />
             <path d="M40,36 Q47,32 54,39" fill="none" stroke="black" strokeWidth="1.5" strokeLinecap="round" />
           </svg>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
