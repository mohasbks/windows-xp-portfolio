"use client";
import useOSStore, { playSound } from "@/store/useOSStore";
import { User, LogOut, Power } from "lucide-react";

export default function StartMenu() {
  const { closeStartMenu, openWindow } = useOSStore();

  const menuItems = [
    { id: 'projects', title: 'My Projects', icon: '📁', bg: 'InternetExplorer' },
    { id: 'about', title: 'My Identity', icon: '👤', bg: 'AboutMe' },
    { id: 'contact', title: 'Contact Me', icon: '📧', bg: 'ControlPanel' },
    { id: 'terminal', title: 'Command Prompt', icon: '💻', bg: 'Terminal' },
  ];

  const handleLaunch = (item) => {
    playSound('click');
    openWindow({ id: item.id, title: item.title, componentName: item.bg });
    closeStartMenu();
  };

  return (
    <div className="absolute bottom-10 left-0 w-[100vw] sm:w-[450px] bg-white border-2 border-[#003db3] shadow-[4px_4px_10px_rgba(0,0,0,0.5)] rounded-t-xl overflow-hidden flex flex-col z-[9999]" style={{ height: 480, maxHeight: 'calc(100vh - 40px)' }}>
      <div className="h-14 xp-window-gradient flex items-center px-1.5 text-white p-2 border-b-[2px] border-orange-400 shadow-[inset_0_1px_2px_rgba(255,255,255,0.4)]">
        <div className="w-[42px] h-[42px] bg-white border border-gray-300 rounded shadow-sm flex items-center justify-center mr-2 relative top-[-1px]">
          <User size={28} color="#0058e6"/>
        </div>
        <span className="font-bold text-lg drop-shadow-[1px_1px_2px_rgba(0,0,0,0.8)] font-tahoma tracking-[0.02em] italic">Al-Moatasem</span>
      </div>
      
      <div className="flex flex-1 bg-white min-h-[350px]">
        <div className="w-1/2 bg-white flex flex-col py-1 border-r border-[#95bcee]">
          {menuItems.map(item => (
            <div key={item.id} onClick={() => handleLaunch(item)} className="px-3 py-2 hover:bg-[#2f71cd] hover:text-white cursor-pointer flex items-center gap-3 text-sm font-tahoma transition-none group text-black">
              <span className="text-2xl drop-shadow-sm">{item.icon}</span>
              <span className="font-bold">{item.title}</span>
            </div>
          ))}
          <div className="mt-auto border-t border-[#d3e5fa] pt-2 pb-1 text-center font-bold text-xs text-black font-tahoma cursor-pointer hover:bg-[#2f71cd] hover:text-white">All Programs ▹</div>
        </div>
        <div className="w-1/2 bg-[#d3e5fa] py-2 flex flex-col gap-0.5 border-l border-white text-xs font-tahoma">
           <div className="px-3 py-1.5 text-black font-bold hover:bg-[#2f71cd] hover:text-white cursor-pointer flex gap-2" onClick={() => handleLaunch({id: 'my-documents', title: 'My Documents', bg: 'MyDocuments'})}>📁 My Documents</div>
           <div className="px-3 py-1.5 text-black font-bold hover:bg-[#2f71cd] hover:text-white cursor-pointer flex gap-2" onClick={() => handleLaunch({id: 'aboutme', title: 'About Me', bg: 'AboutMe'})}>⏱ My Recent Documents</div>
           <div className="px-3 py-1.5 text-black font-bold hover:bg-[#2f71cd] hover:text-white cursor-pointer flex gap-2 pb-2 border-b border-[#a8c6ee] mb-1" onClick={() => handleLaunch({id: 'my-computer', title: 'My Computer', bg: 'MyComputer'})}>💻 My Computer</div>
           
           <div className="px-3 py-1.5 text-black hover:bg-[#2f71cd] hover:text-white cursor-pointer" onClick={() => handleLaunch({id: 'control-panel', title: 'Control Panel', bg: 'ControlPanel'})}>Control Panel</div>
           <div className="px-3 py-1.5 text-black hover:bg-[#2f71cd] hover:text-white cursor-pointer pb-2 border-b border-[#a8c6ee] mb-1" onClick={() => handleLaunch({id: 'ie', title: 'Internet Explorer', bg: 'InternetExplorer'})}>Search</div>
           
           <div className="px-3 py-1.5 text-black hover:bg-[#2f71cd] hover:text-white cursor-pointer font-bold" onClick={() => handleLaunch({id: 'terminal', title: 'Command Prompt', bg: 'Terminal'})}>Run...</div>
        </div>
      </div>

      <div className="h-10 bg-gradient-to-br from-[#0058e6] to-[#408efb] border-t border-[#003db3] flex justify-end items-center px-4 gap-4 text-white text-xs font-tahoma shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)]">
         <div className="flex items-center gap-1 cursor-pointer hover:underline" onClick={() => { closeStartMenu(); useOSStore.getState().setShuttingDown(true); }}>
            <LogOut size={16} color="#ffd700" className="drop-shadow" /> Log Off
         </div>
         <div className="flex items-center gap-1 cursor-pointer hover:underline" onClick={() => { closeStartMenu(); useOSStore.getState().setShuttingDown(true); }}>
            <Power size={16} color="#ff3333" className="drop-shadow" /> Turn Off Computer
         </div>
      </div>
    </div>
  );
}
