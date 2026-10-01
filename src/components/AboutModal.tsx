import React from 'react';
import { X, Building2, Cpu, Wrench, TrendingUp, Sparkles, MapPin, Rocket, ShieldCheck, Factory } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const AboutModal: React.FC = () => {
  const { isAboutModalOpen, setIsAboutModalOpen } = useApp();

  if (!isAboutModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto">
      <div 
        className="relative w-full max-w-4xl my-8 bg-white dark:bg-[#090D16] border border-slate-200 dark:border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="relative px-6 py-5 bg-gradient-to-r from-emerald-600 to-teal-700 dark:from-emerald-950/80 dark:to-slate-900 border-b border-emerald-500/20 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-xl font-bold">
              🏢
            </div>
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest px-2 py-0.5 rounded bg-white/10 border border-white/20">
                Rasmiy Ma'lumot
              </span>
              <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white mt-0.5">
                Technopark Haqida
              </h2>
            </div>
          </div>

          <button
            onClick={() => setIsAboutModalOpen(false)}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Yopish"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-6 sm:p-8 space-y-8 overflow-y-auto scrollbar-thin text-slate-800 dark:text-slate-200 text-sm">

          {/* SECTION 1: Ilmiy-innovatsion va Yoshlar texnoparklari */}
          <div className="bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-white/10 rounded-2xl p-6 space-y-5">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                  Davlat Infratuzilmasi
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mt-0.5">
                  1. Ilmiy-innovatsion va Yoshlar texnoparklari (Qarshi va Yashnobod)
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1">
                  O‘zbekiston Respublikasi Oliy ta’lim, fan va innovatsiyalar vazirligi huzuridagi Innovatsion rivojlanish agentligi tarmog‘i hisoblanadi.
                </p>
              </div>
            </div>

            {/* Asosiy Maqsad */}
            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-3 text-emerald-700 dark:text-emerald-300">
              <Sparkles className="w-5 h-5 shrink-0" />
              <div>
                <span className="font-bold">Asosiy maqsad:</span> Yoshlarning innovatsion g‘oyalari, ilmiy ishlanmalari va startap loyihalarini har taraflama qo‘llab-quvvatlash.
              </div>
            </div>

            {/* Mavjud Infratuzilma Grid */}
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-3">
                <Wrench className="w-4 h-4 text-emerald-500" /> Mavjud Infratuzilma:
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="p-3.5 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-white/10">
                  <div className="font-bold text-slate-900 dark:text-white mb-1 flex items-center gap-1.5">
                    <span>🖨️</span> FabLab ustaxonalari
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    3D printerlar, lazerli kesish uskunalari, CNC frezer stanoklari va mikrotizimlar prototiplash bazasi.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-white/10">
                  <div className="font-bold text-slate-900 dark:text-white mb-1 flex items-center gap-1.5">
                    <span>💻</span> Coworking zonasi
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Rezidentlar, jamoalar va dasturchilar uchun 24/7 zamonaviy ish maydonlari.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-white/10">
                  <div className="font-bold text-slate-900 dark:text-white mb-1 flex items-center gap-1.5">
                    <span>🚀</span> Inkubatsiya & Akseleratsiya
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Ideaton va Hackathon tanlovlari, loyihalarni shakllantirish va pitch-deck tayyorlash.
                  </p>
                </div>
              </div>
            </div>

            {/* Rezidentlik Imtiyozlari */}
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-3">
                <ShieldCheck className="w-4 h-4 text-amber-500" /> Rezidentlik imtiyozlari:
              </h4>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                  <span className="text-emerald-500 font-bold">✓</span>
                  <span><strong>Soliq imtiyozlari:</strong> Maqomga ega bo‘lgan startaplar foyda solig‘i, mol-mulk va yer solig‘idan to‘liq ozod etiladi.</span>
                </li>
                <li className="flex items-start gap-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                  <span className="text-emerald-500 font-bold">✓</span>
                  <span><strong>Laboratoriya imtiyozlari:</strong> Laboratoriya va zamonaviy uskunalardan imtiyozli foydalanish huquqi beriladi.</span>
                </li>
                <li className="flex items-start gap-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                  <span className="text-emerald-500 font-bold">✓</span>
                  <span><strong>Investitsiya ko'maki:</strong> Davlat grantlari hamda venchur jamg‘armalardan investitsiya jalb qilishda ko‘maklashiladi.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* SECTION 2: Sanoat va Ishlab chiqarish Texnoparki */}
          <div className="bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-white/10 rounded-2xl p-6 space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
                <Factory className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  Sanoat Klasteri
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mt-0.5">
                  2. Sanoat va Ishlab chiqarish Texnoparki («TEXNOPARK» MCHJ)
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-rose-500 shrink-0" />
                  <strong>Manzil:</strong> Toshkent shahri, Yashnobod tumani, Elbek ko‘chasi, 61.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 text-xs sm:text-sm text-slate-700 dark:text-slate-200">
              <strong>Yo‘nalishi:</strong> Yuqori texnologiyali maishiy texnika (muzlatgichlar, konditsionerlar, gaz plitalari), elektron hisoblagichlar, liftlar va sanoat uskunalarini ishlab chiqarishga ixtisoslashgan yirik sanoat klasteri.
            </div>
          </div>

          {/* SECTION 3: Missiya, Laboratoriyalar va Statistika */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 space-y-2">
              <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold">
                <Rocket className="w-5 h-5" /> Missiya
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Yoshlar innovatsion g‘oyalarini MVP (minimal hayotiylik mahsuloti) darajasiga olib chiqish va tijoratishtirish.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-purple-500/10 border border-purple-500/20 space-y-2">
              <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 font-bold">
                <Cpu className="w-5 h-5" /> Laboratoriyalar
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Robototexnika, Sun’iy intellekt (AI), Biotexnologiya va Dasturiy injiniring laboratoriyalari.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/20 space-y-2">
              <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-bold">
                <TrendingUp className="w-5 h-5" /> Statistika
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Faol rezident kompaniyalar soni, yaratilgan yangi ish o‘rinlari hamda jalb etilgan grant mablag‘lari hajmi.
              </p>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-100 dark:bg-slate-900/90 border-t border-slate-200 dark:border-white/10 flex justify-end shrink-0">
          <button
            onClick={() => setIsAboutModalOpen(false)}
            className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition-all shadow-sm"
          >
            Tushunarli / Yopish
          </button>
        </div>

      </div>
    </div>
  );
};

export default AboutModal;
