'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import type { Mesh } from 'three';

/** Orbe filaire légère qui suit doucement le pointeur. */
function Orb() {
  const mesh = useRef<Mesh>(null);

  useFrame(({ clock, pointer }) => {
    const orb = mesh.current;
    if (!orb) return;
    orb.rotation.y = clock.elapsedTime * 0.12 + pointer.x * 0.35;
    orb.rotation.x = pointer.y * 0.25;
  });

  return (
    <mesh ref={mesh} position={[1.6, 0.4, 0]}>
      <icosahedronGeometry args={[2.4, 1]} />
      <meshBasicMaterial color="#ccff00" wireframe transparent opacity={0.16} />
    </mesh>
  );
}

/** Scène R3F du hero — chargée en dynamic ssr:false, jamais ailleurs. */
export default function HeroScene() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 6], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
    >
      <Orb />
    </Canvas>
  );
}
