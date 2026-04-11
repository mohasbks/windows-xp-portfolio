"use client";
import { useState } from "react";
import useOSStore, { playSound } from "@/store/useOSStore";

// The classic Windows XP Display Properties dialog
export default function DisplayProperties() {
  const wallpaper = useOSStore(state => state.wallpaper);
  const setWallpaper = useOSStore(state => state.setWallpaper);
  const closeWindow = useOSStore(state => state.closeWindow);
  
  const [activeTab, setActiveTab] = useState('Desktop');
  const [selectedWallpaper, setSelectedWallpaper] = useState(wallpaper || '/windows-xp-4089x2726-10769.jpg');

  const wallpapers = [
    { name: "(None)", src: "" },
    { name: "Bliss (Classic XP)", src: "/windows-xp-4089x2726-10769.jpg" },
    { name: "The Matrix Core", src: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=1920&h=1080" }, // Real matrix code
    { name: "Dark AI Cyberpunk", src: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1920&h=1080" },
    { name: "Deep Neural Blue", src: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=1920&h=1080" }
  ];

  const handleApply = () => {
    playSound('mouse');
    setWallpaper(selectedWallpaper);
  };

  const handleOk = () => {
    handleApply();
    closeWindow('display-properties');
  };

  const handleCancel = () => {
    playSound('mouse');
    closeWindow('display-properties');
  };

  return (
    <div className="flex flex-col h-full bg-[#ece9d8] select-none font-tahoma text-[11px] text-black">
       {/* Tabs Header */}
       <div className="flex px-2 pt-2 border-b border-white z-10 shrink-0">
          {['Themes', 'Desktop', 'Screen Saver', 'Appearance', 'Settings'].map(tab => (
             <div 
               key={tab}
               onClick={() => { playSound('nav'); setActiveTab(tab); }}
               className={`px-3 py-1 -mb-[1px] border-t border-l border-r border-[#ffffff] rounded-t-[3px] cursor-pointer 
                 ${activeTab === tab 
                   ? 'bg-[#ece9d8] z-20 relative border-b-[#ece9d8] shadow-[-1px_-1px_2px_rgba(0,0,0,0.1)] pb-1.5' 
                   : 'bg-[#f0f0ea] text-gray-600 border-b-gray-400 border-r-gray-400 mt-0.5'}`}
             >
                {tab}
             </div>
          ))}
       </div>

       {/* Tab Content */}
       <div className="flex-1 border-t border-white border-l border-r border-b border-r-gray-500 border-b-gray-500 bg-[#ece9d8] p-3 flex flex-col relative z-0 m-2 mt-0">
          {activeTab === 'Desktop' && (
             <div className="flex flex-col h-full animate-in fade-in duration-200">
                {/* Preview Monitor */}
                <div className="flex justify-center mb-4 pt-2">
                   <div className="w-40 h-32 bg-gray-300 border-[3px] border-gray-100 rounded-lg shadow-md relative flex flex-col items-center border-b-gray-400 border-r-gray-400">
                      <div className="w-[140px] h-[100px] bg-blue-600 mt-[5px] rounded-[2px] overflow-hidden relative shadow-inner border border-gray-600">
                         {selectedWallpaper ? (
                            <img src={selectedWallpaper} className="w-full h-full object-cover" />
                         ) : (
                            <div className="w-full h-full bg-[#3a6ea5]"></div>
                         )}
                         {/* Mini Taskbar inside preview */}
                         <div className="absolute bottom-0 w-full h-[6px] bg-blue-800 border-t border-blue-400"></div>
                      </div>
                      <div className="w-12 h-1 bg-green-500 rounded mt-[6px] shadow-[inset_0_-1px_1px_rgba(0,0,0,0.5)]"></div>
                   </div>
                </div>

                <div className="flex items-end gap-2 text-[11px]">
                   <div className="flex-1 flex flex-col">
                      <label className="mb-1 text-black">Background:</label>
                      <div className="bg-white border border-gray-500 h-28 overflow-y-auto w-full shadow-inner">
                         {wallpapers.map(wp => (
                            <div 
                              key={wp.name} 
                              onClick={() => setSelectedWallpaper(wp.src)}
                              className={`px-1 py-0.5 cursor-pointer flex items-center gap-1 ${selectedWallpaper === wp.src ? 'bg-[#316ac5] text-white' : 'hover:bg-blue-100'}`}
                            >
                               <img src="https://win98icons.alexmeub.com/icons/png/image_file-0.png" className="w-3 h-3" />
                               {wp.name}
                            </div>
                         ))}
                      </div>
                   </div>
                   
                   <div className="flex flex-col gap-1">
                      <button className="w-20 px-1 py-1 bg-[#f0f0f0] border border-gray-400 rounded-sm shadow-sm active:shadow-inner text-gray-500 cursor-not-allowed">Browse...</button>
                      
                      <div className="mt-2 flex flex-col">
                         <label className="mb-1 text-black">Position:</label>
                         <select className="w-20 border border-gray-400 px-1 py-0.5 bg-white shadow-inner appearance-none cursor-pointer">
                            <option>Stretch</option>
                            <option>Center</option>
                            <option>Tile</option>
                         </select>
                      </div>
                   </div>
                </div>
             </div>
          )}

          {activeTab === 'Themes' && (
             <div className="flex flex-col h-full gap-4 pt-2 animate-in fade-in duration-200">
                <div className="flex flex-col">
                    <label className="mb-1 text-black">Theme:</label>
                    <select className="border border-gray-400 px-1 py-1 bg-white shadow-inner cursor-pointer w-full text-black">
                       <option>Windows XP</option>
                       <option>Windows Classic</option>
                       <option>More themes online...</option>
                    </select>
                </div>
                <div className="flex-1 border border-gray-400 shadow-inner bg-white flex flex-col items-center justify-center p-2 text-center text-gray-500">
                   <img src="https://win98icons.alexmeub.com/icons/png/themes-0.png" className="w-10 h-10 blur-[1px] opacity-50 mb-2" />
                   <span>Theme preview is currently unavailable.<br/>Please select a theme from the dropdown.</span>
                </div>
             </div>
          )}

          {activeTab === 'Screen Saver' && (
             <div className="flex flex-col h-full gap-2 pt-2 animate-in fade-in duration-200">
                <div className="flex justify-center mb-2">
                   <div className="w-40 h-32 bg-gray-300 border-[3px] border-gray-100 rounded-lg shadow-md relative flex flex-col items-center border-b-gray-400 border-r-gray-400">
                      <div className="w-[140px] h-[100px] bg-black mt-[5px] rounded-[2px] overflow-hidden relative shadow-inner border border-gray-600 flex items-center justify-center">
                         <span className="text-white font-tahoma font-bold italic text-[9px] animate-bounce">Windows XP</span>
                      </div>
                   </div>
                </div>
                <div className="flex flex-col border border-gray-400 p-2 rounded relative mt-2 text-black">
                    <span className="absolute -top-2 left-2 bg-[#ece9d8] px-1 text-blue-800 font-bold">Screen saver</span>
                    <div className="flex items-center gap-2 mt-1 w-full text-black">
                       <select className="border border-gray-400 px-1 py-1 bg-white shadow-inner flex-1 cursor-pointer">
                          <option>Blank</option>
                          <option>Windows XP</option>
                          <option>3D Text</option>
                          <option>(None)</option>
                       </select>
                       <button className="px-2 py-0.5 bg-[#f0f0f0] border border-gray-400 rounded-sm shadow-sm text-gray-500 cursor-not-allowed">Settings</button>
                       <button className="px-2 py-0.5 bg-[#f0f0f0] border border-gray-400 rounded-sm shadow-sm text-black hover:border-blue-500">Preview</button>
                    </div>
                    <div className="flex items-center gap-2 mt-4 text-black text-xs">
                       <span>Wait:</span>
                       <input type="number" defaultValue="10" className="w-10 px-1 border border-gray-400 shadow-inner" min="1" max="99" />
                       <span>minutes</span>
                       <div className="flex items-center gap-1 ml-4 text-gray-500">
                          <input type="checkbox" disabled />
                          <span>On resume, password protect</span>
                       </div>
                    </div>
                </div>
             </div>
          )}

          {activeTab === 'Appearance' && (
             <div className="flex flex-col h-full gap-2 pt-2 animate-in fade-in duration-200">
                <div className="flex-1 bg-gray-100 border border-gray-400 rounded p-2 flex flex-col gap-2 relative pointer-events-none select-none">
                    {/* Fake Window Preview */}
                    <div className="bg-[#003399] rounded-t-[4px] border border-[#003399] p-1 flex items-center justify-between shadow-sm bg-gradient-to-r from-blue-700 to-blue-500">
                        <span className="text-white font-bold ml-1 drop-shadow-sm">Active Window</span>
                        <div className="flex gap-0.5">
                           <span className="bg-[#003399] border border-white text-white w-4 h-4 rounded-sm flex items-center justify-center font-bold text-[8px]">_</span>
                           <span className="bg-[#003399] border border-white text-white w-4 h-4 rounded-sm flex items-center justify-center font-bold text-[8px]">□</span>
                           <span className="bg-red-500 text-white w-4 h-4 rounded-sm flex items-center justify-center font-bold text-[8px] shadow-sm">×</span>
                        </div>
                    </div>
                    <div className="bg-[#ece9d8] flex-1 border border-x-blue-800 border-b-blue-800 border-t-0 p-2 shadow-inner">
                        <p className="text-black mb-2">Window Text</p>
                        <button className="px-3 py-1 bg-[#f0f0f0] border border-gray-400 rounded-sm shadow-sm text-black">OK</button>
                    </div>
                </div>
                
                <div className="flex flex-col text-black mt-1">
                   <label>Windows and buttons:</label>
                   <select className="border border-gray-400 px-1 py-1 bg-white shadow-inner mb-2 cursor-pointer"><option>Windows XP style</option><option>Windows Classic style</option></select>
                   <label>Color scheme:</label>
                   <select className="border border-gray-400 px-1 py-1 bg-white shadow-inner mb-2 cursor-pointer"><option>Default (blue)</option><option>Olive Green</option><option>Silver</option></select>
                   <label>Font size:</label>
                   <select className="border border-gray-400 px-1 py-1 bg-white shadow-inner cursor-pointer"><option>Normal</option><option>Large Fonts</option><option>Extra Large Fonts</option></select>
                </div>
             </div>
          )}

          {activeTab === 'Settings' && (
             <div className="flex flex-col h-full gap-4 pt-2 text-black animate-in fade-in duration-200">
                <div className="flex justify-center mb-2">
                   <div className="w-40 h-32 bg-gray-300 border-[3px] border-gray-100 rounded-lg shadow-md relative flex flex-col items-center border-b-gray-400 border-r-gray-400">
                      <div className="w-[140px] h-[100px] bg-blue-600 mt-[5px] rounded-[2px] overflow-hidden relative shadow-inner border border-gray-600 flex items-center justify-center text-center p-2">
                         <span className="text-white text-6xl font-bold opacity-30 drop-shadow-md">1</span>
                      </div>
                      <div className="w-12 h-1 bg-green-500 rounded mt-[6px] shadow-[inset_0_-1px_1px_rgba(0,0,0,0.5)]"></div>
                   </div>
                </div>
                <div className="flex items-center justify-between bg-[#ece9d8] text-black">
                  <div className="flex flex-col flex-1 border border-gray-400 p-2 rounded relative mr-2 mt-4">
                     <span className="absolute -top-2 left-2 bg-[#ece9d8] px-1 text-blue-800 font-bold">Screen resolution</span>
                     <div className="flex items-center mt-3 mb-1 cursor-not-allowed">
                        <span className="text-[10px]">Less</span>
                        <input type="range" className="flex-1 mx-2" defaultValue="50" min="0" max="100"/>
                        <span className="text-[10px]">More</span>
                     </div>
                     <p className="text-center font-bold">1024 by 768 pixels</p>
                  </div>
                  <div className="flex flex-col flex-1 border border-gray-400 p-2 rounded relative mt-4">
                     <span className="absolute -top-2 left-2 bg-[#ece9d8] px-1 text-blue-800 font-bold">Color quality</span>
                     <select className="border border-gray-400 px-1 py-1 bg-white shadow-inner mt-2 cursor-pointer">
                        <option>Highest (32 bit)</option>
                        <option>Medium (16 bit)</option>
                     </select>
                     <p className="text-center mt-2 opacity-0">spacer</p>
                  </div>
                </div>
             </div>
          )}
       </div>

       {/* Bottom Buttons */}
       <div className="flex justify-end gap-2 px-2 pb-2 shrink-0">
          <button onClick={handleOk} className="w-16 px-1 py-1 bg-[#f0f0f0] border border-gray-400 rounded-sm shadow-sm active:border-black active:shadow-inner hover:border-blue-500 focus:outline focus:outline-1 focus:outline-black">OK</button>
          <button onClick={handleCancel} className="w-16 px-1 py-1 bg-[#f0f0f0] border border-gray-400 rounded-sm shadow-sm active:border-black active:shadow-inner">Cancel</button>
          <button onClick={handleApply} disabled={selectedWallpaper === wallpaper} className="w-16 px-1 py-1 bg-[#f0f0f0] border border-gray-400 rounded-sm shadow-sm active:border-black active:shadow-inner disabled:text-gray-500 disabled:active:border-gray-400">Apply</button>
       </div>
    </div>
  );
}
