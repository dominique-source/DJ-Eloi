'use client';

import Image from 'next/image';
import { useState } from 'react';
import { startups } from '@/data/startups';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

export type MediaType =
  | 'video'
  | 'photo'
  | 'logo'
  | 'mockup-mobile'
  | 'mockup-desktop'
  | 'portrait';

const FILE_BY_TYPE: Record<MediaType, (index: number) => string> = {
  video: () => 'hero.mp4',
  photo: (index) => `gallery-0${index}.jpg`,
  logo: () => 'logo.svg',
  'mockup-mobile': () => 'mockup-mobile.png',
  'mockup-desktop': () => 'mockup-desktop.png',
  portrait: () => 'portrait.jpg',
};

const TAG_BY_TYPE: Record<MediaType, string> = {
  video: 'vidéo',
  photo: 'photo',
  logo: 'logo',
  'mockup-mobile': 'mockup mobile',
  'mockup-desktop': 'mockup desktop',
  portrait: 'portrait',
};

const NOISE_URI = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E")`;

interface MediaSlotProps {
  type: MediaType;
  slug: string;
  index?: number;
  /** ex. "16/9", "3/4" ou "auto" pour remplir le parent */
  ratio?: string;
  /** Fallbacks quand le slug n'est pas une startup (ex. profil du DJ) */
  name?: string;
  surface?: string;
  className?: string;
}

/**
 * Slot média unique du site : charge /public/media/{slug}/… si le
 * fichier existe, sinon rend un placeholder premium (surface de la
 * startup, bruit subtil, monogramme géant, tag du type de média).
 * Ratio réservé : zéro layout shift.
 */
export function MediaSlot({
  type,
  slug,
  index = 1,
  ratio = '16/9',
  name,
  surface,
  className = '',
}: MediaSlotProps) {
  const [failed, setFailed] = useState(false);
  const reducedMotion = usePrefersReducedMotion();

  const startup = startups.find((s) => s.slug === slug);
  const displayName = name ?? startup?.name ?? slug;
  const surfaceColor = surface ?? startup?.palette.surface ?? '#111111';
  const src = `/media/${slug}/${FILE_BY_TYPE[type](index)}`;
  const label = `${displayName} — ${TAG_BY_TYPE[type]}`;

  const monogram = displayName
    .split(/\s+/)
    .map((word) => word[0] ?? '')
    .join('')
    .slice(0, 3)
    .toUpperCase();

  return (
    <div
      role="img"
      aria-label={label}
      className={`relative overflow-hidden ${className}`}
      style={{
        aspectRatio: ratio === 'auto' ? undefined : ratio.replace('/', ' / '),
        containerType: 'inline-size',
        background: surfaceColor,
      }}
    >
      {failed ? (
        <div aria-hidden className="absolute inset-0">
          <div
            className="absolute inset-0"
            style={{ backgroundImage: NOISE_URI, opacity: 0.3 }}
          />
          <span className="absolute inset-0 flex items-center justify-center font-display text-[34cqi] font-black italic text-white opacity-[0.06]">
            {monogram}
          </span>
          <span className="absolute bottom-3 left-3 rounded-full border border-white/15 px-2 py-0.5 text-[10px] uppercase tracking-caps text-white/40">
            {TAG_BY_TYPE[type]}
          </span>
        </div>
      ) : type === 'video' ? (
        <video
          src={src}
          poster={`/media/${slug}/hero.jpg`}
          autoPlay={!reducedMotion}
          muted
          loop
          playsInline
          onError={() => setFailed(true)}
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <Image
          src={src}
          alt={label}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          onError={() => setFailed(true)}
          className="object-cover"
        />
      )}
    </div>
  );
}
