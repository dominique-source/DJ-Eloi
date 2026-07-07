import { profile } from './profile';

/**
 * Copie éditoriale du site (labels de sections, titres, formulaires).
 * Les contenus des 25 startups restent dans startups.ts ; le profil
 * réel d'Éloi dans profile.ts.
 */

/** Coupe les mentions TODO d'un texte brouillon avant affichage. */
export function cleanDraft(text: string): string {
  return text.split(/TODO/)[0].trim();
}

/** Vrai si la valeur est encore un brouillon à ne pas afficher. */
export function isDraft(value: string): boolean {
  return value.trim().toUpperCase().startsWith('TODO');
}

export const siteCopy = {
  hero: {
    kicker: `${profile.age} ans · 25 concepts · 1 vision`,
    subtitle:
      "25 concepts de startups nés derrière les platines d'un DJ de 15 ans. Bienvenue dans le futur du divertissement.",
    scrollHint: 'Défile pour entrer',
  },
  manifesto: {
    label: 'Manifesto',
    text: "Ceci n'est pas un site de DJ. C'est la preuve qu'à 15 ans on peut réinventer le divertissement : vingt-cinq façons de transformer la musique en expériences, en jeux, en communautés. Chaque concept existe déjà dans sa tête. Il ne reste qu'à appuyer sur play.",
  },
  about: {
    label: 'Le vrai visage',
  },
  impact: {
    label: 'Pourquoi cette vision',
    title: 'Des idées. Et des chiffres.',
    stats: [
      { value: 25, suffix: '', label: 'concepts de startups explorés' },
      { value: 5, suffix: '', label: 'flagships niveau investisseur' },
      { value: 15, suffix: ' ans', label: 'derrière les platines' },
    ],
  },
  grid: {
    label: 'Les 25 startups',
    title: 'Choisis ton futur.',
    all: 'Tout voir',
    filterAria: 'Filtrer les startups par catégorie',
  },
  flagshipStory: {
    label: 'Vision investisseur',
    title: 'Cinq paris majeurs.',
    cta: 'Découvrir',
  },
  roadmap: {
    label: 'Roadmap',
    title: '24 mois pour tout changer.',
    note: 'Les jalons des cinq flagships, du battle pilote aux revenus récurrents.',
  },
  gallery: {
    label: 'Galerie',
    title: 'Des images du futur.',
  },
  map: {
    label: 'Carte des concepts',
    title: 'Une constellation d’idées.',
  },
  contact: {
    label: 'Contact',
    title: 'Réserve ton moment.',
    subtitle: 'Fête, danse d’école ou tournoi : dis-nous ce que tu prépares.',
    fields: {
      name: 'Ton nom',
      email: 'Ton courriel',
      service: 'Le service',
      serviceOther: 'Autre projet',
      message: 'Parle-nous de ton événement',
    },
    submit: 'Envoyer',
    sending: 'Envoi…',
    success: 'Message reçu. On te répond très vite.',
    error: 'Vérifie ton nom, ton courriel et ton message.',
  },
  academy: {
    label: 'DJ Academy',
    title: 'Apprends les bases. Comme dans un jeu.',
    subtitle:
      'Trois missions, du vrai son, un rang à gagner. Insère une pièce et prends les commandes.',
    start: 'Press start',
    soundOff: 'Couper le son',
    soundOn: 'Relancer le son',
    xp: 'XP',
    rankLabel: 'Rang',
    ranks: ['Rookie', 'Selector', 'Mixmaster', 'Headliner'],
    locked: 'Verrouillé',
    active: 'En cours',
    done: 'Réussi',
    missions: [
      {
        title: 'Cale le tempo',
        instruction:
          'Tape sur le pad en suivant le beat. 8 frappes, le plus proche possible du temps.',
        action: 'Tape sur le beat',
      },
      {
        title: 'Maîtrise le crossfade',
        instruction:
          'Fais glisser la fête du deck A vers le deck B — en douceur, pas d’un coup.',
        action: 'Deck A → Deck B',
      },
      {
        title: 'Lâche le drop',
        instruction:
          'Maintiens pour faire monter la pression, relâche pile sur le 1.',
        action: 'Maintiens, puis relâche sur le 1',
      },
    ],
    replay: 'Rejouer',
    finale: 'Académie complétée. Ton rang :',
    conceptLink: 'Le concept complet — Mixtape Academy',
  },
  footer: {
    index: 'Index des 25 startups',
    time: 'Heure locale',
    egg: 'Mode festival déverrouillé. 🎧',
    rights: 'Tous droits réservés.',
  },
  startup: {
    back: 'Tous les concepts',
    concept: 'Le concept',
    audience: 'Pourquoi ça marche',
    revenue: 'Modèle de revenus',
    cost: 'Coût de départ',
    moat: 'Barrières à l’entrée',
    firstAction: 'Première action cette semaine',
    scores: 'Les scores',
    difficulty: 'Difficulté',
    revenueScore: 'Revenus',
    viral: 'Viralité',
    mockups: 'Aperçus produit',
    timeline: 'Plan 24 mois',
    flagshipTag: 'Flagship',
    prev: 'Concept précédent',
    next: 'Concept suivant',
  },
} as const;
