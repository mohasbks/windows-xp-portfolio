"use client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment, Html } from "@react-three/drei";
import { useState } from "react";
import Desktop from "./Desktop";
import BootScreen from "./BootScreen";

function NudgeUI({ params, setParams }) {
  const [step, setStep] = useState(0.01);
  
  const handleCopy = () => {
     const str = Object.keys(params).map(k => `${k}: ${parseFloat(params[k]).toFixed(4)}`).join(', ');
     navigator.clipboard.writeText(`{ ${str} }`);
     alert("تم النسخ بنجاح! الصقه في المحادثة الآن.");
  };

  return (
    <div className="absolute top-4 right-4 bg-black/95 p-5 border-2 border-green-600 rounded-lg text-white z-[9999] shadow-[0_0_20px_rgba(0,255,0,0.2)] font-sans w-[300px]">
      <h2 className="text-sm font-bold mb-4 text-green-400 border-b border-gray-700 pb-2">🎯 Precision Alignment Box</h2>
      
      <div className="text-xs mb-4">
        <span className="text-gray-400 mr-2">دقة الحركة (Step):</span>
        <div className="flex gap-1 mt-1">
           <button onClick={()=>setStep(0.1)} className={`flex-1 py-1 rounded ${step===0.1?'bg-blue-600':'bg-gray-800'}`}>0.1</button>
           <button onClick={()=>setStep(0.01)} className={`flex-1 py-1 rounded ${step===0.01?'bg-blue-600':'bg-gray-800'}`}>0.01</button>
           <button onClick={()=>setStep(0.001)} className={`flex-1 py-1 rounded border border-blue-500 ${step===0.001?'bg-blue-600':'bg-gray-800'}`}>الملي (0.001)</button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-1.5 text-sm font-mono mb-4">
        {[
           {key: 'x', label: 'X (يمين/يسار)'}, 
           {key: 'y', label: 'Y (أعلى/أسفل)'}, 
           {key: 'z', label: 'Z (عمق)'}, 
           {key: 'rx', label: 'RX (ميل للأمام/للخلف)'}, 
           {key: 'ry', label: 'RY (دوران جانبي)'}, 
           {key: 'rz', label: 'RZ (دوران عقارب الساعة)'}, 
           {key: 'scale', label: 'الحجم (Scale)'}
        ].map(item => (
          <div key={item.key} className="flex items-center justify-between bg-[#1a1a1a] p-1.5 rounded">
             <span className="w-24 text-gray-400 font-bold text-[10px] leading-tight" title={item.label}>{item.label}:</span>
             <button onClick={()=>setParams(p=>({...p, [item.key]: p[item.key] - step}))} className="px-3 py-1 bg-red-600 hover:bg-red-500 rounded text-xl font-bold select-none active:scale-95 transition-transform">-</button>
             <span className="w-16 text-center text-blue-300">{params[item.key].toFixed(4)}</span>
             <button onClick={()=>setParams(p=>({...p, [item.key]: p[item.key] + step}))} className="px-3 py-1 bg-green-600 hover:bg-green-500 rounded text-xl font-bold select-none active:scale-95 transition-transform">+</button>
          </div>
        ))}
      </div>

      <div className="mt-4 flex gap-3 pb-4 border-b border-gray-700">
         <div className="flex flex-col flex-1">
            <span className="text-[11px] text-gray-400 mb-1">عرض الشاشة الداخلية Width</span>
            <input type="number" value={params.w} onChange={(e)=>setParams(p=>({...p, w: parseInt(e.target.value)}))} className="text-white bg-gray-900 border border-gray-600 p-2 rounded text-xs outline-none focus:border-blue-500" />
         </div>
         <div className="flex flex-col flex-1">
            <span className="text-[11px] text-gray-400 mb-1">طول الشاشة الداخلية Height</span>
            <input type="number" value={params.h} onChange={(e)=>setParams(p=>({...p, h: parseInt(e.target.value)}))} className="text-white bg-gray-900 border border-gray-600 p-2 rounded text-xs outline-none focus:border-blue-500" />
         </div>
      </div>

      <button 
         onClick={handleCopy} 
         className="mt-4 w-full bg-blue-600 hover:bg-blue-500 transition-colors py-3 rounded text-sm font-bold shadow-lg flex items-center justify-center gap-2"
      >
         📋 Copy Configuration
      </button>
      <div className="text-[10px] text-gray-500 mt-2 text-center">بمجرد الانتهاء من التعديل والمحاذاة 100% اضغط للنسخ!</div>
    </div>
  )
}

function DeskModel({ params }) {
  const { scene } = useGLTF('/Desk.glb');

  return (
    <group position={[0, -1, 0]}>
      <primitive object={scene} scale={1.5} />
      
      {/* 2D Windows Injected */}
      <group position={[params.x, params.y, params.z]} rotation={[params.rx, params.ry, params.rz]} scale={[params.scale, params.scale, params.scale]}>
         <Html transform occlude="blending" distanceFactor={1}>
            <div 
               className="os-container shadow-[0_0_50px_rgba(0,0,0,0.8)_inset] rounded-[8px] bg-black pointer-events-auto overflow-hidden bg-center bg-cover border-[6px] border-black"
               style={{ 
                  width: params.w, 
                  height: params.h,
                  backfaceVisibility: 'hidden' 
               }} 
            >
               <BootScreen />
               <Desktop />
               {/* Subtle Glass overlay preventing accidental interaction during dev */}
               <div className="absolute inset-0 z-[500] pointer-events-none bg-gradient-to-br from-white/5 via-transparent to-black/20 mix-blend-overlay"></div>
            </div>
         </Html>
      </group>
    </group>
  );
}

export default function Room3D() {
  const [params, setParams] = useState({
     // Starts roughly near your last screen setup
     x: -0.1800, y: 1.7700, z: 0.7200, rx: -0.0820, ry: -1.5740, rz: -0.0850, scale: 0.2970, w: 1227, h: 760
  });

  return (
    <div className="w-full h-[100dvh] bg-[#0d0d0c] relative overflow-hidden">
      {/* Absolute Precision Editor UI overlaid perfectly securely */}
      <NudgeUI params={params} setParams={setParams} />

      <Canvas camera={{ position: [0, 2, 4], fov: 50 }} shadows className="absolute inset-0">
         <Environment preset="city" />
         <ambientLight intensity={0.5} />
         <spotLight position={[5, 10, 5]} intensity={1.5} angle={0.3} penumbra={1} castShadow shadow-bias={-0.0001} />
         
         <OrbitControls 
            makeDefault 
            enableZoom={true} 
            minDistance={0.5}
            maxDistance={5} 
            enablePan={true} 
            maxPolarAngle={Math.PI / 2}
         />
         
         <DeskModel params={params} />
      </Canvas>
      <div className="absolute bottom-5 left-0 w-full text-center text-white/30 text-[10px] pointer-events-none uppercase tracking-widest">
         Studio Alignment Mode
      </div>
    </div>
  );
}

useGLTF.preload('/Desk.glb');
