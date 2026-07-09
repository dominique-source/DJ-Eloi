import type { Startup } from '@/data/startups';
import { siteCopy } from '@/data/site';

/** Le concept, en une respiration : le pitch. */
export function StartupDetails({ startup }: { startup: Startup }) {
  return (
    <section className="px-8 py-20 md:px-16">
      <p className="text-xs uppercase tracking-caps text-muted">
        {siteCopy.startup.concept}
      </p>
      <p className="mt-6 max-w-3xl text-xl leading-relaxed">{startup.pitch}</p>
    </section>
  );
}
