"use client";
import { useState } from "react";
import useOSStore, { playSound } from "@/store/useOSStore";

import { motion } from "framer-motion";

export default function Icon({ id, title, img, componentName, left, top, metadata, onDropToTrash }) {
  const openWindow = useOSStore(state => state.openWindow);
  const [selected, setSelected] = useState(false);
  
  const handleDragEnd = (event, info) => {
    if (id === 'recycle-bin') return;
    // Check collision with Recycle Bin at roughly x:20, y:500 (allow margin)
    if (info.point.x >= 10 && info.point.x <= 110 && info.point.y >= 480 && info.point.y <= 600) {
      if(onDropToTrash) onDropToTrash(id);
    }
  };

  return (
    <motion.div
      drag
      dragMomentum={false}
      onDragStart={() => setSelected(true)}
      onDragEnd={handleDragEnd}
      onClick={(e) => { e.stopPropagation(); playSound('click'); setSelected(true); }}
      onDoubleClick={(e) => { e.stopPropagation(); openWindow({ id, title, componentName, metadata }); setSelected(false); }}
      className={`absolute flex flex-col items-center justify-center w-20 gap-1 cursor-pointer group p-1 ${selected ? 'brightness-75' : ''}`}
      style={{ left: left, top: top }}
    >
      <div className={`w-10 h-10 flex items-center justify-center ${selected ? 'opacity-70' : 'opacity-100'} drop-shadow-[1px_2px_2px_rgba(0,0,0,0.8)]`}>
        <img src={img} alt={title} className="w-full h-full object-contain pointer-events-none select-none" draggable={false} />
      </div>
      <span className={`text-white text-xs tracking-wide text-center px-1 py-[1px] font-tahoma leading-tight drop-shadow-[1px_1px_2px_rgba(0,0,0,1)] ${selected ? 'bg-[#0b61ff] !drop-shadow-none border border-dotted border-white/50' : 'bg-transparent border border-transparent select-none'}`}>
        {title}
      </span>
    </motion.div>
  );
}
