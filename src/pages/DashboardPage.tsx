import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import { StartupGrid } from '../components/StartupGrid';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { AuthModal } from '../components/AuthModal';
import { UserProfile } from '../components/UserProfile';
import { AddStartupModal } from '../components/AddStartupModal';
import { ChatModal } from '../components/ChatModal';
import { initScrollAnimations } from '../utils/scrollAnimations';

export function DashboardPage() {
  const { currentUser } = useAuth();
  const { setIsAddStartupModalOpen, setIsProfileOpen, startups, grants } = useApp();

  useEffect(() => {
    const timer = setTimeout(() => initScrollAnimations(), 150);
    return () => clearTimeout(timer);
  }, [startups.length]);

  // Foydalanuvchining o'z startaplari soni va statistikasi
  const myStartups = startups.filter(
    s =>
      s.founderId === currentUser?.uid ||
      s.founderEmail === currentUser?.email ||
      s.founderName === currentUser?.displayName ||
      (currentUser?.nickname && s.founderNickname === currentUser?.nickname)
  );
  const myStartupsCount = myStartups.length;
  const totalUpvotes = myStartups.reduce((sum, s) => sum + (s.likesCount || 0), 0);
  const myGrantApps = grants ? grants.filter(g => g.applicants?.includes(currentUser?.uid || '')).length : 0;

  return (
    <div className="min-h-screen w-full flex flex-col items-center bg-[#F8FAFC] dark:bg-[#070B11] text-slate-900 dark:text-slate-100 overflow-x-hidden">
      <Navbar />

      <main className="relative w-full flex-1 flex flex-col items-center">
        {/* 1. ANIQ VA GO'ZAL ORQA FON RASMI (BUTUN DASHBOARD BO'YICHA) */}
        <div className="absolute inset-0 w-full h-[650px] pointer-events-none overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2000&q=80"
            alt="Technopark Hub Architecture"
            className="w-full h-full object-cover object-center opacity-30 dark:opacity-20"
          />
          {/* Silliq gradient overlay - rasm chiroyli ko'rinib tursin */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#F8FAFC]/80 to-[#F8FAFC] dark:via-[#070B11]/80 dark:to-[#070B11]" />
        </div>

        {/* 2. ASOSIY REZIDENT DASHBOARD PANEL (QOQ O'RTADA: MAX-W-7XL MX-AUTO) */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12 flex flex-col items-center">
          
          {/* Foydalanuvchi ma'lumotlari va Tugmalar qutisi */}
          <div className="w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200/90 dark:border-white/10 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">
            
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-3xl shadow-inner shrink-0">
                👨‍💻
              </div>
              <div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-1">
                  Rezident Dashboard
                </span>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  Xush kelibsiz, {currentUser?.displayName || currentUser?.nickname || 'Rezident'}!
                </h1>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                  Technopark rezident ekotizimida loyihalaringizni boshqaring va hamjamiyat bilan ulashing.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto">
              <button
                onClick={() => setIsAddStartupModalOpen(true)}
                className="flex-1 md:flex-initial px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm transition-all shadow-sm shadow-emerald-600/20 flex items-center justify-center gap-2"
              >
                <span>+</span> Yangi Startap Qo'shish
              </button>
              <button
                onClick={() => setIsProfileOpen(true)}
                className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-medium text-sm transition-all border border-slate-200 dark:border-white/10"
              >
                Mening Profilim
              </button>
            </div>
          </div>

          {/* 3. REZIDENT STATISTIKA METRIKALARI (3 TA TENG USTUN) */}
          <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
            
            <div className="bg-white/90 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200/80 dark:border-white/10 rounded-2xl p-5 flex items-center gap-4 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-xl font-bold">
                🚀
              </div>
              <div>
                <div className="text-xs uppercase font-semibold text-slate-500 dark:text-slate-400 tracking-wider">Mening Startaplarim</div>
                <div className="text-2xl font-black text-slate-900 dark:text-white mt-0.5">{myStartupsCount}</div>
                <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">Aktiv loyihalar</div>
              </div>
            </div>

            <div className="bg-white/90 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200/80 dark:border-white/10 rounded-2xl p-5 flex items-center gap-4 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xl font-bold">
                ⬆️
              </div>
              <div>
                <div className="text-xs uppercase font-semibold text-slate-500 dark:text-slate-400 tracking-wider">To'plangan Upvote</div>
                <div className="text-2xl font-black text-slate-900 dark:text-white mt-0.5">{totalUpvotes}</div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400">Hamjamiyat ovozlari</div>
              </div>
            </div>

            <div className="bg-white/90 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200/80 dark:border-white/10 rounded-2xl p-5 flex items-center gap-4 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center text-xl font-bold">
                📋
              </div>
              <div>
                <div className="text-xs uppercase font-semibold text-slate-500 dark:text-slate-400 tracking-wider">Grant Arizalarim</div>
                <div className="text-2xl font-black text-slate-900 dark:text-white mt-0.5">{myGrantApps}</div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400">Ko'rib chiqilmoqda</div>
              </div>
            </div>

          </div>

          {/* 4. STARTAPLAR FEED QISMI (MARKAZLASHGAN KATALOG) */}
          <div className="w-full">
            <StartupGrid />
          </div>

        </div>
      </main>

      <Footer />

      {/* Global Modals */}
      <AuthModal />
      <UserProfile />
      <AddStartupModal />
      <ChatModal />
    </div>
  );
}

export default DashboardPage;
