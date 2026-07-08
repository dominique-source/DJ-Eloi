/**
 * Copie éditoriale du site (labels de sections, titres, formulaires).
 * Les concepts DJ restent dans startups.ts ; le profil réel d'Éloi
 * dans profile.ts.
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
    scrollHint: 'Défile pour entrer',
  },
  grid: {
    label: 'Les concepts',
    title: 'Des façons originales de faire du DJ.',
  },
  flagshipStory: {
    label: 'Concepts phares',
    title: 'Les paris les plus audacieux.',
    cta: 'Découvrir',
  },
  gallery: {
    label: 'Galerie',
    title: 'Des images du futur.',
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
    title: 'Prends les commandes.',
    subtitle:
      'Une vraie console, du vrai son. Joue librement, réussis les trois missions, gagne ton rang.',
    start: 'Press start',
    soundOff: 'Couper le son',
    soundOn: 'Relancer le son',
    xp: 'XP',
    rankLabel: 'Rang',
    ranks: ['Rookie', 'Selector', 'Mixmaster', 'Headliner'],
    missions: [
      {
        title: 'Cale le tempo',
        instruction:
          'Tape sur le pad TAP en suivant le beat — 8 frappes, le plus proche possible du temps.',
      },
      {
        title: 'Maîtrise le crossfade',
        instruction:
          'Fais glisser la fête du deck A vers le deck B — en douceur, pas d’un coup.',
      },
      {
        title: 'Lâche le drop',
        instruction:
          'Maintiens DROP pour faire monter la pression, relâche pile quand le 1 s’allume.',
      },
    ],
    missionLabel: 'Mission',
    missionDone: 'Réussi',
    freePlay: 'Console libre — continue de jouer.',
    replay: 'Rejouer',
    finale: 'Académie complétée. Ton rang :',
    conceptLink: 'Le concept complet — Mixtape Academy',
    console: {
      deck: 'Deck',
      play: 'Play',
      pause: 'Pause',
      bpm: 'BPM',
      pads: ['Kick', 'Hat', 'Clap', 'Stab'],
      tap: 'Tap',
      drop: 'Drop',
      filter: 'Filtre',
      crossfader: 'Crossfader',
    },
  },
  footer: {
    index: 'Les façons de faire du DJ',
    time: 'Heure locale',
    egg: 'Mode festival déverrouillé. 🎧',
    rights: 'Tous droits réservés.',
  },
  startup: {
    back: 'Tous les concepts',
    concept: 'Le concept',
    flagshipTag: 'Flagship',
    prev: 'Concept précédent',
    next: 'Concept suivant',
  },
} as const;
