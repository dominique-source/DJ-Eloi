/**
 * Constantes d'animation partagées.
 * GSAP = scroll storytelling · motion = micro-interactions · Lenis = smooth scroll.
 * GPU only : n'animer que transform et opacity.
 */

/** Easing signature du site (expo out). */
export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

/** Équivalent GSAP de l'easing signature. */
export const GSAP_EASE = 'expo.out';

/** Durées standard en secondes. */
export const DURATION = {
  fast: 0.25,
  base: 0.6,
  slow: 1.2,
} as const;

/** Inclinaison de la barre diagonale signature (règle de design n°5). */
export const SIGNATURE_ANGLE_DEG = -8;
