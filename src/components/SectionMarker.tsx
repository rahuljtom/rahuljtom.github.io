
interface SectionMarkerProps {
  number: string;
  title: string;
}

export function SectionMarker({ number, title }: SectionMarkerProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-4 text-sm tracking-widest uppercase mb-4">
        <span className="font-mono text-accent">{number}</span>
        <span className="text-text-tertiary">—</span>
        <span className="text-text-tertiary">{title}</span>
      </div>
      <hr className="border-border-main" />
    </div>
  );
}
