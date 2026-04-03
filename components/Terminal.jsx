"use client";
import { useState, useRef, useEffect } from "react";
import useOSStore from "@/store/useOSStore";

export default function Terminal() {
  const history = useOSStore(state => state.terminalHistory);
  const addOutput = useOSStore(state => state.addTerminalOutput);
  const clearTerminal = useOSStore(state => state.clearTerminal);
  const openWindow = useOSStore(state => state.openWindow);
  
  const [input, setInput] = useState("");
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleCommand = (cmd) => {
    const trimmed = cmd.trim().toLowerCase();
    
    addOutput({ type: 'user', text: `root@al-moatasem:~# ${cmd}` });
    
    if (trimmed === 'help') {
      addOutput({ type: 'system', text: 'AVAILABLE PROTOCOLS:\nhelp    - lists all protocols\nwhoami  - prints system owner\nprojects- opens the projects module\nabout   - opens the identity module\ncontact - opens the communications link\nclear   - flushes the terminal' });
    } else if (trimmed === 'clear') {
      clearTerminal();
    } else if (trimmed === 'whoami') {
      addOutput({ type: 'system', text: 'AL-MOATASEM BELLAH\nStatus: Online\nRole: AI Engineer / Developer' });
    } else if (trimmed === 'projects') {
      addOutput({ type: 'system', text: 'Initializing Projects Module...' });
      setTimeout(() => openWindow({ id: 'projects', title: 'My Projects', componentName: 'ProjectsGrid' }), 500);
    } else if (trimmed === 'about') {
      addOutput({ type: 'system', text: 'Decrypting Identity...' });
      setTimeout(() => openWindow({ id: 'about', title: 'About Me', componentName: 'AboutMe' }), 500);
    } else if (trimmed === 'contact') {
      addOutput({ type: 'system', text: 'Establishing secure line...' });
      setTimeout(() => openWindow({ id: 'contact', title: 'Contact', componentName: 'ContactForm' }), 500);
    } else if (trimmed !== '') {
      addOutput({ type: 'error', text: `bash: ${trimmed}: command not found` });
    }
    
    setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleCommand(input);
    }
  };

  return (
    <div className="w-full h-full bg-black/60 backdrop-blur-md text-cyan-400 font-mono p-6 flex flex-col overflow-y-auto text-sm" onClick={() => document.getElementById('term-input')?.focus()}>
      <div className="flex-1 whitespace-pre-wrap">
        {history.map((line, i) => (
          <div key={i} className={`mb-1 leading-relaxed ${line.type === 'error' ? 'text-red-400' : line.type === 'user' ? 'text-white' : 'text-cyan-400'}`}>
            {line.text}
          </div>
        ))}
        <div className="flex items-center mt-1 text-white">
          <span className="mr-2 text-green-400">root@al-moatasem:~#</span>
          <input
            id="term-input"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent outline-none border-none text-white caret-white"
            autoFocus
            autoComplete="off"
            spellCheck="false"
          />
        </div>
        <div ref={bottomRef} />
      </div>
    </div>
  );
}
