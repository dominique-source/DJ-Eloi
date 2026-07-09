import { profile } from '@/data/profile';
import { cleanDraft } from '@/data/site';
import { SignatureFader } from '@/components/ui/SignatureFader';
import { ConceptOrbit } from './ConceptOrbit';

/**
 * Présentation de DJ King E, style site de DJ professionnel :
 * l'orbite des projets, puis une grande quote signature et la bio.
 * Les témoignages (profile.testimonials) s'affichent dès qu'ils existent.
 */
export function About() {
  return (
    <section className="px-8 py-24 md:px-16">
      <ConceptOrbit />

      <blockquote className="mt-24">
        <p className="max-w-5xl font-display text-4xl font-black italic leading-tight tracking-title md:text-7xl">
          « {profile.tagline.replace(/\.$/, '')} »
        </p>
        <footer className="mt-8 flex items-center gap-4">
          <SignatureFader className="w-14" />
          <span className="text-xs uppercase tracking-caps text-muted">
            {profile.djName} · {profile.realName}, {profile.age} ans
          </span>
        </footer>
      </blockquote>

      <p className="mt-14 max-w-xl leading-relaxed text-muted">
        {cleanDraft(profile.bio)}
      </p>

      {profile.testimonials.length > 0 ? (
        <div className="mt-20 grid gap-10 md:grid-cols-2">
          {profile.testimonials.map((testimonial) => (
            <blockquote key={testimonial.quote}>
              <p className="font-display text-2xl font-black italic tracking-title">
                « {testimonial.quote} »
              </p>
              <footer className="mt-3 text-xs uppercase tracking-caps text-muted">
                — {testimonial.author}
              </footer>
            </blockquote>
          ))}
        </div>
      ) : null}
    </section>
  );
}
