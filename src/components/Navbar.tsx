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
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 dark:border-white/10 bg-white/90 dark:bg-[#070B11]/90 backdrop-blur-md transition-colors duration-200">
      {/* MANA SHU QUTI HAMMA ELEMENTLARNI PASTKI BLOK BILAN BIR XIL O'QQA SOLADI: max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 */}
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* 1. Chap tomon: Hamburger Menu + Technopark Logo */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setIsAboutModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 text-xs font-bold transition-all shadow-sm"
            title={t.nav.aboutUs}
          >
            <Menu className="w-4 h-4" />
            <span className="hidden sm:inline">{t.nav.aboutUs}</span>
          </button>

          <Link 
            to={currentUser ? "/dashboard" : "/"} 
            className="flex items-center gap-2 shrink-0 group cursor-pointer"
          >
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 font-bold transition-all group-hover:bg-emerald-500/30">
              T
            </div>
            <span className="text-slate-900 dark:text-white font-extrabold tracking-wider text-sm uppercase">
              TECHNOPARK
            </span>
            <span className="text-[10px] bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 px-1.5 py-0.5 rounded font-mono font-semibold">
              HUB
            </span>
          </Link>
        </div>

        {/* 2. O'rta: Navigatsiya havolalari */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-xs font-medium text-slate-600 dark:text-slate-300">
          <button 
            onClick={() => scrollToSection('ecosystem')} 
            className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors whitespace-nowrap"
          >
            {t.nav.ecosystem}
          </button>
          <button 
            onClick={() => scrollToSection('infrastructure')} 
            className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors whitespace-nowrap"
          >
            {t.nav.infrastructure}
          </button>
          <button 
            onClick={() => scrollToSection('startups')} 
            className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors whitespace-nowrap"
          >
            {t.nav.startups}
          </button>
          <button 
            onClick={() => scrollToSection('grants')} 
            className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors whitespace-nowrap"
          >
            {t.nav.grants}
          </button>
        </nav>

        {/* 3. O'ng tomon: Til, Rejim va Profil (Pastki kartochkaning o'ng burchagi bilan bir chiziqda) */}
        <div className="flex items-center gap-3 shrink-0">
          
          {/* Til tanlash */}
          <div className="relative" ref={langRef}>
            <button
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className="px-2.5 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold border border-slate-200 dark:border-white/10 flex items-center gap-1.5 transition-all"
              title="Language"
            >
              <Globe className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span className="uppercase">{language}</span>
            </button>

            {langMenuOpen && (
              <div className="absolute right-0 mt-2 w-32 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-xl p-1.5 shadow-2xl z-50 animate-in fade-in duration-150">
                <button
                  onClick={() => handleLangSelect('uz')}
                  className={`w-full text-left px-3 py-1.5 text-xs font-semibold rounded-lg flex items-center justify-between ${
                    language === 'uz' ? 'bg-emerald-600 text-white' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <span>O'zbekcha</span>
                  <span>UZ</span>
                </button>
                <button
                  onClick={() => handleLangSelect('ru')}
                  className={`w-full text-left px-3 py-1.5 text-xs font-semibold rounded-lg flex items-center justify-between ${
                    language === 'ru' ? 'bg-emerald-600 text-white' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <span>Русский</span>
                  <span>RU</span>
                </button>
                <button
                  onClick={() => handleLangSelect('en')}
                  className={`w-full text-left px-3 py-1.5 text-xs font-semibold rounded-lg flex items-center justify-between ${
                    language === 'en' ? 'bg-emerald-600 text-white' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <span>English</span>
                  <span>EN</span>
                </button>
              </div>
            )}
          </div>
          
          {/* Mavzu almashtirish */}
          <button 
            onClick={toggleDarkMode}
            className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-white/10 transition-all"
            title="Toggle theme"
            aria-label="Toggle theme"
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
          </button>

          {/* User avatari va menyusi / Auth tugmalari */}
          {currentUser ? (
            <div className="relative pl-2 border-l border-slate-200 dark:border-white/10" ref={dropdownRef}>
              <button 
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="w-8 h-8 rounded-full bg-slate-800 border-2 border-emerald-500/40 hover:border-emerald-400 flex items-center justify-center text-sm shadow-sm overflow-hidden transition-colors"
                aria-label="User profile menu"
              >
                {currentUser.avatarUrl ? (
                  <img src={currentUser.avatarUrl} alt={currentUser.displayName || ''} className="w-full h-full object-cover" />
                ) : (
                  <span>👨‍💻</span>
                )}
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-xl p-2 shadow-2xl z-50 animate-in fade-in duration-150">
                  <div className="px-3 py-2 border-b border-slate-100 dark:border-white/10 mb-1">
                    <p className="text-xs font-bold text-slate-900 dark:text-white truncate">{currentUser.displayName || currentUser.nickname || 'Rezident'}</p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">{currentUser.email}</p>
                  </div>

                  <button
                    onClick={() => { setDropdownOpen(false); setIsProfileOpen(true); }}
                    className="w-full text-left px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-colors rounded-lg"
                  >
                    {t.nav.profile}
                  </button>

                  <button
                    onClick={() => { setDropdownOpen(false); setIsAddStartupModalOpen(true); }}
                    className="w-full text-left px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-colors rounded-lg"
                  >
                    {t.nav.addProject}
                  </button>

                  {isAdmin && (
                    <button
                      onClick={() => { setDropdownOpen(false); navigate('/admin'); }}
                      className="w-full text-left px-3 py-2 text-xs font-medium text-amber-600 dark:text-amber-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors rounded-lg"
                    >
                      {t.nav.adminPanel}
                    </button>
                  )}

                  <div className="border-t border-slate-100 dark:border-white/10 my-1" />

                  <button
                    onClick={handleSignOut}
                    className="w-full text-left px-3 py-2 text-xs font-medium text-rose-500 hover:bg-rose-500/10 transition-colors rounded-lg"
                  >
                    {t.nav.signOut}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2.5 pl-2 border-l border-slate-200 dark:border-white/10">
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
              >
                {t.nav.signIn}
              </button>
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="px-4 py-1.5 text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-sm transition-all"
              >
                {t.nav.signUp}
              </button>
            </div>
          )}

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
        <div className="md:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-white/10 px-4 py-4 space-y-3">
          <nav className="flex flex-col space-y-2 text-xs font-medium text-slate-700 dark:text-slate-300">
            <button 
              onClick={() => scrollToSection('ecosystem')} 
              className="text-left py-2 hover:text-emerald-600 dark:hover:text-emerald-400"
            >
              {t.nav.ecosystem}
            </button>
            <button 
              onClick={() => scrollToSection('infrastructure')} 
              className="text-left py-2 hover:text-emerald-600 dark:hover:text-emerald-400"
            >
              {t.nav.infrastructure}
            </button>
            <button 
              onClick={() => scrollToSection('startups')} 
              className="text-left py-2 hover:text-emerald-600 dark:hover:text-emerald-400"
            >
              {t.nav.startups}
            </button>
            <button 
              onClick={() => scrollToSection('grants')} 
              className="text-left py-2 hover:text-emerald-600 dark:hover:text-emerald-400"
            >
              {t.nav.grants}
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
