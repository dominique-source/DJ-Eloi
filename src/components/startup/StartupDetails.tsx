import type { Startup } from '@/data/startups';
import { siteCopy } from '@/data/site';

/** Pitch, 3 stats, puis les 4 blocs business du concept. */
export function StartupDetails({ startup }: { startup: Startup }) {
  const blocks = [
    { label: siteCopy.startup.revenue, text: startup.revenueModel },
    { label: siteCopy.startup.cost, text: startup.startupCost },
    { label: siteCopy.startup.moat, text: startup.moat },
    { label: siteCopy.startup.firstAction, text: startup.firstAction },
  ];

  return (
    <section className="px-8 py-20 md:px-16">
      <p className="text-xs uppercase tracking-caps text-muted">
        {siteCopy.startup.concept}
      </p>
      <p className="mt-6 max-w-3xl text-xl leading-relaxed">{startup.pitch}</p>

      <p className="mt-14 text-xs uppercase tracking-caps text-muted">
        {siteCopy.startup.audience}
      </p>
      <p className="mt-4 max-w-3xl leading-relaxed text-muted">
        {startup.audience}
      </p>

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

      <div className="mt-20 grid gap-x-16 gap-y-12 md:grid-cols-2">
        {blocks.map((block) => (
          <div key={block.label} className="border-t border-foreground/10 pt-6">
            <h2 className="text-xs uppercase tracking-caps text-accent">
              {block.label}
            </h2>
            <p className="mt-3 leading-relaxed text-muted">{block.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
