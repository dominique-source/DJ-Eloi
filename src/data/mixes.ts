/**
 * ============================================================
 * LES 5 DERNIERS MIXES TIKTOK
 * ============================================================
 * Signets affichés dans la section TikTok de la page d'accueil.
 * `url` = TODO tant que le vrai lien TikTok n'est pas fourni (le
 * signet renvoie alors vers le profil TikTok en attendant).
 *
 * Miniature : dépose une image dans
 *   /public/media/{slug}/gallery-01.jpg
 * <MediaSlot /> l'affichera automatiquement (sinon placeholder).
 */

export interface Mix {
  slug: string;
  url: string;      // TODO : lien TikTok réel (https://www.tiktok.com/@.../video/...)
  caption: string;   // TODO : titre ou description courte du mix
}

export const recentMixes: Mix[] = [
  { slug: 'mix-1', url: 'TODO', caption: 'TODO' },
  { slug: 'mix-2', url: 'TODO', caption: 'TODO' },
  { slug: 'mix-3', url: 'TODO', caption: 'TODO' },
  { slug: 'mix-4', url: 'TODO', caption: 'TODO' },
  { slug: 'mix-5', url: 'TODO', caption: 'TODO' },
];
