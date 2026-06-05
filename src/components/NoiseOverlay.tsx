
export function NoiseOverlay() {
  return (
    <div 
      className="fixed inset-0 pointer-events-none noise-overlay opacity-30 md:opacity-30" 
      style={{ opacity: 0.03 }} // Base opacity 0.03, media queries in CSS if needed, or just inline
    >
      <style>{`
        @media (max-width: 768px) {
          .noise-overlay {
            opacity: 0.02 !important;
          }
        }
      `}</style>
    </div>
  );
}
