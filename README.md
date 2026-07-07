# DJ King Éloi — 25 façons de réinventer le divertissement

Site immersif présentant 25 concepts de startups autour de DJ King E (Éloi,
15 ans). Next.js 15 · TypeScript strict · Tailwind v4 · GSAP + ScrollTrigger ·
Lenis · motion · React Three Fiber.

## Installation

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # build de production
npm run lint       # lint
npx tsc --noEmit   # vérification des types
```

## Comment éditer le contenu

Tout le contenu vit dans deux fichiers — ne jamais éditer les composants
pour changer un texte :

- **`src/data/startups.ts`** — les 25 concepts (source de vérité unique) :
  noms, pitchs, palettes, scores, timelines des flagships.
- **`src/data/profile.ts`** — le vrai profil d'Éloi : bio, tagline, services
  réservables, contact. Les champs `TODO` sont masqués à l'affichage tant
  qu'ils ne sont pas remplis.
- **`src/data/site.ts`** — la copie éditoriale (titres de sections, labels,
  formulaire).

## Convention des médias

Déposer les fichiers dans `public/media/{slug}/` :

```
public/media/beat-battle-league/
  logo.svg
  hero.mp4            (fallback : hero.jpg)
  gallery-01.jpg … gallery-04.jpg
  mockup-mobile.png
  mockup-desktop.png
  portrait.jpg        (profil uniquement : public/media/dj-king-e/)
```

Tant qu'un fichier n'existe pas, `<MediaSlot />` affiche automatiquement un
placeholder premium (surface de la startup, bruit subtil, monogramme). Aucun
autre changement n'est nécessaire : ajouter le fichier suffit.

## Architecture

```
src/
  app/                  layout, page d'accueil, /startups/[slug], action contact
  components/
    media/MediaSlot.tsx   slot média unique (jamais de <img> direct)
    sections/             les 10 sections du voyage principal
    startup/              le template des 25 pages startup (5 variantes)
    ui/                   primitives (jauges, count-up, boutons magnétiques)
    effects/              moments WOW globaux
  hooks/                useLenis, useMagneticCursor, usePrefersReducedMotion
  data/                 startups.ts · profile.ts · site.ts
  lib/animations.ts     easing et durées partagés
```

## Moments cachés

- **Barre espace** : flash de la barre signature.
- **Code Konami** (↑↑↓↓←→←→BA) : mode « nuit de festival ».
- **5 clics sur le copyright** du footer : même effet.
- Toutes les animations respectent `prefers-reduced-motion`.

## Déploiement (Vercel)

1. Importer le dépôt `dominique-source/DJ-Eloi` sur [vercel.com](https://vercel.com).
2. Framework preset : Next.js — aucune variable d'environnement requise.
3. Chaque push sur `main` déploie automatiquement.

Le formulaire de contact valide et journalise côté serveur ; brancher un
fournisseur d'envoi (ex. Resend) dans `src/app/actions/contact.ts` quand
l'adresse réelle sera renseignée dans `profile.ts`.
