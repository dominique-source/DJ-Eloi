# CLAUDE.md — Projet « 25 Startups » (site immersif)

## Contexte
Site vitrine immersif présentant 25 concepts de startups autour d'un DJ de 15 ans.
Qualité cible : Awwwards / Framer Awards. Public : familles, partenaires, curieux.
Langue du contenu : français (Québec). Langue du code : anglais.

## Commandes
- npm run dev — développement
- npm run build — build de production (DOIT passer avant tout commit)
- npm run lint — lint
- npx tsc --noEmit — vérification des types

## Source de vérité
- src/data/startups.ts contient TOUT le contenu des 25 startups.
- Ne jamais coder un texte de startup en dur dans un composant.
- Ne jamais résumer, tronquer ou réécrire ce fichier sans demande explicite.
- Tous les médias suivent la convention /public/media/{slug}/… et passent
  par le composant <MediaSlot /> (jamais de <img> direct pour un média de startup).

## Stack verrouillée
Next.js 15 App Router · TypeScript strict · Tailwind v4 · motion (Framer Motion) ·
GSAP + ScrollTrigger · Lenis · React Three Fiber (hero seulement) · Lucide.
Ne jamais ajouter d'autre librairie d'animation ou de UI kit.

## Règles de design (résumé du système)
1. Un élément dominant par écran — jamais deux.
2. Fond quasi-noir #0A0A0A, texte blanc, UNE couleur accent par écran
   (celle de la startup, définie dans les données). Règle 60/30/10.
3. Deux fonts max : display 900 italique pour les titres, grotesque pour le texte.
4. Interdits : gradients décoratifs, lignes sous les titres, ombres génériques,
   coins arrondis sur formes structurelles (arrondis = tags/badges seulement),
   texte centré en paragraphe, deuxième couleur accent.
5. Élément signature : barre diagonale ~8° couleur accent (transitions, progression).
6. Labels ALL CAPS petits = tracking large; titres énormes = tracking nul.

## Règles d'animation
- GPU only : transform et opacity. Jamais animer top/left/width/height.
- GSAP = scroll storytelling; motion = micro-interactions; Lenis = smooth scroll.
  Ne pas mélanger deux moteurs sur le même élément.
- Chaque animation respecte prefers-reduced-motion (hook fourni dans hooks/).
- R3F chargé en dynamic(() => …, { ssr: false }), uniquement dans le hero.

## Qualité
- Lighthouse ≥ 95 partout. Zéro layout shift (ratios réservés dans MediaSlot).
- Accessibilité : navigation clavier complète, focus visibles, contrastes AA.
- Composants ≤ 200 lignes; extraire dans ui/ dès qu'un motif se répète 2 fois.
- Pas de any, pas de @ts-ignore, pas de TODO dans le code livré.

## Workflow
- Travailler phase par phase selon PROMPT-CLAUDE-CODE.md (créé ci-dessous).
- npm run build + vérification visuelle avant de clore chaque phase.
- Commits atomiques par section (feat(hero): …, feat(startup-page): …).
