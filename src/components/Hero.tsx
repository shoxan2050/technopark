import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';

export const Hero: React.FC = () => {
  const { currentUser } = useAuth();
  const { t, setIsAuthModalOpen, setIsAddStartupModalOpen } = useApp();

  const [stage, setStage] = useState<'idea' | 'mvp' | 'growth'>('mvp');
  const [need, setNeed] = useState<'coworking' | 'fablab' | 'servers'>('fablab');

  const getGrantRange = () => {
    if (stage === 'idea') {
      return need === 'coworking' ? '$5,000 – $15,000' : '$10,000 – $25,000';
    } else if (stage === 'mvp') {
      return need === 'servers' ? '$25,000 – $50,000' : '$20,000 – $40,000';
    } else {
      return '$50,000 – $100,000';
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

  const stageBtn = (key: typeof stage, label: string) => (
    <button
      onClick={() => setStage(key)}
      className={`flex-1 py-2 px-1 text-xs font-semibold rounded-lg transition-all ${
        stage === key
          ? 'bg-emerald-600 text-white shadow dark:bg-emerald-500'
          : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5'
      }`}
    >
      {label}
    </button>
  );

  const needBtn = (key: typeof need, label: string) => (
    <button
      onClick={() => setNeed(key)}
      className={`flex-1 py-2 px-1 text-xs font-semibold rounded-lg transition-all ${
        need === key
          ? 'bg-emerald-600 text-white shadow dark:bg-emerald-500'
          : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5'
      }`}
    >
      {label}
    </button>
  );

  return (
    <section
      id="hero"
      className="relative w-full min-h-[85vh] flex items-center justify-center py-12 overflow-hidden bg-cover bg-center border-b border-white/10"
      style={{
        backgroundImage: `linear-gradient(to right, rgba(7,11,17,0.93) 20%, rgba(7,11,17,0.78) 60%, rgba(7,11,17,0.60) 100%), url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2000&q=80')`
      }}
    >
      {/* Bottom fade-out */}
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#070B11] to-transparent pointer-events-none" />

      {/* MAIN CONTAINER */}
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">

          {/* ── LEFT: Headline & CTA (7 cols) ── */}
          <div className="lg:col-span-7 flex flex-col justify-center" data-animate="left">

            {/* Trust badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-6 w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
              {t.hero.badge}
            </div>

            {/* H1 */}
            <h1 className="text-4xl sm:text-5xl lg:text-[3.4rem] font-black tracking-tight text-white leading-[1.13]">
              {t.hero.title}
            </h1>

            {/* Subtext */}
            <p className="mt-5 text-base sm:text-lg text-slate-300 leading-relaxed max-w-lg">
              {t.hero.subtext}
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
              <button
                onClick={handleApplyClick}
                className="w-full sm:w-auto px-7 py-3.5 text-sm font-bold btn-emerald pulse-glow rounded-xl shadow-lg"
              >
                {t.hero.ctaAdd}
              </button>
              <button
                onClick={scrollToInfrastructure}
                className="w-full sm:w-auto px-7 py-3.5 text-sm font-semibold rounded-xl border border-white/20 text-white bg-white/5 hover:bg-white/10 transition-all"
              >
                {t.hero.ctaInfra}
              </button>
            </div>

            {/* Trust row */}
            <div className="mt-10 pt-6 border-t border-white/10 flex flex-wrap items-center gap-6 text-xs font-semibold text-slate-300">
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                {t.hero.trust1}
              </span>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                {t.hero.trust2}
              </span>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                {t.hero.trust3}
              </span>
            </div>
          </div>

          {/* ── RIGHT: Compact Calculator Card (5 cols) ── */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end" data-animate="right">
            <div className="w-full max-w-sm bg-[#0D1420]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-2xl">

              {/* Card header */}
              <div className="flex items-center justify-between mb-5 pb-4 border-b border-white/8">
                <div>
                  <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest mb-0.5">
                    Technopark Residency
                  </p>
                  <h3 className="text-sm font-extrabold text-white leading-tight">
                    {t.hero.calcTitle}
                  </h3>
                </div>
                {/* Live pulse badge */}
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-[10px] font-bold shrink-0">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
                  </span>
                  {t.hero.calcBadge}
                </div>
              </div>

              {/* Stage selector */}
              <div className="mb-4">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2">
                  {t.hero.stageLabel}
                </p>
                <div className="flex gap-1 p-1 rounded-xl bg-white/5 border border-white/8">
                  {stageBtn('idea', t.hero.stageIdea)}
                  {stageBtn('mvp', t.hero.stageMVP)}
                  {stageBtn('growth', t.hero.stageGrowth)}
                </div>
              </div>

              {/* Need selector */}
              <div className="mb-4">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2">
                  {t.hero.needLabel}
                </p>
                <div className="flex gap-1 p-1 rounded-xl bg-white/5 border border-white/8">
                  {needBtn('coworking', t.hero.needCoworking)}
                  {needBtn('fablab', t.hero.needFablab)}
                  {needBtn('servers', t.hero.needServers)}
                </div>
              </div>

              {/* Grant output */}
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-center mb-4">
                <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider mb-1">
                  {t.hero.grantEstimateLabel}
                </p>
                <p className="text-2xl font-black text-emerald-400 tracking-tight">
                  {getGrantRange()}
                </p>
                <p className="text-[10px] text-slate-500 mt-1">
                  {t.hero.grantEstimateSub}
                </p>
              </div>

              {/* Apply CTA */}
              <button
                onClick={handleApplyClick}
                className="w-full py-3 text-sm font-extrabold btn-emerald rounded-xl flex items-center justify-center gap-2 shadow-lg"
              >
                <span>{t.hero.applyBtn}</span>
                <span>→</span>
              </button>
            </div>
          </div>

        </div>

        {/* ── 3-Step "How It Works" ── */}
        <div className="mt-20 pt-14 border-t border-white/10">
          <div className="text-center max-w-xl mx-auto mb-10" data-animate>
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest block mb-1">
              {t.hero.stepsBadge}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              {t.hero.stepsTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { n: '01', title: t.hero.step1Title, desc: t.hero.step1Desc, delay: '100' },
              { n: '02', title: t.hero.step2Title, desc: t.hero.step2Desc, delay: '250' },
              { n: '03', title: t.hero.step3Title, desc: t.hero.step3Desc, delay: '400' },
            ].map(step => (
              <div
                key={step.n}
                className="p-5 rounded-2xl bg-white/5 border border-white/8 backdrop-blur-sm"
                data-animate
                data-delay={step.delay}
              >
                <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 font-extrabold flex items-center justify-center text-xs mb-3">
                  {step.n}
                </div>
                <h3 className="text-sm font-bold text-white mb-1.5">{step.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
