import React, { useState } from 'react';
import { X, Send, MessageSquare, ShieldCheck, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';

export const ChatModal: React.FC = () => {
  const { currentUser } = useAuth();
  const { activeChatStartup, setActiveChatStartup, chatMessages, sendMessage, setIsAuthModalOpen } = useApp();
  const [text, setText] = useState('');

  if (!activeChatStartup) return null;

  const startupMessages = chatMessages.filter(m => m.startupId === activeChatStartup.id);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    if (!currentUser) {
      setIsAuthModalOpen(true);
      return;
    }

    const senderRole = currentUser.role || 'user';

    await sendMessage(
      activeChatStartup.id,
      activeChatStartup.name,
      currentUser.uid,
      currentUser.displayName,
      senderRole,
      text.trim()
    );

    setText('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg glass-card rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-2xl flex flex-col h-[600px] overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <img 
              src={activeChatStartup.imageUrl} 
              alt="" 
              className="w-10 h-10 rounded-xl object-cover ring-2 ring-cyan-500/40"
            />
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                {activeChatStartup.name}
                <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-400 font-bold">
                  Takliflar & Muloqot
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Muallif: <strong className="text-slate-300">{activeChatStartup.founderName}</strong>
              </p>
            </div>
          </div>

          <button
            onClick={() => setActiveChatStartup(null)}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Message Log */}
        <div className="flex-1 overflow-y-auto py-4 space-y-3 pr-1">
          {startupMessages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400">
              <MessageSquare className="w-10 h-10 mb-2 opacity-50 text-cyan-400" />
              <p className="text-xs font-semibold">Hali xabarlar mavjud emas.</p>
              <p className="text-[11px] text-slate-500 mt-1">
                Admin va startap muallifi ushbu loyiha bo'yicha uchrashuv yoki investitsiya takliflarini kelishib olishlari mumkin.
              </p>
            </div>
          ) : (
            startupMessages.map((msg) => {
              const isMe = currentUser?.uid === msg.senderId;
              const isAdminSender = msg.senderRole === 'admin';

              return (
                <div 
                  key={msg.id}
                  className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                >
                  <div className="flex items-center gap-1.5 mb-1 text-[10px] text-slate-400 font-semibold">
                    {isAdminSender ? (
                      <span className="flex items-center gap-1 text-amber-400">
                        <ShieldCheck className="w-3 h-3" /> Admin: {msg.senderName}
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-cyan-400">
                        <User className="w-3 h-3" /> {msg.senderName}
                      </span>
                    )}
                    <span>• {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>

                  <div className={`p-3.5 rounded-2xl text-xs max-w-[85%] leading-relaxed ${
                    isMe 
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-tr-none shadow-neon-blue'
                      : isAdminSender
                        ? 'bg-amber-500/20 text-amber-200 border border-amber-500/30 rounded-tl-none'
                        : 'glass-card border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 rounded-tl-none'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSend} className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2">
          <input
            type="text"
            placeholder={currentUser ? "Xabaringizni yoki taklifingizni yozing..." : "Xabar yozish uchun tizimga kiring"}
            value={text}
            disabled={!currentUser}
            onChange={(e) => setText(e.target.value)}
            className="flex-1 px-4 py-3 rounded-xl text-xs glass-input"
          />
          <button
            type="submit"
            disabled={!currentUser || !text.trim()}
            className="p-3 rounded-xl bg-gradient-to-r from-cyan-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 text-slate-950 shadow-neon-cyan transition-all disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

      </div>
    </div>
  );
};
