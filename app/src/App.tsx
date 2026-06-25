import { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navigation from './components/Navigation';
import ProgressDots from './components/ProgressDots';
import HeroSection from './sections/HeroSection';
import ProgressSection from './sections/ProgressSection';
import AnalysisSection from './sections/AnalysisSection';
import RankingSection from './sections/RankingSection';
import ControlsSection from './sections/ControlsSection';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [activeSection, setActiveSection] = useState(0);
  const mainRef = useRef<HTMLDivElement>(null);
  const snapCreated = useRef(false);

  // Global snap configuration for pinned sections
  useEffect(() => {
    // Wait for all ScrollTriggers to be created
    const timer = setTimeout(() => {
      if (snapCreated.current) return;
      snapCreated.current = true;

      const allTriggers = ScrollTrigger.getAll();
      const pinned = allTriggers
        .filter((st) => st.vars.pin)
        .sort((a, b) => a.start - b.start);

      const maxScroll = ScrollTrigger.maxScroll(window);
      if (!maxScroll || pinned.length === 0) return;

      const pinnedRanges = pinned.map((st) => ({
        start: st.start / maxScroll,
        end: (st.end ?? st.start) / maxScroll,
        center: (st.start + ((st.end ?? st.start) - st.start) * 0.5) / maxScroll,
      }));

      ScrollTrigger.create({
        snap: {
          snapTo: (value: number) => {
            // Check if within any pinned range (with small buffer)
            const inPinned = pinnedRanges.some(
              (r) => value >= r.start - 0.02 && value <= r.end + 0.02
            );
            if (!inPinned) return value; // flowing section: free scroll

            // Find nearest pinned center
            const target = pinnedRanges.reduce(
              (closest, r) =>
                Math.abs(r.center - value) < Math.abs(closest - value)
                  ? r.center
                  : closest,
              pinnedRanges[0]?.center ?? 0
            );
            return target;
          },
          duration: { min: 0.15, max: 0.35 },
          delay: 0,
          ease: 'power2.out',
        },
      });
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  // Track active section for progress dots
  useEffect(() => {
    const triggers = [
      { id: 0, trigger: '.hero-section' },
      { id: 1, trigger: '.progress-section' },
      { id: 2, trigger: '.analysis-section' },
      { id: 3, trigger: '.ranking-section' },
      { id: 4, trigger: '.controls-section' },
    ];

    triggers.forEach(({ id, trigger }) => {
      ScrollTrigger.create({
        trigger,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => setActiveSection(id),
        onEnterBack: () => setActiveSection(id),
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <div ref={mainRef} className="relative bg-dark-bg min-h-screen">
      <Navigation />
      <ProgressDots activeSection={activeSection} totalSections={5} />

      <main className="relative">
        <div className="hero-section">
          <HeroSection />
        </div>
        <div className="progress-section">
          <ProgressSection />
        </div>
        <div className="analysis-section">
          <AnalysisSection />
        </div>
        <div className="ranking-section">
          <RankingSection />
        </div>
        <div className="controls-section">
          <ControlsSection />
        </div>
      </main>
    </div>
  );
}

export default App;
