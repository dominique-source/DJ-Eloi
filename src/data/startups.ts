/**
 * ============================================================
 * SOURCE DE VÉRITÉ UNIQUE — Les 25 startups
 * ============================================================
 * Toutes les pages du site sont générées à partir de ce fichier.
 * Pour remplacer un contenu (texte, image, vidéo, logo) :
 * modifier UNIQUEMENT ce fichier. Aucun texte ne doit être
 * codé en dur dans les composants.
 *
 * Convention des médias (placeholders premium) :
 *   /public/media/{slug}/logo.svg
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
  pitch: string;               // 2–3 phrases, ton startup lancée
  category: Category;
  flagship: boolean;          // true = top 5 investisseur (page enrichie)
  palette: {
    accent: string;           // LA couleur (une seule, règle 60/30/10)
    surface: string;          // fond sombre propre à la startup
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
    slug: 'fete-a-domicile',
    name: 'Fête-à-Domicile',
    tagline: 'La fête parfaite, livrée chez toi.',
    pitch:
      "Le service de DJ clé en main pour anniversaires et fêtes familiales, animé par un DJ ado qui sait exactement ce que les jeunes veulent entendre. Matériel, lumières, jeux d'animation : tout arrive, tout fonctionne, tout le monde danse.",
    category: 'live',
    flagship: false,
    palette: { accent: '#FF5A5F', surface: '#12080A' },
    audience:
      "Les parents engagent un jeune fiable et abordable; les ados trouvent ça 10x plus cool qu'un DJ adulte.",
    revenueModel: '200–450 $ / événement, extras éclairage et animation.',
    startupCost: '800–1 500 $',
    scores: { difficulty: 2, revenue: 5, viral: 4 },
    moat: 'Réputation locale et avis clients qui se construisent vite.',
    firstAction:
      'Page Instagram + 2 fêtes gratuites contre vidéos et témoignages.',
    stats: [
      { value: '450 $', label: 'par événement' },
      { value: '2 h', label: 'de préparation' },
      { value: '2/10', label: 'difficulté' },
    ],
  },
  {
    id: 2,
    slug: 'danse-ecole',
    name: 'Danse d’École Clé en Main',
    tagline: 'Chaque école mérite sa soirée légendaire.',
    pitch:
      "Le forfait complet des danses scolaires : DJ, éclairage, animation, photobooth. Un fournisseur qui parle le langage des élèves et rassure les directions — avec un calendrier récurrent d'Halloween à la fin d'année.",
    category: 'live',
    flagship: false,
    palette: { accent: '#7C5CFF', surface: '#0B0914' },
    audience:
      'Les directions veulent un fournisseur fiable et approprié; les élèves votent sur le plancher de danse.',
    revenueModel: '400–800 $ / danse, contrats annuels multi-événements.',
    startupCost: '~1 500 $ (matériel partagé)',
    scores: { difficulty: 3, revenue: 6, viral: 5 },
    moat: 'Les contrats scolaires récurrents créent une exclusivité de fait.',
    firstAction: 'Proposition d’une page envoyée à 10 écoles.',
    stats: [
      { value: '4–6', label: 'danses / école / an' },
      { value: '800 $', label: 'par soirée' },
      { value: '3/10', label: 'difficulté' },
    ],
  },
  {
    id: 3,
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
    id: 4,
    slug: 'silent-party',
    name: 'Silent Party Mobile',
    tagline: 'La fête que personne n’entend venir.',
    pitch:
      "Des soirées silencieuses avec casques sans fil à 3 canaux : le DJ mixe sur l'un, deux playlists sur les autres. Zéro plainte de bruit, contenu vidéo hilarant garanti, déployable partout — écoles, parcs, bibliothèques.",
    category: 'live',
    flagship: false,
    palette: { accent: '#00E5FF', surface: '#041012' },
    audience:
      'Expérience nouvelle, zéro bruit pour les parents, images irrésistibles pour les réseaux.',
    revenueModel: '15–25 $ / casque / événement + cachet DJ.',
    startupCost: '~1 800 $ (20 casques)',
    scores: { difficulty: 4, revenue: 7, viral: 8 },
    moat: 'L’inventaire de casques verrouille le marché local.',
    firstAction: 'Prévendre à 3 écoles et 2 villes avant d’acheter.',
    stats: [
      { value: '1 250 $', label: 'par soirée (50 casques)' },
      { value: '3', label: 'canaux simultanés' },
      { value: '8/10', label: 'viralité' },
    ],
  },
  {
    id: 5,
    slug: 'sport-x-beats',
    name: 'Studio Sport × Beats',
    tagline: 'Le son qui fait gagner des matchs.',
    pitch:
      "La chaîne de contenu où le sport rencontre le mix : chansons d'échauffement, remixes de moments sportifs viraux, sons d'entrée d'athlètes. Une audience de jeunes sportifs qui s'entraînent sur ses sons.",
    category: 'digital',
    flagship: false,
    palette: { accent: '#CCFF00', surface: '#0D0D0D' },
    audience:
      "Chaque jeune athlète rêve de SA chanson d'entrée; le contenu circule d'équipe en équipe.",
    revenueModel: 'Publicité, commandites, packs de mixes à 9,99 $.',
    startupCost: '0–200 $',
    scores: { difficulty: 2, revenue: 7, viral: 9 },
    moat: 'L’authenticité athlète + DJ est rare.',
    firstAction: 'Publier 3 vidéos format 30 s « la chanson qui te fait gagner ».',
    stats: [
      { value: '9/10', label: 'viralité' },
      { value: '0 $', label: 'pour démarrer' },
      { value: '∞', label: 'de contenu possible' },
    ],
  },
  {
    id: 6,
    slug: 'warm-up-pro',
    name: 'Warm-Up Pro',
    tagline: 'Chaque équipe mérite son hymne.',
    pitch:
      "Le mix d'échauffement officiel de chaque équipe : 20 minutes calibrées sur la routine d'avant-match, mises à jour chaque mois, performées en direct pour les grands rendez-vous. L'identité sonore que les pros ont — pour les équipes jeunesse.",
    category: 'sport',
    flagship: false,
    palette: { accent: '#FF3D71', surface: '#12060B' },
    audience:
      "Les équipes cherchent tout avantage mental; un mix personnalisé soude le groupe.",
    revenueModel: '150 $ / mix, 50 $ / mois / équipe, 250 $ la présence live.',
    startupCost: '0 $',
    scores: { difficulty: 3, revenue: 6, viral: 7 },
    moat: 'Double crédibilité athlète-DJ, incompréhensible pour un DJ ordinaire.',
    firstAction: 'Mix gratuit pour une équipe connue + filmer la réaction.',
    stats: [
      { value: '20 min', label: 'de mix calibré' },
      { value: '50 $', label: '/ mois / équipe' },
      { value: '0 $', label: 'd’investissement' },
    ],
  },
  {
    id: 7,
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
    id: 8,
    slug: 'study-beats',
    name: 'Study Beats Live',
    tagline: 'Étudier n’a jamais sonné aussi bien.',
    pitch:
      "Des sessions d'étude collectives sous casques silencieux : lo-fi mixé en direct, technique Pomodoro encodée dans la musique. Le DJ change l'énergie pour signaler sprints et pauses. L'étude, gamifiée par le son.",
    category: 'community',
    flagship: false,
    palette: { accent: '#9D7BFF', surface: '#0A0812' },
    audience:
      'Les parents paient pour que leurs ados étudient; les jeunes viennent pour l’ambiance, restent pour la productivité.',
    revenueModel: '10–15 $ / session, forfaits examens, partenariats bibliothèques.',
    startupCost: 'Réutilise les casques Silent Party',
    scores: { difficulty: 4, revenue: 5, viral: 7 },
    moat: 'La programmation sonore Pomodoro est un vrai savoir-faire.',
    firstAction: 'Session test gratuite avec 10 amis en période d’examens.',
    stats: [
      { value: '25/5', label: 'sprint / pause (min)' },
      { value: '15 $', label: 'par session' },
      { value: '7/10', label: 'viralité' },
    ],
  },
  {
    id: 9,
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
    id: 10,
    slug: 'esport-arena-sound',
    name: 'Esport Arena Sound',
    tagline: 'Le son des grandes finales, pour les tournois d’ici.',
    pitch:
      "L'ambiance sonore des tournois esport locaux : musique entre les matchs, sound design des moments clés, hype des finales. Le pont entre la culture gaming et l'événementiel — pour des tournois qui ont l'air pros en vidéo.",
    category: 'game',
    flagship: false,
    palette: { accent: '#3D8BFF', surface: '#050A14' },
    audience:
      'Les gamers rêvent de l’ambiance des mondiaux; les organisateurs veulent paraître pros.',
    revenueModel: '250–500 $ / tournoi + stingers sonores personnalisés.',
    startupCost: '0 $',
    scores: { difficulty: 3, revenue: 5, viral: 7 },
    moat: 'Comprendre les codes gaming ET savoir mixer : combinaison rare.',
    firstAction: 'Set gratuit offert au prochain tournoi local.',
    stats: [
      { value: '500 $', label: 'par tournoi' },
      { value: '0 $', label: 'd’investissement' },
      { value: '7/10', label: 'viralité' },
    ],
  },
  {
    id: 11,
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
    id: 12,
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
    id: 13,
    slug: 'crowd-control',
    name: 'Crowd Control',
    tagline: 'La foule est le jeu. Le DJ est le boss final.',
    pitch:
      "Un format d'événement où le public vote en temps réel pour contrôler la musique et doit réussir des défis collectifs pour débloquer les hits. Twitch et Roblox ont prouvé que les jeunes veulent participer — pas consommer.",
    category: 'game',
    flagship: false,
    palette: { accent: '#00FFC2', surface: '#03110D' },
    audience:
      'Chaque spectateur devient joueur; aucune soirée ne se ressemble; moments viraux constants.',
    revenueModel: 'Cachet premium 500–800 $ + licences du format à d’autres DJs.',
    startupCost: '~300 $',
    scores: { difficulty: 5, revenue: 8, viral: 9 },
    moat: 'Le logiciel de vote + le savoir-faire d’animation en direct.',
    firstAction: 'Prototyper le vote via sondage Instagram live lors d’une fête.',
    stats: [
      { value: 'Temps réel', label: 'vote de la foule' },
      { value: '800 $', label: 'cachet premium' },
      { value: '9/10', label: 'viralité' },
    ],
  },
  {
    id: 14,
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
    id: 15,
    slug: 'guess-the-drop',
    name: 'Guess The Drop',
    tagline: 'Parents contre ados. Que le meilleur son gagne.',
    pitch:
      "Le jeu-spectacle musical live : deviner la chanson en 1 seconde, chanter la suite, battle générationnelle parents vs ados. Le trivia night existe partout — personne ne l'a réinventé pour les familles avec un vrai DJ.",
    category: 'game',
    flagship: false,
    palette: { accent: '#FF2E63', surface: '#12040A' },
    audience:
      'Le duel générationnel est magique : les parents gagnent sur les années 80, les ados sur TikTok.',
    revenueModel: 'Cachet 250–400 $ / soirée + 20 $ / équipe inscrite.',
    startupCost: '~200 $',
    scores: { difficulty: 3, revenue: 7, viral: 8 },
    moat: 'La banque de questions et le talent d’animation.',
    firstAction: 'Écrire 5 rondes, tester en famille, pitcher un resto familial.',
    stats: [
      { value: '1 s', label: 'pour deviner' },
      { value: '5', label: 'rondes par soirée' },
      { value: '8/10', label: 'viralité' },
    ],
  },
  {
    id: 16,
    slug: 'walk-up-songs',
    name: 'Walk-Up Songs',
    tagline: 'Ton nom. Ton son. Ton entrée.',
    pitch:
      "Des chansons d'entrée personnalisées pour jeunes athlètes : 30 secondes de mix sur mesure avec leur nom en voix off. Au baseball pro, chaque joueur a sa walk-up song — maintenant, chaque jeune aussi.",
    category: 'digital',
    flagship: false,
    palette: { accent: '#4DFFDF', surface: '#031210' },
    audience:
      'LE cadeau parfait pour un jeune sportif; entendre son nom dans un vrai mix = frisson garanti.',
    revenueModel: '30–50 $ / chanson, forfaits équipe, présentations de saison pour ligues.',
    startupCost: '0 $',
    scores: { difficulty: 2, revenue: 6, viral: 8 },
    moat: 'Distribution via le réseau sportif.',
    firstAction: '3 exemples gratuits pour des athlètes locaux, publiés avec leur réaction.',
    stats: [
      { value: '30 s', label: 'de mix sur mesure' },
      { value: '50 $', label: 'par chanson' },
      { value: '1 h', label: 'de production' },
    ],
  },
  {
    id: 17,
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
    id: 18,
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
    id: 19,
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
    id: 20,
    slug: 'team-anthem-club',
    name: 'Team Anthem Club',
    tagline: 'Le Spotify des équipes.',
    pitch:
      "L'abonnement mensuel des équipes sportives : mix d'échauffement exclusif, mix de victoire et playlist de vestiaire, livrés automatiquement chaque mois. Spotify vend l'accès à la musique; nous vendons l'identité sonore d'un groupe.",
    category: 'community',
    flagship: true,
    palette: { accent: '#1DE9B6', surface: '#03110D' },
    audience:
      'Les équipes veulent leur son signature sans y penser; le coach reçoit tout clé en main.',
    revenueModel: '29–49 $ / mois / équipe. 1 000 équipes = ~470 K$ / an récurrents.',
    startupCost: '0 $',
    scores: { difficulty: 4, revenue: 8, viral: 5 },
    moat: 'Le coût de changement grimpe une fois l’identité sonore installée.',
    firstAction: 'Signer 3 équipes pilotes à 19 $ / mois pour valider la rétention.',
    stats: [
      { value: '100 %', label: 'revenus récurrents' },
      { value: '470 K$', label: 'à 1 000 équipes' },
      { value: '90 %', label: 'rétention cible' },
    ],
    timeline: [
      { period: 'Mois 1–3', milestone: '10 équipes pilotes; livraison automatisée; mesurer la rétention.' },
      { period: 'Mois 4–9', milestone: '100 équipes via le réseau sportif; prix 29–39 $ / mois.' },
      { period: 'Mois 10–18', milestone: 'Plateforme web, Canada anglais, associations partenaires, 400 équipes.' },
      { period: 'Mois 19–24', milestone: '1 000 équipes, 2 producteurs juniors, expansion É.-U., 450 K$ ARR.' },
    ],
  },
  {
    id: 21,
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
    id: 22,
    slug: 'drop-challenge',
    name: 'The Drop Challenge',
    tagline: 'TikTok, en vrai, avec tes amis.',
    pitch:
      "Les tendances TikTok transformées en épreuves physiques réelles : défis de danse chronométrés, battles de lip-sync, classement en direct. Les vidéos des participants alimentent la marque, qui alimente le prochain événement — une boucle virale par design.",
    category: 'game',
    flagship: false,
    palette: { accent: '#FF0050', surface: '#12030A' },
    audience:
      'Les jeunes veulent vivre TikTok en vrai; chaque événement génère des centaines de vidéos.',
    revenueModel: 'Inscriptions 10–15 $, billetterie, commandites jeunesse.',
    startupCost: '~500 $',
    scores: { difficulty: 4, revenue: 7, viral: 10 },
    moat: 'La vitesse d’adaptation aux tendances : un ado gagne toujours contre une agence.',
    firstAction: 'Mini-défi à 20 participants après une pratique sportive + recap publié.',
    stats: [
      { value: '10/10', label: 'viralité' },
      { value: '100+', label: 'vidéos / événement' },
      { value: '15 $', label: 'l’inscription' },
    ],
  },
  {
    id: 23,
    slug: 'beat-lab-virtuel',
    name: 'Beat Lab Virtuel',
    tagline: 'Le premier DJ ado natif du métavers.',
    pitch:
      "Un lieu virtuel sur Roblox où les jeunes assistent à des DJ sets, apprennent les bases du mix et jouent à des mini-jeux musicaux. Des dizaines de millions de jeunes y sont déjà chaque jour — les concerts virtuels y attirent des millions de visites.",
    category: 'digital',
    flagship: false,
    palette: { accent: '#7000FF', surface: '#08030F' },
    audience:
      'Aucune limite géographique; les fans physiques suivent en ligne et vice-versa.',
    revenueModel: 'Objets virtuels (Robux), accès VIP, entonnoir vers les événements réels.',
    startupCost: '0–500 $',
    scores: { difficulty: 7, revenue: 8, viral: 8 },
    moat: 'La compétence Roblox Studio + une audience réelle à convertir.',
    firstAction: '2 h dans Roblox Studio + visiter les 3 expériences musicales les plus populaires.',
    stats: [
      { value: '70 M+', label: 'joueurs quotidiens sur Roblox' },
      { value: '0 km', label: 'de déplacement' },
      { value: '8/10', label: 'potentiel revenus' },
    ],
  },
  {
    id: 24,
    slug: 'family-face-off',
    name: 'Family Face-Off',
    tagline: 'Ta famille contre toutes les autres.',
    pitch:
      "L'événement mensuel où les familles s'affrontent : relais rythmés, quiz musical intergénérationnel, battles de danse parents-enfants, championnat de saison. Disney vend la magie familiale; nous vendons la compétition familiale.",
    category: 'community',
    flagship: false,
    palette: { accent: '#FF6B35', surface: '#120704' },
    audience:
      'Les parents veulent PARTICIPER avec leurs ados, pas juste regarder; la rivalité familiale est un moteur puissant.',
    revenueModel: '40–60 $ / famille / événement, abonnement de saison, commandites familiales.',
    startupCost: '~800 $',
    scores: { difficulty: 5, revenue: 7, viral: 8 },
    moat: 'La communauté récurrente : la fidélité des familles est difficile à voler.',
    firstAction: 'Tester 3 épreuves avec 4 familles du quartier un dimanche.',
    stats: [
      { value: '60 $', label: 'par famille' },
      { value: '1×', label: 'par mois' },
      { value: '8/10', label: 'viralité' },
    ],
  },
  {
    id: 25,
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

/** Les 5 flagships pour la section « Vision investisseur » */
export const flagships = startups.filter((s) => s.flagship);

/** Libellés de catégories pour les filtres de la carte interactive */
export const categoryLabels: Record<Category, string> = {
  live: 'Expériences live',
  sport: 'Sport × Musique',
  game: 'Jeu & Compétition',
  digital: 'Numérique & Contenu',
  community: 'Communauté & Récurrence',
};
