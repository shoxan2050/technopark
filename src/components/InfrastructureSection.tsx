import React from 'react';
import { useApp } from '../context/AppContext';

export const InfrastructureSection: React.FC = () => {
  const { t } = useApp();

  const blocks = [
    {
      title: t.infra.b1Title,
      tag: 'Infratuzilma',
      description: t.infra.b1Desc,
      highlights: ['24/7 Bino Kirish Huquqi', 'Smart Konferens Zallar', 'Erkin Ish Hududlari']
    },
    {
      title: t.infra.b2Title,
      tag: 'Hardware & Prototyping',
      description: t.infra.b2Desc,
      highlights: ['3D Sanoat Printerlari', 'CNC Stanoklar', 'Mikroelektronika Stendlari']
    },
    {
      title: t.infra.b3Title,
      tag: 'Software & Cloud',
      description: t.infra.b3Desc,
      highlights: ['GPU Server Klasteri', 'Cloud Sandbox', 'Kiberxavfsizlik Stend']
    },
    {
      title: t.infra.b4Title,
      tag: 'Venture & Growth',
      description: t.infra.b4Desc,
      highlights: ['1-on-1 Ekspert Mentorlik', 'UzVC Fund Aloqalari', 'Pitching Master-klasslar']
    }
  ];

  return (
    <section id="infrastructure" className="w-full flex justify-center py-24 border-b border-slate-200/20 dark:border-white/10">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16" data-animate>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 mb-2 block">
            {t.infra.badge}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
            {t.infra.title}
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            {t.infra.subtext}
          </p>
        </div>

        {/* 4 Infrastructure Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {blocks.map((b, idx) => (
            <div 
              key={idx}
              className="glass-surface p-8 flex flex-col justify-between group card-hover"
              data-animate
              data-delay={String(idx * 150)}
            >
              <div>
                <span className="inline-block text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded badge-emerald mb-4">
                  {b.tag}
                </span>

                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                  {b.title}
                </h3>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                  {b.description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200/60 dark:border-white/10 flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                {b.highlights.map((h, hIdx) => (
                  <span key={hIdx} className="flex items-center gap-1.5 font-medium text-slate-700 dark:text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                    {h}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Residency Requirements & Tax Incentives Block */}
        <div className="glass-surface p-8 sm:p-10 rounded-2xl border border-emerald-500/30 bg-emerald-50/50 dark:bg-emerald-950/20" data-animate>
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div>
              <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider block mb-1">
                {t.infra.taxBadge}
              </span>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                {t.infra.taxTitle}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 max-w-2xl leading-relaxed">
                {t.infra.taxDesc}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full lg:w-auto">
              <div className="px-5 py-3 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-center shadow-2xs">
                <span className="text-lg font-extrabold text-slate-900 dark:text-white block">0%</span>
                <span className="text-[10px] font-medium text-slate-500 dark:text-slate-400">Daromad va Foyda Solig'i</span>
              </div>
              <div className="px-5 py-3 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-center shadow-2xs">
                <span className="text-lg font-extrabold text-slate-900 dark:text-white block">0%</span>
                <span className="text-[10px] font-medium text-slate-500 dark:text-slate-400">Bojxona Bojlari</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
