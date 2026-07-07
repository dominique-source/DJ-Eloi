'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { siteCopy } from '@/data/site';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

gsap.registerPlugin(useGSAP, ScrollTrigger);

/** Texte révélé mot à mot au scroll (GSAP scrub). */
export function Manifesto() {
  const root = useRef<HTMLElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (reducedMotion) return;
      const words = gsap.utils.toArray<HTMLElement>('[data-mword]');
      gsap.set(words, { opacity: 0.15 });
      gsap.to(words, {
        opacity: 1,
        stagger: 0.04,
        ease: 'none',
        scrollTrigger: {
          trigger: root.current,
          start: 'top 70%',
          end: 'bottom 55%',
          scrub: true,
        },
      });
    },
    { scope: root, dependencies: [reducedMotion] },
  );

  return (
    <section ref={root} className="px-8 py-32 md:px-16 md:py-48">
      <p className="text-xs uppercase tracking-caps text-muted">
        {siteCopy.manifesto.label}
      </p>
      <p className="mt-8 max-w-4xl font-display text-3xl font-black italic leading-tight tracking-title md:text-5xl">
        {siteCopy.manifesto.text.split(' ').map((word, index) => (
          <span
            key={`${word}-${index}`}
            data-mword
            className="inline-block pr-[0.25em]"
          >
            {word}
          </span>
        ))}
      </p>
    </section>
  );
}
