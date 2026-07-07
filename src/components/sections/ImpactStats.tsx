import { CountUp } from '@/components/ui/CountUp';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { siteCopy } from '@/data/site';

/** 3 chiffres Impact Stat avec count-up (une seule fois). */
export function ImpactStats() {
  return (
    <section className="px-8 py-24 md:px-16">
      <SectionHeader label={siteCopy.impact.label} title={siteCopy.impact.title} />
      <div className="mt-16 grid gap-12 md:grid-cols-3">
        {siteCopy.impact.stats.map((stat) => (
          <div key={stat.label}>
            <p className="font-display text-7xl font-black italic text-accent md:text-8xl">
              <CountUp value={stat.value} suffix={stat.suffix} />
            </p>
            <p className="mt-3 text-sm uppercase tracking-caps text-muted">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
