import { useState } from 'react';
import { LayoutDashboard, Briefcase, Users, BarChart3 } from 'lucide-react';

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard, active: true },
  { label: 'Jobs', icon: Briefcase, active: false },
  { label: 'Candidates', icon: Users, active: false },
  { label: 'Reports', icon: BarChart3, active: false },
];

export default function Navigation() {
  const [activeNav, setActiveNav] = useState('Dashboard');

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] px-6 py-4 flex items-center justify-between"
      style={{ background: 'linear-gradient(to bottom, rgba(11,13,16,0.95) 0%, rgba(11,13,16,0) 100%)' }}>
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-neon-mint shadow-[0_0_8px_rgba(111,255,163,0.5)]" />
        <span className="font-heading font-semibold text-text-primary text-lg tracking-tight">
          ScreenAI
        </span>
      </div>

      <div className="hidden md:flex items-center gap-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeNav === item.label;
          return (
            <button
              key={item.label}
              onClick={() => setActiveNav(item.label)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-neon-mint/10 text-neon-mint'
                  : 'text-text-secondary hover:text-text-primary hover:bg-white/5'
              }`}
            >
              <Icon size={16} strokeWidth={1.5} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      <div className="flex items-center gap-3">
        <div className="w-7 h-7 rounded-full bg-dark-card border border-white/10 overflow-hidden">
          <img
            src="/avatars/ava.jpg"
            alt="User"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </nav>
  );
}
