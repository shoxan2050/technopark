import React from 'react';
import { Heart } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Footer: React.FC = () => {
  const { t } = useApp();

  return (
    <footer className="w-full flex justify-center border-t border-slate-200/60 dark:border-white/10 bg-slate-100/60 dark:bg-[#05080E] text-slate-700 dark:text-slate-300 transition-colors pt-16 pb-12">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          
          {/* Brand Info */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
                <svg className="w-5 h-5 text-emerald-600 dark:text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-lg font-black tracking-widest text-slate-900 dark:text-white uppercase font-sans">
                  TECHNOPARK
                </span>
                <span className="text-xs font-bold px-1.5 py-0.5 rounded badge-emerald">
                  HUB
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-400 max-w-sm leading-relaxed mb-6">
              {t.footer.desc}
            </p>

            <div className="flex items-center gap-3">
              {/* Telegram */}
              <a href="https://t.me" target="_blank" rel="noreferrer" title="Telegram"
                 className="p-2.5 rounded-xl bg-slate-200/60 dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm5.56 8.16l-2.02 9.51c-.15.68-.55.84-1.12.52l-3.1-2.28-1.5 1.44c-.16.16-.3.3-.61.3l.22-3.17 5.77-5.21c.25-.22-.05-.35-.39-.12l-7.14 4.49-3.07-.96c-.67-.21-.68-.67.14-.99l12.01-4.63c.56-.21 1.05.13.81 1.09z"/></svg>
              </a>
              {/* LinkedIn */}
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" title="LinkedIn"
                 className="p-2.5 rounded-xl bg-slate-200/60 dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:text-blue-500 transition-colors">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.74a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2z"/></svg>
              </a>
              {/* GitHub */}
              <a href="https://github.com" target="_blank" rel="noreferrer" title="GitHub"
                 className="p-2.5 rounded-xl bg-slate-200/60 dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/></svg>
              </a>
            </div>
          </div>

          {/* Quick Nav */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider mb-4 text-slate-900 dark:text-white">
              {t.footer.navTitle}
            </h4>
            <ul className="space-y-2.5 text-xs font-medium text-slate-600 dark:text-slate-400">
              <li><a href="#hero" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">{t.nav.ecosystem}</a></li>
              <li><a href="#infrastructure" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">{t.nav.infrastructure}</a></li>
              <li><a href="#startups" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">{t.nav.startups}</a></li>
              <li><a href="#grants" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">{t.nav.grants}</a></li>
            </ul>
          </div>

          {/* Contact & Support */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider mb-4 text-slate-900 dark:text-white">
              {t.footer.contactTitle}
            </h4>
            <div className="space-y-2.5 text-xs text-slate-600 dark:text-slate-400">
              <p>{t.footer.address}</p>
              <p>Email: <a href="mailto:info@technopark.uz" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">info@technopark.uz</a></p>
              <p>{t.footer.phone}</p>
            </div>
          </div>

        </div>

        <div className="pt-8 flex items-center justify-center text-xs border-t border-slate-200/60 dark:border-white/10 text-slate-500 dark:text-slate-400">
          <p>{t.footer.copyright}</p>
        </div>

      </div>
    </footer>
  );
};
