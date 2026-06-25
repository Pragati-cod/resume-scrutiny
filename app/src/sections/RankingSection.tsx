import { useRef, useEffect, useState } from 'react';
import { Crown, Search, Plus, MoreVertical, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { Candidate } from '../types';

gsap.registerPlugin(ScrollTrigger);

const candidatesData: Candidate[] = [
  { id: 1, rank: 1, name: 'Ava Martinez', avatar: '/avatars/ava.jpg', score: 96, trend: [82, 85, 88, 92, 94, 96], experience: '5 years', status: 'Shortlisted', appliedDays: 2 },
  { id: 2, rank: 2, name: 'David Kim', avatar: '/avatars/david.jpg', score: 92, trend: [78, 80, 85, 88, 90, 92], experience: '4 years', status: 'Shortlisted', appliedDays: 3 },
  { id: 3, rank: 3, name: 'Sophie Taylor', avatar: '/avatars/sophie.jpg', score: 88, trend: [75, 78, 80, 84, 86, 88], experience: '6 years', status: 'Under Review', appliedDays: 1 },
  { id: 4, rank: 4, name: 'James Wilson', avatar: '/avatars/james.jpg', score: 84, trend: [70, 74, 78, 80, 82, 84], experience: '3 years', status: 'Under Review', appliedDays: 5 },
  { id: 5, rank: 5, name: 'Emma Thompson', avatar: '/avatars/emma.jpg', score: 78, trend: [68, 70, 72, 74, 76, 78], experience: '5 years', status: 'New', appliedDays: 1 },
  { id: 6, rank: 6, name: 'Michael Brown', avatar: '/avatars/michael.jpg', score: 72, trend: [65, 66, 68, 70, 71, 72], experience: '4 years', status: 'New', appliedDays: 2 },
];

function Sparkline({ data, score }: { data: number[]; score: number }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const width = 90;
  const height = 28;
  const points = data.map((v, i) => `${(i / (data.length - 1)) * width},${height - ((v - min) / range) * height}`).join(' ');
  const lastPoint = points.split(' ').pop() || '';

  return (
    <div className="flex items-center gap-2">
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="overflow-visible">
        <polyline
          points={points}
          fill="none"
          stroke={score >= 90 ? '#6FFFA3' : score >= 80 ? '#FFD66E' : '#FF6E6E'}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle
          cx={lastPoint.split(',')[0]}
          cy={lastPoint.split(',')[1]}
          r="2.5"
          fill={score >= 90 ? '#6FFFA3' : score >= 80 ? '#FFD66E' : '#FF6E6E'}
          className="animate-pulse"
        />
      </svg>
      {data[data.length - 1] > data[data.length - 2] ? (
        <TrendingUp size={14} className="text-neon-mint" />
      ) : data[data.length - 1] < data[data.length - 2] ? (
        <TrendingDown size={14} className="text-neon-red" />
      ) : (
        <Minus size={14} className="text-text-secondary" />
      )}
    </div>
  );
}

function ScoreDot({ score }: { score: number }) {
  const color = score >= 90 ? '#6FFFA3' : score >= 80 ? '#FFD66E' : '#FF6E6E';
  return (
    <div className="flex items-center gap-2">
      <div
        className="w-2.5 h-2.5 rounded-full"
        style={{ backgroundColor: color, boxShadow: `0 0 6px ${color}60` }}
      />
      <span className="font-mono font-medium text-text-primary">{score}</span>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles = {
    'Shortlisted': 'bg-neon-mint/10 text-neon-mint border-neon-mint/20',
    'Under Review': 'bg-neon-yellow/10 text-neon-yellow border-neon-yellow/20',
    'New': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  };
  return (
    <span className={`px-2.5 py-1 rounded-lg text-xs font-medium border ${styles[status as keyof typeof styles]}`}>
      {status}
    </span>
  );
}

export default function RankingSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLDivElement>(null);
  const rowsRef = useRef<(HTMLTableRowElement | null)[]>([]);
  const decoRef = useRef<HTMLDivElement>(null);
  const [candidates] = useState(candidatesData);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'score' | 'experience'>('score');

  const filtered = candidates
    .filter((c) => c.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => sortBy === 'score' ? b.score - a.score : parseInt(b.experience) - parseInt(a.experience));

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(titleRef.current,
        { y: 18, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.6,
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
          }
        }
      );

      // Table card animation
      gsap.fromTo(tableRef.current,
        { y: 40, scale: 0.98, opacity: 0 },
        {
          y: 0, scale: 1, opacity: 1, duration: 0.7,
          scrollTrigger: {
            trigger: tableRef.current,
            start: 'top 75%',
          }
        }
      );

      // Row animations
      rowsRef.current.forEach((row) => {
        if (!row) return;
        gsap.fromTo(row,
          { x: '8vw', opacity: 0 },
          {
            x: 0, opacity: 1, duration: 0.5,
            scrollTrigger: {
              trigger: row,
              start: 'top 85%',
            }
          }
        );
      });

      // Decorative number
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
  }, [filtered]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen py-24 z-[4]"
      style={{ backgroundColor: '#0B0D10' }}
    >
      {/* Decorative Number */}
      <div
        ref={decoRef}
        className="absolute text-stroke font-heading font-bold text-[200px] leading-none select-none pointer-events-none"
        style={{ right: '-4vw', top: '8vh' }}
      >
        04
      </div>

      <div className="px-[6vw]">
        {/* Title Bar */}
        <div ref={titleRef} className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <h2 className="font-heading font-semibold text-text-primary text-2xl md:text-3xl">
            Candidate Ranking
          </h2>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
              <input
                type="text"
                placeholder="Search candidates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-2 rounded-xl bg-dark-card border border-text-primary/10 text-text-primary text-sm placeholder:text-text-secondary/60 focus:outline-none focus:border-neon-mint/40 w-56"
              />
            </div>
            <button
              onClick={() => setSortBy(sortBy === 'score' ? 'experience' : 'score')}
              className="px-3 py-2 rounded-xl bg-dark-card border border-text-primary/10 text-text-secondary text-sm hover:text-text-primary transition-colors"
            >
              Sort: {sortBy === 'score' ? 'Score' : 'Exp'}
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-neon-mint/40 text-neon-mint text-sm font-medium hover:bg-neon-mint/10 transition-colors">
              <Plus size={16} />
              <span className="hidden sm:inline">Add Candidate</span>
            </button>
          </div>
        </div>

        {/* Table Card */}
        <div
          ref={tableRef}
          className="rounded-2xl border border-text-primary/10 bg-dark-card shadow-card overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-text-primary/10">
                  {['Rank', 'Candidate', 'Score', 'Trend', 'Experience', 'Status', 'Actions'].map((h) => (
                    <th key={h} className="px-6 py-4 text-left text-xs font-mono uppercase tracking-widest text-text-secondary">
                      <div className="flex items-center gap-2">
                        {h === 'Rank' && <Crown size={14} />}
                        {h}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((candidate, i) => (
                  <tr
                    key={candidate.id}
                    ref={(el) => { rowsRef.current[i] = el; }}
                    className="border-b border-text-primary/[0.06] transition-all duration-200 hover:bg-white/[0.04] group cursor-pointer"
                  >
                    <td className="px-6 py-4">
                      <span className="font-heading font-bold text-text-primary/60 text-lg">
                        {candidate.rank}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full overflow-hidden border border-text-primary/10">
                          <img
                            src={candidate.avatar}
                            alt={candidate.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="text-text-primary text-sm font-medium">{candidate.name}</p>
                          <p className="text-text-secondary text-xs">Applied {candidate.appliedDays} days ago</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <ScoreDot score={candidate.score} />
                    </td>
                    <td className="px-6 py-4">
                      <Sparkline data={candidate.trend} score={candidate.score} />
                    </td>
                    <td className="px-6 py-4 text-text-primary text-sm">
                      {candidate.experience}
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={candidate.status} />
                    </td>
                    <td className="px-6 py-4">
                      <button className="p-1.5 rounded-lg hover:bg-white/5 transition-colors text-text-secondary hover:text-text-primary">
                        <MoreVertical size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
