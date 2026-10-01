import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';

export const GrantsSection: React.FC = () => {
  const { currentUser } = useAuth();
  const { grants, applyForGrant, t, setIsAuthModalOpen } = useApp();

  const handleApply = (grantId: string) => {
    if (!currentUser) {
      setIsAuthModalOpen(true);
      return;
    }
    applyForGrant(grantId, currentUser.uid);
  };

  return (
    <section id="grants" className="w-full flex justify-center py-24 border-b border-slate-200/20 dark:border-white/10">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16" data-animate>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 mb-2 block">
            {t.grants.badge}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
            {t.grants.title}
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            {t.grants.subtext}
          </p>
        </div>

        {/* Grants Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
          {grants.map((grant, gIdx) => {
            const hasApplied = currentUser ? grant.applicants.includes(currentUser.uid) : false;

            return (
              <div 
                key={grant.id}
                className="glass-surface p-8 flex flex-col justify-between card-hover"
                data-animate
                data-delay={String(gIdx * 150)}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300">
                      {grant.category}
                    </span>
                    <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                      {grant.applicantsCount} {t.grants.applicantsLabel}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                    {grant.title}
                  </h3>

                  <div className="text-2xl font-black text-slate-900 dark:text-white my-3 tracking-tight">
                    {grant.fundAmount}
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                    {grant.description}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 pb-4 border-b border-slate-200/60 dark:border-white/10">
                    {t.grants.deadlineLabel} <strong className="text-slate-900 dark:text-white">{grant.deadline}</strong>
                  </p>

                  {hasApplied ? (
                    <div className="w-full py-2.5 rounded-lg badge-emerald text-xs font-bold text-center">
                      {t.grants.applied}
                    </div>
                  ) : (
                    <button
                      onClick={() => handleApply(grant.id)}
                      className="w-full py-2.5 text-xs font-bold btn-emerald text-center"
                    >
                      {t.grants.apply}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
