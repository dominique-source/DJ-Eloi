'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import type { Group } from 'three';

const ACCENT = '#ccff00';
const BASE_TILT = -0.8;
const OUTER_R = 1.1;
const TICK_COUNT = 20;

/** Repères radiaux façon jog wheel numérique (DDJ/CDJ), pas des sillons vinyle. */
function Ticks() {
  const ticks = useMemo(
    () =>
      Array.from({ length: TICK_COUNT }, (_, i) => {
        const angle = (i / TICK_COUNT) * Math.PI * 2;
        const major = i % 5 === 0;
        const length = major ? 0.17 : 0.09;
        const mid = OUTER_R - 0.05 - length / 2;
        return {
          key: i,
          length,
          major,
          x: Math.cos(angle) * mid,
          y: Math.sin(angle) * mid,
          rot: angle - Math.PI / 2,
        };
      }),
    [],
  );

  return (
    <>
      {ticks.map((t) => (
        <mesh key={t.key} position={[t.x, t.y, 0]} rotation={[0, 0, t.rot]}>
          <cylinderGeometry args={[0.009, 0.009, t.length, 6]} />
          <meshBasicMaterial
            color={ACCENT}
            transparent
            opacity={t.major ? 0.4 : 0.2}
          />
        </mesh>
      ))}
    </>
  );
}

/** Jog wheel numérique filaire : tourne en continu, suit doucement le pointeur. */
function Turntable() {
  const tilt = useRef<Group>(null);
  const spin = useRef<Group>(null);

  useFrame(({ clock, pointer }) => {
    if (spin.current) {
      spin.current.rotation.z = clock.elapsedTime * 0.55;
    }
    if (tilt.current) {
      tilt.current.rotation.x = BASE_TILT + pointer.y * 0.1;
      tilt.current.rotation.y = pointer.x * 0.25;
    }
  });

  return (
    <group ref={tilt} position={[1.6, 0.7, 0]} rotation={[BASE_TILT, 0, 0]}>
      <group ref={spin}>
        {/* anneau extérieur du jog wheel */}
        <mesh>
          <torusGeometry args={[OUTER_R, 0.008, 8, 72]} />
          <meshBasicMaterial color={ACCENT} transparent opacity={0.22} />
        </mesh>

        <Ticks />

        {/* indicateur de position — un repère plus lumineux, seul signe visible de rotation */}
        <mesh position={[0, (0.4 + OUTER_R - 0.05) / 2, 0]}>
          <cylinderGeometry args={[0.014, 0.014, OUTER_R - 0.05 - 0.4, 8]} />
          <meshBasicMaterial color={ACCENT} transparent opacity={0.55} />
        </mesh>

        {/* moyeu central — écran du jog wheel */}
        <mesh>
          <torusGeometry args={[0.4, 0.01, 8, 48]} />
          <meshBasicMaterial color={ACCENT} transparent opacity={0.4} />
        </mesh>
        <mesh>
          <circleGeometry args={[0.37, 48]} />
          <meshBasicMaterial color={ACCENT} transparent opacity={0.07} />
        </mesh>
        <mesh>
          <ringGeometry args={[0.1, 0.11, 32]} />
          <meshBasicMaterial color={ACCENT} transparent opacity={0.4} />
        </mesh>
      </group>
    </group>
  );
}

/** Scène R3F du hero — chargée en dynamic ssr:false, jamais ailleurs. */
export default function HeroScene() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 6], fov: 45 }}
      gl={{ antialias: true, alpha: true, preserveDrawingBuffer: true }}
    >
      <Turntable />
    </Canvas>
  );
}
