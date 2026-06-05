import { SectionMarker } from './SectionMarker';
import { ExpandableCard } from './ExpandableCard';
import { motion } from 'framer-motion';

export function Projects() {
  return (
    <motion.section 
      id="projects" 
      className="py-24"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="flex items-end justify-between mb-8">
        <SectionMarker number="03" title="Projects" />
        <span className="text-xs text-text-tertiary font-mono mb-4 hidden sm:block">Click to expand.</span>
      </div>
      
      <div className="space-y-8 mt-12 max-w-[42rem]">
        <ExpandableCard
          title="LLM Inference Gateway"
          subtitle="2025"
          isFeatured={true}
          tags={['FastAPI', 'PostgreSQL', 'Redis', 'Docker', 'React', 'httpx']}
          links={[
            { name: 'GitHub', url: '#' },
            { name: 'Live', url: '#' },
            { name: 'Report', url: '#' },
          ]}
        >
          <p className="mb-4">
            OpenAI-compatible API gateway with provider routing, semantic caching, and production observability.
            Multi-provider routing (OpenAI, Anthropic, Gemini, Groq).
          </p>
          <ul className="list-disc list-inside space-y-2 text-sm">
            <li>&lt;5ms cached vs 800ms upstream.</li>
            <li>Rate limiting, retry/fallback logic.</li>
            <li>Telemetry and observability dashboard.</li>
          </ul>
        </ExpandableCard>

        <ExpandableCard
          title="Transaction Gateway"
          subtitle="2025"
          tags={['FastAPI', 'PostgreSQL', 'Redis', 'Docker', 'Cloudflare']}
          links={[
            { name: 'GitHub', url: '#' },
            { name: 'Live', url: '#' },
          ]}
        >
          <p className="mb-4">
            Payment-grade reliability: idempotency, rate limiting, circuit breaking.
          </p>
          <ul className="list-disc list-inside space-y-2 text-sm">
            <li>Redis sorted-set rate limiter.</li>
            <li>Idempotency keys, circuit breaker, JWT auth.</li>
            <li>Load tested for high concurrency.</li>
          </ul>
        </ExpandableCard>

        <ExpandableCard
          title="Reliability Lab"
          subtitle="In progress"
          isInProgress={true}
        >
          <p className="mb-4">
            k6 load testing, failure injection, p50/p95/p99 benchmarks.
          </p>
        </ExpandableCard>
      </div>
    </motion.section>
  );
}
