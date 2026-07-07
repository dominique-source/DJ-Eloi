'use client';

import Link from 'next/link';
import { useRef } from 'react';
import type { CSSProperties } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { categoryLabels, flagships, type Startup } from '@/data/startups';
import { siteCopy } from '@/data/site';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { useMagneticCursor } from '@/hooks/useMagneticCursor';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

gsap.registerPlugin(useGSAP, ScrollTrigger);

function FlagshipPanel({ startup, order }: { startup: Startup; order: number }) {
  const ctaRef = useMagneticCursor<HTMLAnchorElement>(0.25);

  return (
    <article
      className="flex h-[80svh] w-screen shrink-0 flex-col justify-center px-8 md:px-16"
      style={
        {
          background: startup.palette.surface,
          '--accent': startup.palette.accent,
        } as CSSProperties
      }
    >
      <p className="text-xs uppercase tracking-caps text-accent">
        {siteCopy.startup.flagshipTag} 0{order} — {categoryLabels[startup.category]}
      </p>
      <h3 className="mt-4 max-w-3xl font-display text-5xl font-black italic tracking-title md:text-7xl">
        {startup.name}
      </h3>
      <p className="mt-4 max-w-xl text-lg text-muted">{startup.tagline}</p>
      <div className="mt-10 flex flex-wrap gap-12">
        {startup.stats.slice(0, 2).map((stat) => (
          <div key={stat.label}>
            <p className="font-display text-4xl font-black italic text-accent">
              {stat.value}
            </p>
            <p className="mt-1 text-xs uppercase tracking-caps text-muted">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
      <Link
        ref={ctaRef}
        href={`/startups/${startup.slug}`}
        className="mt-12 inline-block w-fit border border-accent px-6 py-3 text-sm uppercase tracking-caps text-accent transition-[transform,background-color,color] duration-200 hover:bg-accent hover:text-[#0a0a0a]"
      >
        {siteCopy.flagshipStory.cta}
      </Link>
    </article>
  );
}

/** Storytelling horizontal GSAP : les concepts phares comme panneaux keynote. */
export function FlagshipStory() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      const trackEl = track.current;
      if (reducedMotion || !trackEl || !root.current) return;
      const distance = () => trackEl.scrollWidth - window.innerWidth;
      gsap.to(trackEl, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: () => `+=${distance()}`,
          scrub: true,
          pin: true,
          invalidateOnRefresh: true,
        },
      });
    },
    { scope: root, dependencies: [reducedMotion] },
  );

  return (
    <section ref={root} className="overflow-hidden py-12">
      <div className="px-8 pb-10 md:px-16">
        <SectionHeader
          label={siteCopy.flagshipStory.label}
          title={siteCopy.flagshipStory.title}
        />
      </div>
      <div
        ref={track}
        className={reducedMotion ? 'flex flex-col' : 'flex w-max'}
      >
        {flagships.map((startup, index) => (
          <FlagshipPanel key={startup.slug} startup={startup} order={index + 1} />
        ))}
      </div>
    </section>
  );
}
