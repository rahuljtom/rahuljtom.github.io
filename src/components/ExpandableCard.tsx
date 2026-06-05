import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ExpandableCardProps {
  title: string;
  subtitle?: string;
  tags?: string[];
  links?: { name: string; url: string }[];
  isFeatured?: boolean;
  isInProgress?: boolean;
  children: React.ReactNode;
}

export function ExpandableCard({ 
  title, 
  subtitle, 
  tags, 
  links, 
  isFeatured, 
  isInProgress,
  children 
}: ExpandableCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div 
      className={`group relative border-l-2 transition-colors duration-300 ${isFeatured ? 'border-accent' : 'border-border-main hover:border-text-tertiary'} pl-6 py-2`}
    >
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
        aria-expanded={isExpanded}
      >
        <div className="flex justify-between items-start gap-4">
          <div>
            <h3 className={`font-sans text-lg font-medium mb-1 flex items-center gap-3 ${isInProgress ? 'text-text-tertiary' : 'text-text-main'}`}>
              {title}
              {isInProgress && <span className="w-2 h-2 rounded-full bg-accent inline-block" title="In Progress" />}
            </h3>
            {subtitle && <p className="text-sm text-text-secondary">{subtitle}</p>}
          </div>
          
          <div className="text-text-tertiary text-sm flex items-center gap-1 font-mono transition-colors group-hover:text-accent-bright whitespace-nowrap">
            More
            <motion.span
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="inline-block"
            >
              ↓
            </motion.span>
          </div>
        </div>
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="overflow-hidden"
          >
            <div className="pt-4 pb-2 space-y-4">
              <div className="text-text-secondary leading-relaxed">
                {children}
              </div>
              
              {(tags || links) && (
                <div className="pt-4 border-t border-border-main/50 flex flex-wrap gap-y-4 gap-x-8">
                  {tags && (
                    <div className="flex flex-wrap gap-2 text-xs font-mono text-text-tertiary">
                      {tags.map((tag, i) => (
                        <span key={i} className="px-2 py-1 bg-surface rounded-sm border border-border-main">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  
                  {links && (
                    <div className="flex flex-wrap gap-4 text-sm font-mono">
                      {links.map((link, i) => (
                        <a 
                          key={i} 
                          href={link.url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-text-secondary hover:text-accent transition-colors flex items-center gap-1 group/link focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm px-1 -mx-1"
                        >
                          {link.name}
                          <span className="opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all duration-150">↗</span>
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
