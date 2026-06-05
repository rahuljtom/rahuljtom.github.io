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
  return (
    <>
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
    </>
  );
}

export default App;
