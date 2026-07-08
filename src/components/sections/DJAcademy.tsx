'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { DJEngine } from '@/lib/djAudio';
import { siteCopy } from '@/data/site';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { DJConsole } from './DJConsole';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

const STORAGE_KEY = 'dj-academy-scores';
const MAX_XP = 300;
const TAPS_REQUIRED = 8;

function rankFor(xp: number): string {
  const ranks = siteCopy.academy.ranks;
  if (xp >= 240) return ranks[3];
  if (xp >= 160) return ranks[2];
  if (xp >= 80) return ranks[1];
  return ranks[0];
}

/** Score 0..100 selon la distance au beat (phase 0 ou 1 = parfait). */
function phaseScore(phases: number[]): number {
  if (phases.length === 0) return 0;
  const average =
    phases.reduce((sum, phase) => sum + Math.min(phase, 1 - phase), 0) /
    phases.length;
  return Math.round(Math.max(0, 100 - average * 250));
}

/** Section jeu vidéo : une vraie console de DJ interactive, missions intégrées. */
export function DJAcademy() {
  const [engine] = useState(() => new DJEngine());
  const [started, setStarted] = useState(false);
  const [muted, setMuted] = useState(false);
  const [scores, setScores] = useState<number[]>([]);
  const [beat, setBeat] = useState(1);
  const [tapCount, setTapCount] = useState(0);
  const [dropHeld, setDropHeld] = useState(false);
  const reducedMotion = usePrefersReducedMotion();

  const tapPhases = useRef<number[]>([]);
  const crossfadeStart = useRef<number | null>(null);
  const crossfadeDone = useRef(false);
  const holding = useRef(false);

  const missionIndex = scores.length;
  const xp = scores.reduce((sum, score) => sum + score, 0);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setScores(JSON.parse(saved) as number[]);
    } catch {
      // stockage indisponible : progression pour la session seulement
    }
    return () => engine.dispose();
  }, [engine]);

  // LED de beat 1-2-3-4, tant que la console est allumée.
  useEffect(() => {
    if (!started || muted || reducedMotion) return;
    let frame = 0;
    const tick = () => {
      setBeat(engine.beatCount());
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [started, muted, reducedMotion, engine]);

  const saveScores = (next: number[]) => {
    setScores(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // stockage indisponible
    }
  };

  const onStart = async () => {
    await engine.init();
    engine.start();
    setStarted(true);
    setMuted(false);
  };

  const onToggleSound = async () => {
    if (muted) {
      await engine.init();
      engine.start();
    } else {
      await engine.suspend();
    }
    setMuted(!muted);
  };

  const onTap = () => {
    const phase = engine.tap();
    if (missionIndex !== 0) return;
    tapPhases.current.push(phase);
    setTapCount(tapPhases.current.length);
    if (tapPhases.current.length >= TAPS_REQUIRED) {
      // La 1re frappe sert à se caler : on la retire du score.
      saveScores([...scores, phaseScore(tapPhases.current.slice(1))]);
    }
  };

  const onCrossfade = (value: number) => {
    if (missionIndex !== 1 || crossfadeDone.current) return;
    if (crossfadeStart.current === null) crossfadeStart.current = performance.now();
    if (value >= 100) {
      crossfadeDone.current = true;
      const elapsed = performance.now() - crossfadeStart.current;
      // En douceur = ni instantané, ni interminable.
      saveScores([...scores, elapsed >= 800 && elapsed <= 8000 ? 100 : 70]);
    }
  };

  const onDropStart = () => {
    if (holding.current) return;
    holding.current = true;
    setDropHeld(true);
    engine.beginBuild();
  };

  const onDropEnd = () => {
    if (!holding.current) return;
    holding.current = false;
    setDropHeld(false);
    const phase = engine.endBuild();
    if (missionIndex === 2) {
      saveScores([...scores, phaseScore([phase])]);
    }
  };

  const onReplay = () => {
    tapPhases.current = [];
    crossfadeStart.current = null;
    crossfadeDone.current = false;
    setTapCount(0);
    engine.setCrossfade(0);
    saveScores([]);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // stockage indisponible
    }
  };

  const mission = siteCopy.academy.missions[missionIndex];

  return (
    <section
      style={{ '--accent': '#00c2ff', '--surface': '#030d12' } as CSSProperties}
      className="bg-surface px-8 py-24 md:px-16"
    >
      <p className="text-xs uppercase tracking-caps text-accent">
        {siteCopy.academy.label}
      </p>
      <h2 className="mt-4 font-display text-4xl font-black italic tracking-title md:text-6xl">
        {siteCopy.academy.title}
      </h2>
      <p className="mt-4 max-w-md text-muted">{siteCopy.academy.subtitle}</p>

      {/* HUD */}
      <div className="mt-12 flex flex-wrap items-center gap-x-10 gap-y-4 border border-foreground/15 px-6 py-4">
        <p className="text-xs uppercase tracking-caps text-muted">
          {siteCopy.academy.rankLabel} —{' '}
          <span className="text-accent">{rankFor(xp)}</span>
        </p>
        <div className="flex min-w-40 flex-1 items-center gap-3">
          <span className="text-xs uppercase tracking-caps text-muted">
            {siteCopy.academy.xp} {xp}/{MAX_XP}
          </span>
          <div className="h-1 flex-1 bg-foreground/10">
            <div
              className="h-full origin-left bg-accent transition-transform duration-500"
              style={{ transform: `scaleX(${xp / MAX_XP})` }}
            />
          </div>
        </div>
        {scores.map((score, index) => (
          <span
            key={siteCopy.academy.missions[index].title}
            className="rounded-full border border-accent px-2 py-0.5 text-[10px] uppercase tracking-caps text-accent"
          >
            {siteCopy.academy.missionDone} {index + 1} · {score}%
          </span>
        ))}
        {started ? (
          <button
            type="button"
            onClick={onToggleSound}
            className="text-xs uppercase tracking-caps text-muted transition-colors hover:text-accent"
          >
            {muted ? siteCopy.academy.soundOn : siteCopy.academy.soundOff}
          </button>
        ) : null}
      </div>

      {!started ? (
        <MagneticButton
          onClick={onStart}
          className="mt-12 border-2 border-accent px-12 py-6 font-display text-2xl font-black italic text-accent hover:bg-accent hover:text-[#0a0a0a]"
        >
          {siteCopy.academy.start}
        </MagneticButton>
      ) : (
        <>
          {/* mission en cours */}
          <div className="mt-10 flex flex-wrap items-baseline gap-x-6 gap-y-2">
            {mission ? (
              <>
                <span className="rounded-full border border-accent px-3 py-1 text-[10px] uppercase tracking-caps text-accent">
                  {siteCopy.academy.missionLabel} {missionIndex + 1}/3 —{' '}
                  {mission.title}
                </span>
                <p className="text-sm text-muted">
                  {mission.instruction}
                  {missionIndex === 0 ? ` (${tapCount}/${TAPS_REQUIRED})` : null}
                </p>
              </>
            ) : (
              <p className="text-sm text-muted">{siteCopy.academy.freePlay}</p>
            )}
          </div>

          <DJConsole
            engine={engine}
            missionIndex={missionIndex}
            beat={beat}
            onTap={onTap}
            onCrossfade={onCrossfade}
            onDropStart={onDropStart}
            onDropEnd={onDropEnd}
            dropHeld={dropHeld}
          />
        </>
      )}

      {missionIndex >= 3 ? (
        <div className="mt-12 flex flex-wrap items-center gap-8">
          <p className="font-display text-3xl font-black italic">
            {siteCopy.academy.finale}{' '}
            <span className="text-accent">{rankFor(xp)}</span>
          </p>
          <button
            type="button"
            onClick={onReplay}
            className="border border-foreground/30 px-5 py-2 text-xs uppercase tracking-caps text-muted transition-colors hover:border-accent hover:text-accent"
          >
            {siteCopy.academy.replay}
          </button>
          <Link
            href="/startups/mixtape-academy"
            className="text-xs uppercase tracking-caps text-accent"
          >
            {siteCopy.academy.conceptLink} →
          </Link>
        </div>
      ) : null}
    </section>
  );
}
