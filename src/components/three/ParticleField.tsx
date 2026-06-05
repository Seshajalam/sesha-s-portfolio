'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function ParticleField() {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  const count = typeof window !== 'undefined' && window.innerWidth < 768 ? 650 : 1800;

  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 18;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 13;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 16;

      const t = Math.random();
      colors[i * 3] = 0.45 + t * 0.45;
      colors[i * 3 + 1] = 0.45 + t * 0.5;
      colors[i * 3 + 2] = 0.88 + t * 0.12;
    }

    const maxConnections = count < 800 ? 180 : 520;
    const searchCount = count < 800 ? 220 : 460;
    const connectionPositions: number[] = [];
    const connectionColors: number[] = [];

    for (let i = 0; i < searchCount && connectionPositions.length / 6 < maxConnections; i++) {
      const ix = positions[i * 3];
      const iy = positions[i * 3 + 1];
      const iz = positions[i * 3 + 2];

      for (let j = i + 1; j < searchCount && connectionPositions.length / 6 < maxConnections; j++) {
        const jx = positions[j * 3];
        const jy = positions[j * 3 + 1];
        const jz = positions[j * 3 + 2];
        const distance = Math.hypot(ix - jx, iy - jy, iz - jz);

        if (distance < 1.55) {
          connectionPositions.push(ix, iy, iz, jx, jy, jz);
          connectionColors.push(0.45, 0.35, 1, 0, 0.9, 1);
        }
      }
    }

    return {
      positions,
      colors,
      connectionPositions: new Float32Array(connectionPositions),
      connectionColors: new Float32Array(connectionColors),
      connectionCount: connectionPositions.length / 3,
    };
  }, [count]);

  useFrame((state) => {
    if (!groupRef.current || !meshRef.current || !linesRef.current) return;
    const time = state.clock.getElapsedTime();
    const pointer = state.pointer;
    mouseRef.current.x += (pointer.x * 0.5 - mouseRef.current.x) * 0.02;
    mouseRef.current.y += (pointer.y * 0.5 - mouseRef.current.y) * 0.02;

    groupRef.current.rotation.y = time * 0.045 + mouseRef.current.x * 0.18;
    groupRef.current.rotation.x = Math.sin(time * 0.04) * 0.12 + mouseRef.current.y * 0.14;
    meshRef.current.rotation.z = time * 0.018;
    linesRef.current.rotation.z = -time * 0.01;
  });

  return (
    <group ref={groupRef}>
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particles.connectionCount}
            array={particles.connectionPositions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={particles.connectionCount}
            array={particles.connectionColors}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial
          vertexColors
          transparent
          opacity={0.24}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>

      <points ref={meshRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={count}
            array={particles.positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={count}
            array={particles.colors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.045}
          vertexColors
          transparent
          opacity={0.95}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </group>
  );
}
