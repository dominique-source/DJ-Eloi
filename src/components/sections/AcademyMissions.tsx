'use client';

import { useRef, useState } from 'react';
import type { DJEngine } from '@/lib/djAudio';
import { siteCopy } from '@/data/site';

const TAPS_REQUIRED = 8;

/** Score 0..100 selon la distance au beat (phase 0 ou 1 = parfait). */
function phaseScore(phases: number[]): number {
  if (phases.length === 0) return 0;
  const average =
    phases.reduce((sum, phase) => sum + Math.min(phase, 1 - phase), 0) /
    phases.length;
  return Math.round(Math.max(0, 100 - average * 250));
}

interface MissionProps {
  engine: DJEngine;
  onComplete: (score: number) => void;
}

export function TempoMission({ engine, onComplete }: MissionProps) {
  const phases = useRef<number[]>([]);
  const [count, setCount] = useState(0);

  const onTap = () => {
    const phase = engine.tap();
    phases.current.push(phase);
    const next = phases.current.length;
    setCount(next);
    if (next >= TAPS_REQUIRED) {
      // La 1re frappe sert à se caler : on la retire du score.
      onComplete(phaseScore(phases.current.slice(1)));
    }
  };

  return (
    <div>
      <button
        type="button"
        onClick={onTap}
        className="flex aspect-square w-40 items-center justify-center border-2 border-accent text-center text-xs uppercase tracking-caps text-accent transition-transform active:scale-95 motion-reduce:active:scale-100"
      >
        {siteCopy.academy.missions[0].action}
      </button>
      <p className="mt-4 text-xs uppercase tracking-caps text-muted" role="status">
        {count} / {TAPS_REQUIRED}
      </p>
    </div>
  );
}

export function CrossfadeMission({ engine, onComplete }: MissionProps) {
  const firstMove = useRef<number | null>(null);
  const done = useRef(false);
  const [value, setValue] = useState(0);

  const onChange = (next: number) => {
    setValue(next);
    engine.setCrossfade(next / 100);
    if (firstMove.current === null) firstMove.current = performance.now();
    if (next >= 100 && !done.current) {
      done.current = true;
      const elapsed = performance.now() - (firstMove.current ?? 0);
      // En douceur = ni instantané, ni interminable.
      onComplete(elapsed >= 800 && elapsed <= 8000 ? 100 : 70);
    }
  };

  return (
    <div>
      <div className="flex items-baseline justify-between text-xs uppercase tracking-caps text-muted">
        <span>Deck A</span>
        <span>Deck B</span>
      </div>
      <input
        type="range"
        min={0}
        max={100}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        aria-label={siteCopy.academy.missions[1].action}
        className="mt-3 w-full accent-accent"
      />
    </div>
  );
}

export function DropMission({
  engine,
  onComplete,
  beat,
}: MissionProps & { beat: number }) {
  const holding = useRef(false);
  const [held, setHeld] = useState(false);

  const begin = () => {
    if (holding.current) return;
    holding.current = true;
    setHeld(true);
    engine.beginBuild();
  };

  const end = () => {
    if (!holding.current) return;
    holding.current = false;
    setHeld(false);
    onComplete(phaseScore([engine.endBuild()]));
  };

  return (
    <div>
      <div aria-hidden className="flex gap-3">
        {[1, 2, 3, 4].map((step) => (
          <span
            key={step}
            className={`font-display text-3xl font-black italic ${
              beat === step ? 'text-accent' : 'text-foreground/20'
            }`}
          >
            {step}
          </span>
        ))}
      </div>
      <button
        type="button"
        onPointerDown={begin}
        onPointerUp={end}
        onPointerLeave={end}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') begin();
        }}
        onKeyUp={(event) => {
          if (event.key === 'Enter' || event.key === ' ') end();
        }}
        className={`mt-5 border-2 px-8 py-5 text-xs uppercase tracking-caps transition-colors ${
          held
            ? 'border-accent bg-accent text-[#0a0a0a]'
            : 'border-accent text-accent'
        }`}
      >
        {siteCopy.academy.missions[2].action}
      </button>
    </div>
  );
}
