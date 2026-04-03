"use client";
import { motion, useDragControls } from "framer-motion";
import { X, Minus, Square } from "lucide-react";
import useOSStore, { playSound } from "@/store/useOSStore";
import Terminal from "./Terminal";
import Minesweeper from "./Minesweeper";
import Messenger from "./Messenger";
import MediaPlayer from "./MediaPlayer";
import AboutMe from "./AboutMe";
import Calculator from "./Calculator";
import Solitaire from "./Solitaire";
import { projects } from "@/data/projects";
import { useState, useRef, useEffect } from "react";

const MSPaint = () => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState("#000000");

  const startDrawing = (e) => {
    const { offsetX, offsetY } = e.nativeEvent;
    const ctx = canvasRef.current.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = e.nativeEvent;
    const ctx = canvasRef.current.getContext("2d");
    ctx.lineTo(offsetX, offsetY);
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.stroke();
  };

  const stopDrawing = () => {
    if(!isDrawing) return;
    const ctx = canvasRef.current.getContext("2d");
    ctx.closePath();
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if(!canvas) return;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  useEffect(() => {
    clearCanvas();
  }, []);

  return (
    <div className="flex flex-col h-full bg-[#ece9d8] select-none">
       {/* Paint Toolbar */}
       <div className="flex items-center gap-2 p-1 bg-[#ece9d8] border-b border-gray-400 shadow-[0_1px_2px_rgba(0,0,0,0.1)] shrink-0">
          <div className="flex gap-1 justify-between flex-1 pr-4">
             <div className="flex gap-2">
                 <button className="px-2 py-0.5 border border-transparent hover:border-blue-300 hover:bg-blue-100/50 text-xs text-black" onClick={clearCanvas}>Clear Image</button>
             </div>
             <div className="flex gap-1 items-center bg-white p-1 border border-gray-400 shadow-inner">
                 {["#000000", "#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#800080", "#FFA500"].map(c => (
                    <div key={c} onClick={() => setColor(c)} className={`w-4 h-4 cursor-pointer border ${color === c ? 'border-2 border-black scale-110' : 'border-gray-300'}`} style={{ backgroundColor: c }}></div>
                 ))}
             </div>
          </div>
       </div>
       <div className="flex-1 bg-gray-400 p-2 overflow-auto flex items-start justify-start w-full cursor-crosshair shadow-inner h-full border-t border-gray-500">
         <canvas 
            ref={canvasRef}
            width={750}
            height={500}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            className="bg-white border border-gray-600 shadow-md"
         ></canvas>
       </div>
    </div>
  );
};

const InternetExplorer = () => {
  return (
    <div className="flex flex-col h-full bg-white select-text">
      <div className="bg-[#ece9d8] border-b border-gray-400 p-1 flex flex-col gap-1 shrink-0">
        <div className="flex items-center gap-1 border-b border-gray-300 pb-1">
          <span className="text-xs text-gray-600 px-2 cursor-pointer hover:bg-blue-600 hover:text-white">File</span>
          <span className="text-xs text-gray-600 px-2 cursor-pointer hover:bg-blue-600 hover:text-white">Edit</span>
          <span className="text-xs text-gray-600 px-2 cursor-pointer hover:bg-blue-600 hover:text-white">View</span>
          <span className="text-xs text-gray-600 px-2 cursor-pointer hover:bg-blue-600 hover:text-white">Favorites</span>
          <span className="text-xs text-gray-600 px-2 cursor-pointer hover:bg-blue-600 hover:text-white">Tools</span>
          <span className="text-xs text-gray-600 px-2 cursor-pointer hover:bg-blue-600 hover:text-white">Help</span>
        </div>
        <div className="flex items-center gap-2 px-2 py-1">
           <div className="flex gap-1">
             <button className="w-8 h-8 rounded-full hover:bg-black/5 flex items-center justify-center text-gray-400" disabled><strong className="text-xl leading-none font-bold">←</strong></button>
             <button className="w-8 h-8 rounded-full hover:bg-black/5 flex items-center justify-center text-gray-400" disabled><strong className="text-xl leading-none font-bold">→</strong></button>
           </div>
           <div className="flex-1 flex items-center gap-2">
             <span className="text-xs text-gray-600">Address</span>
             <input type="text" readOnly value="http://www.google.com/search?q=Al-Moatasem+Github+Projects" className="flex-1 text-xs px-2 py-1 border border-gray-400 bg-white shadow-[inset_1px_1px_3px_rgba(0,0,0,0.1)] outline-none text-blue-800 font-tahoma" />
           </div>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-6 flex flex-col cursor-auto">
        <div className="flex items-center gap-4 mb-8">
           <h1 className="text-4xl font-serif text-blue-600"><span className="text-blue-600">G</span><span className="text-red-600">o</span><span className="text-yellow-500">o</span><span className="text-blue-600">g</span><span className="text-green-600">l</span><span className="text-red-600">e</span></h1>
           <div className="flex-1 max-w-xl flex gap-2">
             <input type="text" readOnly value="Al-Moatasem Github Projects" className="flex-1 text-sm px-2 py-1 border border-gray-400 shadow-inner outline-none font-tahoma" />
             <button className="px-4 py-1 bg-[#ece9d8] border border-gray-400 shadow-sm text-sm font-tahoma hover:bg-[#e0dfd6]">Search</button>
           </div>
        </div>
        
        <div className="mb-4 text-xs font-tahoma text-gray-600 border-b border-gray-200 pb-2 bg-blue-50/50 px-2 py-2">
          Web Results 1 - 8 of about 8 for <strong>Al-Moatasem Github Projects</strong>. (0.13 seconds)
        </div>
        
        <div className="flex flex-col gap-6 font-tahoma px-2 pb-10">
           {projects.map(p => (
             <div key={p.id} className="flex flex-col">
               <a href={p.url} target="_blank" rel="noreferrer" className="text-[#1a0dab] text-lg font-medium underline hover:bg-blue-50 w-fit">{p.title}</a>
               <p className="text-sm text-black mt-1">{p.description}</p>
               <span className="text-xs text-[#006621] mt-1">{p.url} - <span className="text-blue-600 underline cursor-pointer">Cached</span> - <span className="text-blue-600 underline cursor-pointer">Similar</span></span>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
};

const Notepad = ({ metadata }) => {
  const [content, setContent] = useState(metadata?.content ?? `AL-MOATASEM BELLAH\n==================\n\nAI Student | Full-Stack Developer | Innovator\n\nI am an ambitious AI student at the Egyptian Russian University, deeply passionate about merging Artificial Intelligence, Web Development, and Automation. As the founder of the "Rowad" freelance platform, I focus on crafting scalable, intelligent solutions for the modern web.\n\nCore Skills:\n- Web Engineering: Next.js, React, Tailwind, Vue.js, Node.js\n- Artificial Intelligence: NLP, Computer Vision, GANs, PyTorch\n- Automation: Web Scraping, WhatsApp Bots, Algorithmic Trading Systems\n\n/* \nP.S. This is an authentic Windows XP notepad clone! \nYou can actually type and edit this text freely.\n*/`);

  const handleSave = () => {
    if (!metadata?.fileId) return alert('Cannot save a read-only document.');
    const saved = localStorage.getItem('xp_desktop_files');
    if (saved) {
      const files = JSON.parse(saved);
      const updated = files.map(f => f.metadata.fileId === metadata.fileId ? { ...f, metadata: { ...f.metadata, content } } : f);
      localStorage.setItem('xp_desktop_files', JSON.stringify(updated));
    }
  };

  return (
    <div className="flex flex-col h-full bg-white font-tahoma select-text">
      <div className="bg-[#ece9d8] border-b border-gray-300 shadow-[0_1px_2px_rgba(0,0,0,0.1)] p-1 flex items-center gap-1 shrink-0">
            <span className="text-[11px] text-black px-2 py-0.5 hover:bg-blue-500 hover:text-white cursor-pointer select-none" onClick={handleSave}>File (Click to Save)</span>
            <span className="text-[11px] text-black px-2 py-0.5 hover:bg-blue-500 hover:text-white cursor-pointer select-none">Edit</span>
            <span className="text-[11px] text-black px-2 py-0.5 hover:bg-blue-500 hover:text-white cursor-pointer select-none">Format</span>
            <span className="text-[11px] text-black px-2 py-0.5 hover:bg-blue-500 hover:text-white cursor-pointer select-none">View</span>
            <span className="text-[11px] text-black px-2 py-0.5 hover:bg-blue-500 hover:text-white cursor-pointer select-none">Help</span>
      </div>
      <textarea 
        className="flex-1 w-full p-2 outline-none resize-none font-mono text-sm leading-relaxed whitespace-pre" 
        style={{ color: '#000000', backgroundColor: '#ffffff' }}
        spellCheck={false}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onKeyDown={(e) => { 
          if(e.ctrlKey && e.key === 's') { e.preventDefault(); handleSave(); }
          if(!e.repeat) playSound('type'); 
        }}
      />
    </div>
  );
};

const MyDocuments = () => (
  <div className="flex h-full bg-white select-text font-tahoma">
    <div className="w-52 bg-gradient-to-b from-[#7498d9] to-[#5984d4] border-r border-[#3a6bc4] p-3 flex flex-col gap-4 overflow-y-auto shrink-0">
      <div className="bg-white/10 rounded border border-white/20 p-2 shadow-sm">
        <h3 className="font-bold text-[#0c327d] text-xs mb-2">File and Folder Tasks</h3>
        <div className="flex items-center gap-2 text-[11px] text-[#0c327d] hover:underline cursor-pointer mb-2"><span className="text-blue-900 bg-white/50 px-1 rounded">📄</span> Rename this file</div>
        <div className="flex items-center gap-2 text-[11px] text-[#0c327d] hover:underline cursor-pointer mb-2"><span className="text-blue-900 bg-white/50 px-1 rounded">✂️</span> Move this file</div>
        <div className="flex items-center gap-2 text-[11px] text-[#0c327d] hover:underline cursor-pointer"><span className="text-blue-900 bg-white/50 px-1 rounded">🗑</span> Delete this file</div>
      </div>
    </div>
    <div className="flex-1 p-6 bg-white overflow-y-auto flex items-start gap-4">
       <a href="/resume.pdf" download="Al-Moatasem_Resume.pdf" className="flex flex-col items-center gap-2 p-2 hover:bg-blue-100 hover:border-blue-300 border border-transparent rounded cursor-pointer group active:bg-blue-200">
         <img src="https://upload.wikimedia.org/wikipedia/commons/8/87/PDF_file_icon.svg" alt="PDF" className="w-16 h-16 drop-shadow-md" />
         <span className="text-xs font-tahoma text-black text-center max-w-[120px] break-words group-hover:underline">Al-Moatasem_Resume.pdf</span>
       </a>
    </div>
  </div>
);

const ControlPanel = () => (
  <div className="flex flex-col h-full bg-white select-text font-tahoma">
    <div className="bg-[#ece9d8] border-b border-gray-300 p-4 shadow-sm flex items-center justify-between shrink-0">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-white rounded border border-blue-300 flex items-center justify-center drop-shadow-sm shadow-inner">
           <img src="https://win98icons.alexmeub.com/icons/png/directory_control_panel-0.png" alt="Control Panel" className="w-8 h-8" />
        </div>
        <div>
           <h2 className="text-xl font-normal text-black tracking-wide">Control Panel</h2>
           <p className="text-xs text-gray-500">Contact Information and Network Links</p>
        </div>
      </div>
    </div>
    <div className="flex-1 bg-white overflow-y-auto p-8">
      <div className="grid grid-cols-2 gap-8">
        
        {/* LinkedIn */}
        <a href="https://www.linkedin.com/in/almotasembellahawwad" target="_blank" className="flex items-start gap-4 p-4 hover:bg-blue-50 border border-transparent hover:border-blue-200 rounded cursor-pointer transition-colors group">
          <img src="https://win98icons.alexmeub.com/icons/png/network_internet_pcs_installer-2.png" alt="LinkedIn" className="w-10 h-10" />
          <div>
             <h3 className="text-blue-800 font-bold group-hover:underline text-sm">LinkedIn Network</h3>
             <p className="text-[11px] text-black mt-1">Connect professionally on LinkedIn.</p>
          </div>
        </a>

        {/* Instagram */}
        <a href="https://www.instagram.com/almotasembellahawwad/" target="_blank" className="flex items-start gap-4 p-4 hover:bg-blue-50 border border-transparent hover:border-blue-200 rounded cursor-pointer transition-colors group">
          <img src="https://win98icons.alexmeub.com/icons/png/camera3-1.png" alt="Instagram" className="w-10 h-10" />
          <div>
             <h3 className="text-blue-800 font-bold group-hover:underline text-sm">Instagram Gallery</h3>
             <p className="text-[11px] text-black mt-1">View personal pictures and updates.</p>
          </div>
        </a>

        {/* WhatsApp */}
        <a href="https://wa.me/+201554637079" target="_blank" className="flex items-start gap-4 p-4 hover:bg-blue-50 border border-transparent hover:border-blue-200 rounded cursor-pointer transition-colors group">
          <img src="https://win98icons.alexmeub.com/icons/png/modem-1.png" alt="WhatsApp" className="w-10 h-10" />
          <div>
             <h3 className="text-blue-800 font-bold group-hover:underline text-sm">WhatsApp Dial-Up</h3>
             <p className="text-[11px] text-black mt-1">Establish a direct synchronous chat.</p>
          </div>
        </a>

        {/* Action: Email */}
        <a href="mailto:almotasembellahawwad@gmail.com" className="flex items-start gap-4 p-4 hover:bg-blue-50 border border-transparent hover:border-blue-200 rounded cursor-pointer transition-colors group">
          <img src="https://win98icons.alexmeub.com/icons/png/envelope_closed-0.png" alt="Mail" className="w-10 h-10" />
          <div>
             <h3 className="text-blue-800 font-bold group-hover:underline text-sm">Electronic Mail Settings</h3>
             <p className="text-[11px] text-black mt-1">Send a direct message via email.</p>
          </div>
        </a>

      </div>
    </div>
  </div>
);

const MyComputer = () => (
  <div className="flex h-full bg-white select-text font-tahoma">
    <div className="w-52 bg-gradient-to-b from-[#7498d9] to-[#5984d4] border-r border-[#3a6bc4] p-3 flex flex-col gap-4 overflow-y-auto shrink-0">
      <div className="bg-white/10 rounded border border-white/20 p-2 shadow-sm">
        <h3 className="font-bold text-[#0c327d] text-xs mb-2">System Tasks</h3>
        <div className="flex items-center gap-2 text-[11px] text-[#0c327d] hover:underline cursor-pointer mb-2"><span className="text-blue-900 bg-white/50 px-1 rounded">🔍</span> View system info</div>
        <div className="flex items-center gap-2 text-[11px] text-[#0c327d] hover:underline cursor-pointer"><span className="text-blue-900 bg-white/50 px-1 rounded">💻</span> Add/remove programs</div>
      </div>
    </div>
    <div className="flex-1 p-6 bg-white overflow-y-auto flex flex-col gap-6">
       <div>
         <h2 className="font-bold text-gray-800 border-b border-blue-200 pb-1 mb-4 flex items-center gap-2 text-xs"><span className="text-[10px] bg-blue-100/50 text-blue-900 px-1 border border-blue-200 rounded-sm">^</span> Hard Disk Drives</h2>
         <div className="flex gap-4">
           <div className="flex items-center gap-3 w-64 p-2 hover:bg-blue-50 border border-transparent hover:border-blue-200 cursor-pointer rounded">
             {/* Fixed Disk Drive Icon */}
             <div className="w-12 h-12 bg-gray-200 border-2 border-gray-400 rounded-sm shadow-md flex flex-col items-center justify-center p-1 relative">
                <div className="w-full h-1/2 bg-gray-300 border-b border-gray-400 flex items-center justify-between px-1">
                   <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                   <div className="w-3 h-1 bg-gray-400"></div>
                </div>
                <div className="text-[6px] font-bold text-gray-500 absolute bottom-1 right-1">HDD</div>
             </div>
             
             <div className="flex-1">
               <div className="text-xs text-black font-semibold">Local Disk (C:)</div>
               <div className="w-full h-3 bg-[#ece9d8] rounded-sm mt-1 border border-gray-400 overflow-hidden outline outline-1 outline-white shadow-inner"><div className="h-full bg-blue-600 w-[85%]"></div></div>
               <div className="text-[10px] text-gray-500 mt-1">2.14 GB free of 10.4 GB</div>
             </div>
           </div>
         </div>
       </div>

       <div>
         <h2 className="font-bold text-gray-800 border-b border-blue-200 pb-1 mb-4 flex items-center gap-2 text-xs"><span className="text-[10px] bg-blue-100/50 text-blue-900 px-1 border border-blue-200 rounded-sm">^</span> Devices with Removable Storage</h2>
         <div className="flex gap-4">
           <div className="flex items-center gap-3 w-64 p-2 hover:bg-blue-50 border border-transparent hover:border-blue-200 cursor-pointer rounded">
             {/* Built CD Drive visually since external link failed */}
             <div className="w-12 h-12 bg-gray-300 border border-gray-400 rounded shadow-sm flex items-center justify-center relative">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-gray-200 to-gray-400 shadow-inner flex items-center justify-center border border-gray-300">
                   <div className="w-2 h-2 rounded-full bg-white border border-gray-400 shadow-inner"></div>
                </div>
             </div>
             <div className="flex-1">
               <div className="text-xs text-black font-semibold">CD Drive (D:)</div>
             </div>
           </div>
         </div>
       </div>
    </div>
  </div>
);

const DateTimeProperties = () => {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  
  return (
    <div className="flex flex-col h-full bg-[#ece9d8] select-none font-tahoma p-3">
      <div className="bg-white border border-gray-400 p-4 shadow-inner flex gap-6">
        {/* Calendar Side */}
        <div className="flex-1 flex flex-col items-center">
           <div className="text-sm font-bold text-black mb-2">{now.toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}</div>
           <div className="grid grid-cols-7 gap-1 text-center w-full">
             {['S','M','T','W','T','F','S'].map(d=><div key={d} className="text-xs font-bold text-gray-600 border-b border-gray-400 pb-1">{d}</div>)}
             {Array.from({length: 31}).map((_, i) => (
                <div key={i} className={`text-xs p-1 ${i + 1 === now.getDate() ? 'bg-blue-600 text-white rounded-full font-bold' : 'text-black'}`}>
                  {i + 1}
                </div>
             ))}
           </div>
        </div>
        
        {/* Clock Side */}
        <div className="flex-1 flex flex-col items-center justify-center border-l border-gray-300 pl-6">
           <div className="relative w-32 h-32 rounded-full border-[4px] border-gray-400 bg-white shadow-inner flex items-center justify-center mb-4">
              {/* Simple Analog Clock */}
              <div className="absolute w-1 h-14 bg-black origin-bottom bottom-1/2 transform rotate-[calc(30deg*10)]" style={{ transform: `rotate(${now.getHours() * 30 + now.getMinutes() * 0.5}deg)` }}></div>
              <div className="absolute w-1 h-16 bg-black origin-bottom bottom-1/2 transform rotate-[calc(6deg*15)]" style={{ transform: `rotate(${now.getMinutes() * 6}deg)` }}></div>
              <div className="absolute w-[2px] h-16 bg-red-500 origin-bottom bottom-1/2 transform rotate-[calc(6deg*45)]" style={{ transform: `rotate(${now.getSeconds() * 6}deg)` }}></div>
              <div className="absolute w-2 h-2 rounded-full bg-black"></div>
           </div>
           <div className="text-xl font-mono text-black font-bold border border-gray-400 px-3 py-1 bg-white shadow-inner">
             {now.toLocaleTimeString([], { hour12: true, hour: '2-digit', minute: '2-digit', second: '2-digit' })}
           </div>
        </div>
      </div>
      <div className="mt-auto flex justify-end gap-2 pt-4">
        <button className="px-6 py-1 bg-[#ece9d8] border border-gray-500 shadow-[1px_1px_2px_rgba(0,0,0,0.2)] text-black text-sm active:bg-gray-300 active:shadow-inner" onClick={() => useOSStore.getState().closeWindow('datetime')}>OK</button>
        <button className="px-6 py-1 bg-[#ece9d8] border border-gray-500 shadow-[1px_1px_2px_rgba(0,0,0,0.2)] text-black text-sm active:bg-gray-300 active:shadow-inner" onClick={() => useOSStore.getState().closeWindow('datetime')}>Cancel</button>
      </div>
    </div>
  );
};

const contentMap = {
  Terminal,
  InternetExplorer,
  MyDocuments,
  Notepad,
  ControlPanel,
  MyComputer,
  MSPaint,
  DateTimeProperties,
  Minesweeper,
  Messenger,
  MediaPlayer,
  AboutMe,
  Calculator,
  Solitaire
};

export default function Window({ window: w }) {
  const { closeWindow, minimizeWindow, toggleMaximize, bringToFront } = useOSStore();
  const dragControls = useDragControls();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (w.isMinimized) return null;

  const ContentComponent = contentMap[w.componentName] || (() => <div className="p-4 text-black bg-white">Component Not Found</div>);

  const effectiveMaximized = w.isMaximized || isMobile;

  return (
    <motion.div
      drag={effectiveMaximized ? false : true}
      dragListener={false}
      dragControls={dragControls}
      dragMomentum={false}
      onPointerDown={(e) => bringToFront(w.id)}
      animate={effectiveMaximized ? { top: 0, left: 0, width: '100%', height: 'calc(100% - 36px)' } : {}}
      transition={{ duration: 0 }}
      className={`absolute flex flex-col shadow-[2px_2px_10px_rgba(0,0,0,0.5)] ${effectiveMaximized ? 'rounded-none border-[3px] border-[#0058e6]' : 'rounded-t-lg rounded-b-md overflow-hidden border-[3px] border-[#0058e6]'}`}
      style={!effectiveMaximized ? { zIndex: w.zIndex, width: 800, height: 600, top: w.top || 50, left: w.left || 100 } : { zIndex: w.zIndex }}
    >
      {/* Title Bar - Used for dragging via dragControls.start(e) */}
      <div 
        className="h-[30px] xp-window-gradient flex items-center justify-between px-1.5 border-b border-[#003db3] shrink-0 cursor-grab active:cursor-grabbing"
        onPointerDown={(e) => { dragControls.start(e); }}
      >
        <div className="flex items-center gap-1.5 text-white">
           <span className="text-[13px] font-bold tracking-wide drop-shadow-[1px_1px_1px_rgba(0,0,0,0.6)] font-tahoma">{w.title}</span>
        </div>
        <div className="flex gap-[2px]">
          <button onPointerDown={(e) => { e.stopPropagation(); minimizeWindow(w.id); }} className="w-5 h-5 rounded-sm bg-[linear-gradient(to_bottom,#fff,#99b4d1)] flex justify-center items-center border border-white hover:brightness-110 active:brightness-90 cursor-default"><Minus size={14} color="black" strokeWidth={3} /></button>
          <button onPointerDown={(e) => { e.stopPropagation(); toggleMaximize(w.id); }} className="w-5 h-5 rounded-sm bg-[linear-gradient(to_bottom,#fff,#99b4d1)] flex justify-center items-center border border-white hover:brightness-110 active:brightness-90 cursor-default"><Square size={10} color="black" strokeWidth={3} /></button>
          <button onPointerDown={(e) => { e.stopPropagation(); closeWindow(w.id); }} className="w-5 h-5 rounded-sm bg-[linear-gradient(to_bottom,#e59898,#d24848)] flex justify-center items-center border border-white hover:brightness-110 active:brightness-90 cursor-default"><X size={14} color="white" strokeWidth={3} /></button>
        </div>
      </div>
      
      {/* Content Area - No dragging allowed here! */}
      <div 
        className="flex-1 bg-[#ece9d8] relative drop-shadow overflow-hidden flex flex-col m-[1px] mt-0"
      >
        <ContentComponent metadata={w.metadata} />
      </div>
    </motion.div>
  );
}
