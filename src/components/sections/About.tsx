import { MediaSlot } from '@/components/media/MediaSlot';
import { profile } from '@/data/profile';
import { cleanDraft, siteCopy } from '@/data/site';

/** Le vrai visage derrière les 25 concepts : bio réelle d'Éloi. */
export function About() {
  return (
    <section className="grid gap-10 px-8 py-24 md:grid-cols-[2fr_3fr] md:px-16">
      <MediaSlot
        type="portrait"
        slug="dj-king-e"
        name={profile.djName}
        surface="#0d0d0d"
        ratio="3/4"
      />
      <div className="self-center">
        <p className="text-xs uppercase tracking-caps text-muted">
          {siteCopy.about.label}
        </p>
        <h2 className="mt-4 font-display text-4xl font-black italic tracking-title md:text-6xl">
          {profile.djName}
        </h2>
        <p className="mt-6 max-w-xl leading-relaxed text-muted">
          {cleanDraft(profile.bio)}
        </p>
        <p className="mt-6 font-display text-xl font-black italic text-accent">
          {profile.tagline}
        </p>
      </div>
    </section>
  );
}
