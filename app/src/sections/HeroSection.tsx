import { useRef, useEffect } from 'react';
import { Upload, Zap, Brain, Sliders } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const uploadCardRef = useRef<HTMLDivElement>(null);
  const infoCardRef = useRef<HTMLDivElement>(null);
  const decoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Auto-play entrance animation on load
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

      tl.fromTo(decoRef.current,
        { opacity: 0 },
        { opacity: 0.1, duration: 1 }
      )
      .fromTo(headlineRef.current,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9 },
        0.1
      )
      .fromTo(subRef.current,
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7 },
        0.25
      )
      .fromTo(uploadCardRef.current,
        { scale: 0.96, y: 26, opacity: 0 },
        { scale: 1, y: 0, opacity: 1, duration: 0.9, ease: 'power3.out' },
        0.35
      )
      .fromTo(infoCardRef.current,
        { scale: 0.96, y: 26, opacity: 0 },
        { scale: 1, y: 0, opacity: 1, duration: 0.9, ease: 'power3.out' },
        0.45
      );

      // Scroll-driven EXIT animation (70% - 100%)
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        }
      });

      // ENTRANCE (0-30%): Hold - elements already visible from load animation
      // SETTLE (30-70%): Static
      // EXIT (70-100%): Animate out
      scrollTl.fromTo(headlineRef.current,
        { x: 0, opacity: 1 },
        { x: '-18vw', opacity: 0, ease: 'power2.in' },
        0.70
      );
      scrollTl.fromTo(subRef.current,
        { x: 0, opacity: 1 },
        { x: '-14vw', opacity: 0, ease: 'power2.in' },
        0.72
      );
      scrollTl.fromTo(uploadCardRef.current,
        { x: 0, scale: 1, opacity: 1 },
        { x: '-24vw', scale: 0.96, opacity: 0, ease: 'power2.in' },
        0.75
      );
      scrollTl.fromTo(infoCardRef.current,
        { x: 0, opacity: 1 },
        { x: '18vw', opacity: 0, ease: 'power2.in' },
        0.75
      );
      scrollTl.fromTo(decoRef.current,
        { y: 0, opacity: 0.1 },
        { y: '-10vh', opacity: 0, ease: 'power2.in' },
        0.80
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-screen h-screen overflow-hidden z-[1]"
      style={{ backgroundColor: '#0B0D10' }}
    >
      {/* Grid Background */}
      <div className="absolute inset-0 grid-bg opacity-60" />

      {/* Decorative Number */}
      <div
        ref={decoRef}
        className="absolute text-stroke font-heading font-bold text-[220px] leading-none select-none pointer-events-none animate-float"
        style={{ right: '-6vw', top: '6vh' }}
      >
        01
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col justify-center px-[9vw]">
        {/* Headline */}
        <h1
          ref={headlineRef}
          className="font-heading font-bold text-text-primary text-[44px] md:text-[56px] leading-[1.05] tracking-[-0.02em] max-w-[78vw]"
        >
          AI-Powered Resume Screening
        </h1>

        {/* Subheadline */}
        <p
          ref={subRef}
          className="mt-6 text-text-secondary text-base md:text-lg max-w-[46vw] leading-relaxed"
        >
          Upload resumes. Get match scores. Rank candidates instantly.
        </p>

        {/* Cards Row */}
        <div className="mt-10 flex flex-col md:flex-row gap-6">
          {/* Upload Card */}
          <div
            ref={uploadCardRef}
            className="w-full md:w-[44vw] h-[34vh] min-h-[280px] rounded-2xl border-[1.5px] border-dashed border-text-primary/20 bg-dark-card flex flex-col items-center justify-center gap-4 cursor-pointer transition-all duration-300 hover:border-text-primary/40 hover:bg-white/[0.03] group"
          >
            <div className="w-14 h-14 rounded-xl bg-neon-mint/10 flex items-center justify-center group-hover:bg-neon-mint/15 transition-colors">
              <Upload size={28} className="text-neon-mint" strokeWidth={1.5} />
            </div>
            <div className="text-center">
              <p className="text-text-primary font-medium text-lg">
                Drag & Drop or Browse
              </p>
              <p className="text-text-secondary text-sm mt-1">
                PDF, DOCX (Max 5MB)
              </p>
            </div>
          </div>

          {/* Info Card */}
          <div
            ref={infoCardRef}
            className="w-full md:w-[35vw] h-[34vh] min-h-[280px] rounded-2xl border border-text-primary/10 bg-dark-card p-8 flex flex-col justify-center"
          >
            <div className="space-y-5">
              {[
                { icon: Zap, text: 'Sub-5s parsing per resume' },
                { icon: Brain, text: 'Keyword + semantic matching' },
                { icon: Sliders, text: 'Configurable ranking weights' },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-neon-mint/10 flex items-center justify-center flex-shrink-0">
                      <Icon size={18} className="text-neon-mint" strokeWidth={1.5} />
                    </div>
                    <span className="text-text-primary text-sm font-medium">
                      {item.text}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
