import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import { Star } from 'lucide-react';

export const StartupGrid: React.FC = () => {
  const { currentUser } = useAuth();
  const { 
    startups, 
    toggleLikeStartup, 
    rateStartup,
    selectedCategory, 
    setSelectedCategory, 
    searchQuery, 
    setSearchQuery,
    t,
    setIsAuthModalOpen,
    setIsAddStartupModalOpen,
    setActiveChatStartup
  } = useApp();

  const [activeTab, setActiveTab] = useState<'all' | 'topRated' | 'featured'>('all');

  const categories = ['All', 'AI & ML', 'Hardware', 'FinTech', 'EdTech', 'GreenTech', 'E-commerce'];

  let filtered = startups.filter(s => {
    const matchesCat = selectedCategory === 'All' || selectedCategory === 'Barchasi' || s.category === selectedCategory;
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          s.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          s.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  // Sorting logic
  if (activeTab === 'topRated') {
    filtered = [...filtered].sort((a, b) => (b.averageRating || 0) - (a.averageRating || 0));
  } else if (activeTab === 'featured') {
    filtered = [...filtered].sort((a, b) => (b.likesCount || 0) - (a.likesCount || 0));
  } else {
    // Newest first
    filtered = [...filtered].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  const handleAddProject = () => {
    if (currentUser) {
      setIsAddStartupModalOpen(true);
    } else {
      setIsAuthModalOpen(true);
    }
  };

  const handleUpvote = (startupId: string) => {
    if (!currentUser) {
      setIsAuthModalOpen(true);
      return;
    }
    toggleLikeStartup(startupId, currentUser.uid);
  };

  const handleRate = (startupId: string, score: number) => {
    if (!currentUser) {
      setIsAuthModalOpen(true);
      return;
    }
    rateStartup(startupId, currentUser.uid, score);
  };

  const handleMessage = (stp: any) => {
    if (!currentUser) {
      setIsAuthModalOpen(true);
      return;
    }
    setActiveChatStartup(stp);
  };

  return (
    <section id="startups" className="w-full flex justify-center py-24 border-b border-slate-200/60 dark:border-white/10">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10" data-animate>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 mb-2 block">
            {t.startups.badge}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
            {t.startups.title}
          </h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
            {t.startups.subtext}
          </p>
        </div>

        {/* Filters & Search Header */}
        <div className="flex flex-col items-center gap-5 mb-10 pb-6 border-b border-slate-200/60 dark:border-white/10">
          
          {/* Category Filter Pills */}
          <div className="flex items-center justify-center gap-2 overflow-x-auto w-full scrollbar-none py-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 text-xs transition-all whitespace-nowrap ${
                  (selectedCategory === cat || (cat === 'All' && selectedCategory === 'Barchasi')) ? 'seg-active' : 'seg-inactive'
                }`}
              >
                {cat === 'All' ? t.startups.allTab : cat}
              </button>
            ))}
          </div>

          {/* Search & Tab Switcher */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-2xl mx-auto">
            <input
              type="text"
              placeholder={t.startups.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-4 py-2 text-xs glass-input-emerald w-full sm:w-80"
            />

            <div className="flex items-center p-1 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 shrink-0">
              <button onClick={() => setActiveTab('all')}      className={`px-3 py-1.5 text-xs transition-colors ${ activeTab==='all'      ?'seg-active':'seg-inactive'}`}>Barchasi</button>
              <button onClick={() => setActiveTab('topRated')} className={`px-3 py-1.5 text-xs transition-colors ${ activeTab==='topRated' ?'seg-active':'seg-inactive'}`}>★ Top Reyting</button>
              <button onClick={() => setActiveTab('featured')} className={`px-3 py-1.5 text-xs transition-colors ${ activeTab==='featured' ?'seg-active':'seg-inactive'}`}>Eng Ommabop</button>
            </div>
          </div>

        </div>

        {/* Startups Cards Grid */}
        {filtered.length === 0 ? (
          <div className="glass-surface p-12 text-center rounded-2xl max-w-xl mx-auto">
            <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto mb-4 font-bold text-lg">
              🚀
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
              Hali startaplar mavjud emas
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
              Platformaga birinchi bo'lib o'z IT va innovatsion loyihangizni joylashtiring hamda rezidentlik imkoniyatlaridan foydalaning!
            </p>
            <button
              onClick={handleAddProject}
              className="px-6 py-2.5 text-xs font-bold btn-emerald"
            >
              + Yangi Startap Qo'shish
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((stp) => {
              const hasVoted = currentUser ? stp.likes.includes(currentUser.uid) : false;
              const userRating = (currentUser && stp.ratings) ? stp.ratings[currentUser.uid] : 0;
              const founderDisplayName = stp.founderNickname ? `@${stp.founderNickname}` : stp.founderName;
              // Founder cannot rate their own startup
              const isOwner = currentUser && (
                stp.founderId === currentUser.uid ||
                stp.founderEmail === currentUser.email ||
                (currentUser.nickname && stp.founderNickname === currentUser.nickname)
              );

              return (
                <div
                  key={stp.id}
                  className="card p-6 flex flex-col justify-between relative"
                >
                  <div>
                    {/* Header Row: Image, Name, Upvote */}
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div className="flex items-center gap-3">
                        <img 
                          src={stp.imageUrl} 
                          alt={stp.name} 
                          className="w-12 h-12 rounded-xl object-cover border border-slate-200 dark:border-white/10"
                        />
                        <div>
                          <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                            {stp.name}
                          </h3>
                          <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                            {stp.category} • {stp.stage}
                          </span>
                        </div>
                      </div>

                      {/* Upvote Button */}
                      <button
                        onClick={() => handleUpvote(stp.id)}
                        className={`flex flex-col items-center justify-center px-3 py-1.5 rounded-xl border transition-all ${
                          hasVoted 
                            ? 'bg-emerald-600 dark:bg-emerald-500 text-white dark:text-slate-950 border-emerald-600 dark:border-emerald-400 shadow-xs font-bold' 
                            : 'bg-slate-100/80 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:border-emerald-500/40'
                        }`}
                        title="Ovoz berish (Upvote)"
                      >
                        <svg className="w-3.5 h-3.5 fill-current mb-0.5" viewBox="0 0 24 24"><path d="M12 4l-8 8h16l-8-8z"/></svg>
                        <span className="text-xs font-extrabold">{stp.likesCount}</span>
                      </button>
                    </div>

                    <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 mb-2">
                      {stp.tagline}
                    </p>

                    <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed mb-5">
                      {stp.description}
                    </p>

                    {/* 1 TO 5 STAR / POINTS RATING BAR */}
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200/60 dark:border-white/10 mb-5">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                          <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                          <span>{stp.averageRating ? `★ ${stp.averageRating} / 5.0` : 'Baholanmagan'}</span>
                          <span className="text-[10px] text-slate-400 font-normal">({stp.ratingCount || 0} baholar)</span>
                        </span>
                        {userRating > 0 && (
                          <span className="text-[10px] font-extrabold text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">
                            Siz: {userRating} ball
                          </span>
                        )}
                      </div>

                      {/* 1 to 5 Score Buttons — hidden for the startup's own founder */}
                      {isOwner ? (
                        <div className="text-center text-[11px] text-slate-400 dark:text-slate-500 py-1">
                          Siz o'z startapingizni baholay olmaysiz
                        </div>
                      ) : (
                        <div className="flex items-center justify-between gap-1">
                          {[1, 2, 3, 4, 5].map((score) => (
                            <button
                              key={score}
                              onClick={() => handleRate(stp.id, score)}
                              className={`flex-1 py-1 text-[11px] font-bold rounded-md transition-all ${
                                userRating === score
                                  ? 'bg-amber-500 text-white shadow-xs'
                                  : 'bg-white dark:bg-white/10 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:bg-amber-500/20 hover:border-amber-400'
                              }`}
                              title={`${score} ball berish`}
                            >
                              {score}★
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Footer Row: Founder Nickname & Chat */}
                  <div className="pt-4 border-t border-slate-200/60 dark:border-white/10 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                    <span className="truncate">
                      {t.startups.founderLabel} <strong className="text-slate-900 dark:text-white font-bold">{founderDisplayName}</strong>
                    </span>
                    
                    <button
                      onClick={() => handleMessage(stp)}
                      className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 transition-colors"
                    >
                      {t.startups.chatBtn}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};

