import type { Metadata, Viewport } from 'next';
import { Archivo, Space_Grotesk } from 'next/font/google';
import './globals.css';
import { SmoothScroll } from '@/components/providers/SmoothScroll';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { WowEffects } from '@/components/effects/WowEffects';
import { profile } from '@/data/profile';

const display = Archivo({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--font-display',
});

const grotesque = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-grotesque',
});

export const metadata: Metadata = {
  title: `${profile.djName} — 25 façons de réinventer le divertissement`,
  description: `L'univers de ${profile.djName} : 25 concepts de startups autour d'un DJ de ${profile.age} ans qui réinvente le divertissement par la musique.`,
};

export const viewport: Viewport = {
  themeColor: '#0a0a0a',
};

/* Applique le thème sauvegardé avant le premier rendu (évite le flash). */
const themeInitScript = `try{if(localStorage.getItem('theme')==='light')document.documentElement.classList.add('light')}catch(e){}`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body
        className={`${display.variable} ${grotesque.variable} antialiased`}
      >
        <SmoothScroll>
          <ThemeToggle />
          <WowEffects />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
