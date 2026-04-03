"use client";
import React, { useState } from "react";
import { playSound } from "@/store/useOSStore";

export default function Calculator() {
  const [display, setDisplay] = useState("0");
  const [operator, setOperator] = useState(null);
  const [previousValue, setPreviousValue] = useState(null);
  const [waitingForNewValue, setWaitingForNewValue] = useState(false);

  const handleNum = (num) => {
    playSound('click');
    if (waitingForNewValue) {
      setDisplay(num);
      setWaitingForNewValue(false);
    } else {
      setDisplay(display === "0" ? num : display + num);
    }
  };

  const handleOp = (op) => {
    playSound('click');
    if (operator && !waitingForNewValue) {
      handleEqual(false);
    } else {
      setPreviousValue(parseFloat(display));
    }
    setOperator(op);
    setWaitingForNewValue(true);
  };

  const handleEqual = (playSnd = true) => {
    if (playSnd) playSound('click');
    if (!operator || previousValue === null) return;
    
    const current = parseFloat(display);
    let result = 0;
    switch(operator) {
      case "+": result = previousValue + current; break;
      case "-": result = previousValue - current; break;
      case "*": result = previousValue * current; break;
      case "/": result = previousValue / current; break;
    }
    
    setDisplay(String(result));
    setPreviousValue(result);
    setOperator(null);
    setWaitingForNewValue(true);
  };

  const handleClear = () => {
    playSound('click');
    setDisplay("0");
    setOperator(null);
    setPreviousValue(null);
    setWaitingForNewValue(false);
  };

  const handleClearEntry = () => {
    playSound('click');
    setDisplay("0");
  };

  const handleDot = () => {
    playSound('click');
    if (waitingForNewValue) {
      setDisplay("0.");
      setWaitingForNewValue(false);
    } else if (!display.includes(".")) {
      setDisplay(display + ".");
    }
  };

  const handleSign = () => {
    playSound('click');
    setDisplay(String(parseFloat(display) * -1));
  };

  const handleSqrt = () => {
    playSound('click');
    setDisplay(String(Math.sqrt(parseFloat(display))));
    setWaitingForNewValue(true);
  };

  const handlePercent = () => {
    playSound('click');
    setDisplay(String(parseFloat(display) / 100));
    setWaitingForNewValue(true);
  };

  const handleReciprocal = () => {
    playSound('click');
    setDisplay(String(1 / parseFloat(display)));
    setWaitingForNewValue(true);
  };

  const btnClass = "bg-[#ece9d8] border-[2px] border-white border-b-[#808080] border-r-[#808080] hover:active:border-t-[#808080] hover:active:border-l-[#808080] hover:active:border-b-white hover:active:border-r-white text-[#1c1c1c] font-tahoma text-sm flex items-center justify-center select-none shadow-sm";
  const numClass = "bg-[#ece9d8] border-[2px] border-white border-b-[#808080] border-r-[#808080] hover:active:border-t-[#808080] hover:active:border-l-[#808080] hover:active:border-b-white hover:active:border-r-white text-[#0b1cd2] font-semibold font-tahoma text-sm flex items-center justify-center select-none shadow-sm";
  const opClass = "bg-[#ece9d8] border-[2px] border-white border-b-[#808080] border-r-[#808080] hover:active:border-t-[#808080] hover:active:border-l-[#808080] hover:active:border-b-white hover:active:border-r-white text-[#d21616] font-semibold font-tahoma text-sm flex items-center justify-center select-none shadow-sm";

  return (
    <div className="flex flex-col h-full bg-[#ece9d8] font-tahoma p-2 select-none border-t border-l border-white border-b-[#808080] border-r-[#808080]">
       {/* Menu Bar */}
       <div className="flex gap-4 text-xs tracking-wide mb-2 px-1">
          <span className="hover:bg-[#316ac5] hover:text-white cursor-pointer px-1">Edit</span>
          <span className="hover:bg-[#316ac5] hover:text-white cursor-pointer px-1">View</span>
          <span className="hover:bg-[#316ac5] hover:text-white cursor-pointer px-1">Help</span>
       </div>

       {/* Display */}
       <div className="bg-white border-[2px] border-[#808080] border-b-white border-r-white text-right px-2 py-1 mb-2 shadow-inner">
          <div className="text-black text-xl font-mono leading-none tracking-tight block overflow-hidden overflow-x-auto whitespace-nowrap">{display}</div>
       </div>

       {/* Clear buttons */}
       <div className="flex gap-2 mb-2 ml-auto w-3/4">
          <button className={`${opClass} w-full py-1`} onClick={() => { setDisplay(display.slice(0, -1) || "0") }}>Backspace</button>
          <button className={`${opClass} w-full py-1`} onClick={handleClearEntry}>CE</button>
          <button className={`${opClass} w-full py-1`} onClick={handleClear}>C</button>
       </div>

       {/* Keypad */}
       <div className="grid grid-cols-5 gap-1.5 flex-1">
          <button className={opClass} onClick={handleClearEntry}>MC</button>
          <button className={numClass} onClick={() => handleNum("7")}>7</button>
          <button className={numClass} onClick={() => handleNum("8")}>8</button>
          <button className={numClass} onClick={() => handleNum("9")}>9</button>
          <button className={opClass} onClick={() => handleOp("/")}>/</button>
          <button className={btnClass} onClick={handleSqrt}>sqrt</button>

          <button className={opClass} onClick={handleClearEntry}>MR</button>
          <button className={numClass} onClick={() => handleNum("4")}>4</button>
          <button className={numClass} onClick={() => handleNum("5")}>5</button>
          <button className={numClass} onClick={() => handleNum("6")}>6</button>
          <button className={opClass} onClick={() => handleOp("*")}>*</button>
          <button className={btnClass} onClick={handlePercent}>%</button>

          <button className={opClass} onClick={handleClearEntry}>MS</button>
          <button className={numClass} onClick={() => handleNum("1")}>1</button>
          <button className={numClass} onClick={() => handleNum("2")}>2</button>
          <button className={numClass} onClick={() => handleNum("3")}>3</button>
          <button className={opClass} onClick={() => handleOp("-")}>-</button>
          <button className={btnClass} onClick={handleReciprocal}>1/x</button>

          <button className={opClass} onClick={handleClearEntry}>M+</button>
          <button className={numClass} onClick={() => handleNum("0")}>0</button>
          <button className={numClass} onClick={handleSign}>+/-</button>
          <button className={numClass} onClick={handleDot}>.</button>
          <button className={opClass} onClick={() => handleOp("+")}>+</button>
          <button className={`${opClass} flex items-center justify-center text-xl pb-1`} onClick={() => handleEqual(true)}>=</button>
       </div>
    </div>
  );
}
