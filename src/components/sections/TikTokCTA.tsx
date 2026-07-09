'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Play } from 'lucide-react';
import { MediaSlot } from '@/components/media/MediaSlot';
import { SignatureFader } from '@/components/ui/SignatureFader';
import { useMagneticCursor } from '@/hooks/useMagneticCursor';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { profile } from '@/data/profile';
import { recentMixes } from '@/data/mixes';
import { isDraft, siteCopy } from '@/data/site';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const PROFILE_URL = `https://www.tiktok.com/@${profile.contact.tiktok}`;

function Signet({ mix }: { mix: (typeof recentMixes)[number] }) {
  const hasCaption = !isDraft(mix.caption);
  const href = isDraft(mix.url) ? PROFILE_URL : mix.url;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative aspect-[9/16] w-48 shrink-0 overflow-hidden border border-foreground/10 transition-colors hover:border-accent md:w-60"
    >
      <MediaSlot
        type="photo"
        slug={mix.slug}
        name={hasCaption ? mix.caption : profile.djName}
        surface="#0d0d0d"
        ratio="auto"
        className="h-full w-full"
      />
      <span
        aria-hidden
        className="absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-accent/60 bg-background/40 opacity-80 transition-opacity group-hover:opacity-100"
      >
        <Play size={16} className="ml-0.5 fill-accent text-accent" />
      </span>
      {hasCaption ? (
        <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/90 to-transparent p-3 text-xs text-foreground">
          {mix.caption}
        </span>
      ) : null}
    </a>
  );
}

/**
 * Section TikTok : lien vers le profil + les 5 derniers mixes en
 * signets. Le scroll vertical entraîne un défilement horizontal des
 * signets (section épinglée) ; défilement natif si reduced-motion.
 */
export function TikTokCTA() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const linkRef = useMagneticCursor<HTMLAnchorElement>(0.25);
  const reducedMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      const trackEl = track.current;
      if (reducedMotion || !trackEl || !root.current) return;
      const distance = () => Math.max(0, trackEl.scrollWidth - window.innerWidth);
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
    <section ref={root} className="border-y border-foreground/10 py-24">
      <div className="px-8 md:px-16">
        <p className="text-xs uppercase tracking-caps text-muted">
          {siteCopy.tiktok.label}
        </p>
        <h2 className="mt-4 font-display text-4xl font-black italic tracking-title md:text-6xl">
          {siteCopy.tiktok.title}
        </h2>
        <p className="mt-4 max-w-md text-muted">{siteCopy.tiktok.subtitle}</p>

        <a
          ref={linkRef}
          href={PROFILE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-10 inline-block border-2 border-accent px-8 py-4 text-sm uppercase tracking-caps text-accent transition-[background-color,color] hover:bg-accent hover:text-[#0a0a0a]"
        >
          {siteCopy.tiktok.cta} — @{profile.contact.tiktok}
        </a>

        <SignatureFader className="mt-10 w-32" />
      </div>

      <div
        className={`mt-12 ${reducedMotion ? 'overflow-x-auto' : 'overflow-hidden'}`}
      >
        <div
          ref={track}
          className="flex w-max gap-5 px-8 md:px-16"
        >
          {recentMixes.map((mix) => (
            <Signet key={mix.slug} mix={mix} />
          ))}
        </div>
      </div>
      {!reducedMotion ? (
        <p className="mt-6 px-8 text-[10px] uppercase tracking-caps text-muted md:px-16">
          {siteCopy.tiktok.scrollHint}
        </p>
      ) : null}
    </section>
  );
}
