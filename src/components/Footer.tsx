
export function Footer() {
  return (
    <footer className="py-12 border-t border-border-main mt-12">
      <div className="max-w-[68rem] mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        
        <div className="text-center md:text-left">
          <div className="text-text-tertiary font-mono text-xs mb-2">
            Python · TypeScript · FastAPI · PostgreSQL · Redis · Docker · React · Tailwind
          </div>
          <div className="text-text-secondary text-sm">
            &copy; {new Date().getFullYear()} Rahul Joseph Thomas
          </div>
        </div>
        
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
    </footer>
  );
}
