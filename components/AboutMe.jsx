"use client";
import React from "react";

export default function AboutMe() {
  return (
    <div className="flex flex-col h-full bg-[#ffffff] font-tahoma text-black overflow-y-auto select-text">
      
      {/* Banner / Header Area - XP Help Style */}
      <div className="w-full bg-[linear-gradient(to_right,#0033cc,#3366ff)] px-6 py-5 flex items-center border-b-[3px] border-[#001166] shrink-0">
         <div className="flex-1">
            <h1 className="text-[28px] font-bold text-white drop-shadow-md tracking-wide">Al-Moatasem Bellah</h1>
            <p className="text-[13px] text-blue-100 font-bold mt-1 shadow-sm opacity-90">AI Engineer • Full-Stack Developer • Founder of ROWAD</p>
            <div className="mt-4">
              <a href="https://github.com/mohasbks" target="_blank" className="inline-flex px-3 py-1 bg-[#ece9d8] border border-white border-r-[#888] border-b-[#888] hover:active:border-t-[#888] hover:active:border-l-[#888] hover:active:border-r-white hover:active:border-b-white text-xs items-center gap-2 text-black font-semibold shadow-sm focus:outline-none">
                <img src="https://win98icons.alexmeub.com/icons/png/world-1.png" className="w-4 h-4" />
                GitHub
              </a>
            </div>
         </div>
      </div>

      {/* Content Body */}
      <div className="px-8 py-6 max-w-4xl mx-auto w-full leading-relaxed text-[13px] font-tahoma text-black">
         
         {/* Profile Picture Floating Right */}
         <div className="float-right ml-8 mb-6 mt-1">
            <div className="w-40 h-40 border-[2px] border-[#ece9d8] shadow-[2px_2px_5px_rgba(0,0,0,0.3)] bg-white p-1">
               <img src="/me.png" alt="Al-Moatasem" onError={(e) => e.target.src = "https://win98icons.alexmeub.com/icons/png/user_computer-0.png"} className="w-full h-full object-cover border border-[#a0a0a0]" />
            </div>
         </div>
         
         <div className="text-black">
           <h2 className="text-[17px] font-bold text-[#003399] mb-3 border-b-[2px] border-[#003399] pb-1">🧠 The Story Begins...</h2>
           <p className="italic mb-3 font-semibold text-[#333333]">“Hey, I’m Al-Moatasem.<br/>But this isn’t just a portfolio… this is my story.”</p>
           <p className="mb-3">It didn’t start with experience.<br/>It started with curiosity.</p>
           <p className="mb-3">A simple question:<br/><span className="bg-[#ffff00] px-1 font-bold inline-block">“How do things actually work?”</span></p>
           <p className="mb-8">That question turned into something bigger…<br/>Lines of code. Late nights. Endless experiments.<br/>And a mindset that refused to stay average.</p>

           <h2 className="text-[17px] font-bold text-[#003399] mb-3 border-b-[2px] border-[#003399] pb-1">🎬 Chapter 1: The Beginning (2023)</h2>
           <p className="mb-3">The journey officially began at the Egyptian Russian University.</p>
           <p className="mb-3">At first, everything felt new… overwhelming even.<br/>Concepts, logic, systems — a completely different world.</p>
           <p className="mb-3">But instead of stepping back, I leaned in.</p>
           <p className="mb-3">I started building…<br/>Simple web pages. Small ideas.<br/>Nothing perfect — but everything was progress.</p>
           <p className="mb-8">That’s where it started:<br/><strong className="text-[#003399] text-[14px]">Not with mastery… but with action.</strong></p>

           <h2 className="text-[17px] font-bold text-[#003399] mb-3 border-b-[2px] border-[#003399] pb-1">⚙️ Chapter 2: Algorithms & The Real World</h2>
           <p className="mb-3">Then things got serious.</p>
           <p className="mb-3">I dove deep into Data Structures and Algorithms.<br/>Not just to pass exams — but to understand how real systems think.</p>
           <p className="mb-3">At the same time, I stepped into the real world.</p>
           <p className="mb-3 font-bold text-black border border-[#c0c0c0] bg-[#ece9d8] px-2 py-1 inline-block shadow-inner">Freelancing.</p>
           <p className="mb-3">Real clients. Real problems. Real pressure.</p>
           <p className="mb-8">That’s where I learned the difference between:<br/><span className="italic font-bold text-[#003399] bg-[#e6f2ff] px-3 py-1.5 inline-block mt-2 border-l-4 border-[#003399] shadow-sm">"Writing code… and building solutions."</span></p>

           <h2 className="text-[17px] font-bold text-[#003399] mb-3 border-b-[2px] border-[#003399] pb-1">🚀 Chapter 3: Leveling Up at ITI</h2>
           <p className="mb-3">Next stop: ITI.</p>
           <p className="mb-3">120 hours of pure focus on Front-End Development.</p>
           <p className="mb-3">I didn’t just learn frameworks…<br/>I understood how to build modern, scalable, and clean interfaces.</p>
           <p className="mb-3">Vue.js, UI systems, real-world practices —<br/>This was a turning point.</p>
           <p className="mb-8">I stopped being just a learner…<br/><strong className="text-green-700 text-[14px]">And started thinking like a developer.</strong></p>

           <h2 className="text-[17px] font-bold text-[#003399] mb-3 border-b-[2px] border-[#003399] pb-1">🧠 Chapter 4: ROWAD & The AI Shift (Present)</h2>
           <p className="mb-3">Now, things are different.</p>
           <p className="mb-3">I’m building something bigger than just projects.</p>
           <p className="mb-3"><strong className="text-[#003399] text-[14px]">ROWAD</strong> — a platform designed to empower Arab freelancers<br/>with a fair, zero-commission environment.</p>
           <p className="mb-3">But that’s not all.</p>
           <p className="mb-2">I’m shifting deeper into Artificial Intelligence:</p>
           <ul className="list-disc ml-8 mb-4 font-bold text-[#333333]">
             <li className="mb-1">Machine Learning</li>
             <li className="mb-1">Deep Learning</li>
             <li className="mb-1">Computer Vision</li>
             <li className="mb-1">NLP</li>
           </ul>
           <p className="mb-8 text-black bg-[#ffffcc] px-3 py-2 inline-block border border-[#cccc99] font-medium shadow-sm">Not just using AI…<br/>But understanding it. Building with it. Pushing it further.</p>

           <h2 className="text-[17px] font-bold text-[#003399] mb-3 border-b-[2px] border-[#003399] pb-1">💡 System Properties</h2>
           <p className="mb-3">This is what defines me:</p>
           
           <div className="bg-[#ece9d8] border border-[#a0a0a0] p-5 mb-8 shadow-inner select-text">
             <ul className="list-square ml-6 mb-5 font-bold text-[#003399]">
               <li className="mb-1.5">Front-End Systems (React / Next.js)</li>
               <li className="mb-1.5">AI Development (Python & Machine Learning)</li>
               <li className="mb-1.5">UI/UX Thinking</li>
               <li className="mb-1.5">Automation & Problem Solving</li>
             </ul>
             <div className="border-t border-[#a0a0a0] pt-3 flex gap-8 font-semibold text-[#222222]">
                <p className="font-bold underline text-black">And outside the code?</p>
                <span>🎮 Gamer mindset</span>
                <span>⚽ Football energy</span>
                <span>🔥 Competitive by nature</span>
             </div>
           </div>

           <h2 className="text-[17px] font-bold text-[#003399] mb-3 border-b-[2px] border-[#003399] pb-1">🎯 Where This Is Going</h2>
           <p className="mb-3">This story isn’t finished.</p>
           <p className="mb-3">Not even close.</p>
           <p className="mb-3">Every project… every system… every idea —<br/>is just another step toward something bigger.</p>
           <p className="mb-8 italic font-bold text-[#003399] bg-[#e6f2ff] px-4 py-3 border border-[#003399] shadow-sm inline-block">
             “I’m not here to follow paths.<br/>I’m here to build them.”
           </p>

           <div className="bg-[#003399] text-white p-5 font-bold text-center border-[3px] border-[#001166] shadow-[2px_2px_5px_rgba(0,0,0,0.4)] mt-6">
             <h2 className="text-xl mb-2 flex items-center justify-center gap-2">🧠 Final Line</h2>
             <p className="italic text-[16px] opacity-90">“This is not just what I do…<br/>it’s who I’m becoming.”</p>
           </div>
           
         </div>
      </div>
    </div>
  );
}
