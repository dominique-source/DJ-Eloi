import { Hero } from '@/components/sections/Hero';
import { Manifesto } from '@/components/sections/Manifesto';
import { About } from '@/components/sections/About';
import { ImpactStats } from '@/components/sections/ImpactStats';
import { StartupGrid } from '@/components/sections/StartupGrid';
import { FlagshipStory } from '@/components/sections/FlagshipStory';
import { Roadmap } from '@/components/sections/Roadmap';
import { Gallery } from '@/components/sections/Gallery';
import { ConstellationMap } from '@/components/sections/ConstellationMap';
import { ContactCTA } from '@/components/sections/ContactCTA';
import { Footer } from '@/components/sections/Footer';

export default function Home() {
  return (
    <main>
      <Hero />
      <Manifesto />
      <About />
      <ImpactStats />
      <StartupGrid />
      <FlagshipStory />
      <Roadmap />
      <Gallery />
      <ConstellationMap />
      <ContactCTA />
      <Footer />
    </main>
  );
}
