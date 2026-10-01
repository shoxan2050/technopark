import React from 'react';
import { X, Building2, Cpu, Wrench, TrendingUp, Sparkles, MapPin, Rocket, ShieldCheck, Factory, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const AboutModal: React.FC = () => {
  const { isAboutModalOpen, setIsAboutModalOpen, t } = useApp();

  if (!isAboutModalOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto"
      onClick={() => setIsAboutModalOpen(false)}
    >
      <div 
        className="relative w-full max-w-4xl my-auto bg-white dark:bg-[#090D16] border border-slate-200 dark:border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Modal Header */}
        <div className="relative px-6 py-5 bg-gradient-to-r from-emerald-600 via-teal-700 to-emerald-800 dark:from-emerald-950 dark:to-slate-900 border-b border-emerald-500/30 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-white/15 border border-white/25 flex items-center justify-center text-2xl shadow-inner shrink-0">
              🏢
            </div>
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-white/20 border border-white/30 text-emerald-100">
                Rasmiy Infratuzilma Ba’zasi
              </span>
              <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white mt-0.5">
                {t.nav.aboutUs} — Technopark Ekotizimi
              </h2>
            </div>
          </div>

          <button
            onClick={() => setIsAboutModalOpen(false)}
            className="p-2.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white transition-all border border-white/20"
            aria-label="Yopish"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Body with spacious padding */}
        <div className="p-6 sm:p-8 space-y-8 overflow-y-auto scrollbar-thin text-slate-800 dark:text-slate-200">

          {/* SECTION 1: Ilmiy-innovatsion va Yoshlar texnoparklari */}
          <div className="bg-slate-50 dark:bg-slate-900/70 border border-slate-200 dark:border-white/10 rounded-2xl p-6 space-y-6 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5">
                <Building2 className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                  Respublika Innovatsiya Tarmog‘i
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white leading-snug">
                  1. Ilmiy-innovatsion va Yoshlar texnoparklari (Qarshi va Toshkent/Yashnobod)
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed pt-1">
                  O‘zbekiston Respublikasi Oliy ta’lim, fan va innovatsiyalar vazirligi huzuridagi Innovatsion rivojlanish agentligi tarmog‘i hisoblanadi.
                </p>
              </div>
            </div>

            {/* Filiallar va Manzillar Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              <div className="p-4 rounded-xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-white/10 flex items-start gap-3">
                <MapPin className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm leading-relaxed">
                  <strong className="text-slate-900 dark:text-white block font-bold mb-0.5">Qarshi Filiali (Qashqadaryo):</strong>
                  Qashqadaryo viloyati, Qarshi shahri, Yoshlar Texnoparki zamonaviy binosi va prototiplash majmuasi.
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-white/10 flex items-start gap-3">
                <MapPin className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm leading-relaxed">
                  <strong className="text-slate-900 dark:text-white block font-bold mb-0.5">Toshkent Filiali (Yashnobod):</strong>
                  Toshkent shahri, Yashnobod tumani, Maxtumquli va Elbek ko‘chalari, «TEXNOPARK» klasteri.
                </div>
              </div>
            </div>

            {/* Asosiy Maqsad */}
            <div className="p-4 sm:p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 flex items-start sm:items-center gap-3.5 text-emerald-900 dark:text-emerald-200">
              <Sparkles className="w-6 h-6 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5 sm:mt-0" />
              <div className="text-sm leading-relaxed">
                <strong className="font-extrabold text-emerald-700 dark:text-emerald-300">Asosiy maqsad:</strong> Yoshlarning innovatsion g‘oyalari, ilmiy ishlanmalari va startap loyihalarini har taraflama qo‘llab-quvvatlash.
              </div>
            </div>

            {/* Mavjud Infratuzilma */}
            <div className="space-y-3">
              <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-2 text-base">
                <Wrench className="w-5 h-5 text-emerald-500" /> Mavjud Infratuzilma:
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-white/10 space-y-2">
                  <div className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
                    <span className="text-base">🖨️</span> FabLab ustaxonalari
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    3D printerlar, lazerli kesish uskunalari, CNC frezer stanoklari va mikrotizimlar prototiplash bazasi.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-white/10 space-y-2">
                  <div className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
                    <span className="text-base">💻</span> Coworking zonasi
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    Rezidentlar, jamoalar va dasturchilar uchun 24/7 ochiq zamonaviy ish va muloqot maydonlari.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-white/10 space-y-2">
                  <div className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
                    <span className="text-base">🚀</span> Inkubatsiya & Akseleratsiya
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    Ideaton va Hackathon tanlovlari, loyihalarni shakllantirish hamda pitch-deck tayyorlash dasturlari.
                  </p>
                </div>
              </div>
            </div>

            {/* Rezidentlik Imtiyozlari */}
            <div className="space-y-3 pt-2">
              <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-2 text-base">
                <ShieldCheck className="w-5 h-5 text-amber-500" /> Rezidentlik Imtiyozlari:
              </h4>
              <div className="space-y-2.5">
                <div className="flex items-start gap-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span><strong>Soliq Imtiyozlari:</strong> Maqomga ega bo‘lgan startaplar foyda solig‘i, mol-mulk va yer solig‘idan to‘liq ozod etiladi.</span>
                </div>
                <div className="flex items-start gap-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span><strong>Laboratoriya Imtiyozi:</strong> Zamonaviy laboratoriya va uskunalardan imtiyozli asosda foydalanish huquqi beriladi.</span>
                </div>
                <div className="flex items-start gap-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span><strong>Investitsiya Ko‘maki:</strong> Davlat grantlari hamda venchur jamg‘armalardan investitsiya jalb qilishda doimiy amaliy ko‘mak beriladi.</span>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 2: Sanoat va Ishlab chiqarish Texnoparki */}
          <div className="bg-slate-50 dark:bg-slate-900/70 border border-slate-200 dark:border-white/10 rounded-2xl p-6 space-y-4 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0 mt-0.5">
                <Factory className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  Sanoat Klasteri
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white leading-snug">
                  2. Sanoat va Ishlab chiqarish Texnoparki («TEXNOPARK» MCHJ)
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 flex items-center gap-1.5 pt-1">
                  <MapPin className="w-4 h-4 text-rose-500 shrink-0" />
                  <strong>Manzil:</strong> Toshkent shahri, Yashnobod tumani, Elbek ko‘chasi, 61.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
              <strong>Yo‘nalishi:</strong> Yuqori texnologiyali maishiy texnika (muzlatgichlar, konditsionerlar, gaz plitalari), elektron hisoblagichlar, liftlar va sanoat uskunalarini ishlab chiqarishga ixtisoslashgan yirik sanoat klasteri.
            </div>
          </div>

          {/* SECTION 3: Missiya, Laboratoriyalar va Statistika */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 space-y-2">
              <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-bold text-sm sm:text-base">
                <Rocket className="w-5 h-5" /> Missiya
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Yoshlar innovatsion g‘oyalarini MVP (minimal hayotiylik mahsuloti) darajasiga olib chiqish va tijoratlashtirish.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-purple-500/10 border border-purple-500/25 space-y-2">
              <div className="flex items-center gap-2 text-purple-700 dark:text-purple-400 font-bold text-sm sm:text-base">
                <Cpu className="w-5 h-5" /> Laboratoriyalar
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Robototexnika, Sun’iy intellekt (AI), Biotexnologiya va Dasturiy injiniring laboratoriyalari.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/25 space-y-2">
              <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 font-bold text-sm sm:text-base">
                <TrendingUp className="w-5 h-5" /> Statistika
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Faol rezident kompaniyalar soni, yaratilgan yangi ish o‘rinlari hamda jalb etilgan grant mablag‘lari hajmi.
              </p>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-100 dark:bg-slate-900/90 border-t border-slate-200 dark:border-white/10 flex justify-end shrink-0">
          <button
            onClick={() => setIsAboutModalOpen(false)}
            className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold transition-all shadow-sm shadow-emerald-600/20"
          >
            Tushunarli / Yopish
          </button>
        </div>

      </div>
    </div>
  );
};

export default AboutModal;
