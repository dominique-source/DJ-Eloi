import { MediaSlot } from '@/components/media/MediaSlot';
import type { Startup } from '@/data/startups';
import { siteCopy } from '@/data/site';

/** Mockups mobile + desktop du concept (placeholders premium). */
export function StartupMockups({ startup }: { startup: Startup }) {
  return (
    <section className="px-8 pb-20 md:px-16">
      <p className="text-xs uppercase tracking-caps text-muted">
        {siteCopy.startup.mockups}
      </p>
      <div className="mt-8 grid items-start gap-8 md:grid-cols-[1fr_2fr]">
        <MediaSlot type="mockup-mobile" slug={startup.slug} ratio="9/16" />
        <MediaSlot type="mockup-desktop" slug={startup.slug} ratio="16/10" />
      </div>
    </section>
  );
}
