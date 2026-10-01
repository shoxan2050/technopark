import React, { useState } from 'react';
import { X, Rocket, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import type { StartupCategory, StartupStage } from '../types';

export const AddStartupModal: React.FC = () => {
  const { currentUser } = useAuth();
  const { isAddStartupModalOpen, setIsAddStartupModalOpen, addStartup } = useApp();

  const [name, setName] = useState('');
  const [tagline, setTagline] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<StartupCategory>('FinTech');
  const [stage, setStage] = useState<StartupStage>('MVP');
  const [imageUrl, setImageUrl] = useState('');
  const [pitchDeckUrl, setPitchDeckUrl] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isAddStartupModalOpen || !currentUser) return null;

  const categories: StartupCategory[] = [
    'FinTech', 'AI & ML', 'EdTech', 'MedTech', 'GreenTech', 'E-commerce'
  ];

  const stages: StartupStage[] = ['Idea', 'MVP', 'Growth'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (!name || !tagline || !description) {
        throw new Error("Loyiha nomi, shiori va tavsifini kiriting");
      }

      const defaultImg = imageUrl.trim() || 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&q=80&w=800';

      await addStartup({
        name,
        tagline,
        description,
        category,
        stage,
        imageUrl: defaultImg,
        pitchDeckUrl: pitchDeckUrl.trim() || 'https://technopark.uz/pitch-deck.pdf',
        founderId: currentUser.uid,
        founderName: currentUser.displayName,
        founderNickname: currentUser.nickname || '',
        founderEmail: currentUser.email
      });

      setIsAddStartupModalOpen(false);
      setName('');
      setTagline('');
      setDescription('');
      setImageUrl('');
      setPitchDeckUrl('');
    } catch (err: any) {
      setError(err.message || "Xatolik yuz berdi");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="relative w-full max-w-xl glass-surface rounded-2xl p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
        
        <button
          onClick={() => setIsAddStartupModalOpen(false)}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <Rocket className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white">
              Yangi Startap Qo'shish
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Loyihangizni Technopark hamjamiyati va investorlarga taqdim eting
            </p>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Startap Nomi *
            </label>
            <input
              type="text"
              required
              placeholder="Masalan: PayNet NextGen"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl text-sm glass-input-emerald"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Qisqa Shior (Tagline) *
            </label>
            <input
              type="text"
              required
              placeholder="Masalan: AI yordamida FinTech to'lov platformasi"
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl text-sm glass-input-emerald"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Kategoriya *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as StartupCategory)}
                className="w-full px-4 py-2.5 rounded-xl text-sm glass-input-emerald"
              >
                {categories.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Rivojlanish Bosqichi *
              </label>
              <select
                value={stage}
                onChange={(e) => setStage(e.target.value as StartupStage)}
                className="w-full px-4 py-2.5 rounded-xl text-sm glass-input-emerald"
              >
                {stages.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Logotip / Muqova Surat URL
            </label>
            <input
              type="url"
              placeholder="https://images.unsplash.com/..."
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl text-sm glass-input-emerald"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Pitch Deck / Taqdimot Havolasi (PDF)
            </label>
            <input
              type="url"
              placeholder="https://technopark.uz/deck.pdf"
              value={pitchDeckUrl}
              onChange={(e) => setPitchDeckUrl(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl text-sm glass-input-emerald"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Batafsil Tavsif *
            </label>
            <textarea
              rows={4}
              required
              placeholder="Loyihaning muammosi, yechimi va bozor imkoniyatlari haqida yozing..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl text-sm glass-input-emerald"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 py-3 text-xs font-bold btn-emerald disabled:opacity-50"
          >
            {loading ? "Saqlanmoqda... ⏳" : "✅ Loyihani E'lon Qilish"}
          </button>
        </form>

      </div>
    </div>
  );
};
