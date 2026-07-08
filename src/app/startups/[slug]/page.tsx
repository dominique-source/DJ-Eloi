import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import type { CSSProperties } from 'react';
import { startups } from '@/data/startups';
import { profile } from '@/data/profile';
import { StartupHero } from '@/components/startup/StartupHero';
import { StartupDetails } from '@/components/startup/StartupDetails';
import { StartupNav } from '@/components/startup/StartupNav';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return startups.map((startup) => ({ slug: startup.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const startup = startups.find((s) => s.slug === slug);
  if (!startup) return {};
  return {
    title: `${startup.name} — ${profile.djName}`,
    description: startup.tagline,
  };
}

export default async function StartupPage({ params }: PageProps) {
  const { slug } = await params;
  const index = startups.findIndex((s) => s.slug === slug);
  if (index === -1) notFound();

  const startup = startups[index];
  const prev = startups[(index - 1 + startups.length) % startups.length];
  const next = startups[(index + 1) % startups.length];

  return (
    <main
      style={
        {
          '--accent': startup.palette.accent,
          '--surface': startup.palette.surface,
        } as CSSProperties
      }
    >
      <StartupHero startup={startup} />
      <StartupDetails startup={startup} />
      <StartupNav prev={prev} next={next} />
    </main>
  );
}
