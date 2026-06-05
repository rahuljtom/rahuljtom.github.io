import { SectionMarker } from './SectionMarker';
import { motion } from 'framer-motion';

export function Contact() {
  return (
    <motion.section 
      id="contact" 
      className="py-24"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <SectionMarker number="04" title="Get in touch" />
      
      <div className="max-w-[36rem] mt-12">
        <p className="text-text-secondary leading-relaxed mb-8">
          I'm currently looking for Summer 2026 internships in backend, platform, or AI infrastructure engineering. If you're building systems that need to stay up, I'd love to chat.
        </p>
        
        <div className="flex flex-col items-start gap-8">
          <a 
            href="mailto:rahuljtoms@gmail.com"
            className="text-2xl md:text-3xl font-serif text-accent hover:text-accent-bright relative group inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm px-1 -mx-1"
          >
            rahuljtoms@gmail.com
            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-accent-bright transition-all duration-300 group-hover:w-full"></span>
          </a>
          
          <div className="flex gap-6 text-sm font-mono text-text-tertiary">
            <a href="https://github.com/rahuljtom" target="_blank" rel="noreferrer" className="hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm px-1 -mx-1">
              github
            </a>
            <a href="https://linkedin.com/in/rahuljtom" target="_blank" rel="noreferrer" className="hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm px-1 -mx-1">
              linkedin
            </a>
            <a href="mailto:rahuljtoms@gmail.com" className="hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm px-1 -mx-1">
              email
            </a>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
