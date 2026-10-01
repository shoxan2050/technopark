import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';

export const AdminPanel: React.FC = () => {
  const { isAdmin } = useAuth();
  const { addGrant, startups, deleteStartup, setActiveChatStartup } = useApp();

  const [title, setTitle] = useState('');
  const [fundAmount, setFundAmount] = useState('');
  const [deadline, setDeadline] = useState('');
  const [category, setCategory] = useState('AI & FinTech');
  const [description, setDescription] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  if (!isAdmin) return null;

  const handleCreateGrant = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await addGrant({
        title,
        fundAmount,
        deadline,
        category,
        description
      });
      setSuccessMsg("Yangi grant muvaffaqiyatli e'lon qilindi!");
      setTitle('');
      setFundAmount('');
      setDeadline('');
      setDescription('');
      setTimeout(() => setSuccessMsg(''), 4000);
    } catch (e) {
      console.error(e);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="admin-panel" className="w-full flex justify-center py-16 border-b border-white/10 bg-[#0E1117]">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-8">
          <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest px-2.5 py-1 rounded bg-amber-500/10 border border-amber-500/20">
            Administratsiya Rejimi
          </span>
          <h2 className="text-2xl font-bold text-white mt-2">
            Technopark Boshqaruv Paneli
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Create Grant Form */}
          <div className="bg-[#090A0F] border border-white/10 p-6 rounded-xl">
            <h3 className="text-base font-bold text-white mb-4">
              Yangi Grant / Dastur E'lon Qilish
            </h3>

            {successMsg && (
              <div className="mb-4 p-3 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs">
                {successMsg}
              </div>
            )}

            <form onSubmit={handleCreateGrant} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Grant Sarlavhasi
                </label>
                <input
                  type="text"
                  required
                  placeholder="AI Acceleration Program 2026"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg text-xs sv-input"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Moliyalashtirish Miqdori ($)
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="$50,000"
                    value={fundAmount}
                    onChange={(e) => setFundAmount(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg text-xs sv-input"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Oxirgi Muddat
                  </label>
                  <input
                    type="date"
                    required
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg text-xs sv-input"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Kategoriya
                </label>
                <input
                  type="text"
                  required
                  placeholder="AI & FinTech"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg text-xs sv-input"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Tavsif
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Dastur shartlari va saralash mezonlari..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg text-xs sv-input"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2.5 rounded-lg text-xs font-bold text-slate-900 bg-white hover:bg-slate-200 transition-colors"
              >
                {isSubmitting ? "Chop etilmoqda..." : "Grantni E'lon Qilish"}
              </button>
            </form>
          </div>

          {/* Manage Startups & Chat Proposals */}
          <div className="bg-[#090A0F] border border-white/10 p-6 rounded-xl">
            <h3 className="text-base font-bold text-white mb-4">
              Rezident Loyihalar va Takliflar
            </h3>

            <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
              {startups.map((stp) => (
                <div key={stp.id} className="p-3 rounded-lg border border-white/10 bg-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img src={stp.imageUrl} alt="" className="w-9 h-9 rounded-lg object-cover" />
                    <div>
                      <h4 className="text-xs font-bold text-white">{stp.name}</h4>
                      <p className="text-[10px] text-slate-400">Asoschi: {stp.founderName} • {stp.likesCount} Ovoz</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setActiveChatStartup(stp)}
                      className="px-2.5 py-1 rounded bg-white/10 text-white hover:bg-white/20 text-xs font-semibold"
                    >
                      Chat
                    </button>

                    <button
                      onClick={() => deleteStartup(stp.id)}
                      className="px-2 py-1 text-xs text-rose-400 hover:text-rose-300"
                      title="O'chirish"
                    >
                      O'chirish
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
