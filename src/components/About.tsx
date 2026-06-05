import { SectionMarker } from './SectionMarker';
import { motion } from 'framer-motion';

export function About() {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' as const }
    }
  };

  return (
    <motion.section 
      id="about" 
      className="py-24"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
    >
      <SectionMarker number="01" title="about" />
      
      <div className="max-w-[36rem]">
        <h2 className="font-serif text-3xl md:text-4xl text-text-main mb-8">About me.</h2>
        
        <div className="space-y-6 text-text-secondary leading-relaxed">
          <p>
            Focused on backend reliability, AI infrastructure, and building systems that handle failure gracefully. I enjoy the complexity of distributed systems and ensuring high availability for critical services.
          </p>
          <p>
            Currently seeking Summer 2026 internships in platform engineering, AI infrastructure, or backend reliability. Based in Bangalore, open to remote opportunities.
          </p>
        </div>
        
        <div className="mt-12 flex flex-col sm:flex-row gap-4 sm:gap-6 text-sm text-text-tertiary font-mono">
          <div className="flex items-center gap-2">
            <span>📍</span> Bangalore
          </div>
          <div className="flex items-center gap-2">
            <span>🎓</span> VIT Vellore '27, CS
          </div>
          <div className="flex items-center gap-2">
            <span>📧</span> rahuljtoms@gmail.com
          </div>
        </div>
      </div>
    </motion.section>
  );
}
