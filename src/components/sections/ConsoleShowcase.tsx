'use client';

import Link from 'next/link';
import { useRef, useState } from 'react';
import type { CSSProperties, PointerEvent as ReactPointerEvent } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { MediaSlot } from '@/components/media/MediaSlot';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { startups } from '@/data/startups';
import { siteCopy } from '@/data/site';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const STEP_VH = 90; // distance de scroll (en vh) allouée à chaque concept
const TICK_COUNT = 24;

/** Poids 0..1 : 1 quand le concept est actif, retombe à 0 à ±1 pas d'écart. */
function focusFor(continuousPos: number, index: number): number {
  return Math.max(0, 1 - Math.abs(continuousPos - index));
}

/**
 * Console géante : une plaque tournante et 5 pads DJ, un par concept.
 * Le scroll (ou le glisser de la plaque) fait défiler une plaque
 * tournante et zoome en plein écran sur le concept actif.
 */
export function ConsoleShowcase() {
  const n = startups.length;
  const section = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const padRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const wheelRef = useRef<HTMLDivElement>(null);
  const trigger = useRef<ScrollTrigger | null>(null);
  const dragging = useRef(false);
  const lastAngle = useRef(0);
  const activeIndex = useRef(0);
  const [activeIndexState, setActiveIndexState] = useState(0);
  const reducedMotion = usePrefersReducedMotion();

  const applyFocus = (continuousPos: number) => {
    if (wheelRef.current) {
      gsap.set(wheelRef.current, { rotate: continuousPos * 360 });
    }
    const rounded = Math.round(continuousPos);
    if (rounded !== activeIndex.current) {
      activeIndex.current = rounded;
      setActiveIndexState(rounded);
    }
    startups.forEach((startup, index) => {
      const focus = focusFor(continuousPos, index);
      const slide = slideRefs.current[index];
      if (slide) {
        gsap.set(slide, {
          opacity: 0.1 + focus * 0.9,
          scale: 1 + focus * 0.14,
          zIndex: Math.round(focus * 40),
          pointerEvents: focus > 0.55 ? 'auto' : 'none',
        });
      }
      const pad = padRefs.current[index];
      if (pad) {
        gsap.set(pad, {
          scale: 1 + focus * 0.55,
          zIndex: Math.round(10 + focus * 50),
          '--pad-glow': focus,
          borderColor: focus > 0.4 ? startup.palette.accent : 'rgba(245,245,245,0.15)',
        });
      }
    });
  };

  useGSAP(
    () => {
      if (reducedMotion || !section.current) return;

      applyFocus(0);

      const st = ScrollTrigger.create({
        trigger: section.current,
        start: 'top top',
        end: () => `+=${window.innerHeight * (n - 1) * (STEP_VH / 100)}`,
        pin: true,
        scrub: 0.6,
        invalidateOnRefresh: true,
        onUpdate: (self) => applyFocus(self.progress * (n - 1)),
      });
      trigger.current = st;

      return () => {
        trigger.current = null;
      };
    },
    { scope: section, dependencies: [reducedMotion] },
  );

  const scrollToIndex = (index: number) => {
    const st = trigger.current;
    if (!st) return;
    const target = st.start + (index / (n - 1)) * (st.end - st.start);
    window.scrollTo({ top: target, behavior: 'smooth' });
  };

  const angleAt = (clientX: number, clientY: number) => {
    const rect = wheelRef.current?.getBoundingClientRect();
    if (!rect) return 0;
    return Math.atan2(clientY - (rect.top + rect.height / 2), clientX - (rect.left + rect.width / 2));
  };

  const onPointerDown = (event: ReactPointerEvent) => {
    if (!trigger.current) return;
    dragging.current = true;
    lastAngle.current = angleAt(event.clientX, event.clientY);
    (event.target as HTMLElement).setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event: ReactPointerEvent) => {
    if (!dragging.current || !trigger.current) return;
    const angle = angleAt(event.clientX, event.clientY);
    let delta = angle - lastAngle.current;
    if (delta > Math.PI) delta -= Math.PI * 2;
    if (delta < -Math.PI) delta += Math.PI * 2;
    lastAngle.current = angle;
    const stepScroll = (trigger.current.end - trigger.current.start) / (n - 1);
    window.scrollBy(0, (-delta / (Math.PI * 2)) * stepScroll * 2.4);
  };

  const onPointerUp = () => {
    dragging.current = false;
  };

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
    <section id="startups" ref={section} className="relative">
      <div className="relative h-screen w-full overflow-hidden bg-background">
        {startups.map((startup, index) => (
          <div
            key={startup.slug}
            ref={(el) => {
              slideRefs.current[index] = el;
            }}
            className="absolute inset-0"
            style={{ '--accent': startup.palette.accent } as CSSProperties}
          >
            <MediaSlot
              type="photo"
              slug={startup.slug}
              ratio="auto"
              className="h-full w-full"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-background/70" />
            <div className="absolute inset-x-8 bottom-40 md:inset-x-16 md:bottom-48">
              <p className="text-xs uppercase tracking-caps text-accent">
                {String(index + 1).padStart(2, '0')} / {String(n).padStart(2, '0')}
              </p>
              <h3 className="mt-4 max-w-2xl font-display text-5xl font-black italic leading-[0.95] tracking-title md:text-8xl">
                {startup.name}
              </h3>
              <p className="mt-4 max-w-md text-lg text-muted">{startup.tagline}</p>
              <Link
                href={`/startups/${startup.slug}`}
                className="mt-8 inline-block border border-accent px-6 py-3 text-sm uppercase tracking-caps text-accent transition-[background-color,color] hover:bg-accent hover:text-[#0a0a0a]"
              >
                {siteCopy.flagshipStory.cta}
              </Link>
            </div>
          </div>
        ))}

        {/* HUD console : plaque tournante + 5 pads géants, un par concept */}
        <div className="absolute inset-x-0 bottom-0 z-50 flex flex-col items-center gap-6 border-t border-foreground/10 bg-background/70 px-6 py-6 backdrop-blur-md md:flex-row md:justify-center md:gap-12 md:px-16">
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
            aria-valuenow={activeIndexState}
            aria-valuetext={startups[activeIndexState]?.name}
            tabIndex={0}
            className="relative aspect-square w-24 shrink-0 cursor-grab touch-none select-none rounded-full border-2 border-accent/50 active:cursor-grabbing md:w-28"
          >
            {Array.from({ length: TICK_COUNT }, (_, i) => (i / TICK_COUNT) * 360).map((deg) => (
              <span
                key={deg}
                aria-hidden
                className="absolute left-1/2 top-1/2 h-full w-px -translate-x-1/2 -translate-y-1/2"
                style={{ transform: `translate(-50%, -50%) rotate(${deg}deg)` }}
              >
                <span
                  className={`mx-auto block w-px bg-accent ${deg % 90 === 0 ? 'h-2.5 opacity-70' : 'h-1.5 opacity-30'}`}
                />
              </span>
            ))}
            <span className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/60 md:h-9 md:w-9" />
            <span className="absolute left-1/2 top-1 h-3 w-px -translate-x-1/2 bg-accent" />
          </div>

          <div className="flex gap-3 md:gap-4">
            {startups.map((startup, index) => (
              <button
                key={startup.slug}
                ref={(el) => {
                  padRefs.current[index] = el;
                }}
                type="button"
                onClick={() => scrollToIndex(index)}
                aria-label={startup.name}
                style={
                  {
                    '--pad-glow': 0,
                    boxShadow: '0 0 calc(var(--pad-glow) * 26px) var(--card-accent, transparent)',
                    '--card-accent': startup.palette.accent,
                  } as CSSProperties
                }
                className="h-14 w-14 shrink-0 overflow-hidden rounded-xl border-2 border-foreground/15 transition-[border-color] md:h-20 md:w-20"
              >
                <MediaSlot
                  type="photo"
                  slug={startup.slug}
                  ratio="1/1"
                  className="pointer-events-none h-full w-full"
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
