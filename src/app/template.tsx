'use client';

import { motion } from 'motion/react';

/**
 * Transition signature entre les pages : la barre diagonale accent
 * couvre l'écran puis se retire vers la droite (Phase 5 — WOW n°4).
 * Masquée si prefers-reduced-motion (motion-reduce:hidden).
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-[-20%] z-95 origin-left bg-accent motion-reduce:hidden"
        style={{ rotate: -8 }}
        initial={{ scaleX: 1 }}
        animate={{ scaleX: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      />
      {children}
    </>
  );
}
