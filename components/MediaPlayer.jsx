"use client";
import { useState, useRef, useEffect } from "react";
import { Play, Pause, Square, SkipBack, SkipForward, Volume2 } from "lucide-react";

const TRACKS = [
  { id: 1, title: "Beethoven - Moonlight Sonata", artist: "Classical", url: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Daniel_Estrem/Beethoven_Sonatas/Daniel_Estrem_-_01_-_Beethoven_Sonata_No_14_in_C___minor_Moonlight_mvt_1.mp3" },
  { id: 2, title: "Lofi Study Beat", artist: "Unknown", url: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Tours/Enthusiast/Tours_-_01_-_Enthusiast.mp3" }
];

export default function MediaPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    // Attempt auto-play when clicking a new track if it was already playing
    if (isPlaying && audioRef.current) {
      audioRef.current.play().catch(e => console.log(e));
    }
  }, [currentTrack]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch(e => console.log(e));
      setIsPlaying(true);
    }
  };

  const handleStop = () => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    setIsPlaying(false);
    setProgress(0);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100);
    }
  };

  const nextTrack = () => setCurrentTrack((prev) => (prev + 1) % TRACKS.length);
  const prevTrack = () => setCurrentTrack((prev) => (prev - 1 + TRACKS.length) % TRACKS.length);

  return (
    <div className="flex flex-col h-full bg-[#1e2a4f] font-tahoma text-white select-none">
       {/* Top Header */}
       <div className="flex justify-between items-center bg-[#182342] px-3 py-1 border-b border-[#30457d] shrink-0">
          <span className="text-xs font-bold text-gray-300 tracking-wider">Windows Media Player</span>
       </div>
       
       <div className="flex-1 flex overflow-hidden">
          {/* Visualizer / Video Area */}
          <div className="flex-1 bg-black flex flex-col items-center justify-center relative shadow-[inset_0_0_20px_rgba(0,0,0,1)]">
             {isPlaying ? (
                <div className="w-full h-full flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-[#0c1328] via-[#1a2d6b] to-[#040814]">
                   {/* Fake visualizer waves */}
                   <div className="absolute inset-0 opacity-20 flex items-center justify-center">
                     <iframe src="https://giphy.com/embed/5T8tEJtCebD0c" width="100%" height="100%" frameBorder="0" className="pointer-events-none" allowFullScreen></iframe>
                   </div>
                   <div className="z-10 mt-10">
                     <div className="text-blue-300 font-bold text-2xl drop-shadow-[0_0_10px_rgba(0,100,255,0.8)] mb-2 animate-pulse">Now Playing</div>
                     <div className="text-white text-lg font-mono text-center bg-black/50 px-4 py-1 rounded border border-white/20">{TRACKS[currentTrack].title}</div>
                   </div>
                </div>
             ) : (
                <div className="text-gray-500 font-bold italic tracking-widest flex items-center flex-col">
                   <div className="w-16 h-16 bg-gradient-to-br from-[#2f4996] to-[#14234f] rounded-full flex items-center justify-center mb-4 border border-[#3e60c4]">🎵</div>
                   Ready
                </div>
             )}
          </div>
          
          {/* Playlist Sidebar */}
          <div className="w-48 bg-[#cadcee] border-l border-[#82a3c7] flex flex-col p-1 text-black shrink-0 shadow-inner overflow-hidden">
             <div className="bg-[#5984d4] text-white text-[11px] font-bold px-2 py-0.5 mb-1 rounded-sm shadow-sm">Playlist</div>
             <div className="flex-1 overflow-y-auto w-full">
                {TRACKS.map((track, idx) => (
                  <div 
                    key={track.id} 
                    onClick={() => setCurrentTrack(idx)}
                    className={`text-[11px] p-1 cursor-pointer w-full truncate border border-transparent 
                       ${currentTrack === idx ? 'bg-[#316ac5] text-white border-white border-dotted' : 'hover:bg-blue-100 hover:text-black'}`}
                  >
                    {idx + 1}. {track.title}
                  </div>
                ))}
             </div>
          </div>
       </div>

       {/* Controls Area */}
       <div className="h-28 bg-[#cadcee] border-t-2 border-[#182342] shrink-0 p-2 flex flex-col justify-end relative shadow-inner">
          <audio 
             ref={audioRef} 
             src={TRACKS[currentTrack].url} 
             onTimeUpdate={handleTimeUpdate}
             onEnded={nextTrack}
          ></audio>
          
          <div className="absolute top-2 left-4 w-64">
             <div className="text-[#1e3475] font-bold text-sm tracking-wide bg-gradient-to-r from-[#cadcee] to-transparent truncate">{TRACKS[currentTrack].title}</div>
             <div className="text-[#1e3475] text-[10px] truncate">{TRACKS[currentTrack].artist}</div>
          </div>

          <div className="w-full bg-[#182a5c] h-3 rounded-full mb-3 mt-4 border border-[#1e2a4f] overflow-hidden shadow-inner flex items-center">
             <div className="h-full bg-gradient-to-r from-green-400 to-[#1df563] rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
          </div>

          <div className="flex items-center justify-between mt-auto">
             <div className="flex items-center gap-1 bg-[#1e2a4f] rounded-full p-1 border-2 border-[#739bc4] shadow-[0_2px_5px_rgba(0,0,0,0.4)]">
                <button onClick={prevTrack} className="w-8 h-8 rounded-full bg-gradient-to-br from-[#80aee0] to-[#427ab3] hover:brightness-110 active:brightness-90 flex items-center justify-center border border-[#a2c9f1] shadow-inner text-white">
                  <SkipBack size={14} fill="currentColor" />
                </button>
                <button onClick={togglePlay} className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-[#1e5896] hover:brightness-110 active:brightness-90 flex items-center justify-center border-2 border-[#a2c9f1] shadow-inner text-white">
                  {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" className="ml-1" />}
                </button>
                <button onClick={nextTrack} className="w-8 h-8 rounded-full bg-gradient-to-br from-[#80aee0] to-[#427ab3] hover:brightness-110 active:brightness-90 flex items-center justify-center border border-[#a2c9f1] shadow-inner text-white">
                  <SkipForward size={14} fill="currentColor" />
                </button>
             </div>

             <div className="flex items-center gap-2">
                <button onClick={handleStop} className="w-8 h-8 rounded-sm bg-gradient-to-br from-gray-200 to-gray-400 hover:brightness-110 active:border-t-gray-500 flex items-center justify-center border-t-2 border-l-2 border-white border-b-gray-500 border-r-gray-500 shadow-sm text-[#1e2a4f]">
                  <Square size={12} fill="currentColor" />
                </button>
                <div className="h-6 w-px bg-gray-400 mx-2 shadow-[1px_0_0_white]"></div>
                <Volume2 size={16} className="text-[#1e2a4f]" />
             </div>
          </div>
       </div>
    </div>
  );
}
