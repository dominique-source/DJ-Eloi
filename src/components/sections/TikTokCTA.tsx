'use client';

import { useMagneticCursor } from '@/hooks/useMagneticCursor';
import { SignatureFader } from '@/components/ui/SignatureFader';
import { profile } from '@/data/profile';
import { siteCopy } from '@/data/site';

/** Lien vers les mixes d'Éloi sur TikTok — remplace l'ancienne galerie. */
export function TikTokCTA() {
  const ref = useMagneticCursor<HTMLAnchorElement>(0.25);

  return (
    <section className="border-y border-foreground/10 px-8 py-24 md:px-16">
      <p className="text-xs uppercase tracking-caps text-muted">
        {siteCopy.tiktok.label}
      </p>
      <h2 className="mt-4 font-display text-4xl font-black italic tracking-title md:text-6xl">
        {siteCopy.tiktok.title}
      </h2>
      <p className="mt-4 max-w-md text-muted">{siteCopy.tiktok.subtitle}</p>

      <a
        ref={ref}
        href={`https://www.tiktok.com/@${profile.contact.tiktok}`}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-10 inline-block border-2 border-accent px-8 py-4 text-sm uppercase tracking-caps text-accent transition-[background-color,color] hover:bg-accent hover:text-[#0a0a0a]"
      >
        {siteCopy.tiktok.cta} — @{profile.contact.tiktok}
      </a>

      <SignatureFader className="mt-10 w-32" />
    </section>
  );
}
