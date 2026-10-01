import React from 'react';
import { useApp } from '../context/AppContext';

interface ExecutiveMember {
  name: string;
  title: string;
  division: string;
  image: string;
  linkedin: string;
}

export const LeadershipSection: React.FC = () => {
  const { t } = useApp();

  const leadership: ExecutiveMember[] = [
    {
      name: 'Farhod Ibragimov',
      title: 'Bosh Direktor (CEO)',
      division: 'Technopark Direksiyasi',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=600',
      linkedin: 'https://linkedin.com'
    },
    {
      name: 'Sherzod Shermatov',
      title: "R&D va Texnologiyalar Bo'yicha Direktor",
      division: 'Ilmiy-Ishlab Chiqarish Klasteri',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=600',
      linkedin: 'https://linkedin.com'
    },
    {
      name: 'Elena Smirnova',
      title: 'Investitsiya Kengashi Raisi',
      division: 'Venchur va Akseleratsiya Fondi',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600',
      linkedin: 'https://linkedin.com'
    }
  ];

  return (
    <section id="leadership" className="w-full flex justify-center py-24 border-b border-slate-200/20 dark:border-white/10">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16" data-animate>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 mb-2 block">
            {t.leadership.badge}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
            {t.leadership.title}
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            {t.leadership.subtext}
          </p>
        </div>

        {/* Executive Cards — unified card: photo on top, info below */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {leadership.map((member, idx) => (
            <div
              key={idx}
              className="leader-card group"
              data-animate
              data-delay={String(idx * 150)}
            >
              {/* Photo — full width, fixed height, bosh qism kesilmasin */}
              <div className="w-full h-72 overflow-hidden relative">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover object-top grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500 ease-out"
                />
                {/* Subtle bottom gradient only in dark */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 dark:opacity-60 transition-opacity" />
              </div>

              {/* Info */}
              <div className="p-6">
                <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest block mb-1">
                  {member.division}
                </span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {member.name}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5 mb-5">
                  {member.title}
                </p>
                <div className="border-t border-slate-200/80 dark:border-white/10 pt-4">
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                  >
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.74a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2z"/>
                    </svg>
                    {t.leadership.linkedin}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
