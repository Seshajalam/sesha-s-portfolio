'use client';

import { motion } from 'framer-motion';
import { MouseEvent, ReactNode, useEffect, useState } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  tilt?: boolean;
}

export default function GlassCard({
  children,
  className = '',
  hover = true,
  tilt = false,
}: GlassCardProps) {
  const [canTilt, setCanTilt] = useState(false);
  const [rotation, setRotation] = useState({ rotateX: 0, rotateY: 0 });

  useEffect(() => {
    setCanTilt(tilt && window.matchMedia('(pointer: fine)').matches);
  }, [tilt]);

  const handleMove = (event: MouseEvent<HTMLDivElement>) => {
    if (!canTilt) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const rotateY = ((x / rect.width) - 0.5) * 14;
    const rotateX = ((0.5 - y / rect.height)) * 14;
    setRotation({ rotateX, rotateY });
  };

  const handleLeave = () => {
    if (!canTilt) return;
    setRotation({ rotateX: 0, rotateY: 0 });
  };

  return (
    <motion.div
      whileHover={hover ? { y: -5, scale: 1.02 } : undefined}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{
        rotateX: rotation.rotateX,
        rotateY: rotation.rotateY,
        transformStyle: 'preserve-3d',
      }}
      className={`glass relative overflow-hidden rounded-2xl p-6 transition-shadow duration-300 hover:shadow-[0_0_34px_rgba(108,99,255,0.16)] ${className}`}
    >
      {children}
    </motion.div>
  );
}
