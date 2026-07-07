'use client';

import { useEffect, useState } from 'react';

/** Heure locale du visiteur, mise à jour chaque seconde après montage. */
export function LocalTime({ label }: { label: string }) {
  const [time, setTime] = useState('');

  useEffect(() => {
    const update = () =>
      setTime(
        new Date().toLocaleTimeString('fr-CA', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }),
      );
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <p className="text-xs uppercase tracking-caps text-muted">
      {label} — <span className="text-foreground">{time || '--:--:--'}</span>
    </p>
  );
}
