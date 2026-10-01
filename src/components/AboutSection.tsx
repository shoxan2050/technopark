import React from 'react';
import { Cpu, Layers, Network, Zap, CheckCircle2 } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const features = [
    {
      icon: Cpu,
      title: 'FabLab va Prototiplash',
      description: 'Eng so\'nggi 3D-printerlar, lazer to\'sarlar va mikrosxema laboratoriyalari bilan jihozlangan prototip yaratish maydoni.',
      color: 'from-cyan-500 to-blue-500',
      badge: 'Hardware & Robotics'
    },
    {
      icon: Layers,
      title: 'Inkubatsiya va Akseleratsiya',
      description: 'Loyiha g\'oyasidan birinchi sotuvgacha bo\'lgan 3 oylik intensiv va 1-on-1 mentorlik dasturlari.',
      color: 'from-blue-500 to-emerald-500',
      badge: 'Mentorship'
    },
    {
      icon: Network,
      title: 'Xalqaro Venchur Tarmoq',
      description: 'Silikon Vodiysi, Yevropa hamda BAA fondlari va farishta-investorlar (Angel Investors) bilan to\'g\'ridan-to\'g\'ri aloqalar.',
      color: 'from-emerald-500 to-purple-500',
      badge: 'Venture Capital'
    },
    {
      icon: Zap,
      title: 'Smart Co-working 24/7',
      description: 'Yuqori tezlikdagi optik internet, rezidentlar uchun dam olish zonalari, konferens zallar va soliq imtiyozlari.',
      color: 'from-purple-500 to-pink-500',
      badge: 'Infrastructure'
    }
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-extrabold uppercase tracking-widest text-cyan-400 mb-3">
            Ekotizim & Infratuzilma
          </h2>
          <p className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Nega Aynan <span className="text-gradient">Technopark?</span>
          </p>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-400">
            Biz shunchaki ish o'rni emas, balki startapingizni dunyo darajasida o'sishi uchun barcha zaruriy texnologik va huquqiy sharoitlarni taqdim etamiz.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((item, idx) => {
            const IconComp = item.icon;
            return (
              <div 
                key={idx}
                className="glass-card p-8 rounded-3xl border border-slate-200/60 dark:border-slate-800/80 hover:border-cyan-500/50 transition-all duration-300 group hover:-translate-y-1"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${item.color} p-0.5 shadow-lg`}>
                    <div className="w-full h-full bg-slate-900 rounded-[14px] flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                      <IconComp className="w-7 h-7 text-cyan-400" />
                    </div>
                  </div>
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                    {item.badge}
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-cyan-400 transition-colors">
                  {item.title}
                </h3>
                
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                  {item.description}
                </p>

                <div className="pt-4 border-t border-slate-200/40 dark:border-slate-800/60 flex items-center gap-2 text-xs font-semibold text-cyan-500">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Rezidentlar uchun 100% soliq va bojxona imtiyozlari</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
