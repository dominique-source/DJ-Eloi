'use client';

import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

/** Bascule dark (défaut) / light via la classe .light sur <html>. */
export function ThemeToggle() {
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    setIsLight(document.documentElement.classList.contains('light'));
  }, []);

  const toggle = () => {
    const next = !isLight;
    setIsLight(next);
    document.documentElement.classList.toggle('light', next);
    try {
      localStorage.setItem('theme', next ? 'light' : 'dark');
    } catch {
      // stockage indisponible (navigation privée) : le choix vaut pour la session
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isLight ? 'Activer le mode sombre' : 'Activer le mode clair'}
      className="fixed right-6 top-6 z-50 flex h-10 w-10 items-center justify-center border border-foreground/20 text-foreground transition-colors hover:border-accent hover:text-accent"
    >
      {isLight ? <Moon size={18} aria-hidden /> : <Sun size={18} aria-hidden />}
    </button>
  );
}
