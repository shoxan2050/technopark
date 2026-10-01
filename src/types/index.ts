export type UserRole = 'user' | 'admin';
export type AppLanguage = 'uz' | 'ru' | 'en';
export type AppTheme = 'dark' | 'light';

export interface SocialLinks {
  instagram?: string;
  linkedin?: string;
  telegram?: string;
  github?: string;
  website?: string;
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  nickname?: string;
  phone: string;
  avatarUrl: string;
  bio: string;
  role: UserRole;
  socials: SocialLinks;
  preferredTheme?: AppTheme;
  preferredLanguage?: AppLanguage;
  createdAt: string;
}

export type StartupCategory = 'FinTech' | 'AI & ML' | 'EdTech' | 'MedTech' | 'GreenTech' | 'E-commerce' | 'Hardware' | 'DeepTech';
export type StartupStage = 'Idea' | 'MVP' | 'Growth';

export interface Startup {
  id: string;
  name: string;
  tagline: string;
  description: string;
  category: StartupCategory;
  stage: StartupStage;
  imageUrl: string;
  pitchDeckUrl: string;
  likes: string[]; // array of user UIDs
  likesCount: number;
  ratings?: Record<string, number>; // userUid -> score (1 to 5)
  ratingSum?: number;
  ratingCount?: number;
  averageRating?: number;
  founderId: string;
  founderName: string;
  founderNickname?: string;
  founderEmail: string;
  createdAt: string;
}

export interface Grant {
  id: string;
  title: string;
  fundAmount: string;
  deadline: string;
  description: string;
  category: string;
  applicantsCount: number;
  applicants: string[]; // user uids who applied
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  startupId: string;
  startupName: string;
  senderId: string;
  senderName: string;
  senderRole: UserRole;
  text: string;
  timestamp: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  badge: string;
  date: string;
  linkUrl?: string;
}


