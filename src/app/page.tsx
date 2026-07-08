import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { StartupGrid } from '@/components/sections/StartupGrid';
import { FlagshipStory } from '@/components/sections/FlagshipStory';
import { Gallery } from '@/components/sections/Gallery';
import { ConstellationMap } from '@/components/sections/ConstellationMap';
import { DJAcademy } from '@/components/sections/DJAcademy';
import { ContactCTA } from '@/components/sections/ContactCTA';
import { Footer } from '@/components/sections/Footer';

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <StartupGrid />
      <FlagshipStory />
      <Gallery />
      <ConstellationMap />
      <DJAcademy />
      <ContactCTA />
      <Footer />
    </main>
  );
}
