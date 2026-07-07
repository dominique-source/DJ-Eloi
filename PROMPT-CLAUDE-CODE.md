# PROMPT MAÎTRE — Site « DJ King Éloi » (façons originales de faire du DJ)

## MISSION
Construis un site immersif présentant des façons originales de faire du DJ,
imaginées par DJ King Éloi, DJ de 15 ans. La marque « DJ King Éloi » s'affiche
partout (hero, titres, SEO). Ce n'est pas un pitch de startups : c'est une
vitrine de façons créatives de vivre la musique — événementiel, sport, jeu,
communauté. Seuls les concepts illustrés par une vraie photo restent sur le
site. Le visiteur doit avoir l'impression de visiter le futur.

Niveau de qualité : Awwwards / Framer Awards. Minimalisme Apple, storytelling
Nike, énergie Red Bull, clarté Stripe, animations Linear.

Toutes les données viennent de data/startups.ts — source de vérité unique.
Aucun texte de startup codé en dur dans un composant.

## STACK (verrouillée — ne rien ajouter)
Next.js 15 (App Router) + TypeScript strict, Tailwind CSS v4, motion (Framer
Motion), GSAP + ScrollTrigger, Lenis, React Three Fiber + drei (hero uniquement),
Lucide React. Interdits : Spline, Rive, Lottie, styled-components, autre librairie
d'animation.

## ARCHITECTURE
src/
  app/layout.tsx, app/page.tsx, app/startups/[slug]/page.tsx
  components/ui/, components/media/MediaSlot.tsx, components/sections/
  hooks/ (useLenis, useMagneticCursor, usePrefersReducedMotion)
  lib/animations.ts
  data/startups.ts
public/media/{slug}/

## RÈGLE DE DESIGN NON NÉGOCIABLE
1. Hiérarchie d'abord : un élément dominant par écran.
2. Une seule couleur accent par écran (celle de la startup). Règle 60/30/10.
3. Deux fonts max : display lourde italique pour titres, grotesque pour le texte.
4. Pas de gradients décoratifs, pas de lignes sous les titres, pas d'ombres
   partout, pas de coins arrondis sur formes structurelles.
5. Élément signature : barre diagonale ~8° couleur accent, réutilisée partout.
6. prefers-reduced-motion respecté partout.

## PHASE 0 — Fondations
create-next-app TypeScript + Tailwind, installer la stack verrouillée. Tokens
(couleurs, espacements, typographie) dans Tailwind. Provider Lenis + GSAP
(useGSAP), dark mode par défaut, light mode via toggle. Copier data/startups.ts
tel quel. npm run build doit passer.

## PHASE 1 — Le système de médias (MediaSlot)
Composant <MediaSlot type="video|photo|logo|mockup-mobile|mockup-desktop|portrait"
slug="..." index={n} ratio="16/9" />. Essaie de charger depuis
/public/media/{slug}/…; sinon rend un placeholder premium : fond surface de la
startup, motif de bruit SVG subtil, monogramme du nom en énorme (opacité 6%),
tag discret du type de média. Lazy loading natif, ratio réservé (zéro layout shift).

## PHASE 2 — Le voyage principal (page d'accueil)
1. Hero plein écran : scène R3F légère, titre split-text, MediaSlot video en
   arrière-plan, scroll indicator, barre signature au premier scroll.
2. Manifesto : texte révélé mot à mot au scroll (GSAP scrub).
3. Pourquoi cette vision : 3 chiffres Impact Stat, count-up une fois.
4. Les 25 startups : grille filtrable par catégorie, cartes 3D légères (tilt
   au survol), transition partagée vers la page startup.
5. Vision investisseur (flagships) : storytelling horizontal GSAP, 5 flagships
   comme panneaux keynote, chacun dans sa couleur.
6. Roadmap : timeline verticale sticky, barre signature qui grandit et allume
   les jalons (utiliser les timelines des flagships).
7. Galerie immersive : marquee infini à deux rangées, pause au survol.
8. Carte des concepts : vue constellation SVG + motion, filtrage par catégorie.
9. CTA + Contact : fond accent lime plein écran, bouton magnétique, formulaire
   fonctionnel avec action serveur.
10. Footer futuriste : index des 25 startups, heure locale, easter egg.

## PHASE 3 — Les 25 pages startup (/startups/[slug])
generateStaticParams depuis les données. Un seul template, cinq variantes selon
category (live/sport/game/digital/community — hero différent par catégorie).
Chaque page : nom + tagline, pitch, 3 stats, modèle de revenus, coût de départ,
scores en jauges animées, barrières à l'entrée, première action, mockups,
timeline si flagship, navigation précédent/suivant.

## PHASE 4 — Performance & accessibilité
next/font, next/image, R3F en dynamic import, code splitting. Animations GPU
uniquement. Navigation clavier complète, focus visibles, contrastes AA.
Lighthouse ≥ 95.

## PHASE 5 — Moments WOW (4 maximum)
1. Barre espace = flash + pulsation de la barre signature.
2. Curseur magnétique sur CTA et cartes flagship.
3. Konami code = mode "nuit de festival" (toutes les couleurs accent s'allument).
4. Transition signature entre accueil et page startup (barre qui s'élargit).

## PHASE 6 — README + livraison
Installation, convention des médias, comment éditer (data/startups.ts
uniquement), architecture, déploiement Vercel. Aucun TODO.

## CRITÈRES D'ACCEPTATION (à chaque phase)
- npm run build passe sans erreur
- Aucun texte de startup en dur dans un composant
- Un élément dominant identifiable en 5 secondes par écran
- Une seule couleur accent visible par écran
- 60 fps au scroll
- Fonctionne à la souris, au clavier, au tactile
- prefers-reduced-motion donne une expérience complète
