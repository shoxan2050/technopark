import React, { useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { AdminPanel } from '../components/AdminPanel';
import { Footer } from '../components/Footer';
import { AuthModal } from '../components/AuthModal';
import { UserProfile } from '../components/UserProfile';
import { AddStartupModal } from '../components/AddStartupModal';
import { ChatModal } from '../components/ChatModal';
import { initScrollAnimations } from '../utils/scrollAnimations';

export const AdminPage: React.FC = () => {
  useEffect(() => {
    const timer = setTimeout(() => initScrollAnimations(), 150);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center transition-colors duration-300"
      style={{ backgroundColor: 'var(--bg-page)', color: 'var(--text-primary)' }}
    >
      <Navbar />
      <main className="w-full flex flex-col items-center">
        <AdminPanel />
      </main>
      <Footer />
      <AuthModal />
      <UserProfile />
      <AddStartupModal />
      <ChatModal />
    </div>
  );
};
