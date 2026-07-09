# DJ King Éloi — façons originales de faire du DJ

Site immersif présentant des façons originales de faire du DJ, imaginées par
DJ King E (Éloi, 15 ans). Next.js 15 · TypeScript strict · Tailwind v4 ·
GSAP + ScrollTrigger · Lenis · motion · React Three Fiber.

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

- **`src/data/startups.ts`** — les concepts (source de vérité unique), un
  seul par vraie photo disponible : noms, pitchs, palettes, scores,
  timelines des concepts phares.
- **`src/data/profile.ts`** — le vrai profil d'Éloi : bio, tagline, services
  réservables, contact. Les champs `TODO` sont masqués à l'affichage tant
  qu'ils ne sont pas remplis.
- **`src/data/site.ts`** — la copie éditoriale (titres de sections, labels,
  formulaire).
- **`src/data/mixes.ts`** — les 5 derniers mixes TikTok affichés en signets
  (section TikTok). Remplacer `url: 'TODO'` par le vrai lien de la vidéo
  (`https://www.tiktok.com/@.../video/...`) et `caption` par son titre ;
  tant que `url` reste `TODO`, le signet renvoie vers le profil TikTok.

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

Les 5 signets TikTok suivent la même convention sous des slugs dédiés :
`public/media/mix-1/gallery-01.jpg` … `public/media/mix-5/gallery-01.jpg`
(miniature du mix, idéalement une capture verticale 9:16).

Tant qu'un fichier n'existe pas, `<MediaSlot />` affiche automatiquement un
placeholder premium (surface du concept, bruit subtil, monogramme). Aucun
autre changement n'est nécessaire : ajouter le fichier suffit.

**Seuls les concepts avec une vraie photo sont gardés dans `startups.ts`**
(2026-07-07) : `soundtrack-city`, `beat-battle-league`, `sonic-rush`,
`neon-nights`, `dj-tournois`, `glow-games`, `roller-beats`, `podium-sound`,
`halftime-heroes`, `beat-fit` (×2), `mixtape-academy` — plus portrait et
logo de DJ King E. Les concepts sans média réel ont été retirés du site
(règle du projet : ne garder que ce qui est illustré). Les catégories
`live` et `game` utilisent désormais `photo` (au lieu de `video` /
`mockup-desktop`) comme média de hero par défaut, faute de vraies
vidéos/mockups — à ajuster dans `StartupHero.tsx` (`HERO_MEDIA`) dès que
ces assets existeront.

Une vidéo brute de DJ King E en train de mixer est archivée dans
`public/media/dj-king-e/dj-set-1-eloi-source.mov` (non branchée : nécessite
une conversion en `.mp4` optimisé web — via ffmpeg ou Handbrake — avant de
devenir `hero.mp4`).

## Architecture

```
src/
  app/                  layout, page d'accueil, /startups/[slug], action contact
  components/
    media/MediaSlot.tsx   slot média unique (jamais de <img> direct)
    sections/             les 10 sections du voyage principal
    startup/              le template des pages concept (5 variantes de hero)
    ui/                   primitives (jauges, count-up, boutons magnétiques)
    effects/              moments WOW globaux
  hooks/                useLenis, useMagneticCursor, usePrefersReducedMotion
  data/                 startups.ts · profile.ts · site.ts
  lib/animations.ts     easing et durées partagés
```

## DJ Academy (console interactive)

Une vraie console de DJ jouable sur la page d'accueil : deux decks avec
platines qui tournent (play/pause), 4 pads de performance par deck (kick,
hat, clap, stab), crossfader et filtre branchés sur le moteur Web Audio,
LED de beat 1-2-3-4, bouton DROP. Les trois missions (tempo, crossfade,
drop) se jouent directement sur la console ; la progression (XP + rang
Rookie → Headliner) est sauvegardée en localStorage, puis la console
reste en jeu libre. Textes éditables dans `src/data/site.ts` (`academy`).

Note : les pages concept ne montrent volontairement aucun contenu
« investisseur » (revenus, coûts, scores, plan 24 mois) — seulement le
pitch et trois chiffres d'ambiance.

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
