import Link from 'next/link';
import type { CSSProperties } from 'react';
import type { Startup } from '@/data/startups';
import { siteCopy } from '@/data/site';

function NavLink({
  startup,
  label,
  align,
}: {
  startup: Startup;
  label: string;
  align: 'left' | 'right';
}) {
  return (
    <Link
      href={`/startups/${startup.slug}`}
      style={{ '--card-accent': startup.palette.accent } as CSSProperties}
      className={`group flex flex-col gap-2 px-8 py-12 transition-colors hover:bg-foreground/5 md:px-16 ${
        align === 'right' ? 'md:items-end md:text-right' : ''
      }`}
    >
      <span className="text-xs uppercase tracking-caps text-muted">{label}</span>
      <span className="font-display text-2xl font-black italic tracking-title transition-colors group-hover:text-(--card-accent) md:text-4xl">
        {startup.name}
      </span>
    </Link>
  );
}

/** Navigation précédent / suivant entre les 25 concepts. */
export function StartupNav({ prev, next }: { prev: Startup; next: Startup }) {
  return (
    <nav
      aria-label="Navigation entre les concepts"
      className="grid border-t border-foreground/10 md:grid-cols-2"
    >
      <NavLink startup={prev} label={siteCopy.startup.prev} align="left" />
      <div className="border-t border-foreground/10 md:border-l md:border-t-0">
        <NavLink startup={next} label={siteCopy.startup.next} align="right" />
      </div>
    </nav>
  );
}
