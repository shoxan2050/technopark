import React, { useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { InfrastructureSection } from './components/InfrastructureSection';
import { LeadershipSection } from './components/LeadershipSection';
import { StartupGrid } from './components/StartupGrid';
import { GrantsSection } from './components/GrantsSection';
import { AdminPanel } from './components/AdminPanel';
import { Footer } from './components/Footer';
import { AuthModal } from './components/AuthModal';
import { UserProfile } from './components/UserProfile';
import { AddStartupModal } from './components/AddStartupModal';
import { ChatModal } from './components/ChatModal';
import { initScrollAnimations } from './utils/scrollAnimations';

export const ResidentDashboardHeader: React.FC = () => {
  const { currentUser } = useAuth();
  const { startups, setIsAddStartupModalOpen, setIsProfileOpen } = useApp();

  if (!currentUser) return null;

  const myCount = startups.filter(s => 
    s.founderId === currentUser.uid || 
    s.founderEmail === currentUser.email || 
    s.founderName === currentUser.displayName ||
    (currentUser.nickname && s.founderNickname === currentUser.nickname)
  ).length;

  const displayName = currentUser.nickname ? `@${currentUser.nickname}` : currentUser.displayName;

  return (
    <section className="relative w-full flex justify-center pt-12 pb-10 border-b border-slate-200/60 dark:border-white/10 overflow-hidden">
      {/* Background Architecture Photo + Gradient Overlay */}
      <div className="absolute inset-0 w-full h-full -z-20 overflow-hidden pointer-events-none">
        <img
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2000&q=80"
          alt="Technopark Architecture"
          className="w-full h-full object-cover object-center opacity-70 dark:opacity-45 filter contrast-[1.08] saturate-[1.15] scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-100/60 via-slate-100/80 to-slate-100 dark:from-[#070B11]/50 dark:via-[#070B11]/75 dark:to-[#070B11]" />
      </div>

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <img 
              src={currentUser.avatarUrl} 
              alt={displayName} 
              className="w-16 h-16 rounded-2xl object-cover border-2 border-emerald-500/30 shadow-md" 
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider badge-emerald px-2.5 py-0.5 rounded-full">
                  Rezident Dashboard
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
                Xush kelibsiz, {displayName}!
              </h1>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                Technopark rezidentlik va startap hamjamiyatida loyihalarni baholang va boshqaring.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0 w-full lg:w-auto">
            <button
              onClick={() => setIsAddStartupModalOpen(true)}
              className="flex-1 lg:flex-none px-6 py-3 text-xs font-bold btn-emerald shadow-sm"
            >
              + Yangi Startap Qo'shish
            </button>
            <button
              onClick={() => setIsProfileOpen(true)}
              className="flex-1 lg:flex-none px-5 py-3 text-xs font-semibold btn-glass-outline"
            >
              Mening Profilim ({myCount})
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export const GuestJoinBanner: React.FC = () => {
  const { t, setIsAuthModalOpen } = useApp();

  return (
    <section className="w-full py-16 flex justify-center border-b border-slate-200/60 dark:border-white/10">
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="w-full glass-surface p-8 sm:p-12 text-center flex flex-col items-center justify-center border-emerald-500/30 bg-emerald-50/50 dark:bg-emerald-950/20 shadow-2xl rounded-3xl">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 dark:text-emerald-400 mb-2 block">
            {t.guestBanner.badge}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
            {t.guestBanner.title}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl text-center mx-auto leading-relaxed mb-8">
            {t.guestBanner.desc}
          </p>

          <div className="flex justify-center">
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="px-8 py-3.5 text-xs font-bold btn-emerald shadow-lg"
            >
              {t.guestBanner.btn}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export const MainContent: React.FC = () => {
  const { currentUser } = useAuth();
  const { startups } = useApp();

  useEffect(() => {
    const timer = setTimeout(() => {
      initScrollAnimations();
    }, 150);
    return () => clearTimeout(timer);
  }, [currentUser, startups.length]);

  return (
    <div className="min-h-screen w-full flex flex-col items-center transition-colors duration-300"
         style={{ backgroundColor: 'var(--bg-page)', color: 'var(--text-primary)' }}>
      <Navbar />
      <main className="w-full flex flex-col items-center">
        {/* CONDITIONAL SCREEN VIEW BASED ON AUTH STATE */}
        {currentUser ? (
          /* LOGGED IN RESIDENT DASHBOARD VIEW */
          <>
            <ResidentDashboardHeader />
            <StartupGrid />
            <InfrastructureSection />
            <GrantsSection />
            <LeadershipSection />
            <AdminPanel />
          </>
        ) : (
          /* GUEST (UNAUTHENTICATED) PUBLIC TECHNOPARK LANDING VIEW */
          <>
            <Hero />
            <InfrastructureSection />
            <LeadershipSection />
            <GrantsSection />
            <GuestJoinBanner />
          </>
        )}
      </main>
      <Footer />

      {/* Global Modals & Drawers */}
      <AuthModal />
      <UserProfile />
      <AddStartupModal />
      <ChatModal />
    </div>
  );
};

export function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <MainContent />
      </AppProvider>
    </AuthProvider>
  );
}

export default App;
