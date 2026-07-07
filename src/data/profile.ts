/**
 * ============================================================
 * PROFIL RÉEL — DJ King E
 * ============================================================
 * Contrairement à data/startups.ts (les façons originales de faire du DJ),
 * ce fichier contient les VRAIES informations d'Éloi qui
 * alimentent le hero, la bio, les services réservables et le
 * formulaire de contact.
 *
 * Champs marqués [BROUILLON] : suggestion à valider ou remplacer.
 * Champs marqués TODO : information encore manquante.
 */

export interface Service {
  slug: string;
  name: string;
  description: string;
  priceRange: string;
  duration: string;
}

export interface Testimonial {
  quote: string;
  author: string;
}

export interface DJProfile {
  djName: string;
  realName: string;
  age: number;
  tagline: string;
  bio: string;
  musicStyles: string[];
  contact: {
    email: string;
    instagram: string;
    phone: string | null;
  };
  services: Service[];
  testimonials: Testimonial[];
}

export const profile: DJProfile = {
  djName: 'DJ King E',
  realName: 'Éloi',
  age: 15,
  tagline: 'Le beat qui fait vibrer ta soirée.',
  bio: "DJ King E, c'est Éloi, 15 ans, qui mixe depuis peu mais qui a déjà l'énergie d'un vrai showman. Sportif dans l'âme, il sait lire une foule et faire monter l'ambiance, que ce soit à une fête entre amis ou dans un gymnase. TODO : ajouter depuis quand il mixe et ce qu'il aime le plus dans le DJing.",
  musicStyles: ['TODO — ex. Hip-hop, House, Pop, Hype sportif'],
  contact: {
    email: 'TODO@example.com',
    instagram: 'TODO',
    phone: null,
  },
  services: [
    {
      slug: 'fete-privee',
      name: 'Fête privée',
      description: "DJ clé en main pour anniversaires et fêtes familiales : matériel, lumières, animation.",
      priceRange: '200–450 $',
      duration: '2–4 heures',
    },
    {
      slug: 'danse-ecole',
      name: 'Danse d’école',
      description: 'Forfait complet pour les danses scolaires : DJ, éclairage, animation, photobooth.',
      priceRange: '400–800 $',
      duration: 'Soirée complète',
    },
    {
      slug: 'tournoi-sportif',
      name: 'Tournoi sportif',
      description: "Ambiance et sonorisation pour tournois jeunesse : échauffement, drops, animation de foule.",
      priceRange: '300–600 $ / jour',
      duration: '1 jour ou plus',
    },
  ],
  testimonials: [],
};
