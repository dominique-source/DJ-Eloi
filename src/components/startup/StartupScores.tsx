import { Gauge } from '@/components/ui/Gauge';
import type { Startup } from '@/data/startups';
import { siteCopy } from '@/data/site';

/** Les trois scores du concept en jauges animées. */
export function StartupScores({ startup }: { startup: Startup }) {
  return (
    <section className="px-8 pb-20 md:px-16">
      <p className="text-xs uppercase tracking-caps text-muted">
        {siteCopy.startup.scores}
      </p>
      <div className="mt-8 grid gap-10 md:grid-cols-3">
        <Gauge label={siteCopy.startup.difficulty} value={startup.scores.difficulty} />
        <Gauge label={siteCopy.startup.revenueScore} value={startup.scores.revenue} />
        <Gauge label={siteCopy.startup.viral} value={startup.scores.viral} />
      </div>
    </section>
  );
}
