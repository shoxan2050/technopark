import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';

export const UserProfile: React.FC = () => {
  const { currentUser, updateProfileData } = useAuth();
  const { 
    isProfileOpen, 
    setIsProfileOpen, 
    startups, 
    deleteStartup, 
    setIsAddStartupModalOpen 
  } = useApp();

  if (!isProfileOpen || !currentUser) return null;

  const [displayName, setDisplayName] = useState(currentUser.displayName);
  const [nickname, setNickname] = useState(currentUser.nickname || '');
  const [phone, setPhone] = useState(currentUser.phone);
  const [avatarUrl, setAvatarUrl] = useState(currentUser.avatarUrl);
  const [bio, setBio] = useState(currentUser.bio);

  const [instagram, setInstagram] = useState(currentUser.socials?.instagram || '');
  const [linkedin, setLinkedin] = useState(currentUser.socials?.linkedin || '');
  const [telegram, setTelegram] = useState(currentUser.socials?.telegram || '');
  const [github, setGithub] = useState(currentUser.socials?.github || '');
  const [website, setWebsite] = useState(currentUser.socials?.website || '');

  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'info' | 'socials' | 'startups'>('info');

  const myStartups = startups.filter(s => 
    s.founderId === currentUser.uid || 
    s.founderEmail === currentUser.email || 
    s.founderName === currentUser.displayName ||
    (currentUser.nickname && s.founderNickname === currentUser.nickname)
  );

  const handleAvatarFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await updateProfileData({
        displayName,
        nickname: nickname.trim(),
        phone,
        avatarUrl,
        bio,
        socials: {
          instagram,
          linkedin,
          telegram,
          github,
          website
        }
      });
      alert("Profil ma'lumotlari muvaffaqiyatli saqlandi!");
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-150">
      <div className="relative w-full max-w-xl glass-surface rounded-2xl p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-6 border-b border-slate-200/60 dark:border-white/10">
          <div className="flex items-center gap-4">
            <img 
              src={avatarUrl || currentUser.avatarUrl} 
              alt="" 
              className="w-12 h-12 rounded-full object-cover border border-slate-200 dark:border-white/20 shadow-xs"
            />
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                  {currentUser.displayName}
                </h2>
                {currentUser.nickname && (
                  <span className="text-xs font-semibold px-2 py-0.5 rounded badge-emerald">
                    @{currentUser.nickname}
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {currentUser.email} • <span className="uppercase font-bold text-emerald-700 dark:text-emerald-400">{currentUser.role}</span>
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsProfileOpen(false)}
            className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-2 mt-6 p-1 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10">
          <button
            onClick={() => setActiveTab('info')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
              activeTab === 'info' ? 'bg-emerald-600 dark:bg-emerald-500 text-white shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Shaxsiy Ma'lumotlar
          </button>
          <button
            onClick={() => setActiveTab('socials')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
              activeTab === 'socials' ? 'bg-emerald-600 dark:bg-emerald-500 text-white shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Ijtimoiy Tarmoqlar
          </button>
          <button
            onClick={() => setActiveTab('startups')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
              activeTab === 'startups' ? 'bg-emerald-600 dark:bg-emerald-500 text-white shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Loyihalarim ({myStartups.length})
          </button>
        </div>

        {/* Content Form */}
        <form onSubmit={handleSaveProfile} className="mt-6">
          {activeTab === 'info' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  To'liq Ism
                </label>
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="w-full px-3.5 py-2.5 glass-input-emerald text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Nickname (Ixtiyoriy)
                </label>
                <input
                  type="text"
                  placeholder="masalan: bobur_dev"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  className="w-full px-3.5 py-2.5 glass-input-emerald text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Telefon Raqam
                </label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 glass-input-emerald text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Profil Rasmi (Fayl yuklash yoki URL)
                </label>
                <div className="flex items-center gap-3">
                  <img 
                    src={avatarUrl} 
                    alt="Avatar preview" 
                    className="w-10 h-10 rounded-full object-cover border border-slate-200 dark:border-white/20 shrink-0" 
                  />
                  <div className="flex-1 space-y-2">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarFileUpload}
                      className="text-xs text-slate-500 dark:text-slate-400 file:mr-2 file:py-1 file:px-2.5 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-slate-100 dark:file:bg-white/10 file:text-slate-800 dark:file:text-white hover:file:bg-slate-200"
                    />
                    <input
                      type="url"
                      placeholder="Rasm URL manzilini kiriting..."
                      value={avatarUrl}
                      onChange={(e) => setAvatarUrl(e.target.value)}
                      className="w-full px-3.5 py-1.5 glass-input-emerald text-xs"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Qisqacha Bio
                </label>
                <textarea
                  rows={3}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full px-3.5 py-2.5 glass-input-emerald text-xs"
                />
              </div>
            </div>
          )}

          {activeTab === 'socials' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  LinkedIn Profil URL
                </label>
                <input
                  type="url"
                  placeholder="https://linkedin.com/in/username"
                  value={linkedin}
                  onChange={(e) => setLinkedin(e.target.value)}
                  className="w-full px-3.5 py-2.5 glass-input-emerald text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Telegram Username / URL
                </label>
                <input
                  type="text"
                  placeholder="https://t.me/username yoki @username"
                  value={telegram}
                  onChange={(e) => setTelegram(e.target.value)}
                  className="w-full px-3.5 py-2.5 glass-input-emerald text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Instagram Profil
                </label>
                <input
                  type="url"
                  placeholder="https://instagram.com/username"
                  value={instagram}
                  onChange={(e) => setInstagram(e.target.value)}
                  className="w-full px-3.5 py-2.5 glass-input-emerald text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  GitHub Profil
                </label>
                <input
                  type="url"
                  placeholder="https://github.com/username"
                  value={github}
                  onChange={(e) => setGithub(e.target.value)}
                  className="w-full px-3.5 py-2.5 glass-input-emerald text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Veb-sayt URL
                </label>
                <input
                  type="url"
                  placeholder="https://mysite.uz"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  className="w-full px-3.5 py-2.5 glass-input-emerald text-xs"
                />
              </div>
            </div>
          )}

          {activeTab === 'startups' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold">Joylashtirilgan loyihalaringiz</span>
                <button
                  type="button"
                  onClick={() => { setIsProfileOpen(false); setIsAddStartupModalOpen(true); }}
                  className="px-3 py-1.5 text-xs font-bold btn-emerald"
                >
                  + Yangi Loyiha
                </button>
              </div>

              {myStartups.length === 0 ? (
                <div className="text-center py-8 border border-slate-200 dark:border-white/10 rounded-xl p-4 text-xs text-slate-500 dark:text-slate-400">
                  Hali loyihalar joylashtirilmagan. "+ Yangi Loyiha" tugmasini bosib startap qo'shing.
                </div>
              ) : (
                myStartups.map(stp => (
                  <div key={stp.id} className="flex items-center justify-between p-3.5 border border-slate-200 dark:border-white/10 rounded-xl bg-slate-50 dark:bg-white/5">
                    <div className="flex items-center gap-3">
                      <img src={stp.imageUrl} alt="" className="w-10 h-10 rounded-lg object-cover border border-slate-200 dark:border-white/10" />
                      <div>
                        <h4 className="text-xs font-bold text-slate-900 dark:text-white">{stp.name}</h4>
                        <span className="text-[10px] font-medium text-slate-500 dark:text-slate-400">
                          {stp.category} • {stp.likesCount} Ovoz {stp.averageRating ? `• ★ ${stp.averageRating}` : ''}
                        </span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => deleteStartup(stp.id)}
                      className="text-xs font-semibold text-rose-600 dark:text-rose-400 hover:text-rose-700 dark:hover:text-rose-300 px-2.5 py-1 rounded bg-rose-500/10 border border-rose-500/20"
                    >
                      O'chirish
                    </button>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab !== 'startups' && (
            <div className="mt-6 flex justify-end">
              <button
                type="submit"
                disabled={isSaving}
                className="px-6 py-2.5 rounded-xl text-xs font-bold btn-emerald"
              >
                {isSaving ? "Saqlanmoqda..." : "Profilni Saqlash"}
              </button>
            </div>
          )}
        </form>

      </div>
    </div>
  );
};

