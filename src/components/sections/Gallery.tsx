import { MediaSlot } from '@/components/media/MediaSlot';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { startups } from '@/data/startups';
import { siteCopy } from '@/data/site';

const rowA = startups.slice(0, 8);
const rowB = startups.slice(8, 16);

function MarqueeRow({ items, reverse }: { items: typeof rowA; reverse?: boolean }) {
  // Contenu doublé pour une boucle infinie sans couture (translateX -50%).
  const doubled = [...items, ...items];
  return (
    <div className="marquee mt-4">
      <div className={`marquee-track ${reverse ? 'marquee-reverse' : ''}`}>
        {doubled.map((startup, index) => (
          <MediaSlot
            key={`${startup.slug}-${index}`}
            type="photo"
            slug={startup.slug}
            index={(index % 4) + 1}
            ratio="4/3"
            className="w-64 shrink-0 md:w-80"
          />
        ))}
      </div>
    </div>
  );
}

/** Marquee infini à deux rangées, pause au survol (CSS only). */
export function Gallery() {
  return (
    <section className="py-24">
      <div className="px-8 md:px-16">
        <SectionHeader label={siteCopy.gallery.label} title={siteCopy.gallery.title} />
      </div>
      <div className="mt-12">
        <MarqueeRow items={rowA} />
        <MarqueeRow items={rowB} reverse />
      </div>
    </section>
  );
}
