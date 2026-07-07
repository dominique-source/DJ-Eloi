import type { Startup } from '@/data/startups';
import { siteCopy } from '@/data/site';

/** Plan 24 mois — flagships uniquement. */
export function StartupTimeline({ startup }: { startup: Startup }) {
  if (!startup.timeline) return null;

  return (
    <section className="px-8 pb-24 md:px-16">
      <p className="text-xs uppercase tracking-caps text-muted">
        {siteCopy.startup.timeline}
      </p>
      <div className="relative mt-8 border-l border-accent pl-8">
        {startup.timeline.map((step) => (
          <div key={step.period} className="mb-10 last:mb-0">
            <p className="text-xs uppercase tracking-caps text-accent">
              {step.period}
            </p>
            <p className="mt-2 max-w-2xl leading-relaxed text-muted">
              {step.milestone}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
