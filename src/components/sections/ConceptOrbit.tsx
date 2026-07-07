'use client';

import Link from 'next/link';
import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { MediaSlot } from '@/components/media/MediaSlot';
import { profile } from '@/data/profile';
import { startups } from '@/data/startups';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

gsap.registerPlugin(useGSAP, ScrollTrigger);

// Ellipse en fraction de la taille du conteneur (perspective légère).
const RADIUS_X = 0.42;
const RADIUS_Y = 0.32;

/** Échelle et présence selon la position sur l'ellipse (bas = premier plan). */
function orbitState(angle: number) {
  const depth = (Math.sin(angle) + 1) / 2;
  return {
    depth,
    scale: 0.55 + 0.6 * depth,
    opacity: 0.45 + 0.55 * depth,
    zIndex: Math.round(5 + depth * 30),
  };
}

function baseAngle(index: number) {
  return (index / startups.length) * Math.PI * 2 + Math.PI / 2;
}

/**
 * Les concepts orbitent autour d'Éloi au scroll : un tour complet pendant
 * la traversée de la section, chaque projet grossit au premier plan et
 * rapetisse derrière. Version statique si prefers-reduced-motion.
 */
export function ConceptOrbit() {
  const container = useRef<HTMLDivElement>(null);
  const size = useRef({ w: 0, h: 0 });
  const reducedMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      const root = container.current;
      if (!root || reducedMotion) return;

      const items = gsap.utils.toArray<HTMLElement>('[data-orbit-item]');
      const measure = () => {
        size.current = { w: root.clientWidth, h: root.clientHeight };
      };
      measure();
      const observer = new ResizeObserver(measure);
      observer.observe(root);

      // Le JS prend le relais du positionnement statique (left/top %).
      gsap.set(items, { left: '50%', top: '50%', xPercent: -50, yPercent: -50 });

      const proxy = { progress: 0 };
      const position = () => {
        const { w, h } = size.current;
        items.forEach((item, index) => {
          const angle = baseAngle(index) + proxy.progress * Math.PI * 2;
          const state = orbitState(angle);
          gsap.set(item, {
            x: Math.cos(angle) * RADIUS_X * w,
            y: Math.sin(angle) * RADIUS_Y * h,
            scale: state.scale,
            opacity: state.opacity,
            zIndex: state.zIndex,
          });
        });
      };
      position();

      gsap.to(proxy, {
        progress: 1,
        ease: 'none',
        onUpdate: position,
        scrollTrigger: {
          trigger: root,
          start: 'top 90%',
          end: 'bottom 10%',
          scrub: 1,
        },
      });

      return () => observer.disconnect();
    },
    { scope: container, dependencies: [reducedMotion] },
  );

  return (
    <div
      ref={container}
      className="relative mx-auto aspect-[4/3] w-full max-w-3xl"
    >
      {/* Éloi au centre */}
      <div className="absolute left-1/2 top-1/2 z-20 w-[34%] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full border border-foreground/15">
        <MediaSlot
          type="portrait"
          slug="dj-king-e"
          name={profile.djName}
          surface="#0d0d0d"
          ratio="1/1"
        />
      </div>

      {/* Les concepts en orbite — positions statiques en SSR, GSAP anime ensuite */}
      {startups.map((startup, index) => {
        const angle = baseAngle(index);
        const state = orbitState(angle);
        return (
          <Link
            key={startup.slug}
            href={`/startups/${startup.slug}`}
            aria-label={startup.name}
            data-orbit-item
            className="group absolute block w-[19%] overflow-hidden rounded-full border border-foreground/15 transition-[border-color] hover:border-accent focus-visible:border-accent"
            style={{
              left: `${50 + Math.cos(angle) * RADIUS_X * 100}%`,
              top: `${50 + Math.sin(angle) * RADIUS_Y * 100}%`,
              transform: `translate(-50%, -50%) scale(${state.scale})`,
              opacity: state.opacity,
              zIndex: state.zIndex,
            }}
          >
            <MediaSlot
              type="photo"
              slug={startup.slug}
              ratio="1/1"
              className="h-full w-full"
            />
          </Link>
        );
      })}
    </div>
  );
}
