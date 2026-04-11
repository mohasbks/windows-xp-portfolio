"use client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment, Html } from "@react-three/drei";
import Desktop from "./Desktop";
import BootScreen from "./BootScreen";

function NudgeUI({ offset, setOffset }) {
  const step = 0.05; // 5 cm steps
  const rStep = 0.05; // rotation steps
  return (
    <div style={{ position:'absolute', top:20, right:20, background:'rgba(0,0,0,0.8)', padding:15, color:'white', zIndex:9999, borderRadius:10, border:'2px solid green' }}>
      <h3 style={{ margin:'0 0 10px 0', fontSize:14 }}>🔧 تعديل المكان والكِبر والدوران</h3>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:5, marginBottom:10 }}>
        <span>X (يمين/يسار)</span>
        <button onClick={()=>setOffset(p=>({...p, x: p.x - step}))}>-</button>
        <button onClick={()=>setOffset(p=>({...p, x: p.x + step}))}>+</button>

        <span>Y (أعلى/أسفل)</span>
        <button onClick={()=>setOffset(p=>({...p, y: p.y - step}))}>-</button>
        <button onClick={()=>setOffset(p=>({...p, y: p.y + step}))}>+</button>

        <span>Z (عمق الأقتراب)</span>
        <button onClick={()=>setOffset(p=>({...p, z: p.z - step}))}>-</button>
        <button onClick={()=>setOffset(p=>({...p, z: p.z + step}))}>+</button>

        <span>Scale (التكبير)</span>
        <button onClick={()=>setOffset(p=>({...p, s: p.s - 5}))}>-</button>
        <button onClick={()=>setOffset(p=>({...p, s: p.s + 5}))}>+</button>

        <span>RX (وقوف الشاشة)</span>
        <button onClick={()=>setOffset(p=>({...p, rx: p.rx - rStep}))}>-</button>
        <button onClick={()=>setOffset(p=>({...p, rx: p.rx + rStep}))}>+</button>

        <span>RY (دوران جانبي)</span>
        <button onClick={()=>setOffset(p=>({...p, ry: p.ry - rStep}))}>-</button>
        <button onClick={()=>setOffset(p=>({...p, ry: p.ry + rStep}))}>+</button>
      </div>
      <div style={{ fontSize:10, color:'#aaa' }}>
        X: {offset.x.toFixed(2)} Y: {offset.y.toFixed(2)} Z: {offset.z.toFixed(2)}<br/>
        RX: {offset.rx.toFixed(2)} RY: {offset.ry.toFixed(2)} Scale: {offset.s.toFixed(2)}
      </div>
    </div>
  );
}

function DeskModel({ offset }) {
  const { scene } = useGLTF('/Desk.glb');

  // ====================================================
  // تحويل إحداثيات بلندر (Z-up) إلى Three.js (Y-up)
  // بلندر:   X = -0.11114 | Y = -0.47175 | Z = 0.9186
  // Three.js: X = Bx      | Y = Bz       | Z = -By
  // ====================================================
  const screenPos = [
    -0.11114 + offset.x,   // X ثابت
     0.9186 + offset.y,    // Y = Z بلندر
     0.47175 + offset.z    // Z = سالب Y بلندر → -(-0.47175) = 0.47175
  ];

  // ====================================================
  // تحويل الـ Quaternion من بلندر إلى Three.js
  // بلندر:    W:-0.5  X:0.5  Y:0.5  Z:-0.5
  // Three.js: x=Bx   y=Bz   z=-By   w=Bw
  // ====================================================
  const screenQuat = [
     0.5,   // x = Bx
    -0.5,   // y = Bz
    -0.5,   // z = -By
    -0.5    // w = Bw
  ]; // ترتيب Three.js: [x, y, z, w]

  // ====================================================
  // حجم الشاشة: 0.606m عرض × 0.454m ارتفاع
  // السكيل الفعلي من بلندر 154.397
  // ====================================================
  const baseScale = 0.606 / 1024;
  const displayScale = baseScale * offset.s;

  return (
    <group position={[0, -1, 0]}>
      {/* المكتب الـ 3D */}
      <primitive object={scene} scale={1.5} />

      {/* الشاشة الـ HTML */}
      <group scale={1.5}>
        <group position={screenPos} quaternion={screenQuat}>
          <group position={[0, 0, 0.01]} rotation={[offset.rx, offset.ry, offset.rz]}>
            <group scale={displayScale}>
              <Html
                transform
                // مؤقتاً بدون occlude لتسهيل التجربة
              >
                <div
                  style={{
                    width: 1024,
                    height: 768,
                    overflow: 'hidden',
                    borderRadius: '4px',
                    background: '#000',
                    backfaceVisibility: 'hidden',
                    boxShadow: '0 0 40px rgba(100,180,255,0.15) inset',
                  }}
                >
                  <BootScreen />
                  <Desktop />

                  {/* طبقة زجاج خفيفة */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      zIndex: 500,
                      pointerEvents: 'none',
                      background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 50%, rgba(0,0,0,0.2) 100%)',
                      mixBlendMode: 'overlay',
                    }}
                  />
                </div>
              </Html>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}

import { useState } from "react";

export default function Room3D() {
  // وضعنا الـ Scale الذي ذكرته في بلندر كبداية وافترضنا دوران بـ 90 درجة لتوقيف الشاشة
  const [offset, setOffset] = useState({ x: 0, y: 0.2, z: 0, s: 154.397, rx: Math.PI / 2, ry: 0, rz: 0 }); 

  return (
    <div style={{ width: '100%', height: '100dvh', background: '#0d0d0c', position: 'relative', overflow: 'hidden' }}>
      <NudgeUI offset={offset} setOffset={setOffset} />
      <Canvas
        camera={{ position: [0, 1.5, 4], fov: 50 }}
        shadows
        style={{ position: 'absolute', inset: 0 }}
      >
        <Environment preset="city" />
        <ambientLight intensity={0.5} />
        <spotLight
          position={[5, 10, 5]}
          intensity={1.5}
          angle={0.3}
          penumbra={1}
          castShadow
          shadow-bias={-0.0001}
        />

        <OrbitControls
          makeDefault
          enableZoom={true}
          minDistance={0.5}
          maxDistance={5}
          enablePan={true}
          maxPolarAngle={Math.PI / 2}
        />

        <DeskModel offset={offset} />
      </Canvas>
    </div>
  );
}

useGLTF.preload('/Desk.glb');
