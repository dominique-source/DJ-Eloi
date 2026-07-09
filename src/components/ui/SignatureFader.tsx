'use client';

import type { HTMLAttributes } from 'react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

interface SignatureFaderProps extends HTMLAttributes<HTMLDivElement> {
  /** Fausse pour l'instance pilotée par le scroll (Hero) plutôt qu'en boucle. */
  autoSlide?: boolean;
}

/**
 * Élément signature du site : un fader de console DJ (piste + curseur)
 * incliné à l'angle signature. Le curseur glisse le long de la piste
 * au lieu d'une simple barre diagonale statique.
 */
export function SignatureFader({
  className = '',
  autoSlide = true,
  ...rest
}: SignatureFaderProps) {
  const reducedMotion = usePrefersReducedMotion();
  const sliding = autoSlide && !reducedMotion;

  return (
    <div
      aria-hidden
      style={{ containerType: 'inline-size' }}
      className={`relative h-1.5 origin-left rotate-(--rotate-signature) ${className}`}
      {...rest}
    >
      <div className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-accent/30" />
      <div
        className={`absolute top-1/2 h-4 w-2.5 -translate-y-1/2 bg-accent ${
          sliding ? 'signature-fader-slide' : 'left-1/2 -translate-x-1/2'
        }`}
      />
    </div>
  );
}
