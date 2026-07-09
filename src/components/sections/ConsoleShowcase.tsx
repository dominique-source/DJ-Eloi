'use client';

import Link from 'next/link';
import { useRef, useState } from 'react';
import type { CSSProperties, PointerEvent as ReactPointerEvent } from 'react';
import { MediaSlot } from '@/components/media/MediaSlot';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { startups } from '@/data/startups';
import { siteCopy } from '@/data/site';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

const TICK_COUNT = 24;

/**
 * Console géante : une plaque tournante et 5 pads DJ, un par concept.
 * Cliquer un pad ou glisser la plaque change le concept affiché —
 * aucun contrôle par le scroll.
 */
export function ConsoleShowcase() {
  const n = startups.length;
  const wheelRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const lastAngle = useRef(0);
  const rotationDeg = useRef(0);
  const dragAccumDeg = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const reducedMotion = usePrefersReducedMotion();

  const angleAt = (clientX: number, clientY: number) => {
    const rect = wheelRef.current?.getBoundingClientRect();
    if (!rect) return 0;
    return Math.atan2(
      clientY - (rect.top + rect.height / 2),
      clientX - (rect.left + rect.width / 2),
    );
  };

  const onPointerDown = (event: ReactPointerEvent) => {
    dragging.current = true;
    lastAngle.current = angleAt(event.clientX, event.clientY);
    (event.target as HTMLElement).setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event: ReactPointerEvent) => {
    if (!dragging.current || !wheelRef.current) return;
    const angle = angleAt(event.clientX, event.clientY);
    let delta = angle - lastAngle.current;
    if (delta > Math.PI) delta -= Math.PI * 2;
    if (delta < -Math.PI) delta += Math.PI * 2;
    lastAngle.current = angle;

    const deg = (delta * 180) / Math.PI;
    rotationDeg.current += deg;
    wheelRef.current.style.transform = `rotate(${rotationDeg.current}deg)`;

    const threshold = 360 / n;
    dragAccumDeg.current += deg;
    while (dragAccumDeg.current >= threshold) {
      dragAccumDeg.current -= threshold;
      setActiveIndex((prev) => (prev + 1) % n);
    }
    while (dragAccumDeg.current <= -threshold) {
      dragAccumDeg.current += threshold;
      setActiveIndex((prev) => (prev - 1 + n) % n);
    }
  };

  const onPointerUp = () => {
    dragging.current = false;
  };

  const active = startups[activeIndex];

  if (reducedMotion) {
    return (
      <section id="startups" className="px-8 py-24 md:px-16">
        <SectionHeader label={siteCopy.grid.label} title={siteCopy.grid.title} />
        <ul className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {startups.map((startup) => (
            <li key={startup.slug}>
              <Link
                href={`/startups/${startup.slug}`}
                style={{ '--card-accent': startup.palette.accent } as CSSProperties}
                className="group block border border-foreground/10 p-6 transition-colors hover:border-(--card-accent)"
              >
                <MediaSlot type="photo" slug={startup.slug} ratio="4/3" />
                <h3 className="mt-6 font-display text-2xl font-black italic tracking-title transition-colors group-hover:text-(--card-accent)">
                  {startup.name}
                </h3>
                <p className="mt-2 text-sm text-muted">{startup.tagline}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    );
  }

  return (
    <section id="startups" className="px-8 py-24 md:px-16">
      <SectionHeader label={siteCopy.grid.label} title={siteCopy.grid.title} />

      {/* écran : le concept actif, en fondu */}
      <div
        className="relative mt-12 overflow-hidden border border-foreground/10"
        style={{ aspectRatio: '16/9', '--accent': active.palette.accent } as CSSProperties}
      >
        {startups.map((startup, index) => (
          <div
            key={startup.slug}
            className={`absolute inset-0 transition-opacity duration-700 ease-out ${
              index === activeIndex ? 'opacity-100' : 'pointer-events-none opacity-0'
            }`}
          >
            <MediaSlot type="photo" slug={startup.slug} ratio="auto" className="h-full w-full" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/25 to-background/60" />
            <div className="absolute inset-x-6 bottom-6 md:inset-x-10 md:bottom-10">
              <p className="text-xs uppercase tracking-caps text-accent">
                {String(index + 1).padStart(2, '0')} / {String(n).padStart(2, '0')}
              </p>
              <h3 className="mt-3 max-w-2xl font-display text-4xl font-black italic leading-[0.95] tracking-title md:text-7xl">
                {startup.name}
              </h3>
              <p className="mt-3 max-w-md text-muted">{startup.tagline}</p>
              <Link
                href={`/startups/${startup.slug}`}
                className="mt-6 inline-block border border-accent px-6 py-3 text-sm uppercase tracking-caps text-accent transition-[background-color,color] hover:bg-accent hover:text-[#0a0a0a]"
              >
                {siteCopy.startup.discover}
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* console : plaque tournante + 5 pads géants, un par concept */}
      <div className="mt-10 flex flex-col items-center gap-10 md:flex-row md:justify-center md:gap-20">
        <div
          ref={wheelRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerLeave={onPointerUp}
          role="slider"
          aria-label="Plaque tournante — glisser pour naviguer entre les concepts"
          aria-valuemin={0}
          aria-valuemax={n - 1}
          aria-valuenow={activeIndex}
          aria-valuetext={active.name}
          tabIndex={0}
          className="relative aspect-square w-48 shrink-0 cursor-grab touch-none select-none rounded-full border-2 border-accent/50 active:cursor-grabbing md:w-56"
        >
          {Array.from({ length: TICK_COUNT }, (_, i) => (i / TICK_COUNT) * 360).map((deg) => (
            <span
              key={deg}
              aria-hidden
              className="absolute left-1/2 top-1/2 h-full w-px -translate-x-1/2 -translate-y-1/2"
              style={{ transform: `translate(-50%, -50%) rotate(${deg}deg)` }}
            >
              <span
                className={`mx-auto block w-px bg-accent ${deg % 90 === 0 ? 'h-5 opacity-70' : 'h-3 opacity-30'}`}
              />
            </span>
          ))}
          <span className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/60 md:h-[4.5rem] md:w-[4.5rem]" />
          <span className="absolute left-1/2 top-2 h-6 w-px -translate-x-1/2 bg-accent" />
        </div>

        <div className="flex flex-wrap justify-center gap-5 md:gap-6">
          {startups.map((startup, index) => {
            const isActive = index === activeIndex;
            return (
              <button
                key={startup.slug}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={startup.name}
                aria-pressed={isActive}
                style={
                  {
                    '--card-accent': startup.palette.accent,
                    boxShadow: isActive
                      ? '0 0 32px var(--card-accent)'
                      : 'none',
                  } as CSSProperties
                }
                className={`h-28 w-28 shrink-0 overflow-hidden rounded-xl border-2 transition-[border-color,transform] duration-300 md:h-40 md:w-40 ${
                  isActive
                    ? 'scale-105 border-(--card-accent)'
                    : 'border-foreground/15 hover:border-foreground/40'
                }`}
              >
                <MediaSlot
                  type="photo"
                  slug={startup.slug}
                  ratio="1/1"
                  className="pointer-events-none h-full w-full"
                />
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
