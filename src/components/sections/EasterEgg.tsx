'use client';

import { useState } from 'react';

interface EasterEggProps {
  name: string;
  rights: string;
  egg: string;
}

/** 5 clics sur le copyright = mode festival (easter egg du footer). */
export function EasterEgg({ name, rights, egg }: EasterEggProps) {
  const [clicks, setClicks] = useState(0);
  const found = clicks >= 5;

  const onClick = () => {
    const next = clicks + 1;
    setClicks(next);
    if (next === 5) {
      document.documentElement.classList.add('festival');
    }
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className="text-left text-xs text-muted transition-colors hover:text-foreground"
    >
      © {new Date().getFullYear()} {name}. {found ? egg : rights}
    </button>
  );
}
