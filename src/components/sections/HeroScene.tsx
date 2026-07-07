'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import type { Group } from 'three';

const ACCENT = '#ccff00';
const BASE_TILT = -0.85;
const JOG_R = 0.8;
const TICK_COUNT = 16;

/** Une jog wheel numérique : anneau, repères radiaux, moyeu, indicateur qui tourne. */
function JogWheel({ x, speed }: { x: number; speed: number }) {
  const spin = useRef<Group>(null);

  useFrame(({ clock }) => {
    if (spin.current) spin.current.rotation.z = clock.elapsedTime * speed;
  });

  const ticks = useMemo(
    () =>
      Array.from({ length: TICK_COUNT }, (_, i) => {
        const angle = (i / TICK_COUNT) * Math.PI * 2;
        const major = i % 4 === 0;
        const length = major ? 0.14 : 0.07;
        const mid = 0.72 - length / 2;
        return {
          key: i,
          length,
          major,
          px: Math.cos(angle) * mid,
          py: Math.sin(angle) * mid,
          rot: angle - Math.PI / 2,
        };
      }),
    [],
  );

  return (
    <group position={[x, 0.35, 0]}>
      <group ref={spin}>
        <mesh>
          <torusGeometry args={[JOG_R, 0.008, 8, 72]} />
          <meshBasicMaterial color={ACCENT} transparent opacity={0.25} />
        </mesh>
        {ticks.map((t) => (
          <mesh key={t.key} position={[t.px, t.py, 0]} rotation={[0, 0, t.rot]}>
            <cylinderGeometry args={[0.008, 0.008, t.length, 6]} />
            <meshBasicMaterial
              color={ACCENT}
              transparent
              opacity={t.major ? 0.38 : 0.18}
            />
          </mesh>
        ))}
        {/* indicateur de position */}
        <mesh position={[0, 0.51, 0]}>
          <cylinderGeometry args={[0.012, 0.012, 0.42, 6]} />
          <meshBasicMaterial color={ACCENT} transparent opacity={0.55} />
        </mesh>
        {/* moyeu / écran central */}
        <mesh>
          <torusGeometry args={[0.28, 0.009, 8, 48]} />
          <meshBasicMaterial color={ACCENT} transparent opacity={0.4} />
        </mesh>
        <mesh>
          <circleGeometry args={[0.26, 48]} />
          <meshBasicMaterial color={ACCENT} transparent opacity={0.07} />
        </mesh>
        <mesh>
          <ringGeometry args={[0.07, 0.08, 32]} />
          <meshBasicMaterial color={ACCENT} transparent opacity={0.4} />
        </mesh>
      </group>
    </group>
  );
}

/** Rangée de 8 pads de performance sous une jog wheel. */
function PadGrid({ x, hotRow, hotCol }: { x: number; hotRow: number; hotCol: number }) {
  const offsets = [-0.42, -0.14, 0.14, 0.42];
  return (
    <>
      {[0, 1].map((row) =>
        offsets.map((dx, col) => (
          <mesh key={`${row}-${col}`} position={[x + dx, -0.92 - row * 0.26, 0]}>
            <boxGeometry args={[0.18, 0.18, 0.01]} />
            <meshBasicMaterial
              color={ACCENT}
              transparent
              opacity={row === hotRow && col === hotCol ? 0.35 : 0.1}
            />
          </mesh>
        )),
      )}
    </>
  );
}

/** Section mixeur centrale : EQ, faders de canaux, crossfader. */
function Mixer() {
  const knobCols = [-0.3, 0, 0.3];
  const knobRows = [0.85, 0.55];
  return (
    <>
      {knobRows.map((y) =>
        knobCols.map((x) => (
          <mesh key={`${x}-${y}`} position={[x, y, 0]}>
            <torusGeometry args={[0.05, 0.011, 6, 24]} />
            <meshBasicMaterial color={ACCENT} transparent opacity={0.3} />
          </mesh>
        )),
      )}
      {/* faders de canaux */}
      {[
        { x: -0.28, knobY: -0.08 },
        { x: 0.28, knobY: -0.42 },
      ].map((fader) => (
        <group key={fader.x}>
          <mesh position={[fader.x, -0.25, 0]}>
            <boxGeometry args={[0.012, 0.8, 0.01]} />
            <meshBasicMaterial color={ACCENT} transparent opacity={0.22} />
          </mesh>
          <mesh position={[fader.x, fader.knobY, 0.01]}>
            <boxGeometry args={[0.16, 0.05, 0.02]} />
            <meshBasicMaterial color={ACCENT} transparent opacity={0.42} />
          </mesh>
        </group>
      ))}
      {/* crossfader */}
      <mesh position={[0, -1.02, 0]}>
        <boxGeometry args={[0.6, 0.012, 0.01]} />
        <meshBasicMaterial color={ACCENT} transparent opacity={0.22} />
      </mesh>
      <mesh position={[0.08, -1.02, 0.01]}>
        <boxGeometry args={[0.06, 0.14, 0.02]} />
        <meshBasicMaterial color={ACCENT} transparent opacity={0.42} />
      </mesh>
    </>
  );
}

/** Châssis du contrôleur : contour rectangulaire + séparations de sections. */
function Chassis() {
  return (
    <>
      <mesh position={[0, 1.32, 0]}>
        <boxGeometry args={[4.7, 0.014, 0.02]} />
        <meshBasicMaterial color={ACCENT} transparent opacity={0.18} />
      </mesh>
      <mesh position={[0, -1.32, 0]}>
        <boxGeometry args={[4.7, 0.014, 0.02]} />
        <meshBasicMaterial color={ACCENT} transparent opacity={0.18} />
      </mesh>
      <mesh position={[-2.35, 0, 0]}>
        <boxGeometry args={[0.014, 2.65, 0.02]} />
        <meshBasicMaterial color={ACCENT} transparent opacity={0.18} />
      </mesh>
      <mesh position={[2.35, 0, 0]}>
        <boxGeometry args={[0.014, 2.65, 0.02]} />
        <meshBasicMaterial color={ACCENT} transparent opacity={0.18} />
      </mesh>
      {[-0.62, 0.62].map((x) => (
        <mesh key={x} position={[x, 0, 0]}>
          <boxGeometry args={[0.008, 2.64, 0.02]} />
          <meshBasicMaterial color={ACCENT} transparent opacity={0.08} />
        </mesh>
      ))}
    </>
  );
}

/** Contrôleur DJ complet : deux platines, pads, mixeur — suit doucement le pointeur. */
function Controller() {
  const tilt = useRef<Group>(null);

  useFrame(({ pointer }) => {
    if (tilt.current) {
      tilt.current.rotation.x = BASE_TILT + pointer.y * 0.1;
      tilt.current.rotation.y = pointer.x * 0.22;
    }
  });

  return (
    <group
      ref={tilt}
      position={[1.55, 0.5, 0]}
      rotation={[BASE_TILT, 0, 0]}
      scale={0.92}
    >
      <Chassis />
      <JogWheel x={-1.5} speed={0.55} />
      <JogWheel x={1.5} speed={-0.4} />
      <PadGrid x={-1.5} hotRow={0} hotCol={1} />
      <PadGrid x={1.5} hotRow={1} hotCol={2} />
      <Mixer />
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
      <Controller />
    </Canvas>
  );
}
