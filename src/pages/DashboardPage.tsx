import React, { useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { StartupGrid } from '../components/StartupGrid';
import { InfrastructureSection } from '../components/InfrastructureSection';
import { GrantsSection } from '../components/GrantsSection';
import { LeadershipSection } from '../components/LeadershipSection';
import { Footer } from '../components/Footer';
import { AuthModal } from '../components/AuthModal';
import { UserProfile } from '../components/UserProfile';
import { AddStartupModal } from '../components/AddStartupModal';
import { ChatModal } from '../components/ChatModal';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import { initScrollAnimations } from '../utils/scrollAnimations';

/* ─── Stat Card ─────────────────────────────────────────────── */
interface StatCardProps {
  icon: string;
  label: string;
  value: string | number;
  sub?: string;
  accent?: boolean;
}
const StatCard: React.FC<StatCardProps> = ({ icon, label, value, sub, accent }) => (
  <div className={`rounded-2xl p-4 flex items-center gap-4 border transition-all hover:-translate-y-0.5 ${
    accent
      ? 'bg-emerald-500/10 border-emerald-500/30'
      : 'bg-white/70 dark:bg-white/5 border-slate-200/80 dark:border-white/10'
  }`}>
    <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-xl shrink-0 ${
      accent ? 'bg-emerald-500/20' : 'bg-slate-100 dark:bg-white/5'
    }`}>
      {icon}
    </div>
    <div>
      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">{label}</p>
      <p className={`text-xl font-black tracking-tight ${accent ? 'text-emerald-700 dark:text-emerald-400' : 'text-slate-900 dark:text-white'}`}>
        {value}
      </p>
      {sub && <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">{sub}</p>}
    </div>
  </div>
);

/* ─── Dashboard Header ───────────────────────────────────────── */
const DashboardHeader: React.FC = () => {
  const { currentUser } = useAuth();
  const { startups, grants, setIsAddStartupModalOpen, setIsProfileOpen } = useApp();

  if (!currentUser) return null;

  const displayName = currentUser.nickname
    ? `@${currentUser.nickname}`
    : currentUser.displayName;

  const myStartups = startups.filter(
    s =>
      s.founderId === currentUser.uid ||
      s.founderEmail === currentUser.email ||
      s.founderName === currentUser.displayName ||
      (currentUser.nickname && s.founderNickname === currentUser.nickname)
  );

  const myUpvotes = myStartups.reduce((sum, s) => sum + (s.likesCount || 0), 0);
  const myGrantApps = grants.filter(g => g.applicants?.includes(currentUser.uid)).length;

  return (
    <div
      className="w-full relative overflow-hidden border-b border-slate-200/60 dark:border-white/10"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(248,250,252,0.92) 0%, rgba(241,245,249,0.97) 100%), url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2000&q=80')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Dark mode overlay */}
      <div className="absolute inset-0 hidden dark:block"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(7,11,17,0.88) 0%, rgba(7,11,17,0.96) 100%), url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2000&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-10">
        {/* Top row: Avatar + Name + Buttons */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-8">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src={currentUser.avatarUrl}
                alt={displayName}
                className="w-16 h-16 rounded-2xl object-cover border-2 border-emerald-500/40 shadow-lg"
              />
              <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white dark:border-[#070B11]" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-0.5 rounded-full badge-emerald">
                  Rezident Dashboard
                </span>
                {currentUser.role === 'admin' && (
                  <span className="text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400">
                    Admin
                  </span>
                )}
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                Xush kelibsiz, {displayName}!
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Technopark rezident ekotizimida loyihalaringizni boshqaring
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 shrink-0 w-full lg:w-auto">
            <button
              onClick={() => setIsAddStartupModalOpen(true)}
              className="flex-1 lg:flex-none px-6 py-3 text-xs font-bold btn-emerald rounded-xl shadow-md pulse-glow"
            >
              + Yangi Startap Qo'shish
            </button>
            <button
              onClick={() => setIsProfileOpen(true)}
              className="flex-1 lg:flex-none px-5 py-3 text-xs font-semibold btn-glass-outline rounded-xl"
            >
              Mening Profilim
            </button>
          </div>
        </div>

        {/* Stat cards row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard
            icon="🚀"
            label="Mening Startaplarim"
            value={myStartups.length}
            sub="Aktiv loyihalar"
            accent
          />
          <StatCard
            icon="⬆️"
            label="To'plangan Upvote"
            value={myUpvotes}
            sub="Hamjamiyat ovozlari"
          />
          <StatCard
            icon="📋"
            label="Grant Arizalarim"
            value={myGrantApps}
            sub="Aktiv ariza"
          />
        </div>
      </div>
    </div>
  );
};

/* ─── Dashboard Page ─────────────────────────────────────────── */
export const DashboardPage: React.FC = () => {
  const { startups } = useApp();

  useEffect(() => {
    const timer = setTimeout(() => initScrollAnimations(), 150);
    return () => clearTimeout(timer);
  }, [startups.length]);

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center transition-colors duration-300"
      style={{ backgroundColor: 'var(--bg-page)', color: 'var(--text-primary)' }}
    >
      <Navbar />
      <main className="w-full flex flex-col items-center">
        <DashboardHeader />
        <StartupGrid />
        <InfrastructureSection />
        <GrantsSection />
        <LeadershipSection />
      </main>
      <Footer />

      {/* Global modals */}
      <AuthModal />
      <UserProfile />
      <AddStartupModal />
      <ChatModal />
    </div>
  );
};
