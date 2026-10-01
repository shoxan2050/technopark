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
    <section id="hero" className="relative w-full min-h-[85vh] flex flex-col items-center justify-center overflow-hidden border-b border-slate-200/20 dark:border-white/10 py-12">
      {/* Orqa fon rasmi */}
      <div className="absolute inset-0 w-full h-full -z-20 pointer-events-none">
        <img
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2000&q=80"
          alt="Technopark Architecture"
          className="w-full h-full object-cover object-center opacity-60 dark:opacity-45"
        />
      </div>

      {/* Overlay qatlamlari (Shaffoflik ta'minlangan) */}
      <div className="absolute inset-0 bg-slate-100/20 dark:bg-[#070B11]/35 -z-10" />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-100/85 via-slate-100/40 to-transparent dark:from-[#070B11]/85 dark:via-[#070B11]/40 dark:to-transparent -z-10" />
      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-slate-100 dark:from-[#070B11] to-transparent -z-10" />

      {/* MANA SHU ASOSIY QUTI EKRANNING QOQ O'RTASIDA TURISHI SHART: */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center w-full">
          
          {/* Chap ustun (Matnlar va tugmalar) - 7 ustun */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left" data-animate="left">
            
            {/* Trust Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full badge-emerald text-xs mb-6 w-fit">
              <span>{t.hero.badge}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
              {t.hero.title}
            </h1>

            {/* Subtext */}
            <p className="mt-6 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
              {t.hero.subtext}
            </p>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
              <button
                onClick={handleApplyClick}
                className="w-full sm:w-auto px-7 py-3.5 text-xs font-bold btn-emerald pulse-glow"
              >
                {t.hero.ctaAdd}
              </button>

              <button
                onClick={scrollToInfrastructure}
                className="w-full sm:w-auto px-7 py-3.5 text-xs font-semibold btn-glass-outline"
              >
                {t.hero.ctaInfra}
              </button>
            </div>

            {/* Trust Badges Row */}
            <div className="mt-10 pt-6 border-t border-slate-200/60 dark:border-white/10 flex flex-wrap items-center gap-6 text-xs text-slate-600 dark:text-slate-400 font-medium">
              <span className="flex items-center gap-2 text-slate-700 dark:text-slate-300 font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                {t.hero.trust1}
              </span>
              <span className="flex items-center gap-2 text-slate-700 dark:text-slate-300 font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                {t.hero.trust2}
              </span>
              <span className="flex items-center gap-2 text-slate-700 dark:text-slate-300 font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                {t.hero.trust3}
              </span>
            </div>

          </div>

          {/* O'ng ustun (Kalkulyator qutisi) - 5 ustun */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end items-center" data-animate="right">
            <div className="calc-card p-6 sm:p-8 relative overflow-hidden w-full">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-200/60 dark:border-white/10">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {t.hero.calcTitle}
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded badge-emerald">
                  {t.hero.calcBadge}
                </span>
              </div>

              {/* Stage Selector */}
              <div className="mb-5">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  {t.hero.stageLabel}
                </label>
                <div className="grid grid-cols-3 gap-1 p-1 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10">
                  <button onClick={() => setStage('idea')} className={`py-2 text-xs transition-all ${stage==='idea'?'seg-active':'seg-inactive'}`}>{t.hero.stageIdea}</button>
                  <button onClick={() => setStage('mvp')}  className={`py-2 text-xs transition-all ${stage==='mvp' ?'seg-active':'seg-inactive'}`}>{t.hero.stageMVP}</button>
                  <button onClick={() => setStage('growth')} className={`py-2 text-xs transition-all ${stage==='growth'?'seg-active':'seg-inactive'}`}>{t.hero.stageGrowth}</button>
                </div>
              </div>

              {/* Infrastructure Needs Selector */}
              <div className="mb-6">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  {t.hero.needLabel}
                </label>
                <div className="grid grid-cols-3 gap-1 p-1 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10">
                  <button onClick={() => setNeed('coworking')} className={`py-2 text-xs transition-all ${need==='coworking'?'seg-active':'seg-inactive'}`}>{t.hero.needCoworking}</button>
                  <button onClick={() => setNeed('fablab')}    className={`py-2 text-xs transition-all ${need==='fablab'   ?'seg-active':'seg-inactive'}`}>{t.hero.needFablab}</button>
                  <button onClick={() => setNeed('servers')}   className={`py-2 text-xs transition-all ${need==='servers'  ?'seg-active':'seg-inactive'}`}>{t.hero.needServers}</button>
                </div>
              </div>

              {/* Dynamic Output Box */}
              <div className="p-5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-500/30 text-center mb-6">
                <span className="text-[11px] text-emerald-700 dark:text-emerald-300/80 font-semibold uppercase tracking-wider block">
                  {t.hero.grantEstimateLabel}
                </span>
                <p className="text-2xl font-black text-emerald-700 dark:text-emerald-300 mt-1 tracking-tight">
                  {getGrantRange()}
                </p>
                <span className="text-[11px] text-emerald-600/70 dark:text-slate-400 block mt-1">
                  {t.hero.grantEstimateSub}
                </span>
              </div>

              <button
                onClick={handleApplyClick}
                className="w-full py-3.5 text-xs font-bold btn-emerald text-center flex items-center justify-center gap-2"
              >
                <span>{t.hero.applyBtn}</span>
              </button>
            </div>
          </div>

        </div>

        {/* "QANDAY ISHLAYDI" SECTION (3-Step Progression) */}
        <div className="mt-24 pt-16 border-t border-slate-200/60 dark:border-white/10">
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
