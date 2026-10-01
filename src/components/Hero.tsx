import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';

export const Hero: React.FC = () => {
  const { currentUser } = useAuth();
  const { t, setIsAuthModalOpen, setIsAddStartupModalOpen } = useApp();

  // Interactive Calculator State (fully interactive for guests & users)
  const [stage, setStage] = useState<'idea' | 'mvp' | 'growth'>('mvp');
  const [need, setNeed] = useState<'coworking' | 'fablab' | 'servers'>('fablab');

  const getGrantRange = () => {
    if (stage === 'idea') {
      return need === 'coworking' ? '$5,000 - $15,000' : '$10,000 - $25,000';
    } else if (stage === 'mvp') {
      return need === 'servers' ? '$25,000 - $50,000' : '$20,000 - $40,000';
    } else {
      return '$50,000 - $100,000';
    }
  };

  const handleApplyClick = () => {
    if (currentUser) {
      setIsAddStartupModalOpen(true);
    } else {
      setIsAuthModalOpen(true);
    }
  };

  const scrollToInfrastructure = () => {
    const el = document.getElementById('infrastructure');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative w-full min-h-[88vh] flex flex-col items-center justify-center overflow-hidden border-b border-slate-200/60 dark:border-white/10 py-12 lg:py-16">
      {/* Background Architecture Photo — High contrast & vivid rendering */}
      <div className="absolute inset-0 w-full h-full -z-20 pointer-events-none overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2000&q=80"
          alt="Technopark Architecture"
          className="w-full h-full object-cover object-center opacity-70 dark:opacity-45 filter contrast-[1.08] saturate-[1.15] transform scale-105"
        />
      </div>

      {/* Transparent glass overlay gradient layers */}
      <div className="absolute inset-0 bg-slate-50/40 dark:bg-[#070B11]/55 -z-10" />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-100/90 via-slate-100/50 to-slate-100/30 dark:from-[#070B11]/90 dark:via-[#070B11]/60 dark:to-transparent -z-10" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#F1F5F9] dark:from-[#070B11] to-transparent -z-10" />

      {/* MAIN CONTAINER */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center w-full">
          
          {/* Left Column (Headline & Action) - 6 cols */}
          <div className="lg:col-span-6 flex flex-col justify-center text-left" data-animate="left">
            
            {/* Trust Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full badge-emerald text-xs mb-6 w-fit shadow-sm">
              <span>{t.hero.badge}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.15]">
              {t.hero.title}
            </h1>

            {/* Subtext */}
            <p className="mt-6 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl">
              {t.hero.subtext}
            </p>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
              <button
                onClick={handleApplyClick}
                className="w-full sm:w-auto px-8 py-4 text-xs sm:text-sm font-bold btn-emerald pulse-glow rounded-xl shadow-lg"
              >
                {t.hero.ctaAdd}
              </button>

              <button
                onClick={scrollToInfrastructure}
                className="w-full sm:w-auto px-8 py-4 text-xs sm:text-sm font-semibold btn-glass-outline rounded-xl"
              >
                {t.hero.ctaInfra}
              </button>
            </div>

            {/* Trust Badges Row */}
            <div className="mt-10 pt-6 border-t border-slate-200/80 dark:border-white/10 flex flex-wrap items-center gap-6 text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium">
              <span className="flex items-center gap-2 text-slate-700 dark:text-slate-300 font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                {t.hero.trust1}
              </span>
              <span className="flex items-center gap-2 text-slate-700 dark:text-slate-300 font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                {t.hero.trust2}
              </span>
              <span className="flex items-center gap-2 text-slate-700 dark:text-slate-300 font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                {t.hero.trust3}
              </span>
            </div>

          </div>

          {/* Right Column (Live Calculator Card — Spacious, Wide, Prettier) - 6 cols */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end items-center w-full" data-animate="right">
            <div className="calc-card p-6 sm:p-9 relative overflow-hidden w-full max-w-xl shadow-2xl rounded-3xl bg-white/95 dark:bg-[#0E1521]/95 backdrop-blur-xl border border-slate-200/80 dark:border-emerald-500/20">
              
              {/* Header Box with Live Pulse Badge */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-200/80 dark:border-white/10">
                <div>
                  <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest block mb-0.5">
                    Technopark Residency
                  </span>
                  <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                    {t.hero.calcTitle}
                  </h3>
                </div>

                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-700 dark:text-emerald-400 text-xs font-bold shrink-0 self-start sm:self-center shadow-xs">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span>{t.hero.calcBadge}</span>
                </div>
              </div>

              {/* Stage Selector */}
              <div className="mb-6">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2.5">
                  {t.hero.stageLabel}
                </label>
                <div className="grid grid-cols-3 gap-2 p-2 rounded-2xl bg-slate-100/90 dark:bg-white/5 border border-slate-200/80 dark:border-white/10">
                  <button onClick={() => setStage('idea')} className={`py-3 px-2 text-xs sm:text-sm font-semibold transition-all rounded-xl ${stage==='idea'?'bg-emerald-600 text-white shadow-md font-bold dark:bg-emerald-500':'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-white/5'}`}>{t.hero.stageIdea}</button>
                  <button onClick={() => setStage('mvp')}  className={`py-3 px-2 text-xs sm:text-sm font-semibold transition-all rounded-xl ${stage==='mvp' ?'bg-emerald-600 text-white shadow-md font-bold dark:bg-emerald-500':'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-white/5'}`}>{t.hero.stageMVP}</button>
                  <button onClick={() => setStage('growth')} className={`py-3 px-2 text-xs sm:text-sm font-semibold transition-all rounded-xl ${stage==='growth'?'bg-emerald-600 text-white shadow-md font-bold dark:bg-emerald-500':'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-white/5'}`}>{t.hero.stageGrowth}</button>
                </div>
              </div>

              {/* Infrastructure Needs Selector */}
              <div className="mb-6">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2.5">
                  {t.hero.needLabel}
                </label>
                <div className="grid grid-cols-3 gap-2 p-2 rounded-2xl bg-slate-100/90 dark:bg-white/5 border border-slate-200/80 dark:border-white/10">
                  <button onClick={() => setNeed('coworking')} className={`py-3 px-2 text-xs sm:text-sm font-semibold transition-all rounded-xl ${need==='coworking'?'bg-emerald-600 text-white shadow-md font-bold dark:bg-emerald-500':'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-white/5'}`}>{t.hero.needCoworking}</button>
                  <button onClick={() => setNeed('fablab')}    className={`py-3 px-2 text-xs sm:text-sm font-semibold transition-all rounded-xl ${need==='fablab'   ?'bg-emerald-600 text-white shadow-md font-bold dark:bg-emerald-500':'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-white/5'}`}>{t.hero.needFablab}</button>
                  <button onClick={() => setNeed('servers')}   className={`py-3 px-2 text-xs sm:text-sm font-semibold transition-all rounded-xl ${need==='servers'  ?'bg-emerald-600 text-white shadow-md font-bold dark:bg-emerald-500':'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-white/5'}`}>{t.hero.needServers}</button>
                </div>
              </div>

              {/* Dynamic Grant Output Box */}
              <div className="p-6 sm:p-7 rounded-2xl bg-gradient-to-br from-emerald-500/15 via-emerald-500/10 to-teal-500/15 border border-emerald-500/30 text-center mb-6 shadow-inner">
                <span className="text-xs text-emerald-800 dark:text-emerald-300 font-bold uppercase tracking-wider block mb-1">
                  {t.hero.grantEstimateLabel}
                </span>
                <p className="text-3xl sm:text-4xl font-black text-emerald-700 dark:text-emerald-400 tracking-tight my-1">
                  {getGrantRange()}
                </p>
                <span className="text-xs text-slate-600 dark:text-slate-400 font-medium block">
                  {t.hero.grantEstimateSub}
                </span>
              </div>

              {/* Primary Apply CTA */}
              <button
                onClick={handleApplyClick}
                className="w-full py-4 px-6 text-sm font-extrabold btn-emerald text-center flex items-center justify-center gap-2 rounded-xl shadow-lg hover:shadow-emerald-500/30 transition-all"
              >
                <span>{t.hero.applyBtn}</span>
                <span>→</span>
              </button>
            </div>
          </div>

        </div>

        {/* "QANDAY ISHLAYDI" SECTION (3-Step Progression) */}
        <div className="mt-24 pt-16 border-t border-slate-200/80 dark:border-white/10">
          <div className="text-center max-w-2xl mx-auto mb-12" data-animate>
            <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-widest block mb-1">
              {t.hero.stepsBadge}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
              {t.hero.stepsTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[{n:'01',t:t.hero.step1Title,d:t.hero.step1Desc,delay:'100'},{n:'02',t:t.hero.step2Title,d:t.hero.step2Desc,delay:'250'},{n:'03',t:t.hero.step3Title,d:t.hero.step3Desc,delay:'400'}].map(step=>(
              <div key={step.n} className="card p-6" data-animate data-delay={step.delay}>
                <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-emerald-700 dark:text-emerald-400 font-extrabold flex items-center justify-center text-xs mb-4">{step.n}</div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">{step.t}</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{step.d}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
