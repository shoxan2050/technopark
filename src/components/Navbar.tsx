import React, { useState, useRef, useEffect } from 'react';
import { Sun, Moon, Globe } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import type { AppLanguage } from '../types';

export const Navbar: React.FC = () => {
  const { currentUser, isAdmin, signOutUser } = useAuth();
  const { 
    isDarkMode,
    toggleDarkMode,
    language,
    setLanguage,
    t,
    setIsAuthModalOpen, 
    setIsProfileOpen, 
    setIsAddStartupModalOpen
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
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLangSelect = (lang: AppLanguage) => {
    setLanguage(lang);
    setLangMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full glass-nav-emerald transition-colors duration-200">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          
          {/* Logo & Emblem */}
          <div 
            onClick={() => scrollToSection('hero')} 
            className="flex items-center gap-3 cursor-pointer group shrink-0"
          >
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 transition-all group-hover:bg-emerald-500/20 group-hover:border-emerald-500/50">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-extrabold tracking-widest text-slate-900 dark:text-white uppercase font-sans">
                TECHNOPARK
              </span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded badge-emerald">
                HUB
              </span>
            </div>
          </div>

          {/* Navigation Links — Centered */}
          <nav className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
            <button 
              onClick={() => scrollToSection('hero')} 
              className="text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors"
            >
              {t.nav.ecosystem}
            </button>
            <button 
              onClick={() => scrollToSection('infrastructure')} 
              className="text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors"
            >
              {t.nav.infrastructure}
            </button>
            <button 
              onClick={() => scrollToSection('startups')} 
              className="text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors"
            >
              {t.nav.startups}
            </button>
            <button 
              onClick={() => scrollToSection('grants')} 
              className="text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors"
            >
              {t.nav.grants}
            </button>
          </nav>

          {/* Right Action Bar */}
          <div className="hidden md:flex items-center gap-3">
            
            {/* Language Selector Dropdown */}
            <div className="relative" ref={langRef}>
              <button
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 text-xs font-semibold hover:border-slate-300 dark:hover:border-white/20 transition-all"
                title="Tilni tanlash (Language)"
              >
                <Globe className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span className="uppercase">{language}</span>
              </button>

              {langMenuOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-white dark:bg-[#070C0A] border border-slate-200 dark:border-white/10 rounded-xl p-1.5 shadow-2xl z-50">
                  <button
                    onClick={() => handleLangSelect('uz')}
                    className={`w-full text-left px-3 py-1.5 text-xs font-semibold rounded-lg flex items-center justify-between ${
                      language === 'uz' ? 'bg-emerald-500 text-white' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5'
                    }`}
                  >
                    <span>O'zbekcha</span>
                    <span>UZ</span>
                  </button>
                  <button
                    onClick={() => handleLangSelect('ru')}
                    className={`w-full text-left px-3 py-1.5 text-xs font-semibold rounded-lg flex items-center justify-between ${
                      language === 'ru' ? 'bg-emerald-500 text-white' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5'
                    }`}
                  >
                    <span>Русский</span>
                    <span>RU</span>
                  </button>
                  <button
                    onClick={() => handleLangSelect('en')}
                    className={`w-full text-left px-3 py-1.5 text-xs font-semibold rounded-lg flex items-center justify-between ${
                      language === 'en' ? 'bg-emerald-500 text-white' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5'
                    }`}
                  >
                    <span>English</span>
                    <span>EN</span>
                  </button>
                </div>
              )}
            </div>

            {/* Dark / Light Theme Switcher */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:text-emerald-500 dark:hover:text-emerald-400 transition-all"
              title="Mavzuni almashtirish (Dark/Light)"
              aria-label="Toggle theme"
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
            </button>

            {currentUser ? (
              <div className="relative" ref={dropdownRef}>
                {/* 32px User Avatar */}
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 p-0.5 rounded-full border border-emerald-500/40 hover:border-emerald-400 transition-colors"
                  aria-label="User menu"
                >
                  <img 
                    src={currentUser.avatarUrl} 
                    alt={currentUser.displayName}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                </button>

                {/* User Dropdown Menu */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-[#070C0A] border border-slate-200 dark:border-white/10 rounded-xl p-2 shadow-2xl animate-in fade-in duration-150 z-50">
                    <div className="px-3 py-2 border-b border-slate-100 dark:border-white/10">
                      <p className="text-xs font-bold text-slate-900 dark:text-white truncate">{currentUser.displayName}</p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">{currentUser.email}</p>
                    </div>

                    <button
                      onClick={() => { setDropdownOpen(false); setIsProfileOpen(true); }}
                      className="w-full text-left px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white transition-colors rounded-lg"
                    >
                      {t.nav.profile}
                    </button>

                    <button
                      onClick={() => { setDropdownOpen(false); setIsAddStartupModalOpen(true); }}
                      className="w-full text-left px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white transition-colors rounded-lg"
                    >
                      {t.nav.addProject}
                    </button>

                    {isAdmin && (
                      <button
                        onClick={() => { setDropdownOpen(false); scrollToSection('admin-panel'); }}
                        className="w-full text-left px-3 py-2 text-xs font-medium text-amber-500 dark:text-amber-400 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors rounded-lg"
                      >
                        {t.nav.adminPanel}
                      </button>
                    )}

                    <div className="border-t border-slate-100 dark:border-white/10 my-1" />

                    <button
                      onClick={() => { setDropdownOpen(false); signOutUser(); }}
                      className="w-full text-left px-3 py-2 text-xs font-medium text-rose-500 hover:bg-rose-500/10 transition-colors rounded-lg"
                    >
                      {t.nav.signOut}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* Unauthenticated State: Sign In and Sign Up buttons */
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  {t.nav.signIn}
                </button>
                <button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="px-4 py-2 text-xs font-semibold btn-emerald"
                >
                  {t.nav.signUp}
                </button>
              </div>
            )}
          </div>

          {/* Mobile Hamburger Menu Toggle Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => handleLangSelect(language === 'uz' ? 'ru' : language === 'ru' ? 'en' : 'uz')}
              className="px-2 py-1 text-[11px] font-bold rounded bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 uppercase"
            >
              {language}
            </button>

            <button
              onClick={toggleDarkMode}
              className="p-1.5 rounded-lg text-slate-700 dark:text-slate-300"
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>

            {currentUser && (
              <button
                onClick={() => setIsProfileOpen(true)}
                className="p-0.5 rounded-full border border-emerald-500/40"
              >
                <img src={currentUser.avatarUrl} alt="" className="w-7 h-7 rounded-full object-cover" />
              </button>
            )}
            
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
              aria-label="Toggle menu"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                {mobileMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round"/>
                ) : (
                  <path d="M4 8h16M4 16h16" strokeLinecap="round" strokeLinejoin="round"/>
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-[#070C0A] border-b border-slate-200 dark:border-white/10 mx-4 my-2 p-4 rounded-xl shadow-lg space-y-3">
          <nav className="flex flex-col space-y-2">
            <button 
              onClick={() => scrollToSection('hero')} 
              className="text-left py-2 text-xs font-medium text-slate-700 dark:text-slate-300"
            >
              {t.nav.ecosystem}
            </button>
            <button 
              onClick={() => scrollToSection('infrastructure')} 
              className="text-left py-2 text-xs font-medium text-slate-700 dark:text-slate-300"
            >
              {t.nav.infrastructure}
            </button>
            <button 
              onClick={() => scrollToSection('startups')} 
              className="text-left py-2 text-xs font-medium text-slate-700 dark:text-slate-300"
            >
              {t.nav.startups}
            </button>
            <button 
              onClick={() => scrollToSection('grants')} 
              className="text-left py-2 text-xs font-medium text-slate-700 dark:text-slate-300"
            >
              {t.nav.grants}
            </button>
          </nav>

          <div className="pt-3 border-t border-slate-100 dark:border-white/10">
            {currentUser ? (
              <div className="space-y-2">
                <button
                  onClick={() => { setMobileMenuOpen(false); setIsProfileOpen(true); }}
                  className="w-full text-left py-2 text-xs font-medium text-slate-700 dark:text-slate-300"
                >
                  {t.nav.profile} ({currentUser.displayName})
                </button>
                {isAdmin && (
                  <button
                    onClick={() => { setMobileMenuOpen(false); scrollToSection('admin-panel'); }}
                    className="w-full text-left py-2 text-xs font-medium text-amber-500 dark:text-amber-400"
                  >
                    {t.nav.adminPanel}
                  </button>
                )}
                <button
                  onClick={() => { setMobileMenuOpen(false); signOutUser(); }}
                  className="w-full text-left py-2 text-xs font-medium text-rose-500"
                >
                  {t.nav.signOut}
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-2 pt-1">
                <button
                  onClick={() => { setMobileMenuOpen(false); setIsAuthModalOpen(true); }}
                  className="w-full py-2 text-xs font-medium text-slate-700 dark:text-slate-300 text-center"
                >
                  {t.nav.signIn}
                </button>
                <button
                  onClick={() => { setMobileMenuOpen(false); setIsAuthModalOpen(true); }}
                  className="w-full py-2.5 text-xs font-semibold btn-emerald text-center"
                >
                  {t.nav.signUp}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
