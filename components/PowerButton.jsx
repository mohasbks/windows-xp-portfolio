"use client";
import { useState } from "react";
import useOSStore, { playSound } from "@/store/useOSStore";

export default function PowerButton() {
  const powerOn = useOSStore(state => state.powerOn);
  const biosComplete = useOSStore(state => state.biosComplete);

  if (powerOn || biosComplete) return null;

  return (
    <div className="absolute inset-0 bg-black z-[9999999] flex flex-col items-center justify-center text-white font-tahoma select-none">
       <button 
         onClick={() => {
           playSound('nav'); // Initialize audio context
           useOSStore.getState().setPowerOn(true); 
         }}
         className="w-24 h-24 rounded-full bg-gradient-to-br from-gray-700 to-black border-[4px] border-gray-500 flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] active:scale-95 transition-all text-red-500"
       >
          <span className="text-4xl font-bold">⏻</span>
       </button>
       <p className="mt-6 text-gray-400 font-bold tracking-widest text-sm animate-pulse">PRESS TO POWER ON</p>
    </div>
  );
}
