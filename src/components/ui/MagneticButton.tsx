'use client';

import type { ButtonHTMLAttributes } from 'react';
import { useMagneticCursor } from '@/hooks/useMagneticCursor';

/** Bouton avec effet curseur magnétique (Phase 5 — moment WOW n°2). */
export function MagneticButton({
  className = '',
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  const ref = useMagneticCursor<HTMLButtonElement>();

  return (
    <button
      ref={ref}
      className={`transition-transform duration-200 ease-out ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
