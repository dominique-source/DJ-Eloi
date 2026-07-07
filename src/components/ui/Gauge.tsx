'use client';

import { motion } from 'motion/react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

interface GaugeProps {
  label: string;
  value: number; // sur 10
}

/** Jauge de score animée (scaleX GPU only), accessible et reduced-motion safe. */
export function Gauge({ label, value }: GaugeProps) {
  const reducedMotion = usePrefersReducedMotion();
  const ratio = value / 10;

  return (
    <div role="img" aria-label={`${label} : ${value} sur 10`}>
      <div className="flex items-baseline justify-between">
        <span className="text-xs uppercase tracking-caps text-muted">{label}</span>
        <span className="font-display text-2xl font-black italic text-accent">
          {value}
          <span className="text-sm not-italic text-muted">/10</span>
        </span>
      </div>
      <div className="mt-3 h-1 w-full bg-foreground/10">
        {reducedMotion ? (
          <div
            className="h-full origin-left bg-accent"
            style={{ transform: `scaleX(${ratio})` }}
          />
        ) : (
          <motion.div
            className="h-full origin-left bg-accent"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: ratio }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          />
        )}
      </div>
    </div>
  );
}
