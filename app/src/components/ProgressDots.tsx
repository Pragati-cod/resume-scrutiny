interface ProgressDotsProps {
  activeSection: number;
  totalSections: number;
}

export default function ProgressDots({ activeSection, totalSections }: ProgressDotsProps) {
  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 z-[90] flex flex-col gap-3">
      {Array.from({ length: totalSections }).map((_, i) => (
        <div
          key={i}
          className={`w-2 h-2 rounded-full transition-all duration-300 ${
            i === activeSection
              ? 'bg-neon-mint shadow-[0_0_6px_rgba(111,255,163,0.5)] scale-125'
              : 'bg-text-primary/20'
          }`}
        />
      ))}
    </div>
  );
}
