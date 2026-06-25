import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const keywords = ['React', 'Node.js', 'Python', 'AWS', 'Docker', 'SQL', 'REST API'];
const jobFits = [
  { role: 'Frontend Dev', pct: 92 },
  { role: 'Full Stack', pct: 88 },
  { role: 'Backend', pct: 74 },
];

export default function AnalysisSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const scoreNumRef = useRef<HTMLSpanElement>(null);
  const chipsRef = useRef<HTMLDivElement>(null);
  const badgesRef = useRef<HTMLDivElement>(null);
  const decoRef = useRef<HTMLDivElement>(null);
  const [displayScore, setDisplayScore] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        }
      });

      // ENTRANCE (0% - 30%)
      scrollTl.fromTo(cardRef.current,
        { y: '70vh', scale: 0.92, opacity: 0 },
        { y: 0, scale: 1, opacity: 1, ease: 'none' },
        0
      );
      scrollTl.fromTo(ringRef.current,
        { scale: 0.72, opacity: 0, rotate: -12 },
        { scale: 1, opacity: 1, rotate: 0, ease: 'none' },
        0.06
      );
      scrollTl.fromTo(scoreNumRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, ease: 'none' },
        0.14
      );
      scrollTl.fromTo(chipsRef.current?.children || [],
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.02, ease: 'none' },
        0.12
      );
      scrollTl.fromTo(badgesRef.current?.children || [],
        { x: '10vw', opacity: 0 },
        { x: 0, opacity: 1, stagger: 0.02, ease: 'none' },
        0.16
      );
      scrollTl.fromTo(decoRef.current,
        { opacity: 0, x: '6vw' },
        { opacity: 0.1, x: 0, ease: 'none' },
        0
      );

      // Score counter animation (14% - 30%)
      const scoreObj = { val: 0 };
      scrollTl.to(scoreObj, {
        val: 84,
        ease: 'none',
        onUpdate: () => setDisplayScore(Math.round(scoreObj.val)),
      }, 0.14);

      // EXIT (70% - 100%)
      scrollTl.fromTo(cardRef.current,
        { y: 0, scale: 1, opacity: 1 },
        { y: '-60vh', scale: 0.96, opacity: 0, ease: 'power2.in' },
        0.78
      );
      scrollTl.fromTo(decoRef.current,
        { opacity: 0.1 },
        { opacity: 0, ease: 'power2.in' },
        0.85
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const ringSize = 140;
  const radius = 55;
  const circumference = 2 * Math.PI * radius;
  const progressOffset = circumference * (1 - 84 / 100);

  return (
    <section
      ref={sectionRef}
      className="relative w-screen h-screen overflow-hidden z-[3]"
      style={{ backgroundColor: '#0B0D10' }}
    >
      {/* Decorative Number */}
      <div
        ref={decoRef}
        className="absolute text-stroke font-heading font-bold text-[220px] leading-none select-none pointer-events-none"
        style={{ right: '-6vw', top: '6vh' }}
      >
        03
      </div>

      {/* Center Content */}
      <div className="absolute inset-0 flex items-center justify-center px-4">
        <div
          ref={cardRef}
          className="w-full max-w-[920px] min-h-[520px] max-h-[70vh] rounded-2xl border border-text-primary/10 bg-dark-card shadow-card flex flex-col md:flex-row overflow-hidden"
        >
          {/* Left: Score Area */}
          <div className="w-full md:w-[40%] flex flex-col items-center justify-center p-8 md:p-12 border-b md:border-b-0 md:border-r border-text-primary/10">
            <div ref={ringRef} className="relative">
              <svg
                width={ringSize}
                height={ringSize}
                viewBox={`0 0 ${ringSize} ${ringSize}`}
                className="animate-ring-glow"
              >
                <circle
                  cx={ringSize / 2}
                  cy={ringSize / 2}
                  r={radius}
                  fill="none"
                  stroke="rgba(244,246,251,0.08)"
                  strokeWidth="5"
                />
                <circle
                  cx={ringSize / 2}
                  cy={ringSize / 2}
                  r={radius}
                  fill="none"
                  stroke="#6FFFA3"
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={progressOffset}
                  transform={`rotate(-90 ${ringSize / 2} ${ringSize / 2})`}
                  className="neon-glow-strong"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span
                  ref={scoreNumRef}
                  className="font-heading font-bold text-text-primary text-5xl"
                >
                  {displayScore}
                </span>
              </div>
            </div>
            <p className="mt-6 text-text-secondary text-sm font-mono uppercase tracking-widest">
              AI Match Score
            </p>
          </div>

          {/* Right: Details Area */}
          <div className="w-full md:w-[60%] p-8 md:p-12 flex flex-col justify-center">
            <h3 className="font-heading font-semibold text-text-primary text-2xl md:text-3xl">
              Resume Analysis Complete
            </h3>

            {/* Keyword Cloud */}
            <div className="mt-6">
              <p className="text-text-secondary text-xs font-mono uppercase tracking-widest mb-3">
                Key Skills Detected
              </p>
              <div ref={chipsRef} className="flex flex-wrap gap-2">
                {keywords.map((kw) => (
                  <button
                    key={kw}
                    onClick={() => navigator.clipboard?.writeText(kw)}
                    className="px-3 py-1.5 rounded-lg bg-neon-mint/10 border border-neon-mint/20 text-neon-mint text-sm font-medium transition-all duration-200 hover:border-neon-mint/50 hover:-translate-y-0.5 cursor-pointer"
                  >
                    {kw}
                  </button>
                ))}
              </div>
            </div>

            {/* Job Fit Badges */}
            <div className="mt-8">
              <p className="text-text-secondary text-xs font-mono uppercase tracking-widest mb-3">
                Job Fit Matches
              </p>
              <div ref={badgesRef} className="space-y-2">
                {jobFits.map((fit) => (
                  <div
                    key={fit.role}
                    className="flex items-center justify-between px-4 py-3 rounded-xl bg-white/[0.03] border border-text-primary/10 transition-all duration-200 hover:bg-neon-mint/[0.08] hover:border-neon-mint/20 cursor-default"
                  >
                    <span className="text-text-primary text-sm font-medium">
                      {fit.role}
                    </span>
                    <span className="font-heading font-semibold text-neon-mint">
                      {fit.pct}%
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <p className="mt-6 text-text-secondary text-sm">
              Top skills match the job description.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
