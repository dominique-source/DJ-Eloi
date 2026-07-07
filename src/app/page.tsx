import { startups } from '@/data/startups';

/* Page temporaire de la Phase 0 — remplacée par le voyage complet en Phase 2. */
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-start justify-center gap-6 px-8 md:px-16">
      <p className="text-xs uppercase tracking-caps text-muted">
        Phase 0 — Fondations
      </p>
      <h1 className="font-display text-6xl font-black italic tracking-title md:text-8xl">
        25 Startups
      </h1>
      <p className="max-w-md text-muted">
        {startups.length} concepts chargés depuis la source de vérité unique.
        Le voyage commence à la Phase 2.
      </p>
      <span
        aria-hidden
        className="mt-4 block h-2 w-40 origin-left rotate-(--rotate-signature) bg-accent"
      />
    </main>
  );
}
