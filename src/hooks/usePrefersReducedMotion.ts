'use client';

import { useEffect, useState } from 'react';

/**
 * Retourne true si l'utilisateur demande une réduction des animations.
 * Toute animation du site doit consulter ce hook (règle CLAUDE.md).
 */
export function usePrefersReducedMotion(): boolean {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);

    const onChange = (event: MediaQueryListEvent) =>
      setReducedMotion(event.matches);
    mediaQuery.addEventListener('change', onChange);
    return () => mediaQuery.removeEventListener('change', onChange);
  }, []);

  return reducedMotion;
}
