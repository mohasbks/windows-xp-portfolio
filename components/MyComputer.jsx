"use client";
import { useState } from "react";
import useOSStore, { playSound } from "@/store/useOSStore";

export default function MyComputer() {
  const [currentPath, setCurrentPath] = useState("My Computer");

  const drives = [
    { title: "Local Disk (C:)", type: "hdd", path: "C:\\", size: "26.4 GB", icon: "https://win98icons.alexmeub.com/icons/png/drive_disk-1.png" },
    { title: "AI Models (D:)", type: "hdd", path: "D:\\", size: "128 GB", icon: "https://win98icons.alexmeub.com/icons/png/drive_disk-1.png" },
    { title: "CD Drive (E:) Windows XP", type: "cd", path: "E:\\", size: "0 bytes", icon: "https://win98icons.alexmeub.com/icons/png/drive_cd_empty-0.png" }
  ];

  const foldersD = [
    { name: "Fahd Bot.exe", type: "file", icon: "https://win98icons.alexmeub.com/icons/png/gears-0.png" },
    { name: "NLP Sentiment", type: "folder", icon: "https://win98icons.alexmeub.com/icons/png/directory_closed-0.png" },
    { name: "DeepFace CNN", type: "folder", icon: "https://win98icons.alexmeub.com/icons/png/directory_closed-0.png" },
  ];

  const foldersC = [
    { name: "WINDOWS", type: "folder", icon: "https://win98icons.alexmeub.com/icons/png/directory_closed-0.png" },
    { name: "Program Files", type: "folder", icon: "https://win98icons.alexmeub.com/icons/png/directory_closed-0.png" },
    { name: "System32 Core Skills", type: "folder", icon: "https://win98icons.alexmeub.com/icons/png/directory_open_file_mydocs-0.png" },
  ];

  const goBack = () => {
    playSound('nav');
    if (currentPath !== "My Computer") setCurrentPath("My Computer");
  };

  const openDrive = (path) => {
    playSound('nav');
    setCurrentPath(path);
  };

  return (
    <div className="flex flex-col h-full bg-white select-none font-tahoma text-[11px] text-black">
       {/* File Explorer Toolbar */}
       <div className="flex flex-col border-b border-gray-300 bg-[#ece9d8] shrink-0">
          <div className="flex items-center text-xs p-1 gap-4">
             <span className="hover:bg-blue-600 hover:text-white px-1 cursor-not-allowed">File</span>
             <span className="hover:bg-blue-600 hover:text-white px-1 cursor-not-allowed">Edit</span>
             <span className="hover:bg-blue-600 hover:text-white px-1 cursor-not-allowed">View</span>
             <span className="hover:bg-blue-600 hover:text-white px-1 cursor-not-allowed">Favorites</span>
             <span className="hover:bg-blue-600 hover:text-white px-1 cursor-not-allowed">Tools</span>
             <span className="hover:bg-blue-600 hover:text-white px-1 cursor-not-allowed">Help</span>
          </div>
          <div className="flex items-center gap-1 p-1 border-t border-b border-white border-b-gray-400">
             <button onClick={goBack} disabled={currentPath === "My Computer"} className="flex flex-col items-center justify-center p-1 rounded hover:border hover:border-gray-400 active:shadow-inner disabled:opacity-50 border border-transparent">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white mb-0.5">←</div>
                <span className="text-[10px]">Back</span>
             </button>
             <button className="flex flex-col items-center justify-center p-1 rounded hover:border hover:border-gray-400 active:shadow-inner disabled:opacity-50 border border-transparent pointer-events-none opacity-50">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white mb-0.5">→</div>
                <span className="text-[10px]">Forward</span>
             </button>
             <button onClick={goBack} className="flex flex-col items-center justify-center p-1 rounded hover:border hover:border-gray-400 active:shadow-inner border border-transparent ml-2">
                <img src="https://win98icons.alexmeub.com/icons/png/directory_up-0.png" className="w-5 h-5 mb-1" />
                <span className="text-[10px]">Up</span>
             </button>
             
             <div className="h-8 w-[1px] bg-gray-400 mx-2 shadow-[1px_0_0_white]"></div>
             
             <button className="flex flex-col items-center justify-center p-1 rounded hover:border hover:border-gray-400 active:shadow-inner border border-transparent">
                <img src="https://win98icons.alexmeub.com/icons/png/search_computer-0.png" className="w-5 h-5 mb-1" />
                <span className="text-[10px]">Search</span>
             </button>
             <button className="flex flex-col items-center justify-center p-1 rounded hover:border hover:border-gray-400 active:shadow-inner border border-transparent">
                <img src="https://win98icons.alexmeub.com/icons/png/directory_explorer-1.png" className="w-5 h-5 mb-1" />
                <span className="text-[10px]">Folders</span>
             </button>
          </div>
          <div className="flex items-center gap-2 p-1 border-b border-gray-400 bg-[#f6f6f6] shadow-inner">
             <span className="text-gray-500 ml-1">Address</span>
             <div className="flex-1 bg-white border border-blue-400 flex items-center h-5 px-1 shadow-inner overflow-hidden">
                <img src="https://win98icons.alexmeub.com/icons/png/computer_explorer-4.png" className="w-3 h-3 mr-1" />
                <span>{currentPath}</span>
             </div>
             <button className="flex items-center gap-1 bg-[#f0f0f0] border border-gray-400 px-2 h-5 rounded-sm shadow-sm hover:border-blue-500 mr-1 cursor-not-allowed">
                <img src="https://win98icons.alexmeub.com/icons/png/arrow_right-0.png" className="w-3 h-3" /> Go
             </button>
          </div>
       </div>

       {/* Explorer Body */}
       <div className="flex flex-1 overflow-hidden">
          {/* Left Panel */}
          <div className="w-48 bg-gradient-to-b from-[#7492ea] to-[#607dd4] p-3 shrink-0 overflow-y-auto border-r border-[#466ad5]">
             
             <div className="bg-white/10 rounded-t-sm border border-white/30 mb-4 overflow-hidden shadow-sm">
                <div className="bg-gradient-to-r from-blue-800 to-blue-700 text-white font-bold p-1 px-2 text-[10px] flex items-center justify-between">
                   System Tasks
                   <img src="https://win98icons.alexmeub.com/icons/png/arrow_up-0.png" className="w-3 h-3" />
                </div>
                <div className="p-2 flex flex-col gap-2">
                   <div className="flex items-center gap-1 text-blue-900 hover:text-blue-600 hover:underline cursor-pointer group">
                      <img src="https://win98icons.alexmeub.com/icons/png/info_bubble-0.png" className="w-4 h-4 grayscale group-hover:grayscale-0" /> View system information
                   </div>
                   <div className="flex items-center gap-1 text-blue-900 hover:text-blue-600 hover:underline cursor-pointer group">
                      <img src="https://win98icons.alexmeub.com/icons/png/computer_explorer-0.png" className="w-4 h-4 grayscale group-hover:grayscale-0" /> Change a setting
                   </div>
                </div>
             </div>
             
             <div className="bg-white/10 rounded-t-sm border border-white/30 overflow-hidden shadow-sm">
                <div className="bg-gradient-to-r from-blue-800 to-blue-700 text-white font-bold p-1 px-2 text-[10px] flex items-center justify-between">
                   Details
                   <img src="https://win98icons.alexmeub.com/icons/png/arrow_up-0.png" className="w-3 h-3" />
                </div>
                <div className="p-3">
                   <h3 className="font-bold text-black mb-1">{currentPath}</h3>
                   <span className="text-gray-700">System Folder</span>
                </div>
             </div>
             
          </div>

          {/* Right Content */}
          <div className="flex-1 bg-white p-3 overflow-y-auto">
             {currentPath === "My Computer" && (
                <>
                   <div className="font-bold border-b border-[#73a2fc] text-[#003399] pb-1 mb-3">Hard Disk Drives</div>
                   <div className="flex flex-wrap gap-6 mb-6">
                      {drives.filter(d => d.type === 'hdd').map(drive => (
                         <div key={drive.title} onDoubleClick={() => openDrive(drive.path)} className="flex items-center gap-2 cursor-pointer p-1 hover:bg-blue-100 border border-transparent hover:border-blue-400 group h-14 w-48">
                            <img src={drive.icon} className="w-10 h-10 group-active:brightness-90" />
                            <div className="flex flex-col">
                               <span>{drive.title}</span>
                               <span className="text-gray-500 font-mono text-[9px] mt-0.5">{drive.size}</span>
                            </div>
                         </div>
                      ))}
                   </div>
                   
                   <div className="font-bold border-b border-[#73a2fc] text-[#003399] pb-1 mb-3">Devices with Removable Storage</div>
                   <div className="flex flex-wrap gap-6 mb-6">
                      {drives.filter(d => d.type === 'cd').map(drive => (
                         <div key={drive.title} className="flex items-center gap-2 cursor-not-allowed p-1 hover:bg-blue-100 border border-transparent hover:border-blue-400 h-14 w-48 opacity-50">
                            <img src={drive.icon} className="w-10 h-10" />
                            <div className="flex flex-col">
                               <span>{drive.title}</span>
                               <span className="text-gray-500 font-mono text-[9px] mt-0.5">{drive.size}</span>
                            </div>
                         </div>
                      ))}
                   </div>
                </>
             )}

             {currentPath === "C:\\" && (
                <div className="flex flex-wrap gap-6 p-4">
                   {foldersC.map(f => (
                      <div key={f.name} className="flex flex-col items-center gap-1 cursor-pointer p-2 hover:bg-blue-100 border border-transparent hover:border-blue-400 group w-24 text-center">
                         <img src={f.icon} className="w-10 h-10 group-active:brightness-90" />
                         <span>{f.name}</span>
                      </div>
                   ))}
                </div>
             )}

             {currentPath === "D:\\" && (
                <div className="flex flex-wrap gap-6 p-4">
                   {foldersD.map(f => (
                      <div key={f.name} onClick={() => f.type === 'file' ? playSound('error') : null} className="flex flex-col items-center gap-1 cursor-pointer p-2 hover:bg-blue-100 border border-transparent hover:border-blue-400 group w-24 text-center">
                         <img src={f.icon} className="w-10 h-10 group-active:brightness-90" />
                         <span>{f.name}</span>
                      </div>
                   ))}
                </div>
             )}
          </div>
       </div>
    </div>
  );
}
