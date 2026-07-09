'use client';

import dynamic from 'next/dynamic';
import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { MediaSlot } from '@/components/media/MediaSlot';
import { SignatureFader } from '@/components/ui/SignatureFader';
import { profile } from '@/data/profile';
import { siteCopy } from '@/data/site';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const HeroScene = dynamic(() => import('./HeroScene'), { ssr: false });

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (reducedMotion) return;
      gsap.from('[data-hero-word]', {
        yPercent: 120,
        duration: 1,
        ease: 'expo.out',
        stagger: 0.08,
        delay: 0.7,
      });
      gsap.from('[data-hero-bar]', {
        scaleX: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: '+=400',
          scrub: true,
        },
      });
    },
    { scope: root, dependencies: [reducedMotion] },
  );

  const words = profile.djName.split(' ');

  return (
    <section
      ref={root}
      className="relative flex h-svh flex-col justify-end overflow-hidden px-8 pb-24 md:px-16"
    >
      <div className="absolute inset-0" aria-hidden>
        <MediaSlot
          type="photo"
          slug="dj-king-e"
          name={profile.djName}
          surface="#0d0d0d"
          ratio="auto"
          className="h-full w-full"
        />
        <div className="absolute inset-0 bg-background/60" />
      </div>

      {!reducedMotion && (
        <div className="pointer-events-none absolute inset-0 z-10" aria-hidden>
          <HeroScene />
        </div>
      )}

      <div className="relative z-20">
        <h1 className="font-display text-[14vw] font-black italic leading-[0.92] tracking-title md:text-[9vw]">
          {words.map((word, wordIndex) => (
            <span
              key={`${word}-${wordIndex}`}
              className="inline-block overflow-hidden pr-[0.18em] align-top"
            >
              <span data-hero-word className="inline-block">
                {word}
              </span>
            </span>
          ))}
        </h1>
      </div>

      <SignatureFader
        data-hero-bar
        autoSlide={false}
        className="absolute bottom-10 left-8 right-8 z-20 md:left-16 md:right-16"
      />
      <p className="absolute bottom-3 left-8 z-20 text-[10px] uppercase tracking-caps text-muted md:left-16">
        {siteCopy.hero.scrollHint}
      </p>
    </section>
  );
}
