import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  collection, 
  addDoc, 
  deleteDoc, 
  doc, 
  updateDoc, 
  query, 
  orderBy, 
  onSnapshot 
} from 'firebase/firestore';
import { db, isRealFirebaseConfigured } from '../firebase';
import { useAuth } from './AuthContext';
import { getTranslation } from '../utils/translations';
import type { Startup, Grant, ChatMessage, Announcement, AppLanguage, AppTheme } from '../types';

interface AppContextType {
  startups: Startup[];
  grants: Grant[];
  chatMessages: ChatMessage[];
  announcements: Announcement[];
  isDarkMode: boolean;
  language: AppLanguage;
  t: ReturnType<typeof getTranslation>;
  selectedCategory: string;
  searchQuery: string;
  isAuthModalOpen: boolean;
  isAddStartupModalOpen: boolean;
  isProfileOpen: boolean;
  isAboutModalOpen: boolean;
  activeChatStartup: Startup | null;
  
  toggleDarkMode: () => void;
  setLanguage: (lang: AppLanguage) => void;
  setSelectedCategory: (cat: string) => void;
  setSearchQuery: (query: string) => void;
  setIsAuthModalOpen: (open: boolean) => void;
  setIsAddStartupModalOpen: (open: boolean) => void;
  setIsProfileOpen: (open: boolean) => void;
  setIsAboutModalOpen: (open: boolean) => void;
  setActiveChatStartup: (startup: Startup | null) => void;
  
  addStartup: (startup: Omit<Startup, 'id' | 'likes' | 'likesCount' | 'createdAt'>) => Promise<void>;
  deleteStartup: (id: string) => Promise<void>;
  toggleLikeStartup: (startupId: string, userId: string) => Promise<void>;
  rateStartup: (startupId: string, userId: string, score: number) => Promise<void>;
  
  addGrant: (grant: Omit<Grant, 'id' | 'applicantsCount' | 'applicants' | 'createdAt'>) => Promise<void>;
  applyForGrant: (grantId: string, userId: string) => Promise<void>;
  
  addAnnouncement: (announcement: Omit<Announcement, 'id' | 'date'>) => Promise<void>;
  deleteAnnouncement: (id: string) => Promise<void>;
  
  sendMessage: (startupId: string, startupName: string, senderId: string, senderName: string, senderRole: 'user' | 'admin', text: string) => Promise<void>;
}

// Initial startups default strictly to empty array (real database mode)
const INITIAL_STARTUPS: Startup[] = [];

const INITIAL_GRANTS: Grant[] = [
  {
    id: 'grt-1',
    title: 'Technopark Seed Fund 2026',
    fundAmount: '$50,000',
    deadline: '2026-10-30',
    description: 'AI, Hardware va FinTech yo\'nalishidagi eng istiqbolli MVP bosqichidagi startaplar uchun qaytarilmas grant va inkubatsiya dasturi.',
    category: 'AI & Hardware',
    applicantsCount: 18,
    applicants: [],
    createdAt: '2026-03-01T00:00:00Z'
  },
  {
    id: 'grt-2',
    title: 'Green Tech & Energy Challenge',
    fundAmount: '$30,000',
    deadline: '2026-11-15',
    description: 'Ekologiya, qayta tiklanadigan energiya va suv resurslarini tejash texnologiyalarini ishlab chiquvchi loyihalar uchun akseleratsiya.',
    category: 'GreenTech',
    applicantsCount: 11,
    applicants: [],
    createdAt: '2026-03-05T00:00:00Z'
  },
  {
    id: 'grt-3',
    title: 'DeepTech & R&D Accelerator 2026',
    fundAmount: '$100,000',
    deadline: '2026-12-01',
    description: 'Ilmiy-tadqiqot, biyotexnologiya va kiberxavfsizlik sohasidagi yuqori texnologik loyihalar uchun venchur va prototiplash granti.',
    category: 'DeepTech',
    applicantsCount: 24,
    applicants: [],
    createdAt: '2026-03-10T00:00:00Z'
  }
];

const INITIAL_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'anc-1',
    badge: '🏆 Yangi Mukofot & Grant',
    title: 'Technopark Seed Fund $50,000 Granti Ochiq!',
    content: 'AI, FinTech hamda Hardware yo\'nalishidagi istiqbolli rezident startaplar uchun saralash bosqichi boshlandi.',
    date: '2026-09-30',
    linkUrl: '#grants'
  }
];

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser, updateProfileData } = useAuth();

  const [startups, setStartups] = useState<Startup[]>(INITIAL_STARTUPS);
  const [grants, setGrants] = useState<Grant[]>(INITIAL_GRANTS);
  const [announcements, setAnnouncements] = useState<Announcement[]>(INITIAL_ANNOUNCEMENTS);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);

  // Language state
  const [language, setLanguageState] = useState<AppLanguage>(() => {
    const saved = localStorage.getItem('technopark_language') as AppLanguage;
    return saved || 'uz';
  });

  // Dark mode state (defaults to true for dark obsidian theme)
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('technopark_theme');
    return saved ? saved === 'dark' : true;
  });

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [isAddStartupModalOpen, setIsAddStartupModalOpen] = useState<boolean>(false);
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState<boolean>(false);
  const [activeChatStartup, setActiveChatStartup] = useState<Startup | null>(null);

  // Synchronize Dark Class on HTML root element reliably
  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Restore user preferences when logging in from any device
  useEffect(() => {
    if (currentUser) {
      if (currentUser.preferredLanguage) {
        setLanguageState(currentUser.preferredLanguage);
        localStorage.setItem('technopark_language', currentUser.preferredLanguage);
      }
      if (currentUser.preferredTheme) {
        const isDark = currentUser.preferredTheme === 'dark';
        setIsDarkMode(isDark);
        localStorage.setItem('technopark_theme', currentUser.preferredTheme);
      }
    }
  }, [currentUser]);

  const toggleDarkMode = () => {
    setIsDarkMode(prev => {
      const next = !prev;
      const themeStr: AppTheme = next ? 'dark' : 'light';
      localStorage.setItem('technopark_theme', themeStr);
      if (next) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      if (currentUser) {
        updateProfileData({ preferredTheme: themeStr });
      }
      return next;
    });
  };

  const setLanguage = (lang: AppLanguage) => {
    setLanguageState(lang);
    localStorage.setItem('technopark_language', lang);
    if (currentUser) {
      updateProfileData({ preferredLanguage: lang });
    }
  };

  // Sync real-time with Firestore if real credentials present
  useEffect(() => {
    if (!isRealFirebaseConfigured()) return;

    // Listen to startups collection (real-time)
    const startupQuery = query(collection(db, 'startups'), orderBy('createdAt', 'desc'));
    const unsubStartups = onSnapshot(
      startupQuery,
      (snapshot) => {
        const fetched = snapshot.docs.map(d => {
          const data = d.data();
          // Ensure the id field matches the Firestore document id
          return { ...data, id: d.id } as Startup;
        });
        setStartups(fetched);
      },
      (error) => {
        console.error('Firestore startups listener error:', error);
      }
    );

    return () => {
      unsubStartups();
    };
  }, []);

  const addStartup = async (data: Omit<Startup, 'id' | 'likes' | 'likesCount' | 'createdAt'>) => {
    const newStartupData = {
      ...data,
      likes: [],
      likesCount: 0,
      ratings: {},
      ratingSum: 0,
      ratingCount: 0,
      averageRating: 0,
      createdAt: new Date().toISOString()
    };

    if (isRealFirebaseConfigured()) {
      try {
        // Save to Firestore — onSnapshot listener will automatically update local state
        const docRef = await addDoc(collection(db, 'startups'), newStartupData);
        // Update the saved doc with its Firestore-generated id field for easy reference
        await updateDoc(doc(db, 'startups', docRef.id), { id: docRef.id });
      } catch (e) {
        console.error("Firestore add startup error:", e);
        // Fallback: add locally with generated id if Firestore fails
        const fallbackStartup: Startup = { ...newStartupData, id: 'stp_' + Date.now() };
        setStartups(prev => [fallbackStartup, ...prev]);
      }
    } else {
      // No Firebase — add locally only
      const newStartup: Startup = { ...newStartupData, id: 'stp_' + Date.now() };
      setStartups(prev => [newStartup, ...prev]);
    }
  };

  const deleteStartup = async (id: string) => {
    setStartups(prev => prev.filter(s => s.id !== id));
    if (isRealFirebaseConfigured()) {
      try {
        // First try deleting by document ID directly
        await deleteDoc(doc(db, 'startups', id));
      } catch (e) {
        console.warn("Firestore delete fallback:", e);
      }
    }
  };

  const toggleLikeStartup = async (startupId: string, userId: string) => {
    setStartups(prev => prev.map(s => {
      if (s.id === startupId) {
        const hasLiked = s.likes.includes(userId);
        const updatedLikes = hasLiked
          ? s.likes.filter(id => id !== userId)
          : [...s.likes, userId];
        return {
          ...s,
          likes: updatedLikes,
          likesCount: updatedLikes.length
        };
      }
      return s;
    }));

    if (isRealFirebaseConfigured()) {
      try {
        const target = startups.find(s => s.id === startupId);
        if (target) {
          const hasLiked = target.likes.includes(userId);
          const updatedLikes = hasLiked
            ? target.likes.filter(id => id !== userId)
            : [...target.likes, userId];
          await updateDoc(doc(db, 'startups', startupId), {
            likes: updatedLikes,
            likesCount: updatedLikes.length
          });
        }
      } catch (e) {
        console.warn("Firestore like update fallback:", e);
      }
    }
  };

  const rateStartup = async (startupId: string, userId: string, score: number) => {
    if (score < 1 || score > 5) return;

    setStartups(prev => prev.map(s => {
      if (s.id === startupId) {
        const currentRatings = s.ratings || {};
        const updatedRatings = { ...currentRatings, [userId]: score };
        const ratingValues = Object.values(updatedRatings);
        const ratingSum = ratingValues.reduce((a, b) => a + b, 0);
        const ratingCount = ratingValues.length;
        const averageRating = ratingCount > 0 ? parseFloat((ratingSum / ratingCount).toFixed(1)) : 0;

        return {
          ...s,
          ratings: updatedRatings,
          ratingSum,
          ratingCount,
          averageRating
        };
      }
      return s;
    }));

    if (isRealFirebaseConfigured()) {
      try {
        const target = startups.find(s => s.id === startupId);
        if (target) {
          const currentRatings = target.ratings || {};
          const updatedRatings = { ...currentRatings, [userId]: score };
          const ratingValues = Object.values(updatedRatings);
          const ratingSum = ratingValues.reduce((a, b) => a + b, 0);
          const ratingCount = ratingValues.length;
          const averageRating = ratingCount > 0 ? parseFloat((ratingSum / ratingCount).toFixed(1)) : 0;

          await updateDoc(doc(db, 'startups', startupId), {
            ratings: updatedRatings,
            ratingSum,
            ratingCount,
            averageRating
          });
        }
      } catch (e) {
        console.warn("Firestore rating update fallback:", e);
      }
    }
  };

  const addGrant = async (data: Omit<Grant, 'id' | 'applicantsCount' | 'applicants' | 'createdAt'>) => {
    const newGrant: Grant = {
      ...data,
      id: 'grt_' + Date.now(),
      applicantsCount: 0,
      applicants: [],
      createdAt: new Date().toISOString()
    };

    setGrants(prev => [newGrant, ...prev]);

    if (isRealFirebaseConfigured()) {
      try {
        await addDoc(collection(db, 'grants'), newGrant);
      } catch (e) {
        console.warn("Firestore grant fallback:", e);
      }
    }
  };

  const applyForGrant = async (grantId: string, userId: string) => {
    setGrants(prev => prev.map(g => {
      if (g.id === grantId && !g.applicants.includes(userId)) {
        const updatedApplicants = [...g.applicants, userId];
        return {
          ...g,
          applicants: updatedApplicants,
          applicantsCount: updatedApplicants.length
        };
      }
      return g;
    }));

    if (isRealFirebaseConfigured()) {
      try {
        const target = grants.find(g => g.id === grantId);
        if (target && !target.applicants.includes(userId)) {
          const updatedApplicants = [...target.applicants, userId];
          await updateDoc(doc(db, 'grants', grantId), {
            applicants: updatedApplicants,
            applicantsCount: updatedApplicants.length
          });
        }
      } catch (e) {
        console.warn("Firestore grant apply fallback:", e);
      }
    }
  };

  const sendMessage = async (
    startupId: string,
    startupName: string,
    senderId: string,
    senderName: string,
    senderRole: 'user' | 'admin',
    text: string
  ) => {
    const newMsg: ChatMessage = {
      id: 'msg_' + Date.now(),
      startupId,
      startupName,
      senderId,
      senderName,
      senderRole,
      text,
      timestamp: new Date().toISOString()
    };

    setChatMessages(prev => [...prev, newMsg]);

    if (isRealFirebaseConfigured()) {
      try {
        await addDoc(collection(db, 'chatMessages'), newMsg);
      } catch (e) {
        console.warn("Firestore chat fallback:", e);
      }
    }
  };

  const addAnnouncement = async (data: Omit<Announcement, 'id' | 'date'>) => {
    const newAnnouncement: Announcement = {
      ...data,
      id: 'anc_' + Date.now(),
      date: new Date().toISOString().split('T')[0]
    };
    setAnnouncements(prev => [newAnnouncement, ...prev]);

    if (isRealFirebaseConfigured()) {
      try {
        await addDoc(collection(db, 'announcements'), newAnnouncement);
      } catch (e) {
        console.warn('Firestore announcement add fallback:', e);
      }
    }
  };

  const deleteAnnouncement = async (id: string) => {
    setAnnouncements(prev => prev.filter(a => a.id !== id));
    if (isRealFirebaseConfigured()) {
      try {
        await deleteDoc(doc(db, 'announcements', id));
      } catch (e) {
        console.warn('Firestore announcement delete fallback:', e);
      }
    }
  };

  const t = getTranslation(language);

  return (
    <AppContext.Provider value={{
      startups,
      grants,
      chatMessages,
      announcements,
      isDarkMode,
      language,
      t,
      selectedCategory,
      searchQuery,
      isAuthModalOpen,
      isAddStartupModalOpen,
      isProfileOpen,
      isAboutModalOpen,
      activeChatStartup,
      toggleDarkMode,
      setLanguage,
      setSelectedCategory,
      setSearchQuery,
      setIsAuthModalOpen,
      setIsAddStartupModalOpen,
      setIsProfileOpen,
      setIsAboutModalOpen,
      setActiveChatStartup,
      addStartup,
      deleteStartup,
      toggleLikeStartup,
      rateStartup,
      addGrant,
      applyForGrant,
      addAnnouncement,
      deleteAnnouncement,
      sendMessage
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
