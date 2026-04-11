"use client";
import { useState, useRef, useEffect } from "react";
import useOSStore, { playSound } from "@/store/useOSStore";

export default function CommandPrompt() {
  const terminalHistory = useOSStore(state => state.terminalHistory);
  const addTerminalOutput = useOSStore(state => state.addTerminalOutput);
  const clearTerminal = useOSStore(state => state.clearTerminal);
  const closeWindow = useOSStore(state => state.closeWindow);
  
  const [inputValue, setInputValue] = useState("");
  const [isPython, setIsPython] = useState(false);
  const endRef = useRef(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (endRef.current) {
      endRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [terminalHistory]);

  const availableCommands = ["whoami", "skills --list", "python", "cls", "help", "exit"];

  const handleCommand = (cmd) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;
    playSound('type');

    if (isPython) {
      // In Python REPL mode
      addTerminalOutput({ type: 'input', text: `>>> ${cmd}` });
      
      if (trimmed === 'exit' || trimmed === 'exit()') {
        setIsPython(false);
        addTerminalOutput({ type: 'system', text: 'Exiting Python REPL...' });
        addTerminalOutput({ type: 'system', text: '\nC:\\Documents and Settings\\Al-Moatasem>' });
      } else {
        // Very basic Python execution simulation using JS eval safely
        let output = "";
        try {
          if (trimmed.startsWith('print(') && trimmed.endsWith(')')) {
             const inner = trimmed.slice(6, -1);
             // handle basic strings
             if ((inner.startsWith('"') && inner.endsWith('"')) || (inner.startsWith("'") && inner.endsWith("'"))) {
                output = inner.slice(1, -1);
             } else {
                // Try evaluating mathematical expression
                output = eval(inner);
             }
          } else {
             // Maybe math equation directly
             output = eval(trimmed);
             if (output === undefined) output = "";
          }
        } catch (e) {
          output = `Traceback (most recent call last):\n  File "<stdin>", line 1, in <module>\nNameError: name '${trimmed.split(' ')[0]}' is not defined`;
        }
        if (output !== "") addTerminalOutput({ type: 'output', text: String(output) });
      }
    } else {
      // Normal CMD mode
      addTerminalOutput({ type: 'input', text: `C:\\Documents and Settings\\Al-Moatasem> ${cmd}` });

      switch (trimmed.toLowerCase()) {
        case 'help':
          addTerminalOutput({ 
            type: 'system', 
            text: `Available commands:\n  whoami         - Print professional summary\n  skills --list  - Display AI engineering stack\n  python         - Enter Python REPL mode\n  cls            - Clear terminal screen\n  exit           - Close terminal` 
          });
          break;
        case 'whoami':
          addTerminalOutput({ type: 'output', text: "Al-Moatasem Bellah\nRole: AI Engineer / Developer\nStatus: Ready to build the future.\nPitch: I craft intelligent systems and immersive experiences." });
          break;
        case 'skills --list':
          addTerminalOutput({ type: 'output', text: "[===== AI Engineering Stack =====]\n- Deep Learning (PyTorch, TensorFlow)\n- NLP & Large Language Models (LLMs)\n- Machine Learning Pipelines\n- Data Science & Analysis\n- Fullstack Web Engineering (React, Next.js)" });
          break;
        case 'python':
          setIsPython(true);
          addTerminalOutput({ type: 'system', text: "Python 3.9.13 (main, May 17 2022, 15:36:56) \nType \"help\", \"copyright\", \"credits\" or \"license\" for more information." });
          break;
        case 'clear':
        case 'cls':
          clearTerminal();
          break;
        case 'exit':
          closeWindow('cmd'); // Usually we pass id
          break;
        default:
          addTerminalOutput({ type: 'error', text: `'${trimmed}' is not recognized as an internal or external command,\noperable program or batch file.` });
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleCommand(inputValue);
      setInputValue("");
    } else if (e.key === 'Tab') {
      e.preventDefault();
      if (!isPython) {
        // Simple autocomplete
        const match = availableCommands.find(c => c.startsWith(inputValue.toLowerCase()));
        if (match) setInputValue(match);
      }
    }
  };

  return (
    <div 
      className="flex flex-col h-full bg-black font-mono text-[13px] text-gray-300 p-2 overflow-y-auto cursor-text select-text" 
      onClick={() => document.getElementById('cmd-input')?.focus()}
    >
       {/* Prepend a subtle suggestion manually just upon component view */}
       <div className="text-gray-500 mb-4 italic">
          [Hint] Try typing: <span className="text-yellow-400 font-bold">help</span>, <span className="text-yellow-400 font-bold">whoami</span>, <span className="text-yellow-400 font-bold">skills --list</span>, or <span className="text-blue-400 font-bold">python</span>
       </div>

       {terminalHistory.map((line, idx) => (
          <div key={idx} className={`whitespace-pre-wrap mb-1 ${line.type === 'error' ? 'text-red-400' : ''}`}>
             {line.text}
          </div>
       ))}

       <div className="flex items-center">
          <span className="mr-2 shrink-0">{isPython ? '>>>' : 'C:\\Documents and Settings\\Al-Moatasem>'}</span>
          <input 
            id="cmd-input"
            type="text" 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
            autoComplete="off"
            spellCheck="false"
            className="flex-1 bg-transparent border-none outline-none text-gray-300 font-mono"
          />
       </div>

       <div ref={endRef}></div>
    </div>
  );
}
