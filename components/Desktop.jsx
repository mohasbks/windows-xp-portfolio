"use client";
import DesktopIcon from "./Icon";
import Window from "./Window";
import Taskbar from "./Taskbar";
import StartMenu from "./StartMenu";
import Clippy from "./Clippy";
import useOSStore, { playSound } from "@/store/useOSStore";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const defaultDesktopIcons = [
  // Column 1 (System Elements)
  { id: 'my-computer', title: 'My Computer', img: 'https://win98icons.alexmeub.com/icons/png/computer_explorer-4.png', componentName: 'MyComputer', left: 20, top: 20 },
  { id: 'my-documents', title: 'My Documents', img: 'https://win98icons.alexmeub.com/icons/png/directory_open_file_mydocs-4.png', componentName: 'MyDocuments', left: 20, top: 100 },
  { id: 'ie', title: 'Internet Explorer', img: 'https://win98icons.alexmeub.com/icons/png/msie1-3.png', componentName: 'InternetExplorer', left: 20, top: 180 },
  { id: 'control-panel', title: 'Control Panel', img: 'https://win98icons.alexmeub.com/icons/png/directory_control_panel-0.png', componentName: 'ControlPanel', left: 20, top: 260 },
  { id: 'recycle-bin', title: 'Recycle Bin', img: 'https://win98icons.alexmeub.com/icons/png/recycle_bin_empty-4.png', componentName: null, left: 20, top: 340 },
  
  // Column 2 (Apps & Info)
  { id: 'aboutme', title: 'About Me', img: 'https://win98icons.alexmeub.com/icons/png/user_computer-0.png', componentName: 'AboutMe', left: 100, top: 20 },
  { id: 'notepad', title: 'Notepad', img: 'https://win98icons.alexmeub.com/icons/png/notepad-1.png', componentName: 'Notepad', left: 100, top: 100 },
  { id: 'calculator', title: 'Calculator', img: 'https://win98icons.alexmeub.com/icons/png/calculator-0.png', componentName: 'Calculator', left: 100, top: 180 },
  { id: 'mediaplayer', title: 'Media Player', img: 'https://win98icons.alexmeub.com/icons/png/cd_audio_cd_a-3.png', componentName: 'MediaPlayer', left: 100, top: 260 },
  { id: 'minesweeper', title: 'Minesweeper', img: 'https://win98icons.alexmeub.com/icons/png/minesweeper-0.png', componentName: 'Minesweeper', left: 100, top: 340 },
  { id: 'snake', title: 'Snake Game', img: 'https://win98icons.alexmeub.com/icons/png/keyboard-0.png', componentName: 'Snake', left: 180, top: 20 },
  { id: 'tictactoe', title: 'Beat The AI 🤖', img: 'https://win98icons.alexmeub.com/icons/png/game_mine_1-0.png', componentName: 'TicTacToeAI', left: 180, top: 100 },
  { id: 'cmd', title: 'Command Prompt', img: 'https://win98icons.alexmeub.com/icons/png/console_prompt-0.png', componentName: 'CommandPrompt', left: 180, top: 180 }
];

export default function Desktop() {
  const windows = useOSStore(state => state.windows);
  const startMenuOpen = useOSStore(state => state.startMenuOpen);
  const closeStartMenu = useOSStore(state => state.closeStartMenu);
  const isShuttingDown = useOSStore(state => state.isShuttingDown);
  const isShutDown = useOSStore(state => state.isShutDown);
  const setShuttingDown = useOSStore(state => state.setShuttingDown);
  const setShutDown = useOSStore(state => state.setShutDown);
  const setSelectedIconId = useOSStore(state => state.setSelectedIconId);
  const trashItems = useOSStore(state => state.trashItems);
  const moveToTrash = useOSStore(state => state.moveToTrash);
  const wallpaper = useOSStore(state => state.wallpaper);
  
  const [contextMenu, setContextMenu] = useState({ isOpen: false, x: 0, y: 0 });
  const [customFiles, setCustomFiles] = useState([]);
  const [isIdle, setIsIdle] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('xp_desktop_files');
    if (saved) setCustomFiles(JSON.parse(saved));
  }, []);

  useEffect(() => {
    let idleTimer;
    const resetTimer = () => {
      if (isIdle) setIsIdle(false);
      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => setIsIdle(true), 30000);
    };

    window.addEventListener('mousemove', resetTimer);
    window.addEventListener('keypress', resetTimer);
    window.addEventListener('click', resetTimer);
    resetTimer();

    return () => {
      window.removeEventListener('mousemove', resetTimer);
      window.removeEventListener('keypress', resetTimer);
      window.removeEventListener('click', resetTimer);
      clearTimeout(idleTimer);
    };
  }, [isIdle]);

  const createNewFile = () => {
    // Calculate next available grid position
    let newLeft = 20;
    let newTop = 20;
    let found = false;
    for (let c = 0; c < 10; c++) {
      for (let r = 0; r < 10; r++) {
        const gLeft = 20 + c * 80;
        const gTop = 20 + r * 80;
        const isTaken = [...defaultDesktopIcons, ...customFiles].some(
          i => Math.abs(i.left - gLeft) < 10 && Math.abs(i.top - gTop) < 10
        );
        if (!isTaken) {
          newLeft = gLeft;
          newTop = gTop;
          found = true;
          break;
        }
      }
      if (found) break;
    }

    const newId = 'file_' + Date.now();
    const newFile = {
      id: newId,
      title: 'New Text Document.txt',
      img: 'https://win98icons.alexmeub.com/icons/png/notepad_file-0.png',
      componentName: 'Notepad',
      left: newLeft,
      top: newTop,
      metadata: { fileId: newId, content: '' }
    };
    const updated = [...customFiles, newFile];
    setCustomFiles(updated);
    localStorage.setItem('xp_desktop_files', JSON.stringify(updated));
    setContextMenu({ isOpen: false, x: 0, y: 0 });
  };

  const handleContextMenu = (e) => {
    e.preventDefault();
    if(e.target === e.currentTarget || e.target.classList.contains('z-0')) {
       setContextMenu({ isOpen: true, x: e.clientX, y: e.clientY });
    }
  };

  const handleDropToTrash = (itemId) => {
    // If it's a custom created file, don't delete permanently from localStorage, just move to trash
    if (itemId.startsWith('file_')) {
      const itemToTrash = customFiles.find(i => i.id === itemId);
      if (itemToTrash) moveToTrash(itemToTrash);
    } else {
      // Move default application icons to the trash state array
      const itemToTrash = [...defaultDesktopIcons].find(i => i.id === itemId);
      if (itemToTrash) {
        moveToTrash(itemToTrash);
      }
    }
  };

  const allIcons = [...defaultDesktopIcons, ...customFiles].filter(item => !trashItems.find(t => t.id === item.id));
  const hasTrash = trashItems.length > 0;
  
  const finalIcons = allIcons.map(item => {
     if(item.id === 'recycle-bin' && hasTrash) {
        return { ...item, img: 'https://win98icons.alexmeub.com/icons/png/recycle_bin_full-4.png' };
     }
     return item;
  });

  return (
    <div 
      className="relative w-full h-full overflow-hidden bg-[#004e98] bg-cover bg-center select-none shadow-[inset_0_0_100px_rgba(0,0,0,0.5)] transition-all duration-500" 
      style={{ backgroundImage: `url('${wallpaper}')` }}
      onMouseDown={() => playSound('mouse')}
      onClick={() => { 
        if(startMenuOpen) closeStartMenu();
        if(contextMenu.isOpen) setContextMenu({ isOpen: false, x: 0, y: 0 });
        setSelectedIconId(null);
      }}
      onContextMenu={handleContextMenu}
    >
      <div className="absolute top-0 left-0 w-full h-full p-2 z-0">
        {finalIcons.map(item => (
          <DesktopIcon 
            key={item.id} 
            {...item} 
            onDropToTrash={item.id !== 'recycle-bin' ? handleDropToTrash : undefined}
          />
        ))}
      </div>

      <Clippy />

      <AnimatePresence>
        {windows.map(w => (
          <Window key={w.id} window={w} />
        ))}
      </AnimatePresence>
      
      {contextMenu.isOpen && (
        <div 
          className="absolute bg-white border border-gray-400 shadow-[2px_2px_5px_rgba(0,0,0,0.5)] z-[1000] py-1 text-xs font-tahoma w-48 text-black"
          style={{ top: contextMenu.y, left: contextMenu.x }}
          onContextMenu={(e) => e.preventDefault()}
        >
          <div className="px-5 py-1 hover:bg-[#2f71cd] hover:text-white cursor-pointer text-gray-500">View</div>
          <div className="px-5 py-1 hover:bg-[#2f71cd] hover:text-white cursor-pointer text-gray-500">Sort By</div>
          <div className="px-5 py-1 hover:bg-[#2f71cd] hover:text-white cursor-pointer" onClick={() => window.location.reload()}>Refresh</div>
          <div className="h-[1px] bg-gray-300 my-1 mx-2"></div>
          <div className="px-5 py-1 hover:bg-[#2f71cd] hover:text-white cursor-pointer text-gray-500">Paste</div>
          <div className="px-5 py-1 hover:bg-[#2f71cd] hover:text-white cursor-pointer text-gray-500">Paste Shortcut</div>
          <div className="h-[1px] bg-gray-300 my-1 mx-2"></div>
          <div className="px-5 py-1 hover:bg-[#2f71cd] hover:text-white cursor-pointer group/new relative">
             New ►
             <div className="absolute hidden group-hover/new:block left-full top-0 bg-white border border-gray-400 shadow-[2px_2px_5px_rgba(0,0,0,0.5)] py-1 w-40 text-black">
                <div className="px-5 py-1 hover:bg-[#2f71cd] hover:text-white cursor-pointer flex items-center gap-2" onClick={createNewFile}>
                   <img src="https://win98icons.alexmeub.com/icons/png/notepad_file-0.png" className="w-4 h-4" /> Text Document
                </div>
             </div>
          </div>
          <div className="h-[1px] bg-gray-300 my-1 mx-2"></div>
          <div 
            className="px-5 py-1 hover:bg-[#2f71cd] hover:text-white cursor-pointer"
            onClick={() => useOSStore.getState().openWindow({ id: 'display-properties', title: 'Display Properties', componentName: 'DisplayProperties', metadata: { width: 400, height: 480 } })}
          >
            Properties
          </div>
        </div>
      )}

      {startMenuOpen && <StartMenu />}
      <Taskbar />

      {isIdle && (
         <div className="absolute inset-0 bg-black z-[99999] flex items-center justify-center cursor-none">
            <motion.div
               animate={{ x: ["-40vw", "40vw", "10vw", "-40vw"], y: ["-40vh", "30vh", "-30vh", "40vh"] }}
               transition={{ duration: 15, ease: "linear", repeat: Infinity, repeatType: "mirror" }}
               className="drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]"
            >
               <img src="https://upload.wikimedia.org/wikipedia/commons/e/e4/Windows_logo_-_2021.svg" className="w-40 h-auto opacity-75 animate-pulse" alt="Screensaver" />
            </motion.div>
         </div>
      )}

      {isShuttingDown && (
         <div className="absolute inset-0 z-[100000] flex items-center justify-center pointer-events-auto">
            {/* Dark Overlay with grayscale effect */}
            <div className="absolute inset-0 bg-black/40 backdrop-grayscale transition-all duration-1000 pointer-events-none"></div>
            
            {/* Classic Modal */}
            <div className="relative z-[10] w-[350px] bg-[#003399] flex flex-col font-tahoma text-white shadow-[2px_2px_15px_rgba(0,0,0,0.5)]">
               <div className="flex justify-between items-center p-2 border-b border-white/20">
                  <h2 className="text-xl font-bold tracking-wider">Turn off computer</h2>
                  <img src="https://win98icons.alexmeub.com/icons/png/windows_slanted-1.png" className="w-6 h-6 grayscale" />
               </div>
               
               <div className="p-6 flex justify-center gap-6 bg-gradient-to-b from-[#5c96ff] to-[#3a75d7] border-y-[2px] border-y-[#8bb6ff]">
                  
                  <div className="flex flex-col items-center gap-2 cursor-pointer group opacity-50" title="Stand By not available">
                     <div className="w-10 h-10 bg-yellow-400 rounded flex items-center justify-center border-[2px] border-white shadow-md group-hover:brightness-110">
                        <span className="text-black font-bold text-xl">⚡</span>
                     </div>
                     <span className="text-xs group-hover:underline">Stand By</span>
                  </div>

          <div className="flex flex-col items-center gap-2 cursor-pointer group" onClick={() => { playSound('shutdown'); setShuttingDown(false); setShutDown(true); }}>
                     <div className="w-10 h-10 bg-red-500 rounded flex items-center justify-center border-[2px] border-white shadow-md group-hover:brightness-110">
                        <span className="text-white font-bold text-xl">⏻</span>
                     </div>
                     <span className="text-xs group-hover:underline">Turn Off</span>
                  </div>

                  <div className="flex flex-col items-center gap-2 cursor-pointer group" onClick={() => { playSound('nav'); window.location.reload(); }}>
                     <div className="w-10 h-10 bg-green-500 rounded flex items-center justify-center border-[2px] border-white shadow-md group-hover:brightness-110">
                        <span className="text-white font-bold text-xl">↻</span>
                     </div>
                     <span className="text-xs group-hover:underline">Restart</span>
                  </div>

               </div>

               <div className="p-2 flex justify-end bg-[#003399]">
                  <button onClick={() => setShuttingDown(false)} className="px-3 py-1 bg-gray-200 text-black text-xs border border-white shadow-sm hover:bg-white active:bg-gray-300">Cancel</button>
               </div>
            </div>
         </div>
      )}

      {isShutDown && (
         <div className="absolute inset-0 z-[999999] flex flex-col cursor-none select-none bg-[#5a7edc] overflow-hidden">
            {/* Top Bar */}
            <div className="h-24 bg-[#00309b] w-full shrink-0 relative">
               <div className="absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-white via-orange-400 to-orange-500"></div>
            </div>
            
            {/* Middle Content */}
            <div className="flex-1 w-full flex items-center justify-center relative">
               <div className="flex items-center gap-8 translate-y-[-10px]">
                  <img src="https://win98icons.alexmeub.com/icons/png/windows_slanted-1.png" className="w-16 h-16 drop-shadow-md" alt="WinXP" />
                  <div className="flex flex-col">
                     <span className="text-white text-3xl font-tahoma italic font-bold drop-shadow-[2px_2px_2px_rgba(0,0,0,0.5)]">Windows XP</span>
                     <span className="text-white text-lg font-tahoma mt-4 drop-shadow-[1px_1px_1px_rgba(0,0,0,0.5)]">Windows is shutting down...</span>
                  </div>
               </div>
            </div>

            {/* Bottom Bar */}
            <div className="h-28 bg-[#00309b] w-full shrink-0 relative flex items-center justify-end pr-12">
               <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-orange-500 via-orange-400 to-white"></div>
               <button onClick={() => window.location.reload()} className="px-6 py-2 bg-[linear-gradient(to_bottom,#f2f2f2,#e5e5e5)] border-2 border-white border-r-[#888] border-b-[#888] hover:active:border-t-[#888] hover:active:border-l-[#888] hover:active:border-r-white hover:active:border-b-white text-black font-tahoma font-bold text-sm pointer-events-auto rounded-[3px] shadow-[inset_1px_1px_0px_#fff,inset_-1px_-1px_0px_#ccc]">
                  Restart System
               </button>
            </div>
         </div>
      )}

    </div>
  );
}
