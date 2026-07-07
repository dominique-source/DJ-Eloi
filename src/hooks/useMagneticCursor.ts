'use client';

import { useEffect, useRef } from 'react';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

/**
 * Effet curseur magnétique : l'élément glisse doucement vers le
 * pointeur (transform only). Inactif si prefers-reduced-motion.
 */
export function useMagneticCursor<T extends HTMLElement>(strength = 0.3) {
  const ref = useRef<T>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const element = ref.current;
    if (!element || reducedMotion) return;

    const onMove = (event: PointerEvent) => {
      const rect = element.getBoundingClientRect();
      const x = event.clientX - (rect.left + rect.width / 2);
      const y = event.clientY - (rect.top + rect.height / 2);
      element.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
    };
    const onLeave = () => {
      element.style.transform = 'translate(0px, 0px)';
    };

    element.addEventListener('pointermove', onMove);
    element.addEventListener('pointerleave', onLeave);
    return () => {
      element.removeEventListener('pointermove', onMove);
      element.removeEventListener('pointerleave', onLeave);
    };
  }, [strength, reducedMotion]);

  return ref;
}
