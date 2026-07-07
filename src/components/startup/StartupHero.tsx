'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { MediaSlot, type MediaType } from '@/components/media/MediaSlot';
import { categoryLabels, type Category, type Startup } from '@/data/startups';
import { siteCopy } from '@/data/site';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

// Cinq variantes de hero : média et disposition propres à chaque catégorie.
const HERO_MEDIA: Record<Category, MediaType> = {
  live: 'photo',
  sport: 'photo',
  game: 'photo',
  digital: 'mockup-mobile',
  community: 'photo',
};

const HERO_LAYOUT: Record<Category, string> = {
  live: 'justify-end',
  sport: 'justify-center',
  game: 'justify-end md:flex-row md:items-end md:justify-between',
  digital: 'justify-center md:flex-row md:items-center md:justify-between',
  community: 'justify-end md:pt-40',
};

const MEDIA_RATIO: Record<Category, string> = {
  live: '16/9',
  sport: '16/9',
  game: '16/10',
  digital: '9/16',
  community: '4/3',
};

export function StartupHero({ startup }: { startup: Startup }) {
  const reducedMotion = usePrefersReducedMotion();

  const fadeIn = (delay: number) =>
    reducedMotion
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] as const },
        };

  const kicker = startup.flagship
    ? `${categoryLabels[startup.category]} · ${siteCopy.startup.flagshipTag}`
    : categoryLabels[startup.category];

  return (
    <header
      className={`relative flex min-h-svh flex-col gap-12 bg-surface px-8 pb-16 pt-28 md:px-16 ${HERO_LAYOUT[startup.category]}`}
    >
      <Link
        href="/#startups"
        className="absolute left-8 top-8 text-xs uppercase tracking-caps text-muted transition-colors hover:text-accent md:left-16"
      >
        ← {siteCopy.startup.back}
      </Link>

      <div className="max-w-3xl">
        <motion.p
          {...fadeIn(0)}
          className="text-xs uppercase tracking-caps text-accent"
        >
          {kicker}
        </motion.p>
        <motion.h1
          {...fadeIn(0.1)}
          className="mt-4 font-display text-5xl font-black italic tracking-title md:text-8xl"
        >
          {startup.name}
        </motion.h1>
        <motion.p {...fadeIn(0.2)} className="mt-5 max-w-xl text-xl text-muted">
          {startup.tagline}
        </motion.p>
      </div>

      <motion.div
        {...fadeIn(0.3)}
        className={
          startup.category === 'digital'
            ? 'w-full max-w-60 md:max-w-72'
            : 'w-full max-w-3xl'
        }
      >
        <MediaSlot
          type={HERO_MEDIA[startup.category]}
          slug={startup.slug}
          ratio={MEDIA_RATIO[startup.category]}
        />
      </motion.div>

      <span
        aria-hidden
        className="block h-1.5 w-32 origin-left rotate-(--rotate-signature) bg-accent"
      />
    </header>
  );
}
