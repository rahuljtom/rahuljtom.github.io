import { useEffect } from 'react';
import { ReactLenis } from '@studio-freight/react-lenis';
import { Nav } from './components/Nav';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Experience } from './components/Experience';
import { Projects } from './components/Projects';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { NoiseOverlay } from './components/NoiseOverlay';
import { AudioToggle } from './components/AudioToggle';

function App() {
  // Check prefers-reduced-motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    // If user prefers reduced motion, we disable Lenis completely
    <ReactLenis root options={{ smoothWheel: !prefersReducedMotion, syncTouch: true }}>
      <NoiseOverlay />
      
      <div className="relative z-10 flex flex-col min-h-screen selection:bg-accent selection:text-[#141210]">
        <Nav />
        
        <main className="flex-1 w-full max-w-[68rem] mx-auto px-6">
          <Hero />
          <About />
          <Experience />
          <Projects />
          <Contact />
        </main>
        
        <Footer />
      </div>
      
      <AudioToggle />
    </ReactLenis>
  );
}

export default App;
