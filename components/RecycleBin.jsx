"use client";
import { useState } from "react";
import useOSStore, { playSound } from "@/store/useOSStore";

export default function RecycleBin() {
  const trashItems = useOSStore(state => state.trashItems);
  const restoreFromTrash = useOSStore(state => state.restoreFromTrash);
  const emptyTrash = useOSStore(state => state.emptyTrash);
  const [selectedId, setSelectedId] = useState(null);

  const handleRestore = () => {
    if (selectedId) {
      playSound('nav');
      restoreFromTrash(selectedId);
      setSelectedId(null);
    }
  };

  const handleEmpty = () => {
    if (trashItems.length > 0) {
      emptyTrash();
      setSelectedId(null);
    }
  };

  const handleRestoreAll = () => {
    if (trashItems.length > 0) {
      playSound('nav');
      trashItems.forEach(item => restoreFromTrash(item.id));
      setSelectedId(null);
    }
  };

  return (
    <div className="flex w-full h-full bg-white text-black font-tahoma select-none overflow-hidden" onClick={() => setSelectedId(null)}>
      
      {/* Left Sidebar Actions */}
      <div className="w-[30%] min-w-[150px] bg-gradient-to-b from-[#74bcf7] to-[#599ce0] border-r border-[#69a1d5] p-3 flex flex-col gap-4 overflow-y-auto hidden md:flex" onClick={(e) => e.stopPropagation()}>
        
        {/* Recycle Bin Tasks */}
        <div className="bg-white/90 border border-white/50 rounded-sm overflow-hidden shadow-sm">
           <div className="bg-gradient-to-r from-[#fcffff] to-[#d6ebfd] px-3 py-1 font-bold text-[#0c327d] text-sm flex items-center gap-2 border-b border-white">
              Recycle Bin Tasks
           </div>
           
           <div className="flex flex-col gap-2 p-3 text-xs">
              <div className="flex items-center gap-2 cursor-pointer text-[#0c327d] hover:text-[#2b72ff] hover:underline" onClick={handleEmpty}>
                 <img src="https://win98icons.alexmeub.com/icons/png/recycle_bin_empty-4.png" className="w-4 h-4 grayscale" />
                 <span>Empty the Recycle Bin</span>
              </div>
              
              {selectedId ? (
                <div className="flex items-center gap-2 cursor-pointer text-[#0c327d] hover:text-[#2b72ff] hover:underline" onClick={handleRestore}>
                   <img src="https://win98icons.alexmeub.com/icons/png/directory_open_file_mydocs-4.png" className="w-4 h-4" />
                   <span>Restore this item</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 cursor-pointer text-[#0c327d] hover:text-[#2b72ff] hover:underline" onClick={handleRestoreAll}>
                   <img src="https://win98icons.alexmeub.com/icons/png/directory_open_file_mydocs-4.png" className="w-4 h-4" />
                   <span>Restore all items</span>
                </div>
              )}
           </div>
        </div>

      </div>

      {/* Main Content Area */}
      <div className="flex-1 bg-white p-2 overflow-y-auto relative">
        {trashItems.length === 0 ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center opacity-50 text-sm">
             <img src="https://win98icons.alexmeub.com/icons/png/recycle_bin_empty-4.png" alt="Empty" className="w-16 h-16 mb-2 opacity-50" />
             <p>Recycle Bin is empty.</p>
          </div>
        ) : (
          <div className="flex flex-wrap gap-2 content-start">
            {trashItems.map(item => (
              <div 
                key={item.id}
                onClick={(e) => { e.stopPropagation(); playSound('nav'); setSelectedId(item.id); }}
                onDoubleClick={(e) => { e.stopPropagation(); playSound('nav'); restoreFromTrash(item.id); setSelectedId(null); }}
                className={`flex flex-col items-center p-2 rounded w-24 gap-1 cursor-pointer 
                  ${selectedId === item.id ? 'bg-[#316ac5] text-white' : 'text-black hover:bg-[#e2f0fb]'}`}
              >
                <img src={item.img} alt={item.title} className="w-10 h-10 object-contain drop-shadow-sm pointer-events-none opacity-60" />
                <span className="text-xs text-center leading-tight break-words w-full">{item.title}</span>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
