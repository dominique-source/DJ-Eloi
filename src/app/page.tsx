import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { ConsoleShowcase } from '@/components/sections/ConsoleShowcase';
import { FlagshipStory } from '@/components/sections/FlagshipStory';
import { Gallery } from '@/components/sections/Gallery';
import { DJAcademy } from '@/components/sections/DJAcademy';
import { ContactCTA } from '@/components/sections/ContactCTA';
import { Footer } from '@/components/sections/Footer';

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <ConsoleShowcase />
      <FlagshipStory />
      <Gallery />
      <DJAcademy />
      <ContactCTA />
      <Footer />
    </main>
  );
}
