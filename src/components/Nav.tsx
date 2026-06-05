import { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

export function Nav() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
      setMobileMenuOpen(false); // Close menu on scroll down
    } else {
      setHidden(false);
    }
  });

  const navLinks = [
    { name: 'about', href: '#about' },
    { name: 'experience', href: '#experience' },
    { name: 'projects', href: '#projects' },
    { name: 'contact', href: '#contact' },
  ];

  return (
    <>
      <motion.nav
        variants={{
          visible: { y: 0 },
          hidden: { y: "-100%" },
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className="fixed top-0 left-0 right-0 z-40 bg-[#141210]/80 backdrop-blur-sm border-b border-border-main/50"
      >
        <div className="max-w-[68rem] mx-auto px-6 h-16 flex items-center justify-between">
          <a 
            href="#" 
            className="font-serif text-[0.9rem] tracking-[0.08em] uppercase text-text-main hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            Rahul Thomas
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="font-sans text-[0.85rem] text-text-secondary hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-text-secondary hover:text-text-main focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-bg/80 backdrop-blur-sm z-50 md:hidden"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed top-0 right-0 bottom-0 w-64 bg-surface border-l border-border-main z-50 md:hidden flex flex-col p-6 shadow-2xl"
            >
              <div className="flex justify-end mb-8">
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-text-secondary hover:text-text-main focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  aria-label="Close menu"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="flex flex-col gap-6">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="font-sans text-lg text-text-secondary hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
