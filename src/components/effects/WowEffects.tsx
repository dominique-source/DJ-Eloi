'use client';

import { useEffect, useState } from 'react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

const KONAMI = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a',
];

/**
 * Moments WOW globaux :
 * - Barre espace → flash de la barre signature.
 * - Konami code → mode « nuit de festival » (classe .festival sur <html>).
 */
export function WowEffects() {
  const reducedMotion = usePrefersReducedMotion();
  const [pulse, setPulse] = useState(0);

  useEffect(() => {
    if (reducedMotion) return;
    let progress = 0;

    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const typing =
        target !== null &&
        ['INPUT', 'TEXTAREA', 'SELECT', 'BUTTON'].includes(target.tagName);

      if (event.key === ' ' && !typing) {
        event.preventDefault();
        setPulse((count) => count + 1);
      }

      const expected = KONAMI[progress];
      progress =
        event.key === expected ? progress + 1 : event.key === KONAMI[0] ? 1 : 0;
      if (progress === KONAMI.length) {
        document.documentElement.classList.toggle('festival');
        progress = 0;
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [reducedMotion]);

  if (pulse === 0) return null;

  return (
    <span
      key={pulse}
      aria-hidden
      className="signature-flash pointer-events-none fixed left-[-10%] right-[-10%] top-1/2 z-90 h-3 bg-accent"
    />
  );
}
