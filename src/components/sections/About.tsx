import { profile } from '@/data/profile';
import { cleanDraft, siteCopy } from '@/data/site';
import { ConceptOrbit } from './ConceptOrbit';

/** Le vrai visage derrière les concepts : bio réelle d'Éloi, projets en orbite. */
export function About() {
  return (
    <section className="px-8 py-24 md:px-16">
      <ConceptOrbit />
      <div className="mt-10 max-w-2xl">
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
