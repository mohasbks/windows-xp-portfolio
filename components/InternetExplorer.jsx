"use client";
import { useState } from "react";
import { projects } from "@/data/projects";
import { playSound } from "@/store/useOSStore";

export default function InternetExplorer() {
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState("Al-Moatasem Github Projects");

  const handleSearch = () => {
    playSound('mouse');
    setIsSearching(true);
  };

  const goHome = () => {
    playSound('nav');
    setIsSearching(false);
    setSearchQuery("Hire Al-Moatasem");
  };

  return (
    <div className="flex flex-col h-full bg-white select-none font-tahoma text-[11px] text-black">
       {/* IE Toolbar */}
       <div className="flex flex-col border-b border-gray-300 bg-[#ece9d8] shrink-0">
          <div className="flex items-center text-xs p-1 gap-4">
             <span className="hover:bg-blue-600 hover:text-white px-1 cursor-pointer">File</span>
             <span className="hover:bg-blue-600 hover:text-white px-1 cursor-pointer">Edit</span>
             <span className="hover:bg-blue-600 hover:text-white px-1 cursor-pointer">View</span>
             <span className="hover:bg-blue-600 hover:text-white px-1 cursor-pointer">Favorites</span>
             <span className="hover:bg-blue-600 hover:text-white px-1 cursor-pointer">Tools</span>
             <span className="hover:bg-blue-600 hover:text-white px-1 cursor-pointer">Help</span>
          </div>
          <div className="flex items-center gap-1 p-1 border-t border-b border-white border-b-gray-400">
             <button onClick={goHome} disabled={!isSearching} className="flex flex-col items-center justify-center p-1 rounded hover:border hover:border-gray-400 active:shadow-inner disabled:opacity-50 border border-transparent">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white mb-0.5 font-bold">←</div>
                <span className="text-[10px]">Back</span>
             </button>
             <button className="flex flex-col items-center justify-center p-1 rounded hover:border hover:border-gray-400 active:shadow-inner disabled:opacity-50 border border-transparent opacity-50">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white mb-0.5 font-bold">→</div>
                <span className="text-[10px]">Forward</span>
             </button>
             <button disabled className="flex flex-col items-center justify-center p-1 rounded hover:border hover:border-gray-400 active:shadow-inner border border-transparent ml-2 opacity-50">
                <div className="w-6 h-6 rounded flex items-center justify-center text-red-500 font-bold mb-0.5 text-xl">✕</div>
                <span className="text-[10px]">Stop</span>
             </button>
             <button onClick={() => playSound('nav')} className="flex flex-col items-center justify-center p-1 rounded hover:border hover:border-gray-400 active:shadow-inner border border-transparent">
                <div className="w-6 h-6 rounded flex items-center justify-center text-blue-600 font-bold mb-0.5 text-2xl">⟳</div>
                <span className="text-[10px]">Refresh</span>
             </button>
             <button onClick={goHome} className="flex flex-col items-center justify-center p-1 rounded hover:border hover:border-gray-400 active:shadow-inner border border-transparent ml-2">
                <img src="https://win98icons.alexmeub.com/icons/png/mshtml_file-1.png" className="w-5 h-5 mb-1" />
                <span className="text-[10px]">Home</span>
             </button>
          </div>
          <div className="flex items-center gap-2 p-1 border-b border-gray-400 bg-[#f6f6f6] shadow-inner">
             <span className="text-gray-500 ml-1">Address</span>
             <div className="flex-1 bg-white border border-blue-400 flex items-center h-5 px-1 shadow-inner overflow-hidden">
                <img src="https://win98icons.alexmeub.com/icons/png/msie1-3.png" className="w-3 h-3 mr-1" />
                <span>{isSearching ? `http://www.google.com/search?q=${encodeURIComponent(searchQuery)}` : 'http://www.google.com'}</span>
             </div>
             <button onClick={handleSearch} className="flex items-center gap-1 bg-[#f0f0f0] border border-gray-400 px-2 h-5 rounded-sm shadow-sm hover:border-blue-500 mr-1 cursor-pointer">
                <img src="https://win98icons.alexmeub.com/icons/png/arrow_right-0.png" className="w-3 h-3" /> Go
             </button>
          </div>
       </div>

       {/* Browser Body */}
       <div className="flex-1 overflow-auto bg-white shadow-inner relative flex flex-col items-center">
           {!isSearching ? (
             <div className="flex flex-col items-center justify-center h-full gap-6 select-text w-full">
                <div className="text-5xl font-serif font-bold tracking-tight">
                   <span className="text-blue-600">G</span>
                   <span className="text-red-500">o</span>
                   <span className="text-yellow-500">o</span>
                   <span className="text-blue-600">g</span>
                   <span className="text-green-600">l</span>
                   <span className="text-red-500">e</span>
                </div>
                <div className="w-[400px] h-8 border border-gray-400 shadow-inner px-2 flex items-center cursor-text">
                   <input 
                     type="text" 
                     className="w-full text-base border-none outline-none text-black" 
                     value={searchQuery}
                     onChange={(e) => setSearchQuery(e.target.value)}
                     onKeyDown={(e) => { if(e.key === 'Enter') handleSearch(); }}
                   />
                </div>
                <div className="flex gap-2">
                    <button onClick={handleSearch} className="px-4 py-1.5 bg-[#f2f2f2] border border-gray-300 text-black hover:border-gray-500 rounded-sm">Google Search</button>
                    <button onClick={handleSearch} className="px-4 py-1.5 bg-[#f2f2f2] border border-gray-300 text-black hover:border-gray-500 rounded-sm">I'm Feeling Lucky</button>
                </div>
             </div>
           ) : (
             <div className="flex-1 w-full bg-white select-text">
                <div className="flex items-center gap-4 mb-4 pt-6 px-6">
                   <div className="text-3xl font-serif font-bold tracking-tight cursor-pointer" onClick={goHome}>
                      <span className="text-blue-600">G</span>
                      <span className="text-red-500">o</span>
                      <span className="text-yellow-500">o</span>
                      <span className="text-blue-600">g</span>
                      <span className="text-green-600">l</span>
                      <span className="text-red-500">e</span>
                   </div>
                   <div className="flex-1 max-w-xl flex gap-2">
                     <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} onKeyDown={(e) => { if(e.key === 'Enter') playSound('nav'); }} className="flex-1 text-sm px-2 py-1 border border-gray-400 shadow-inner outline-none font-tahoma text-black" />
                     <button onClick={() => playSound('nav')} className="px-4 py-1 bg-[#ece9d8] border border-gray-400 shadow-sm text-sm font-tahoma hover:bg-[#e0dfd6] text-black">Search</button>
                   </div>
                </div>
                
                <div className="mb-4 text-xs font-tahoma text-gray-600 border-b border-gray-200 pb-2 bg-blue-50/50 px-6 py-2">
                  Web Results 1 - {projects.length} of about {projects.length} for <strong>{searchQuery}</strong>. (0.13 seconds)
                </div>
                
                <div className="flex flex-col gap-6 font-tahoma px-6 pb-10">
                   {projects.map(p => (
                     <div key={p.id} className="flex flex-col">
                       <a href={p.url} target="_blank" rel="noreferrer" className="text-[#1a0dab] text-lg font-medium underline hover:bg-blue-50 w-fit">{p.title}</a>
                       <p className="text-sm text-black mt-1 max-w-2xl">{p.description}</p>
                       <span className="text-xs text-[#006621] mt-1">{p.url} - <span className="text-blue-600 underline cursor-pointer">Cached</span> - <span className="text-blue-600 underline cursor-pointer">Similar</span></span>
                     </div>
                   ))}
                </div>
             </div>
           )}
       </div>
       
       <div className="h-6 bg-[#ece9d8] border-t border-gray-300 shrink-0 flex items-center px-2 text-[10px] text-gray-600">
           Done
           <div className="ml-auto flex items-center gap-2">
              <img src="https://win98icons.alexmeub.com/icons/png/msie1-3.png" className="w-3 h-3" /> Internet
           </div>
       </div>
    </div>
  );
}
