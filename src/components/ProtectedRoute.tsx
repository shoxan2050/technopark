import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactElement;
  requiredRole?: string;
}

const LoadingScreen: React.FC = () => (
  <div className="min-h-screen w-full flex items-center justify-center"
    style={{ backgroundColor: 'var(--bg-page)' }}>
    <div className="flex flex-col items-center gap-4">
      <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center animate-pulse">
        <svg className="w-5 h-5 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-bounce" style={{ animationDelay: '0ms' }} />
        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-bounce" style={{ animationDelay: '150ms' }} />
        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-bounce" style={{ animationDelay: '300ms' }} />
      </div>
      <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">Yuklanmoqda...</p>
    </div>
  </div>
);

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRole }) => {
  const { currentUser, loading } = useAuth();

  if (loading) return <LoadingScreen />;
  if (!currentUser) return <Navigate replace to="/" />;
  if (requiredRole && currentUser.role !== requiredRole) return <Navigate replace to="/dashboard" />;

  return children;
};
