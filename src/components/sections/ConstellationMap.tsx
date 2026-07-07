'use client';

import { useState } from 'react';
import { categoryLabels, startups, type Category } from '@/data/startups';
import { siteCopy } from '@/data/site';
import { SectionHeader } from '@/components/ui/SectionHeader';

const categories = (Object.keys(categoryLabels) as Category[]).filter((category) =>
  startups.some((s) => s.category === category),
);

// Positions déterministes en spirale (angle d'or) — stables entre rendus.
const nodes = startups.map((startup, index) => {
  const angle = index * 2.399963;
  const radius = 70 + index * 13;
  return {
    startup,
    x: 500 + radius * Math.cos(angle),
    y: 310 + radius * 0.52 * Math.sin(angle),
  };
});

const linesByCategory = categories.map((category) => ({
  category,
  points: nodes
    .filter((node) => node.startup.category === category)
    .map((node) => `${node.x},${node.y}`)
    .join(' '),
}));

/** Vue constellation SVG des 25 concepts, filtrable par catégorie. */
export function ConstellationMap() {
  const [filter, setFilter] = useState<Category | 'all'>('all');

  return (
    <section className="px-8 py-24 md:px-16">
      <SectionHeader label={siteCopy.map.label} title={siteCopy.map.title} />

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

      <svg
        viewBox="0 0 1000 620"
        className="mt-12 w-full"
        aria-label={siteCopy.map.title}
      >
        {linesByCategory.map(({ category, points }) => (
          <polyline
            key={category}
            points={points}
            fill="none"
            stroke="currentColor"
            className={
              filter === category
                ? 'text-accent opacity-40 transition-opacity'
                : 'text-foreground opacity-[0.07] transition-opacity'
            }
            strokeWidth="1"
          />
        ))}
        {nodes.map(({ startup, x, y }) => {
          const dimmed = filter !== 'all' && startup.category !== filter;
          return (
            <a
              key={startup.slug}
              href={`/startups/${startup.slug}`}
              aria-label={`${startup.name} — ${categoryLabels[startup.category]}`}
              className="group outline-none"
            >
              <title>{startup.name}</title>
              <circle
                cx={x}
                cy={y}
                r={dimmed ? 4 : 6}
                className={`transition-[opacity,fill] duration-300 ${
                  dimmed
                    ? 'fill-foreground opacity-15'
                    : filter === 'all'
                      ? 'fill-foreground opacity-70 group-hover:fill-accent group-focus-visible:fill-accent'
                      : 'fill-accent opacity-90'
                }`}
              />
              <text
                x={x + 12}
                y={y + 4}
                className={`fill-muted text-[13px] transition-opacity duration-300 ${
                  dimmed ? 'opacity-0' : 'opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100'
                } ${filter !== 'all' && !dimmed ? 'opacity-100' : ''}`}
              >
                {startup.name}
              </text>
            </a>
          );
        })}
      </svg>
    </section>
  );
}
