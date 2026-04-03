"use client";
import { useState, useRef, useEffect } from "react";
import { playSound } from "@/store/useOSStore";

export default function Messenger() {
  const [signedIn, setSignedIn] = useState(false);
  const [messages, setMessages] = useState([{ sender: 'bot', text: 'Hey there! 😊 How can I help you today?' }]);
  const [input, setInput] = useState("");
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    setMessages(prev => [...prev, { sender: 'me', text: input }]);
    playSound('type');
    const msg = input;
    setInput("");

    setTimeout(() => {
      playSound('open');
      setMessages(prev => [...prev, { sender: 'bot', text: `You said: "${msg}". This is an automated retro response!` }]);
    }, 1500);
  };

  if (!signedIn) {
    return (
      <div className="flex flex-col h-full bg-gradient-to-b from-[#e5f1fb] to-[#c6d7f0] font-tahoma select-none">
         <div className="flex-1 flex flex-col items-center justify-center">
            <div className="w-16 h-16 bg-gradient-to-b from-blue-300 to-blue-500 rounded-full flex items-center justify-center mb-6 shadow-[0_2px_10px_rgba(0,0,0,0.2)] border-2 border-white">
              <span className="text-4xl">👨‍💻</span>
            </div>
            <h2 className="text-lg font-bold text-[#1f48a1] mb-8 drop-shadow-sm">MSN Messenger</h2>
            
            <div className="flex flex-col gap-3 w-64">
               <div>
                 <div className="text-xs text-[#1f48a1] mb-1">E-mail address:</div>
                 <input type="text" value="visitor@portfolio.com" readOnly className="w-full p-1 border border-[#7f9db9] rounded-sm text-sm outline-none" />
               </div>
               <div>
                 <div className="text-xs text-[#1f48a1] mb-1">Password:</div>
                 <input type="password" value="********" readOnly className="w-full p-1 border border-[#7f9db9] rounded-sm text-sm outline-none" />
               </div>
               <div className="flex items-center gap-2 mt-2">
                 <input type="checkbox" id="rem" className="cursor-pointer" />
                 <label htmlFor="rem" className="text-xs text-[#1f48a1] cursor-pointer">Remember me</label>
               </div>
               
               <button 
                  onClick={() => { playSound('click'); setSignedIn(true); }}
                  className="mt-6 py-1.5 bg-[linear-gradient(to_bottom,#fcfdfd,#d3e0f0)] border border-[#7f9db9] rounded shadow-sm text-[#1f48a1] text-sm font-bold hover:brightness-105 active:brightness-95"
               >
                 Sign In
               </button>
            </div>
         </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-[#f3f8fe] font-tahoma">
      <div className="h-10 bg-[linear-gradient(to_bottom,#e5f1fb,#c6d7f0)] border-b border-[#a9c7e8] flex items-center px-3 gap-3 shrink-0">
         <div className="w-8 h-8 rounded border border-gray-400 bg-white flex items-center justify-center shadow-sm text-lg">🤖</div>
         <div>
            <div className="text-sm font-bold text-[#1f48a1]">Bot <span className="text-gray-500 text-xs font-normal">(Online)</span></div>
         </div>
      </div>

      <div className="flex-1 p-3 overflow-y-auto bg-white flex flex-col gap-3 border-b border-[#a9c7e8]">
         <div className="text-center text-xs text-gray-400 mb-2 border-b border-gray-200 pb-2">Never give out your password or credit card number in an instant message conversation.</div>
         {messages.map((m, i) => (
           <div key={i} className="flex flex-col text-sm">
              <span className="font-bold text-gray-700">{m.sender === 'me' ? 'Al-Moatasem (Visitor) says:' : 'ChatBot says:'}</span>
              <span className={`${m.sender === 'me' ? 'text-black' : 'text-blue-800 font-medium'} ml-2`}>{m.text}</span>
           </div>
         ))}
         <div ref={endRef} />
      </div>

      <div className="h-28 bg-[linear-gradient(to_bottom,#e5f1fb,#c6d7f0)] p-2 flex flex-col shrink-0">
         <div className="flex gap-2 mb-1 px-1">
            <button className="text-xs text-[#1f48a1] hover:underline">A<span className="text-[10px]">A</span></button>
            <button className="text-xs text-[#1f48a1] hover:underline">😊</button>
         </div>
         <form onSubmit={handleSend} className="flex-1 flex gap-2">
            <textarea 
               value={input}
               onChange={e => setInput(e.target.value)}
               onKeyDown={e => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                     e.preventDefault();
                     handleSend(e);
                  }
               }}
               className="flex-1 h-full resize-none border border-[#7f9db9] rounded-sm p-1 text-sm outline-none shadow-inner"
            />
            <button type="submit" className="px-4 py-2 bg-[linear-gradient(to_bottom,#fcfdfd,#d3e0f0)] border border-[#7f9db9] rounded shadow-sm text-[#1f48a1] text-sm font-bold hover:brightness-105 active:brightness-95">Send</button>
         </form>
      </div>
    </div>
  );
}
