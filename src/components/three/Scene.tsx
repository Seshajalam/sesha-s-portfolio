'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense, useState, useEffect } from 'react';
import ParticleField from './ParticleField';
import FloatingShape from './FloatingShape';

export default function Scene() {
  const [webglSupported, setWebglSupported] = useState(true);

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) setWebglSupported(false);
    } catch {
      setWebglSupported(false);
    }
  }, []);

  if (!webglSupported) {
    return (
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-[#0a0a1a] via-[#12122a] to-[#1a1a3e]" />
    );
  }

  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        dpr={[1, 2]}
        gl={{ antialias: false, alpha: true }}
      >
        <Suspense fallback={null}>
          <ParticleField />
          <FloatingShape />
        </Suspense>
      </Canvas>
    </div>
  );
}
