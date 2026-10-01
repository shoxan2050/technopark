import React, { useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { InfrastructureSection } from '../components/InfrastructureSection';
import { LeadershipSection } from '../components/LeadershipSection';
import { GrantsSection } from '../components/GrantsSection';
import { Footer } from '../components/Footer';
import { useApp } from '../context/AppContext';
import { initScrollAnimations } from '../utils/scrollAnimations';
import { AuthModal } from '../components/AuthModal';
import { ChatModal } from '../components/ChatModal';
import { AddStartupModal } from '../components/AddStartupModal';
import { UserProfile } from '../components/UserProfile';

const GuestJoinBanner: React.FC = () => {
  const { t, setIsAuthModalOpen } = useApp();
  return (
    <section className="w-full py-20 flex justify-center border-b border-slate-200/60 dark:border-white/10">
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="w-full glass-surface p-10 sm:p-14 text-center flex flex-col items-center border-emerald-500/30 bg-emerald-50/50 dark:bg-emerald-950/20 shadow-2xl rounded-3xl">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 dark:text-emerald-400 mb-3 block">
            {t.guestBanner.badge}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
            {t.guestBanner.title}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl text-center mx-auto leading-relaxed mb-8">
            {t.guestBanner.desc}
          </p>
          <button
            onClick={() => setIsAuthModalOpen(true)}
            className="px-8 py-3.5 text-sm font-bold btn-emerald shadow-lg pulse-glow"
          >
            {t.guestBanner.btn}
          </button>
        </div>
      </div>
    </section>
  );
};

export const LandingPage: React.FC = () => {
  useEffect(() => {
    const timer = setTimeout(() => initScrollAnimations(), 150);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen w-full flex flex-col items-center transition-colors duration-300"
      style={{ backgroundColor: 'var(--bg-page)', color: 'var(--text-primary)' }}>
      <Navbar />
      <main className="w-full flex flex-col items-center">
        <Hero />
        <InfrastructureSection />
        <LeadershipSection />
        <GrantsSection />
        <GuestJoinBanner />
      </main>
      <Footer />
      <AuthModal />
      <UserProfile />
      <AddStartupModal />
      <ChatModal />
    </div>
  );
};
