/**
 * ============================================================
 * SOURCE DE VÉRITÉ UNIQUE — Les concepts DJ
 * ============================================================
 * Toutes les pages du site sont générées à partir de ce fichier.
 * Pour remplacer un contenu (texte, image, vidéo, logo) :
 * modifier UNIQUEMENT ce fichier. Aucun texte ne doit être
 * codé en dur dans les composants.
 *
 * Sélection finale (2026-07-08) : seuls les 5 concepts retenus par
 * Dominique restent ici — Beat Fit, Beat Battle League, Sonic Rush,
 * Neon Nights, Glow Games. Convention des médias (placeholders
 * premium tant qu'un fichier n'existe pas) :
 *   /public/media/{slug}/logo.png
 *   /public/media/{slug}/hero.mp4        (fallback: hero.jpg)
 *   /public/media/{slug}/gallery-01.jpg  ... gallery-04.jpg
 *   /public/media/{slug}/mockup-mobile.png
 *   /public/media/{slug}/mockup-desktop.png
 * Si le fichier n'existe pas, le composant <MediaSlot /> affiche
 * un placeholder généré (dégradé de la palette + motif de bruit).
 */

export type Category =
  | 'live'        // Événementiel & expériences live
  | 'sport'       // Croisement sport × musique
  | 'game'        // Formats de jeu & compétition
  | 'digital'     // Produits numériques & contenu
  | 'community';  // Communauté & récurrence

export interface Startup {
  id: number;
  slug: string;
  name: string;
  tagline: string;            // 5–8 mots, ton keynote
  pitch: string;               // 2–3 phrases, ton concept DJ
  category: Category;
  palette: {
    accent: string;           // LA couleur (une seule, règle 60/30/10)
    surface: string;          // fond sombre propre au concept
  };
}

export const startups: Startup[] = [
  {
    id: 1,
    slug: 'beat-fit',
    name: 'Beat Fit',
    tagline: 'L’entraînement où le DJ est le coach.',
    pitch:
      "Des séances de groupe où le mix EST le programme : les BPM dictent l'intensité, les drops déclenchent les burpees, les breaks sont la récupération. HYROX rencontre le DJing — 50 personnes dirigées comme un orchestre du cardio.",
    category: 'sport',
    palette: { accent: '#FFD500', surface: '#121003' },
  },
  {
    id: 2,
    slug: 'beat-battle-league',
    name: 'Beat Battle League',
    tagline: 'Le premier sport du DJing.',
    pitch:
      "La ligue compétitive de DJ pour les 12–17 ans : saisons, classements, battles en direct, la foule vote avec une app. Ce que le breakdance a fait pour entrer aux Olympiques, appliqué au DJing. Celui qui crée la ligue possède le sport.",
    category: 'game',
    palette: { accent: '#CCFF00', surface: '#0D0D0D' },
  },
  {
    id: 3,
    slug: 'sonic-rush',
    name: 'Sonic Rush',
    tagline: 'La course où la musique est le jeu.',
    pitch:
      "Un parcours d'obstacles où la musique est la mécanique centrale : bouger au rythme pour ouvrir un passage, sprinter sur les drops, figer quand le son s'arrête. Ninja Warrior × Just Dance × Color Run — avec un score rythme + vitesse à la fin.",
    category: 'game',
    palette: { accent: '#FF5A00', surface: '#120803' },
  },
  {
    id: 4,
    slug: 'neon-nights',
    name: 'Neon Nights',
    tagline: 'La boîte de nuit que les ados n’avaient pas le droit d’avoir.',
    pitch:
      "La marque de soirées dansantes 12–17 ans : thème néon, dress code lumineux, zones photo, défis en direct, zéro alcool, sécurité béton. Un vendredi par mois, une ville à la fois. Le lieu de sortie nocturne qui n'existait pas.",
    category: 'live',
    palette: { accent: '#B517FF', surface: '#0C0312' },
  },
  {
    id: 5,
    slug: 'glow-games',
    name: 'Glow Games',
    tagline: 'Le sport devient un show.',
    pitch:
      "Des tournois sportifs nocturnes en lumière noire : ballons fluorescents, lignes lumineuses, peinture néon, DJ live. Topgolf a prouvé qu'on peut réinventer un sport avec lumière + musique + social — nous le faisons dans les gymnases qui dorment le soir.",
    category: 'sport',
    palette: { accent: '#39FF14', surface: '#050F03' },
  },
];

/** Libellés de catégories (conservés pour référence, plus utilisés en filtre). */
export const categoryLabels: Record<Category, string> = {
  live: 'Expériences live',
  sport: 'Sport × Musique',
  game: 'Jeu & Compétition',
  digital: 'Numérique & Contenu',
  community: 'Communauté & Récurrence',
};
