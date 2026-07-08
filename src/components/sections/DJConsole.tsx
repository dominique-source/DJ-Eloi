'use client';

import { useState } from 'react';
import type { DJEngine, DeckId } from '@/lib/djAudio';
import { DECK_A_BPM } from '@/lib/djAudio';
import { siteCopy } from '@/data/site';

const PAD_KINDS = ['kick', 'hat', 'clap', 'stab'] as const;
const DECK_BPM: Record<DeckId, number> = { a: DECK_A_BPM, b: 126 };
const TICKS = Array.from({ length: 12 }, (_, i) => i * 30);

interface ConsoleProps {
  engine: DJEngine;
  missionIndex: number;
  beat: number;
  onTap: () => void;
  onCrossfade: (value: number) => void;
  onDropStart: () => void;
  onDropEnd: () => void;
  dropHeld: boolean;
}

/** Une platine : jog qui tourne quand le deck joue, play/pause, pads. */
function Deck({
  engine,
  id,
}: {
  engine: DJEngine;
  id: DeckId;
}) {
  const [playing, setPlaying] = useState(true);
  const [flash, setFlash] = useState<string | null>(null);

  const toggle = () => {
    engine.setDeckPlaying(id, !playing);
    setPlaying(!playing);
  };

  const hitPad = (kind: (typeof PAD_KINDS)[number]) => {
    engine.padHit(kind);
    setFlash(kind);
    setTimeout(() => setFlash(null), 150);
  };

  const copy = siteCopy.academy.console;

  return (
    <div className="flex flex-col items-center gap-5">
      {/* jog wheel */}
      <div
        aria-hidden
        className={`platter relative aspect-square w-36 rounded-full border-2 border-accent/40 md:w-44 ${
          playing ? '' : 'platter-paused'
        }`}
      >
        {TICKS.map((angle) => (
          <span
            key={angle}
            className="absolute left-1/2 top-1/2 h-full w-0.5 -translate-x-1/2 -translate-y-1/2"
            style={{ transform: `translate(-50%, -50%) rotate(${angle}deg)` }}
          >
            <span
              className={`mx-auto block w-0.5 bg-accent ${
                angle % 90 === 0 ? 'h-3 opacity-60' : 'h-1.5 opacity-25'
              }`}
            />
          </span>
        ))}
        <span className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/50" />
        <span className="absolute left-1/2 top-2 h-4 w-0.5 -translate-x-1/2 bg-accent" />
      </div>

      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={toggle}
          aria-pressed={playing}
          className={`border px-5 py-2 text-xs uppercase tracking-caps transition-colors ${
            playing
              ? 'border-accent bg-accent text-[#0a0a0a]'
              : 'border-accent text-accent'
          }`}
        >
          {playing ? copy.pause : copy.play}
        </button>
        <span className="text-xs uppercase tracking-caps text-muted">
          {copy.deck} {id.toUpperCase()} · {DECK_BPM[id]} {copy.bpm}
        </span>
      </div>

      {/* pads de performance */}
      <div className="grid w-full max-w-56 grid-cols-2 gap-2">
        {PAD_KINDS.map((kind, index) => (
          <button
            key={kind}
            type="button"
            onPointerDown={() => hitPad(kind)}
            className={`aspect-square border text-[10px] uppercase tracking-caps transition-colors ${
              flash === kind
                ? 'border-accent bg-accent text-[#0a0a0a]'
                : 'border-foreground/20 text-muted hover:border-accent hover:text-accent'
            }`}
          >
            {copy.pads[index]}
          </button>
        ))}
      </div>
    </div>
  );
}

/** La console complète : deux decks, LED de beat, TAP, DROP, filtre, crossfader. */
export function DJConsole({
  engine,
  missionIndex,
  beat,
  onTap,
  onCrossfade,
  onDropStart,
  onDropEnd,
  dropHeld,
}: ConsoleProps) {
  const [crossfade, setCrossfade] = useState(0);
  const [filter, setFilter] = useState(0);
  const copy = siteCopy.academy.console;

  const moveCrossfade = (value: number) => {
    setCrossfade(value);
    engine.setCrossfade(value / 100);
    onCrossfade(value);
  };

  const moveFilter = (value: number) => {
    setFilter(value);
    engine.setFilterCutoff(value / 100);
  };

  const highlight = (mission: number) =>
    missionIndex === mission ? 'border-accent' : 'border-foreground/20';

  return (
    <div className="mt-10 border border-foreground/15 p-6 md:p-10">
      <div className="grid items-start gap-10 lg:grid-cols-[1fr_auto_1fr]">
        <Deck engine={engine} id="a" />

        {/* colonne mixeur */}
        <div className="mx-auto flex w-full max-w-64 flex-col gap-6 lg:w-60">
          {/* LED de beat 1-2-3-4 */}
          <div aria-hidden className="flex justify-between px-1">
            {[1, 2, 3, 4].map((step) => (
              <span
                key={step}
                className={`h-2.5 w-2.5 rounded-full ${
                  beat === step ? 'bg-accent' : 'bg-foreground/15'
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={onTap}
            className={`border-2 py-8 text-sm uppercase tracking-caps text-accent transition-transform active:scale-95 motion-reduce:active:scale-100 ${highlight(0)}`}
          >
            {copy.tap}
          </button>

          <button
            type="button"
            onPointerDown={onDropStart}
            onPointerUp={onDropEnd}
            onPointerLeave={onDropEnd}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') onDropStart();
            }}
            onKeyUp={(event) => {
              if (event.key === 'Enter' || event.key === ' ') onDropEnd();
            }}
            className={`border-2 py-4 text-sm uppercase tracking-caps transition-colors ${
              dropHeld
                ? 'border-accent bg-accent text-[#0a0a0a]'
                : `text-accent ${highlight(2)}`
            }`}
          >
            {copy.drop}
          </button>

          <div>
            <label
              htmlFor="console-filter"
              className="text-[10px] uppercase tracking-caps text-muted"
            >
              {copy.filter}
            </label>
            <input
              id="console-filter"
              type="range"
              min={0}
              max={100}
              value={filter}
              onChange={(event) => moveFilter(Number(event.target.value))}
              className="mt-1 w-full accent-accent"
            />
          </div>

          <div className={`border p-3 ${highlight(1)}`}>
            <div className="flex items-baseline justify-between text-[10px] uppercase tracking-caps text-muted">
              <span>{copy.deck} A</span>
              <span>{copy.crossfader}</span>
              <span>{copy.deck} B</span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              value={crossfade}
              onChange={(event) => moveCrossfade(Number(event.target.value))}
              aria-label={copy.crossfader}
              className="mt-2 w-full accent-accent"
            />
          </div>
        </div>

        <Deck engine={engine} id="b" />
      </div>
    </div>
  );
}
