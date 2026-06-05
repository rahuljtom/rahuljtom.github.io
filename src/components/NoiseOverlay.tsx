
export function NoiseOverlay() {
  return (
    <div 
      className="fixed inset-0 pointer-events-none noise-overlay opacity-30 md:opacity-30" 
      style={{ opacity: 0.03 }}
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
