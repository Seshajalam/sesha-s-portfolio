'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function FloatingShape() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.getElapsedTime();
    groupRef.current.rotation.x = time * 0.12;
    groupRef.current.rotation.y = time * 0.2;
    groupRef.current.rotation.z = Math.sin(time * 0.3) * 0.18;
    groupRef.current.position.y = Math.sin(time * 0.55) * 0.35;
  });

  return (
    <group ref={groupRef} position={[2.35, 0.1, -2.15]}>
      <mesh>
        <icosahedronGeometry args={[1.65, 2]} />
        <meshBasicMaterial
          color="#6c63ff"
          wireframe
          transparent
          opacity={0.26}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.05, 0.012, 12, 96]} />
        <meshBasicMaterial
          color="#00e5ff"
          transparent
          opacity={0.34}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      <mesh rotation={[0.45, 0.25, 0.85]}>
        <torusGeometry args={[2.3, 0.01, 12, 96]} />
        <meshBasicMaterial
          color="#fbc2eb"
          transparent
          opacity={0.2}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}
