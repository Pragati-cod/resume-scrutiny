import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ProgressSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<SVGSVGElement>(null);
  const ringGroupRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const decoRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<SVGCircleElement>(null);

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
      scrollTl.fromTo(ringGroupRef.current,
        { scale: 0.72, opacity: 0, rotate: -8 },
        { scale: 1, opacity: 1, rotate: 0, ease: 'none' },
        0
      );
      scrollTl.fromTo(titleRef.current,
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.08
      );
      scrollTl.fromTo(subtitleRef.current,
        { y: 14, opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.12
      );
      scrollTl.fromTo(decoRef.current,
        { opacity: 0, y: '-6vh' },
        { opacity: 0.1, y: 0, ease: 'none' },
        0
      );

      // Progress ring animation during settle (30% - 70%)
      if (circleRef.current) {
        const circumference = 2 * Math.PI * 120;
        scrollTl.fromTo(circleRef.current,
          { strokeDashoffset: circumference },
          { strokeDashoffset: circumference * 0.15, ease: 'none' },
          0.30
        );
      }

      // EXIT (70% - 100%)
      scrollTl.fromTo(ringGroupRef.current,
        { scale: 1, opacity: 1 },
        { scale: 0.86, opacity: 0, ease: 'power2.in' },
        0.78
      );
      scrollTl.fromTo(titleRef.current,
        { y: 0, opacity: 1 },
        { y: '-10vh', opacity: 0, ease: 'power2.in' },
        0.80
      );
      scrollTl.fromTo(subtitleRef.current,
        { y: 0, opacity: 1 },
        { y: '-8vh', opacity: 0, ease: 'power2.in' },
        0.82
      );
      scrollTl.fromTo(decoRef.current,
        { opacity: 0.1 },
        { opacity: 0, ease: 'power2.in' },
        0.85
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const ringSize = Math.min(380, typeof window !== 'undefined' ? window.innerWidth * 0.38 : 380);
  const radius = 120;
  const circumference = 2 * Math.PI * radius;

  return (
    <section
      ref={sectionRef}
      className="relative w-screen h-screen overflow-hidden z-[2]"
      style={{ backgroundColor: '#0B0D10' }}
    >
      {/* Decorative Number */}
      <div
        ref={decoRef}
        className="absolute text-stroke font-heading font-bold text-[220px] leading-none select-none pointer-events-none"
        style={{ right: '-6vw', top: '6vh' }}
      >
        02
      </div>

      {/* Center Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {/* Progress Ring */}
        <div ref={ringGroupRef} className="relative" style={{ marginTop: '-8vh' }}>
          <svg
            ref={ringRef}
            width={ringSize}
            height={ringSize}
            viewBox="0 0 280 280"
            className="animate-ring-glow"
          >
            {/* Track */}
            <circle
              cx="140"
              cy="140"
              r={radius}
              fill="none"
              stroke="rgba(244,246,251,0.08)"
              strokeWidth="6"
            />
            {/* Progress */}
            <circle
              ref={circleRef}
              cx="140"
              cy="140"
              r={radius}
              fill="none"
              stroke="#6FFFA3"
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={circumference}
              transform="rotate(-90 140 140)"
              className="neon-glow"
            />
            {/* Orbiting dots */}
            {[0, 120, 240].map((_deg, i) => (
              <circle
                key={i}
                cx="140"
                cy="60"
                r="3"
                fill="#6FFFA3"
                opacity="0.6"
                style={{
                  transformOrigin: '140px 140px',
                  animation: `orbit 8s linear infinite`,
                  animationDelay: `${i * 2.67}s`,
                }}
              />
            ))}
          </svg>

          {/* Center Text */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-heading font-bold text-text-primary text-4xl md:text-5xl">
              85%
            </span>
          </div>
        </div>

        {/* Title */}
        <h2
          ref={titleRef}
          className="mt-12 font-heading font-semibold text-text-primary text-2xl md:text-3xl"
        >
          Analyzing Resume...
        </h2>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="mt-3 text-text-secondary text-sm md:text-base"
        >
          Extracting skills &bull; Comparing keywords &bull; Scoring fit
        </p>
      </div>
    </section>
  );
}
