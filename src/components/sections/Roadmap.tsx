'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { flagships } from '@/data/startups';
import { siteCopy } from '@/data/site';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

gsap.registerPlugin(useGSAP, ScrollTrigger);

/** Timeline verticale sticky : la barre signature grandit et allume les jalons. */
export function Roadmap() {
  const root = useRef<HTMLElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (reducedMotion) return;
      gsap.from('[data-road-bar]', {
        scaleY: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: '[data-road-list]',
          start: 'top 75%',
          end: 'bottom 60%',
          scrub: true,
        },
      });
      gsap.utils.toArray<HTMLElement>('[data-road-item]').forEach((item) => {
        gsap.from(item, {
          opacity: 0.2,
          x: 24,
          duration: 0.5,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        });
      });
    },
    { scope: root, dependencies: [reducedMotion] },
  );

  return (
    <section
      ref={root}
      className="grid gap-12 px-8 py-24 md:grid-cols-[1fr_2fr] md:px-16"
    >
      <div className="md:sticky md:top-24 md:self-start">
        <SectionHeader label={siteCopy.roadmap.label} title={siteCopy.roadmap.title} />
        <p className="mt-6 max-w-xs text-sm text-muted">{siteCopy.roadmap.note}</p>
      </div>

      <div data-road-list className="relative pl-8">
        <span
          data-road-bar
          aria-hidden
          className="absolute left-0 top-0 h-full w-1 origin-top bg-accent"
        />
        {flagships.map((flagship) => (
          <div key={flagship.slug} className="mb-16 last:mb-0">
            <h3 className="font-display text-2xl font-black italic tracking-title">
              {flagship.name}
            </h3>
            {flagship.timeline?.map((step) => (
              <div
                key={step.period}
                data-road-item
                className="mt-6 grid gap-1 md:grid-cols-[150px_1fr]"
              >
                <span className="text-xs uppercase tracking-caps text-accent">
                  {step.period}
                </span>
                <p className="text-sm leading-relaxed text-muted">
                  {step.milestone}
                </p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
