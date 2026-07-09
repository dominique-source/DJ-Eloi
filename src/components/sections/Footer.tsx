import Image from 'next/image';
import Link from 'next/link';
import { startups } from '@/data/startups';
import { profile } from '@/data/profile';
import { isDraft, siteCopy } from '@/data/site';
import { LocalTime } from './LocalTime';
import { EasterEgg } from './EasterEgg';

/** Footer futuriste : index des 25 startups, heure locale, easter egg. */
export function Footer() {
  const showEmail = !isDraft(profile.contact.email);
  const showInstagram = !isDraft(profile.contact.instagram);

  return (
    <footer className="border-t border-foreground/10 px-8 py-16 md:px-16">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Image
          src="/media/dj-king-e/logo.png"
          alt={profile.djName}
          width={900}
          height={900}
          className="h-11 w-11 object-contain"
        />
        <LocalTime label={siteCopy.footer.time} />
      </div>

      <p className="mt-14 text-xs uppercase tracking-caps text-muted">
        {siteCopy.footer.index}
      </p>
      <ul className="mt-4 grid grid-cols-1 gap-x-8 gap-y-1.5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {startups.map((startup) => (
          <li key={startup.slug}>
            <Link
              href={`/startups/${startup.slug}`}
              className="text-sm text-muted transition-colors hover:text-accent focus-visible:text-accent"
            >
              {String(startup.id).padStart(2, '0')} — {startup.name}
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-16 flex flex-wrap items-center justify-between gap-4">
        <EasterEgg
          name={profile.djName}
          rights={siteCopy.footer.rights}
          egg={siteCopy.footer.egg}
        />
        <div className="flex gap-6 text-xs text-muted">
          {showEmail ? <span>{profile.contact.email}</span> : null}
          {showInstagram ? <span>@{profile.contact.instagram}</span> : null}
          <a
            href={`https://www.tiktok.com/@${profile.contact.tiktok}`}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-accent"
          >
            @{profile.contact.tiktok}
          </a>
        </div>
      </div>
    </footer>
  );
}
