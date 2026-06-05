'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CursorGlow() {
  const [enabled, setEnabled] = useState(false);
  const x = useMotionValue(-300);
  const y = useMotionValue(-300);
  const springX = useSpring(x, { stiffness: 120, damping: 28, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 120, damping: 28, mass: 0.4 });

  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    setEnabled(finePointer);
    if (!finePointer) return;

    const onMove = (event: PointerEvent) => {
      x.set(event.clientX - 190);
      y.set(event.clientY - 190);
    };

    window.addEventListener('pointermove', onMove);
    return () => window.removeEventListener('pointermove', onMove);
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed z-20 h-[380px] w-[380px] rounded-full opacity-70 mix-blend-screen blur-3xl"
      style={{
        x: springX,
        y: springY,
        background:
          'radial-gradient(circle, rgba(108,99,255,0.34) 0%, rgba(0,229,255,0.18) 36%, rgba(251,194,235,0.1) 56%, transparent 72%)',
      }}
    />
  );
}
