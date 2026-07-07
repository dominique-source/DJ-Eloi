import type { Metadata } from 'next';
import { Archivo, Space_Grotesk } from 'next/font/google';
import './globals.css';
import { SmoothScroll } from '@/components/providers/SmoothScroll';
import { ThemeToggle } from '@/components/ui/ThemeToggle';

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
  title: '25 Startups — Le futur du divertissement',
  description:
    "25 concepts de startups autour d'un DJ de 15 ans. 25 façons de réinventer le divertissement par la musique.",
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
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
