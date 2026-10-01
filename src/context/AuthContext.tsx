import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut as firebaseSignOut,
  onAuthStateChanged
} from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db, isRealFirebaseConfigured } from '../firebase';
import type { UserProfile, UserRole, SocialLinks } from '../types';

interface AuthContextType {
  currentUser: UserProfile | null;
  loading: boolean;
  isAdmin: boolean;
  signUp: (
    name: string, 
    phone: string, 
    email: string, 
    pass: string, 
    nickname?: string, 
    avatarUrl?: string, 
    socials?: SocialLinks
  ) => Promise<void>;
  signIn: (email: string, pass: string) => Promise<void>;
  signOutUser: () => Promise<void>;
  updateProfileData: (data: Partial<UserProfile>) => Promise<void>;
  toggleAdminRole: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // STRICTLY initialized to null (NO mock user or auto-login fallback)
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (isRealFirebaseConfigured()) {
      const unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
        if (fbUser) {
          try {
            const userDocRef = doc(db, 'users', fbUser.uid);
            const userSnap = await getDoc(userDocRef);
            if (userSnap.exists()) {
              setCurrentUser(userSnap.data() as UserProfile);
            } else {
              // Construct profile from fbUser if doc doesn't exist yet
              const newProfile: UserProfile = {
                uid: fbUser.uid,
                email: fbUser.email || '',
                displayName: fbUser.displayName || fbUser.email?.split('@')[0] || 'Foydalanuvchi',
                nickname: '',
                phone: fbUser.phoneNumber || '',
                avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(fbUser.uid)}`,
                bio: 'Technopark rezident va IT loyihalar a\'zosi.',
                role: 'user',
                socials: {},
                createdAt: new Date().toISOString()
              };
              await setDoc(userDocRef, newProfile);
              setCurrentUser(newProfile);
            }
          } catch (err) {
            console.warn("Firestore user sync error:", err);
          }
        } else {
          setCurrentUser(null);
        }
        setLoading(false);
      });
      return () => unsubscribe();
    } else {
      setLoading(false);
    }
  }, []);

  const signUp = async (
    name: string, 
    phone: string, 
    email: string, 
    pass: string,
    nickname?: string,
    avatarUrl?: string,
    socials?: SocialLinks
  ) => {
    const finalAvatar = avatarUrl?.trim() || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(nickname || name)}`;
    const finalSocials = socials || { telegram: '', linkedin: '', github: '', instagram: '', website: '' };

    if (isRealFirebaseConfigured()) {
      const res = await createUserWithEmailAndPassword(auth, email, pass);
      const newProfile: UserProfile = {
        uid: res.user.uid,
        email,
        displayName: name,
        nickname: nickname?.trim() || '',
        phone,
        avatarUrl: finalAvatar,
        bio: 'Technopark rezident va IT loyihalar a\'zosi.',
        role: 'user',
        socials: finalSocials,
        createdAt: new Date().toISOString()
      };
      await setDoc(doc(db, 'users', res.user.uid), newProfile);
      setCurrentUser(newProfile);
    } else {
      const uid = 'usr_' + Date.now();
      const newProfile: UserProfile = {
        uid,
        email,
        displayName: name,
        nickname: nickname?.trim() || '',
        phone,
        avatarUrl: finalAvatar,
        bio: 'Technopark rezident va IT loyihalar a\'zosi.',
        role: 'user',
        socials: finalSocials,
        createdAt: new Date().toISOString()
      };
      setCurrentUser(newProfile);
    }
  };

  const signIn = async (email: string, pass: string) => {
    if (isRealFirebaseConfigured()) {
      const res = await signInWithEmailAndPassword(auth, email, pass);
      const userSnap = await getDoc(doc(db, 'users', res.user.uid));
      if (userSnap.exists()) {
        setCurrentUser(userSnap.data() as UserProfile);
      }
    } else {
      const fallbackUser: UserProfile = {
        uid: 'usr_' + Date.now(),
        email,
        displayName: email.split('@')[0],
        phone: '+998 90 000 00 00',
        avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(email)}`,
        bio: 'Technopark foydalanuvchisi.',
        role: 'user',
        socials: {},
        createdAt: new Date().toISOString()
      };
      setCurrentUser(fallbackUser);
    }
  };

  const signOutUser = async () => {
    if (isRealFirebaseConfigured()) {
      try {
        await firebaseSignOut(auth);
      } catch (e) {
        console.warn("Sign out error:", e);
      }
    }
    setCurrentUser(null);
  };

  const updateProfileData = async (data: Partial<UserProfile>) => {
    if (!currentUser) return;
    const updated = { ...currentUser, ...data };
    setCurrentUser(updated);

    if (isRealFirebaseConfigured()) {
      try {
        await updateDoc(doc(db, 'users', currentUser.uid), data);
      } catch (e) {
        console.warn("Firestore update error:", e);
      }
    }
  };

  const toggleAdminRole = () => {
    if (!currentUser) return;
    const newRole: UserRole = currentUser.role === 'admin' ? 'user' : 'admin';
    updateProfileData({ role: newRole });
  };

  const isAdmin = currentUser?.role === 'admin';

  return (
    <AuthContext.Provider value={{
      currentUser,
      loading,
      isAdmin,
      signUp,
      signIn,
      signOutUser,
      updateProfileData,
      toggleAdminRole
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
