/**
 * ============================================================
 * SOURCE DE VÉRITÉ UNIQUE — Les concepts DJ
 * ============================================================
 * Toutes les pages du site sont générées à partir de ce fichier.
 * Pour remplacer un contenu (texte, image, vidéo, logo) :
 * modifier UNIQUEMENT ce fichier. Aucun texte ne doit être
 * codé en dur dans les composants.
 *
 * Seuls les concepts avec de vrais médias sont gardés ici (voir
 * /public/media/{slug}/). Convention des médias (placeholders
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

export interface Stat {
  value: string;      // ex. "9/10"
  label: string;      // ex. "Potentiel viral"
}

export interface TimelineStep {
  period: string;     // ex. "Mois 1–3"
  milestone: string;
}

export interface Startup {
  id: number;
  slug: string;
  name: string;
  tagline: string;            // 5–8 mots, ton keynote
  pitch: string;               // 2–3 phrases, ton concept DJ
  category: Category;
  flagship: boolean;          // true = concept phare (page enrichie)
  palette: {
    accent: string;           // LA couleur (une seule, règle 60/30/10)
    surface: string;          // fond sombre propre au concept
  };
  audience: string;           // pourquoi jeunes + familles adorent
  revenueModel: string;
  startupCost: string;
  scores: {
    difficulty: number;       // /10
    revenue: number;          // /10
    viral: number;            // /10
  };
  moat: string;               // barrières à l'entrée
  firstAction: string;        // première action cette semaine
  stats: Stat[];              // 3 chiffres max pour la fiche
  timeline?: TimelineStep[];  // flagship uniquement (plan 24 mois)
}

export const startups: Startup[] = [
  {
    id: 1,
    slug: 'dj-tournois',
    name: 'DJ de Tournois Jeunesse',
    tagline: 'Chaque gymnase devient une arène.',
    pitch:
      "La sonorisation et l'ambiance des tournois de basket, soccer, volleyball et cheerleading. Musique d'échauffement, drops entre les jeux, animation de foule — un gymnase froid devient un événement dont on parle.",
    category: 'sport',
    flagship: false,
    palette: { accent: '#FF8A00', surface: '#120C05' },
    audience:
      'Les jeunes athlètes se sentent comme des pros; les parents filment tout; les organisateurs se démarquent.',
    revenueModel: '300–600 $ / jour de tournoi, forfaits saisonniers.',
    startupCost: '0 $ (matériel existant)',
    scores: { difficulty: 3, revenue: 6, viral: 6 },
    moat: 'Réseau sportif + compréhension des codes du sport.',
    firstAction: 'Vidéo démo de 60 s envoyée à 5 organisateurs locaux.',
    stats: [
      { value: '600 $', label: 'par jour de tournoi' },
      { value: '0 $', label: 'd’investissement' },
      { value: '6/10', label: 'viralité' },
    ],
  },
  {
    id: 2,
    slug: 'roller-beats',
    name: 'Roller Beats',
    tagline: 'Le vendredi soir sur roues.',
    pitch:
      "Des soirées patin et roller disco pour ados : DJ live, jeux musicaux, lumières. Le roller revient en force mondialement — personne ne le fait pour les 12–17 ans, sans alcool, avec l'approbation totale des parents.",
    category: 'live',
    flagship: false,
    palette: { accent: '#FF2EC4', surface: '#10040D' },
    audience:
      'Activité physique + musique + social : la sortie parfaite approuvée à 100 % par les parents.',
    revenueModel: 'Partage de billetterie (5–8 $ × 100–300 entrées) ou cachet fixe.',
    startupCost: '0–300 $',
    scores: { difficulty: 4, revenue: 7, viral: 8 },
    moat: 'Le vendredi soir verrouillé avec l’aréna devient un territoire.',
    firstAction: 'Soirée pilote 50/50 proposée à un aréna (zéro risque pour eux).',
    stats: [
      { value: '300', label: 'patineurs / soirée' },
      { value: '8/10', label: 'viralité' },
      { value: '50/50', label: 'partage sans risque' },
    ],
  },
  {
    id: 3,
    slug: 'podium-sound',
    name: 'Podium Sound',
    tagline: 'Chaque fil d’arrivée devient un moment de gloire.',
    pitch:
      "L'ambiance officielle des courses familiales et événements participatifs : zone de départ électrisante, tunnel sonore au kilomètre difficile, ligne d'arrivée où chaque finissant a sa chanson. Le modèle Color Run, appliqué localement.",
    category: 'sport',
    flagship: false,
    palette: { accent: '#00D68F', surface: '#04110C' },
    audience:
      'Franchir un fil d’arrivée avec SA chanson = souvenir à vie; les inscriptions montent.',
    revenueModel: '400–900 $ / événement, forfaits avec circuits de course.',
    startupCost: '~500 $',
    scores: { difficulty: 3, revenue: 6, viral: 6 },
    moat: 'Le calendrier est limité : être établi = bloquer les dates.',
    firstAction: 'Contacter les 5 prochaines courses familiales au calendrier.',
    stats: [
      { value: '900 $', label: 'par événement' },
      { value: '3', label: 'zones sonores' },
      { value: '6/10', label: 'revenus' },
    ],
  },
  {
    id: 4,
    slug: 'beat-battle-league',
    name: 'Beat Battle League',
    tagline: 'Le premier sport du DJing.',
    pitch:
      "La ligue compétitive de DJ pour les 12–17 ans : saisons, classements, battles en direct, la foule vote avec une app. Ce que le breakdance a fait pour entrer aux Olympiques, appliqué au DJing. Celui qui crée la ligue possède le sport.",
    category: 'game',
    flagship: true,
    palette: { accent: '#CCFF00', surface: '#0D0D0D' },
    audience:
      'Les jeunes DJs n’ont aucune scène; les parents comprennent le format compétition; le public vit un show.',
    revenueModel: 'Inscriptions 40–60 $ / saison, billetterie, commandites audio, contenu.',
    startupCost: '~1 000 $ (pilote)',
    scores: { difficulty: 6, revenue: 9, viral: 9 },
    moat: 'Le premier définit les règles et possède la marque — effet de réseau.',
    firstAction: 'Recruter 8 jeunes DJs pour un battle pilote.',
    stats: [
      { value: '5 min', label: 'par battle' },
      { value: '100 %', label: 'vote de la foule' },
      { value: '9/10', label: 'potentiel long terme' },
    ],
    timeline: [
      { period: 'Mois 1–3', milestone: 'Battle pilote : 8 DJs, 100 spectateurs, tout filmé.' },
      { period: 'Mois 4–9', milestone: 'Saison 1 régionale : 4 événements, app de vote, 50 K abonnés.' },
      { period: 'Mois 10–15', milestone: 'Montréal + Québec + Ottawa, 1re commandite audio, finale à 500 spectateurs.' },
      { period: 'Mois 16–24', milestone: '5 villes, format licencié, série YouTube, 250 K$ / an.' },
    ],
  },
  {
    id: 5,
    slug: 'sonic-rush',
    name: 'Sonic Rush',
    tagline: 'La course où la musique est le jeu.',
    pitch:
      "Un parcours d'obstacles où la musique est la mécanique centrale : bouger au rythme pour ouvrir un passage, sprinter sur les drops, figer quand le son s'arrête. Ninja Warrior × Just Dance × Color Run — avec un score rythme + vitesse à la fin.",
    category: 'game',
    flagship: true,
    palette: { accent: '#FF5A00', surface: '#120803' },
    audience:
      'Du sport que même les non-sportifs adorent, du gaming en vrai — et les familles jouent ensemble.',
    revenueModel: 'Billets 15–25 $, événements privés, licences de format.',
    startupCost: '~1 500 $',
    scores: { difficulty: 7, revenue: 9, viral: 10 },
    moat: 'Le format standardisé + la marque; la logistique décourage les copies.',
    firstAction: 'Dessiner 6 stations et tester avec une équipe dans un gymnase.',
    stats: [
      { value: '6', label: 'stations standardisées' },
      { value: '10/10', label: 'viralité' },
      { value: '25 $', label: 'par participant' },
    ],
    timeline: [
      { period: 'Mois 1–4', milestone: 'Prototype testé sur 200 jeunes; kit et score standardisés.' },
      { period: 'Mois 5–10', milestone: '10 événements payants, 2 500 participants, contenu systématique.' },
      { period: 'Mois 11–18', milestone: 'Championnat provincial, kit de licence, 2 opérateurs licenciés.' },
      { period: 'Mois 19–24', milestone: '10 villes, 25 000 participants, 400 K$ de revenus système.' },
    ],
  },
  {
    id: 6,
    slug: 'beat-fit',
    name: 'Beat Fit',
    tagline: 'L’entraînement où le DJ est le coach.',
    pitch:
      "Des séances de groupe où le mix EST le programme : les BPM dictent l'intensité, les drops déclenchent les burpees, les breaks sont la récupération. HYROX rencontre le DJing — 50 personnes dirigées comme un orchestre du cardio.",
    category: 'sport',
    flagship: false,
    palette: { accent: '#FFD500', surface: '#121003' },
    audience:
      'L’entraînement devient une fête; la musique efface la souffrance mentale du cardio.',
    revenueModel: '10–15 $ / participant, forfaits équipes, événements corporatifs familiaux.',
    startupCost: '0–200 $',
    scores: { difficulty: 4, revenue: 8, viral: 9 },
    moat: 'Un coach ne sait pas mixer; un DJ ne sait pas entraîner. Lui fait les deux.',
    firstAction: 'Séance de 30 min testée avec son équipe, filmée.',
    stats: [
      { value: '160', label: 'BPM en zone rouge' },
      { value: '50', label: 'participants / séance' },
      { value: '9/10', label: 'viralité' },
    ],
  },
  {
    id: 7,
    slug: 'neon-nights',
    name: 'Neon Nights',
    tagline: 'La boîte de nuit que les ados n’avaient pas le droit d’avoir.',
    pitch:
      "La marque de soirées dansantes 12–17 ans : thème néon, dress code lumineux, zones photo, défis en direct, zéro alcool, sécurité béton. Un vendredi par mois, une ville à la fois. Le lieu de sortie nocturne qui n'existait pas.",
    category: 'live',
    flagship: true,
    palette: { accent: '#B517FF', surface: '#0C0312' },
    audience:
      'Les 12–17 ans n’ont AUCUN lieu de sortie nocturne; les parents paient pour un cadre sécuritaire.',
    revenueModel: 'Billets 15–25 $ × 150–400 ados, cantine, vestiaire, photos.',
    startupCost: '~2 000 $',
    scores: { difficulty: 6, revenue: 9, viral: 9 },
    moat: 'La confiance des parents et la marque — un nouvel entrant part de zéro sur les deux.',
    firstAction: 'Sonder 200 ados sur Instagram + repérer 3 salles.',
    stats: [
      { value: '2 M', label: 'd’ados canadiens sans lieu de sortie' },
      { value: '400', label: 'billets / soirée' },
      { value: '12', label: 'événements / an / ville' },
    ],
    timeline: [
      { period: 'Mois 1–3', milestone: 'Pilote : 200 ados, protocole de sécurité et confiance parentale béton.' },
      { period: 'Mois 4–12', milestone: 'Mensualisation dans 2 villes, 3 000 billets, rituels de marque établis.' },
      { period: 'Mois 13–18', milestone: '4 villes, premières commandites jeunesse, ~200 K$.' },
      { period: 'Mois 19–24', milestone: '8 villes, playbook de franchise, 500 K$ / an.' },
    ],
  },
  {
    id: 8,
    slug: 'halftime-heroes',
    name: 'Halftime Heroes',
    tagline: 'La mi-temps devient le moment fort du match.',
    pitch:
      "Des shows de mi-temps pour le sport scolaire et civil : DJ, concours dans la foule, défis synchronisés à la musique, fan cam. Les mi-temps jeunesse sont mortes — transformées en mini Super Bowl.",
    category: 'sport',
    flagship: false,
    palette: { accent: '#FFB300', surface: '#120D02' },
    audience:
      'Les spectateurs deviennent la vedette; les jeunes restent au match au complet.',
    revenueModel: '200–400 $ / match, forfaits saison, commandites locales intégrées.',
    startupCost: '~300 $',
    scores: { difficulty: 3, revenue: 6, viral: 7 },
    moat: 'Le réseau dans les ligues; l’énergie ne se copie pas.',
    firstAction: 'Mi-temps gratuite au prochain gros match local, réaction captée.',
    stats: [
      { value: '10 min', label: 'de show' },
      { value: '1 800 $', label: 'forfait 10 matchs' },
      { value: '7/10', label: 'viralité' },
    ],
  },
  {
    id: 9,
    slug: 'mixtape-academy',
    name: 'Mixtape Academy',
    tagline: 'Apprends à mixer avec quelqu’un qui te ressemble.',
    pitch:
      "L'école de DJ des 10–15 ans, enseignée PAR un ado : camps, ateliers, cours privés, fêtes « apprends à mixer ». Progression gamifiée par niveaux — Rookie, Selector, Mixmaster, Headliner — inspirée de Duolingo.",
    category: 'community',
    flagship: false,
    palette: { accent: '#00C2FF', surface: '#030D12' },
    audience:
      'Les parents cherchent du créatif hors écran passif; les enfants idolâtrent un prof de 15 ans.',
    revenueModel: '40–60 $ / cours privé, ateliers 25 $, camps 200 $ / semaine.',
    startupCost: '~500 $',
    scores: { difficulty: 3, revenue: 7, viral: 7 },
    moat: 'Un curriculum par niveaux devient un actif licenciable.',
    firstAction: 'Créer le niveau 1 (4 leçons) + atelier gratuit au service de garde.',
    stats: [
      { value: '4', label: 'niveaux de progression' },
      { value: '200 $', label: 'camp / semaine' },
      { value: '7/10', label: 'revenus' },
    ],
  },
  {
    id: 10,
    slug: 'glow-games',
    name: 'Glow Games',
    tagline: 'Le sport devient un show.',
    pitch:
      "Des tournois sportifs nocturnes en lumière noire : ballons fluorescents, lignes lumineuses, peinture néon, DJ live. Topgolf a prouvé qu'on peut réinventer un sport avec lumière + musique + social — nous le faisons dans les gymnases qui dorment le soir.",
    category: 'sport',
    flagship: true,
    palette: { accent: '#39FF14', surface: '#050F03' },
    audience:
      'Sport + fête + esthétique spectaculaire : chaque photo est partageable, chaque parent approuve.',
    revenueModel: 'Billets 15–20 $ / joueur, spectateurs 5 $, événements privés 1 200 $+.',
    startupCost: '~1 800 $',
    scores: { difficulty: 5, revenue: 8, viral: 10 },
    moat: 'Équipement UV + logistique + marque : réplicable mais coûteux à bien faire.',
    firstAction: 'Louer 2 lampes UV et faire un test photo dans un gymnase le soir.',
    stats: [
      { value: '10/10', label: 'viralité' },
      { value: '150', label: 'joueurs / événement' },
      { value: '0 $', label: 'd’infrastructure (gymnases existants)' },
    ],
    timeline: [
      { period: 'Mois 1–4', milestone: '3 pilotes (basket + dodgeball), kit UV standardisé transportable.' },
      { period: 'Mois 5–12', milestone: 'Circuit mensuel dans 3 villes, 5 000 participants année 1.' },
      { period: 'Mois 13–18', milestone: 'Kit de licence, commandite sportive, ~150 K$.' },
      { period: 'Mois 19–24', milestone: '10 villes, étude d’une Glow Arena permanente, 350 K$ / an.' },
    ],
  },
  {
    id: 11,
    slug: 'soundtrack-city',
    name: 'Soundtrack City',
    tagline: 'Le DJ officiel de ta ville.',
    pitch:
      "Le contrat de DJ jeunesse officiel d'une municipalité : piscines l'été, fêtes de quartier, patinoires l'hiver, événements des loisirs. Les villes ont des budgets récurrents et cherchent désespérément à rejoindre les 12–17 ans.",
    category: 'community',
    flagship: false,
    palette: { accent: '#00A8E8', surface: '#020D12' },
    audience:
      'Les jeunes retrouvent « leur » DJ partout; la ville a une histoire jeunesse positive à raconter.',
    revenueModel: 'Contrat annuel 3 000–8 000 $ / ville, extensible à plusieurs municipalités.',
    startupCost: '0 $',
    scores: { difficulty: 5, revenue: 7, viral: 5 },
    moat: 'Les contrats municipaux sont lents à obtenir mais très durables.',
    firstAction: 'Écrire au responsable des loisirs avec une offre pilote pour la prochaine fête de quartier.',
    stats: [
      { value: '8 K$', label: 'contrat annuel / ville' },
      { value: '12', label: 'mois de visibilité' },
      { value: '∞', label: 'de renouvellements' },
    ],
  },
];

/** Les concepts phares pour la section « Concepts phares » */
export const flagships = startups.filter((s) => s.flagship);

/** Libellés de catégories pour les filtres de la carte interactive */
export const categoryLabels: Record<Category, string> = {
  live: 'Expériences live',
  sport: 'Sport × Musique',
  game: 'Jeu & Compétition',
  digital: 'Numérique & Contenu',
  community: 'Communauté & Récurrence',
};
