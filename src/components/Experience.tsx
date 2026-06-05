import { SectionMarker } from './SectionMarker';
import { ExpandableCard } from './ExpandableCard';
import { motion } from 'framer-motion';

export function Experience() {
  return (
    <motion.section 
      id="experience" 
      className="py-24"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <SectionMarker number="02" title="Where I've worked" />
      
      <div className="space-y-8 mt-12 max-w-[42rem]">
        <ExpandableCard
          title="Software Engineering Intern"
          subtitle="Hatio Innovations (Jun–Aug 2025)"
          tags={['Java', 'Spring Boot', 'PostgreSQL', 'Docker', 'Jenkins']}
        >
          <p className="mb-4">Built Java/Spring Boot backend for supply-chain automation.</p>
          <ul className="list-disc list-inside space-y-2 text-sm">
            <li>PostgreSQL query optimization (40% p95 reduction).</li>
            <li>Batch pipelines (50K+ records).</li>
            <li>CI/CD with Docker + Jenkins.</li>
          </ul>
        </ExpandableCard>

        <ExpandableCard
          title="Core Committee"
          subtitle="GDG VIT Vellore (2024–Present)"
        >
          <p>Technical programs and developer community building.</p>
        </ExpandableCard>
      </div>
    </motion.section>
  );
}
