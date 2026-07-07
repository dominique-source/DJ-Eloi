'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'motion/react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

interface CountUpProps {
  value: number;
  suffix?: string;
}

/** Compteur qui monte une seule fois quand il entre dans le viewport. */
export function CountUp({ value, suffix = '' }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reducedMotion = usePrefersReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reducedMotion) {
      setDisplay(value);
      return;
    }
    const start = performance.now();
    const duration = 1200;
    let frame = 0;
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      setDisplay(Math.round(value * (1 - Math.pow(1 - progress, 3))));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, reducedMotion, value]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}
