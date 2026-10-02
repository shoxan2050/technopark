import React, { useState, useRef, useEffect } from 'react';
import { Sun, Moon, Globe, Menu } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import type { AppLanguage } from '../types';

export const Navbar: React.FC = () => {
  const { currentUser, isAdmin, signOutUser } = useAuth();
  const navigate = useNavigate();
  const { 
    isDarkMode, 
    toggleDarkMode, 
    language, 
    setLanguage, 
    t, 
    setIsAuthModalOpen, 
    setIsProfileOpen, 
    setIsAddStartupModalOpen,
    setIsAboutModalOpen
  } = useApp();
  
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    setDropdownOpen(false);
    if (window.location.pathname !== '/') {
      navigate('/', { replace: false });
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSignOut = async () => {
    setDropdownOpen(false);
    setMobileMenuOpen(false);
    await signOutUser();
    navigate('/');
  };

  const handleLangSelect = (lang: AppLanguage) => {
    setLanguage(lang);
    setLangMenuOpen(false);
  };

  return (
    <header className="sticky top-2 sm:top-4 z-50 w-full flex flex-col items-center px-2 sm:px-6 pointer-events-none">
      {/* FLOATING NAVBAR */}
      <div className="pointer-events-auto w-full max-w-6xl mx-auto px-2 sm:px-6 lg:px-8 h-12 sm:h-16 flex items-center justify-between bg-white/95 dark:bg-[#0D1420]/95 backdrop-blur-xl border border-slate-200/80 dark:border-white/10 rounded-2xl shadow-2xl transition-all duration-200">
        
        {/* LEFT: Menu + Logo */}
        <div className="flex items-center gap-1 sm:gap-3 shrink-0 min-w-0">
          <button
            onClick={() => setIsAboutModalOpen(true)}
            className="p-1.5 sm:px-3 sm:py-1.5 rounded-lg sm:rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 text-xs font-bold transition-all shrink-0"
            title={t.nav.aboutUs}
          >
            <Menu className="w-4 h-4" />
          </button>

          <Link 
            to={currentUser ? "/dashboard" : "/"} 
            className="flex items-center gap-1 sm:gap-2 shrink-0 group cursor-pointer"
          >
            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-md sm:rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 font-bold text-xs sm:text-sm transition-all group-hover:bg-emerald-500/30 shrink-0">
              T
            </div>
            <span className="text-slate-900 dark:text-white font-extrabold tracking-wider text-[11px] sm:text-sm uppercase">
              TECHNOPARK
            </span>
            <span className="hidden sm:inline text-[10px] bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 px-1.5 py-0.5 rounded font-mono font-semibold">
              HUB
            </span>
          </Link>
        </div>

        {/* CENTER: Nav links (desktop only) */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-xs font-medium text-slate-600 dark:text-slate-300">
          <button onClick={() => scrollToSection('ecosystem')} className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors whitespace-nowrap">{t.nav.ecosystem}</button>
          <button onClick={() => scrollToSection('infrastructure')} className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors whitespace-nowrap">{t.nav.infrastructure}</button>
          <button onClick={() => scrollToSection('startups')} className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors whitespace-nowrap">{t.nav.startups}</button>
          <button onClick={() => scrollToSection('grants')} className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors whitespace-nowrap">{t.nav.grants}</button>
        </nav>

        {/* RIGHT: Lang + Theme + Auth + Mobile menu */}
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          
          {/* Language */}
          <div className="relative" ref={langRef}>
            <button
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className="p-1.5 sm:px-2 sm:py-1.5 rounded-md sm:rounded-lg bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-[10px] sm:text-xs font-semibold border border-slate-200 dark:border-white/10 flex items-center gap-0.5 sm:gap-1 transition-all"
              title="Language"
            >
              <Globe className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span className="uppercase">{language}</span>
            </button>

            {langMenuOpen && (
              <div className="absolute right-0 mt-2 w-32 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-xl p-1.5 shadow-2xl z-50">
                <button onClick={() => handleLangSelect('uz')} className={`w-full text-left px-3 py-1.5 text-xs font-semibold rounded-lg flex items-center justify-between ${language === 'uz' ? 'bg-emerald-600 text-white' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'}`}>
                  <span>O'zbekcha</span><span>UZ</span>
                </button>
                <button onClick={() => handleLangSelect('ru')} className={`w-full text-left px-3 py-1.5 text-xs font-semibold rounded-lg flex items-center justify-between ${language === 'ru' ? 'bg-emerald-600 text-white' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'}`}>
                  <span>Русский</span><span>RU</span>
                </button>
                <button onClick={() => handleLangSelect('en')} className={`w-full text-left px-3 py-1.5 text-xs font-semibold rounded-lg flex items-center justify-between ${language === 'en' ? 'bg-emerald-600 text-white' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'}`}>
                  <span>English</span><span>EN</span>
                </button>
              </div>
            )}
          </div>
          
          {/* Dark mode toggle */}
          <button 
            onClick={toggleDarkMode}
            className="p-1.5 rounded-md sm:rounded-lg bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-white/10 transition-all"
            title="Toggle theme"
            aria-label="Toggle theme"
          >
            {isDarkMode ? <Sun className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400" /> : <Moon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-600" />}
          </button>

          {/* Auth / Profile */}
          {currentUser ? (
            <div className="relative" ref={dropdownRef}>
              <button 
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-slate-800 border-2 border-emerald-500/40 hover:border-emerald-400 flex items-center justify-center text-xs sm:text-sm shadow-sm overflow-hidden transition-colors"
                aria-label="User profile menu"
              >
                {currentUser.avatarUrl ? (
                  <img src={currentUser.avatarUrl} alt={currentUser.displayName || ''} className="w-full h-full object-cover" />
                ) : (
                  <span>👨‍💻</span>
                )}
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-xl p-2 shadow-2xl z-50">
                  <div className="px-3 py-2 border-b border-slate-100 dark:border-white/10 mb-1">
                    <p className="text-xs font-bold text-slate-900 dark:text-white truncate">{currentUser.displayName || currentUser.nickname || 'Rezident'}</p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">{currentUser.email}</p>
                  </div>
                  <button onClick={() => { setDropdownOpen(false); setIsProfileOpen(true); }} className="w-full text-left px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">{t.nav.profile}</button>
                  <button onClick={() => { setDropdownOpen(false); setIsAddStartupModalOpen(true); }} className="w-full text-left px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">{t.nav.addProject}</button>
                  {isAdmin && (
                    <button onClick={() => { setDropdownOpen(false); navigate('/admin'); }} className="w-full text-left px-3 py-2 text-xs font-medium text-amber-600 dark:text-amber-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">{t.nav.adminPanel}</button>
                  )}
                  <div className="border-t border-slate-100 dark:border-white/10 my-1" />
                  <button onClick={handleSignOut} className="w-full text-left px-3 py-2 text-xs font-medium text-rose-500 hover:bg-rose-500/10 rounded-lg">{t.nav.signOut}</button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="px-2 py-1 sm:px-3 sm:py-1.5 text-[10px] sm:text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 border border-emerald-500/30 bg-emerald-500/10 rounded-lg sm:rounded-xl transition-colors whitespace-nowrap"
            >
              {t.nav.signIn}
            </button>
          )}

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1 sm:p-1.5 rounded-md text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            aria-label="Toggle menu"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              {mobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round"/>
              ) : (
                <path d="M4 8h16M4 16h16" strokeLinecap="round" strokeLinejoin="round"/>
              )}
            </svg>
          </button>
        </div>

      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="pointer-events-auto md:hidden w-full max-w-6xl mx-auto bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-2xl mt-2 px-4 py-3 shadow-2xl">
          <nav className="flex flex-col space-y-1 text-xs font-medium text-slate-700 dark:text-slate-300">
            <button onClick={() => scrollToSection('ecosystem')} className="text-left py-2 px-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-emerald-600 dark:hover:text-emerald-400">{t.nav.ecosystem}</button>
            <button onClick={() => scrollToSection('infrastructure')} className="text-left py-2 px-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-emerald-600 dark:hover:text-emerald-400">{t.nav.infrastructure}</button>
            <button onClick={() => scrollToSection('startups')} className="text-left py-2 px-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-emerald-600 dark:hover:text-emerald-400">{t.nav.startups}</button>
            <button onClick={() => scrollToSection('grants')} className="text-left py-2 px-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-emerald-600 dark:hover:text-emerald-400">{t.nav.grants}</button>
            <button onClick={() => { setMobileMenuOpen(false); setIsAboutModalOpen(true); }} className="text-left py-2 px-2 rounded-lg font-bold text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/10 border-t border-slate-100 dark:border-white/10 mt-1 pt-3">
              ℹ️ {t.nav.aboutUs}
            </button>
          </nav>

          {!currentUser && (
            <div className="pt-3 mt-2 border-t border-slate-100 dark:border-white/10 flex gap-2">
              <button
                onClick={() => { setMobileMenuOpen(false); setIsAuthModalOpen(true); }}
                className="flex-1 py-2.5 text-xs font-bold text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10 rounded-xl"
              >
                {t.nav.signIn}
              </button>
              <button
                onClick={() => { setMobileMenuOpen(false); setIsAuthModalOpen(true); }}
                className="flex-1 py-2.5 text-xs font-bold bg-emerald-600 text-white rounded-xl shadow-sm"
              >
                {t.nav.signUp}
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
