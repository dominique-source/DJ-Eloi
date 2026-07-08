import type { Startup } from '@/data/startups';
import { siteCopy } from '@/data/site';

/** Le concept en deux temps : le pitch, puis 3 chiffres qui donnent l'échelle. */
export function StartupDetails({ startup }: { startup: Startup }) {
  return (
    <section className="px-8 py-20 md:px-16">
      <p className="text-xs uppercase tracking-caps text-muted">
        {siteCopy.startup.concept}
      </p>
      <p className="mt-6 max-w-3xl text-xl leading-relaxed">{startup.pitch}</p>

      <div className="mt-16 grid gap-12 md:grid-cols-3">
        {startup.stats.map((stat) => (
          <div key={stat.label}>
            <p className="font-display text-5xl font-black italic text-accent md:text-6xl">
              {stat.value}
            </p>
            <p className="mt-2 text-xs uppercase tracking-caps text-muted">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
