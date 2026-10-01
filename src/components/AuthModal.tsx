import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, setIsAuthModalOpen } = useApp();
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();

  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  
  // Optional socials during signup
  const [telegram, setTelegram] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [github, setGithub] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isAuthModalOpen) return null;

  // File upload handler for avatar picture (converts image to Base64 data URL)
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (isSignUp) {
        if (!name || !phone || !email || !password) {
          throw new Error("Iltimos, barcha majburiy maydonlarni to'ldiring");
        }
        await signUp(
          name, 
          phone, 
          email, 
          password, 
          nickname.trim(), 
          avatarUrl.trim(),
          { telegram, linkedin, github }
        );
      } else {
        if (!email || !password) {
          throw new Error("Email va parolni kiriting");
        }
        await signIn(email, password);
      }
      setIsAuthModalOpen(false);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || "Xatolik yuz berdi");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-150">
      <div className="relative w-full max-w-md glass-surface rounded-2xl p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={() => setIsAuthModalOpen(false)}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
        >
          ✕
        </button>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 p-1 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 mb-6">
          <button
            type="button"
            onClick={() => { setIsSignUp(false); setError(null); }}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
              !isSignUp
                ? 'bg-emerald-600 dark:bg-emerald-500 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Kirish
          </button>
          <button
            type="button"
            onClick={() => { setIsSignUp(true); setError(null); }}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
              isSignUp
                ? 'bg-emerald-600 dark:bg-emerald-500 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Ro'yxatdan o'tish
          </button>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {isSignUp ? "Yangi Hisob Yaratish" : "Tizimga Kirish"}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {isSignUp ? "Technopark rezidentlik va startap hamjamiyatiga ulaning" : "Shaxsiy kabinetingizga xush kelibsiz"}
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 text-xs font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <>
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Ism va Familiya *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Alisher Qodirov"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 glass-input-emerald text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Nickname (Ixtiyoriy, masalan: @alisher_dev)
                </label>
                <input
                  type="text"
                  placeholder="alisher_dev"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  className="w-full px-3.5 py-2.5 glass-input-emerald text-xs"
                />
                <span className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 block">
                  Agar ko'rsatilsa, startaplar yonida ismingiz o'rniga nickname chiqadi
                </span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Telefon Raqam *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+998 90 123 45 67"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 glass-input-emerald text-xs"
                />
              </div>

              {/* Profile Avatar Upload Field */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Profil Rasmi (Ixtiyoriy fayl yoki URL)
                </label>
                <div className="flex items-center gap-3">
                  {avatarUrl && (
                    <img 
                      src={avatarUrl} 
                      alt="Avatar preview" 
                      className="w-10 h-10 rounded-full object-cover border border-slate-200 dark:border-white/20 shrink-0" 
                    />
                  )}
                  <div className="flex-1 space-y-2">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarFileUpload}
                      className="text-xs text-slate-500 dark:text-slate-400 file:mr-2 file:py-1 file:px-2.5 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-slate-100 dark:file:bg-white/10 file:text-slate-800 dark:file:text-white hover:file:bg-slate-200"
                    />
                    <input
                      type="url"
                      placeholder="Yoki rasmiy Rasm URL manzilini kiriting..."
                      value={avatarUrl}
                      onChange={(e) => setAvatarUrl(e.target.value)}
                      className="w-full px-3 py-1.5 glass-input-emerald text-[11px]"
                    />
                  </div>
                </div>
              </div>

              {/* Optional Social Links */}
              <div className="pt-2 border-t border-slate-200/60 dark:border-white/10">
                <span className="text-[11px] font-bold text-slate-600 dark:text-slate-400 block mb-2">
                  Ijtimoiy Tarmoqlar (Ixtiyoriy)
                </span>
                <div className="grid grid-cols-3 gap-2">
                  <input
                    type="text"
                    placeholder="Telegram username"
                    value={telegram}
                    onChange={(e) => setTelegram(e.target.value)}
                    className="px-3 py-1.5 glass-input-emerald text-xs"
                  />
                  <input
                    type="url"
                    placeholder="LinkedIn URL"
                    value={linkedin}
                    onChange={(e) => setLinkedin(e.target.value)}
                    className="px-3 py-1.5 glass-input-emerald text-xs"
                  />
                  <input
                    type="url"
                    placeholder="GitHub URL"
                    value={github}
                    onChange={(e) => setGithub(e.target.value)}
                    className="px-3 py-1.5 glass-input-emerald text-xs"
                  />
                </div>
              </div>
            </>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Email Manzil *
            </label>
            <input
              type="email"
              required
              placeholder="email@technopark.uz"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3.5 py-2.5 glass-input-emerald text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Parol *
            </label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3.5 py-2.5 glass-input-emerald text-xs"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-3 py-3 rounded-xl text-xs font-bold btn-emerald disabled:opacity-50"
          >
            {loading ? "Jarayonda..." : isSignUp ? "Ro'yxatdan o'tish" : "Tizimga kirish"}
          </button>
        </form>

      </div>
    </div>
  );
};

