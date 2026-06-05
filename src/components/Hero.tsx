import { motion } from 'framer-motion';

export function Hero() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } } // Gentle ease
  };

  return (
    <section className="relative min-h-[100svh] flex items-center pt-16 overflow-hidden">
      {/* Subtle radial gradient glow */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 30% 50%, #c8956a08, transparent 50%)'
        }}
      />
      
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 w-full"
      >
        <motion.h1 
          variants={item}
          className="font-serif text-[clamp(3rem,7vw,5.5rem)] leading-[1.1] mb-6 text-text-main"
        >
          Rahul Thomas
        </motion.h1>
        
        <motion.p 
          variants={item}
          className="font-sans text-lg md:text-xl text-text-secondary max-w-2xl mb-10 leading-relaxed"
        >
          Backend & AI infrastructure. I build systems that stay up.
        </motion.p>
        
        <motion.div variants={item} className="flex flex-wrap gap-6 text-sm font-mono text-text-tertiary">
          <a href="https://github.com/rahuljtom" target="_blank" rel="noreferrer" className="hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm px-1 -mx-1">
            github
          </a>
          <a href="https://linkedin.com/in/rahuljtom" target="_blank" rel="noreferrer" className="hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm px-1 -mx-1">
            linkedin
          </a>
          <a href="mailto:rahuljtoms@gmail.com" className="hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm px-1 -mx-1">
            email
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
