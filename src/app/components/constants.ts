import type { LucideIcon } from 'lucide-react';

// --- Design Tokens ---
export const COLORS = {
  bg: '#F6F1EE',
  beige: '#F6F1EE',
  text: '#0E0E0E',
  red: '#6B0F1A',
  cherry: '#8E1B2C',
  white: '#FFFFFF',
} as const;

// --- Types ---
export interface ProjectBrief {
  context: string;
  mission: string;
  result: string;
  hook?: string;
  slogan?: string;
  supports?: string;
  constraints?: string;
  problematic?: string;
}

export interface ProjectObjective {
  type: string;
  icon: LucideIcon;
  desc: string;
}

export interface ProjectTarget {
  type: string;
  desc: string;
  channels?: string;
}

export interface CopyStrategy {
  promesse: string;
  messageClé: string;
  ton: string;
  concept: string;
}

export interface GalleryItem {
  image: string;
  description: string;
  extraImages?: Array<{ image: string; description: string }>;
}

export interface GalleryFolders {
  reseauxSociaux: GalleryItem[];
  videos: GalleryItem[];
  print: GalleryItem[];
  plus: GalleryItem[];
  preuves?: GalleryItem[];
  moodboard?: GalleryItem[];
}

export interface Project {
  id: number;
  title: string;
  subtitle: string;
  category: 'formation' | 'entreprise' | 'perso';
  year: string;
  image: string;
  brief: ProjectBrief;
  copyStrategy?: CopyStrategy;
  objectives: ProjectObjective[];
  targets: ProjectTarget[];
  gallery: string[];
  galleryFolders?: GalleryFolders;
}

// --- Category Helpers ---
export const CATEGORY_CONFIG = {
  formation: { label: "Projet d'école", color: '#2E5C8A' },
  entreprise: { label: "Projet d'entreprise", color: '#4A7C59' },
  perso: { label: 'Projet personnel', color: '#8B5A8E' },
} as const;

export const FILTER_OPTIONS = [
  { id: 'all', label: 'Tout afficher' },
  { id: 'formation', label: 'En formation' },
  { id: 'entreprise', label: 'En entreprise' },
  { id: 'perso', label: 'Projets personnels' },
] as const;

export type PageId = 'home' | 'about' | 'projects' | 'project-detail' | 'contact';
export type FilterId = 'all' | 'formation' | 'entreprise' | 'perso';