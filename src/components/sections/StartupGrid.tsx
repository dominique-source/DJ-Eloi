'use client';

import Link from 'next/link';
import { useState } from 'react';
import type { CSSProperties } from 'react';
import { categoryLabels, startups, type Category } from '@/data/startups';
import { siteCopy } from '@/data/site';
import { SectionHeader } from '@/components/ui/SectionHeader';

const categories = (Object.keys(categoryLabels) as Category[]).filter((category) =>
  startups.some((s) => s.category === category),
);

/** Grille filtrable des concepts DJ — accent visible au survol seulement. */
export function StartupGrid() {
  const [filter, setFilter] = useState<Category | 'all'>('all');
  const visible =
    filter === 'all' ? startups : startups.filter((s) => s.category === filter);

  return (
    <section id="startups" className="px-8 py-24 md:px-16">
      <SectionHeader label={siteCopy.grid.label} title={siteCopy.grid.title} />

      <div
        role="group"
        aria-label={siteCopy.grid.filterAria}
        className="mt-10 flex flex-wrap gap-2"
      >
        {(['all', ...categories] as const).map((category) => {
          const active = filter === category;
          return (
            <button
              key={category}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(category)}
              className={`rounded-full border px-4 py-1.5 text-xs uppercase tracking-caps transition-colors ${
                active
                  ? 'border-accent bg-accent text-[#0a0a0a]'
                  : 'border-foreground/20 text-muted hover:border-foreground/50 hover:text-foreground'
              }`}
            >
              {category === 'all' ? siteCopy.grid.all : categoryLabels[category]}
            </button>
          );
        })}
      </div>

      <ul className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {visible.map((startup) => (
          <li key={startup.slug}>
            <Link
              href={`/startups/${startup.slug}`}
              style={{ '--card-accent': startup.palette.accent } as CSSProperties}
              className="group block h-full border border-foreground/10 p-6 transition-[transform,border-color] duration-300 hover:border-(--card-accent) hover:[transform:perspective(900px)_rotateX(3deg)_rotateY(-3deg)_translateY(-4px)] focus-visible:border-(--card-accent) motion-reduce:hover:transform-none"
            >
              <div className="flex items-baseline justify-between">
                <span className="text-xs text-muted">
                  {String(startup.id).padStart(2, '0')}
                </span>
                <span className="rounded-full border border-foreground/15 px-2 py-0.5 text-[10px] uppercase tracking-caps text-muted">
                  {categoryLabels[startup.category]}
                </span>
              </div>
              <h3 className="mt-10 font-display text-2xl font-black italic tracking-title transition-colors group-hover:text-(--card-accent)">
                {startup.name}
              </h3>
              <p className="mt-2 text-sm text-muted">{startup.tagline}</p>
              <span
                aria-hidden
                className="mt-6 block h-1 w-10 origin-left rotate-(--rotate-signature) bg-(--card-accent) opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
              />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
