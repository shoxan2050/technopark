import React from 'react';
import { Award } from 'lucide-react';

interface TeamMember {
  name: string;
  role: string;
  organization: string;
  avatar: string;
  bio: string;
  linkedin: string;
}

export const TeamSection: React.FC = () => {
  const team: TeamMember[] = [
    {
      name: 'Farhod Ibragimov',
      role: 'Bosh Direktor (CEO)',
      organization: 'Technopark Directorate',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400',
      bio: 'Venchur va ekotizimni rivojlantirish bo\'yicha 15 yillik tajribaga ega strategik rahbar.',
      linkedin: 'https://linkedin.com'
    },
    {
      name: 'Elena Smirnova',
      role: 'Inkubatsiya Dasturi Rahbari',
      organization: 'Silicon Valley Ex-Google',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
      bio: '50 dan ortiq muvaffaqiyatli IT-startaplarni akseleratsiya va investitsiyaga olib chiqqan loyiha direktori.',
      linkedin: 'https://linkedin.com'
    },
    {
      name: 'Sherzod Shermatov',
      role: 'Texnik Direktor (CTO)',
      organization: 'Cloud & AI Infrastructure',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400',
      bio: 'Katta hajmli taqsimlangan tizimlar va Sun\'iy intellekt arxitekturasi bo\'yicha bosh muhandis.',
      linkedin: 'https://linkedin.com'
    },
    {
      name: 'Jamshid Ismatullayev',
      role: 'Bosh Mentor & Venchur Hamkor',
      organization: 'UzVC Fund Partner',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
      bio: 'Startaplarga birinchi bosqich investitsiyalari va xalqaro hamkorlik bo\'yicha maslahatchi.',
      linkedin: 'https://linkedin.com'
    }
  ];

  return (
    <section id="team" className="py-24 relative bg-slate-900/40 dark:bg-slate-950/60">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-bold mb-3">
            <Award className="w-3.5 h-3.5" />
            Rahbariyat va Bosh Mentorlar
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Tajribali <span className="text-gradient">Yetakchilar va Mentorlar</span>
          </h2>
          <p className="mt-4 text-slate-600 dark:text-slate-400 text-base sm:text-lg">
            Sizning startapingizga xalqaro standartlar asosida yo'nalish beruvchi ekspertlar jamoasi.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member, idx) => (
            <div 
              key={idx}
              className="glass-card rounded-2xl overflow-hidden border border-slate-200/60 dark:border-slate-800/80 hover:border-cyan-500/50 transition-all duration-300 group hover:-translate-y-1.5"
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={member.avatar} 
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
                  <span className="text-[10px] font-extrabold tracking-wider px-2.5 py-1 rounded-md bg-cyan-500/20 text-cyan-300 backdrop-blur-md border border-cyan-500/30">
                    {member.organization}
                  </span>
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-lg bg-slate-900/80 text-white hover:bg-cyan-500 hover:text-slate-950 transition-colors"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.74a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2z"/></svg>
                  </a>
                </div>
              </div>

              <div className="p-5">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-cyan-400 transition-colors">
                  {member.name}
                </h3>
                <p className="text-xs font-semibold text-cyan-500 mt-0.5 mb-2">
                  {member.role}
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                  {member.bio}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
