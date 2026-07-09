import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { ConsoleShowcase } from '@/components/sections/ConsoleShowcase';
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
      <Gallery />
      <DJAcademy />
      <ContactCTA />
      <Footer />
    </main>
  );
}
