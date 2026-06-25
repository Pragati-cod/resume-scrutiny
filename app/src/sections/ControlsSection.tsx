import { useRef, useEffect, useState } from 'react';
import { UserCheck, UserX, Calendar, CheckCircle2 } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ControlsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const actionBarRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const toastRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const decoRef = useRef<HTMLDivElement>(null);
  const [showToast, setShowToast] = useState(false);
  const [selectedCount, setSelectedCount] = useState(3);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(actionBarRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.6,
          scrollTrigger: {
            trigger: actionBarRef.current,
            start: 'top 80%',
          }
        }
      );

      gsap.fromTo(buttonsRef.current?.children || [],
        { x: '6vw', opacity: 0 },
        {
          x: 0, opacity: 1, stagger: 0.08, duration: 0.5,
          scrollTrigger: {
            trigger: buttonsRef.current,
            start: 'top 80%',
          }
        }
      );

      gsap.fromTo(toastRef.current,
        { x: '10vw', opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.5,
          scrollTrigger: {
            trigger: toastRef.current,
            start: 'top 85%',
          }
        }
      );

      gsap.fromTo(footerRef.current,
        { opacity: 0 },
        {
          opacity: 1, duration: 0.6,
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 90%',
          }
        }
      );

      gsap.fromTo(decoRef.current,
        { opacity: 0 },
        {
          opacity: 0.1, duration: 0.8,
          scrollTrigger: {
            trigger: section,
            start: 'top 60%',
          }
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const handleShortlist = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-[60vh] py-16 z-[5]"
      style={{ backgroundColor: '#0B0D10' }}
    >
      {/* Decorative Number */}
      <div
        ref={decoRef}
        className="absolute text-stroke font-heading font-bold text-[200px] leading-none select-none pointer-events-none"
        style={{ right: '-4vw', top: '10vh' }}
      >
        05
      </div>

      <div className="px-[6vw]">
        {/* Action Bar */}
        <div
          ref={actionBarRef}
          className="rounded-2xl border border-text-primary/10 bg-dark-card shadow-card p-6"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={selectedCount > 0}
                  onChange={() => setSelectedCount(selectedCount > 0 ? 0 : 3)}
                  className="w-4 h-4 rounded border-text-primary/20 bg-dark-card checked:bg-neon-mint checked:border-neon-mint"
                />
                <span className="text-text-primary text-sm font-medium">Select All</span>
              </div>
              <span className="text-text-secondary text-sm">
                {selectedCount} candidates selected
              </span>
            </div>

            <div ref={buttonsRef} className="flex items-center gap-3">
              <button
                onClick={handleShortlist}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-neon-mint/40 text-neon-mint text-sm font-medium hover:bg-neon-mint/10 transition-all duration-200 hover:-translate-y-0.5"
              >
                <UserCheck size={16} />
                Shortlist
              </button>
              <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-text-primary/20 text-text-secondary text-sm font-medium hover:bg-white/5 hover:text-text-primary transition-all duration-200 hover:-translate-y-0.5">
                <UserX size={16} />
                Reject
              </button>
              <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-neon-mint text-dark-bg text-sm font-semibold hover:bg-neon-mint/90 transition-all duration-200 hover:-translate-y-0.5">
                <Calendar size={16} />
                Schedule Interview
              </button>
            </div>
          </div>
        </div>

        {/* Toast Notification */}
        <div
          ref={toastRef}
          className={`fixed top-20 right-6 z-[110] flex items-center gap-3 px-5 py-3 rounded-xl bg-dark-card border border-neon-mint/30 shadow-card transition-all duration-300 ${
            showToast ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10 pointer-events-none'
          }`}
        >
          <CheckCircle2 size={18} className="text-neon-mint" />
          <span className="text-text-primary text-sm font-medium">
            Candidate Shortlisted Successfully
          </span>
        </div>

        {/* Footer */}
        <footer
          ref={footerRef}
          className="mt-20 pt-8 border-t border-text-primary/10"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <p className="text-text-secondary text-sm">
              &copy; ScreenAI &bull; Built for modern hiring.
            </p>
            <div className="flex items-center gap-6">
              {['Privacy', 'Terms', 'Support'].map((link) => (
                <a
                  key={link}
                  href="#"
                  className="text-text-secondary text-sm hover:text-text-primary transition-colors"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
        </footer>
      </div>
    </section>
  );
}
