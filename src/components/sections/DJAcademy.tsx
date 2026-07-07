'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { DJEngine } from '@/lib/djAudio';
import { siteCopy } from '@/data/site';
import { MagneticButton } from '@/components/ui/MagneticButton';
import {
  CrossfadeMission,
  DropMission,
  TempoMission,
} from './AcademyMissions';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

const STORAGE_KEY = 'dj-academy-scores';
const MAX_XP = 300;

function rankFor(xp: number): string {
  const ranks = siteCopy.academy.ranks;
  if (xp >= 240) return ranks[3];
  if (xp >= 160) return ranks[2];
  if (xp >= 80) return ranks[1];
  return ranks[0];
}

/** Section style jeu vidéo : apprendre les bases du DJing en 3 missions. */
export function DJAcademy() {
  const [engine] = useState(() => new DJEngine());
  const [started, setStarted] = useState(false);
  const [muted, setMuted] = useState(false);
  const [scores, setScores] = useState<number[]>([]);
  const [beat, setBeat] = useState(1);
  const reducedMotion = usePrefersReducedMotion();
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

  // Compteur 1-2-3-4 pour la mission du drop.
  const beatLoop = useRef(0);
  useEffect(() => {
    if (!started || missionIndex !== 2 || reducedMotion) return;
    const tick = () => {
      setBeat(engine.beatCount());
      beatLoop.current = requestAnimationFrame(tick);
    };
    beatLoop.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(beatLoop.current);
  }, [started, missionIndex, reducedMotion, engine]);

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

  const onComplete = (score: number) => {
    const next = [...scores, score];
    setScores(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // stockage indisponible
    }
  };

  const onReplay = () => {
    setScores([]);
    engine.setCrossfade(0);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // stockage indisponible
    }
  };

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
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {siteCopy.academy.missions.map((mission, index) => {
            const status =
              index < missionIndex
                ? 'done'
                : index === missionIndex
                  ? 'active'
                  : 'locked';
            return (
              <div
                key={mission.title}
                className={`border p-6 ${
                  status === 'active'
                    ? 'border-accent'
                    : 'border-foreground/15'
                } ${status === 'locked' ? 'opacity-40' : ''}`}
              >
                <div className="flex items-baseline justify-between">
                  <span className="text-xs text-muted">0{index + 1}</span>
                  <span
                    className={`rounded-full border px-2 py-0.5 text-[10px] uppercase tracking-caps ${
                      status === 'done'
                        ? 'border-accent text-accent'
                        : 'border-foreground/20 text-muted'
                    }`}
                  >
                    {status === 'done'
                      ? `${siteCopy.academy.done} · ${scores[index]}%`
                      : status === 'active'
                        ? siteCopy.academy.active
                        : siteCopy.academy.locked}
                  </span>
                </div>
                <h3 className="mt-6 font-display text-2xl font-black italic tracking-title">
                  {mission.title}
                </h3>
                <p className="mt-2 min-h-12 text-sm text-muted">
                  {mission.instruction}
                </p>
                <div className="mt-6">
                  {status === 'active' && index === 0 ? (
                    <TempoMission engine={engine} onComplete={onComplete} />
                  ) : null}
                  {status === 'active' && index === 1 ? (
                    <CrossfadeMission engine={engine} onComplete={onComplete} />
                  ) : null}
                  {status === 'active' && index === 2 ? (
                    <DropMission
                      engine={engine}
                      onComplete={onComplete}
                      beat={beat}
                    />
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
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
