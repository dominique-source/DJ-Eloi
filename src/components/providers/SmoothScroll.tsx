'use client';

import type { ReactNode } from 'react';
import { useLenis } from '@/hooks/useLenis';

/** Active Lenis + la synchronisation GSAP sur tout l'arbre de l'app. */
export function SmoothScroll({ children }: { children: ReactNode }) {
  useLenis();
  return <>{children}</>;
}
