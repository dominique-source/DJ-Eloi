import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { ConsoleShowcase } from '@/components/sections/ConsoleShowcase';
import { TikTokCTA } from '@/components/sections/TikTokCTA';
import { DJAcademy } from '@/components/sections/DJAcademy';
import { ContactCTA } from '@/components/sections/ContactCTA';
import { Footer } from '@/components/sections/Footer';

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <ConsoleShowcase />
      <TikTokCTA />
      <DJAcademy />
      <ContactCTA />
      <Footer />
    </main>
  );
}
