import { ColorTheme, DesignTemplate } from '../types';

export interface ThemeColorConfig {
  name: string;
  badge: string;
  primary: string;
  primaryHover: string;
  accent: string;
  lightBg: string;
  border: string;
  gradient: string;
  textPrimary: string;
  tagBg: string;
  shadow: string;
}

export const themeColors: Record<ColorTheme, ThemeColorConfig> = {
  orange: {
    name: 'オレンジ',
    badge: '🍊',
    primary: 'bg-amber-600',
    primaryHover: 'hover:bg-amber-700',
    accent: 'text-amber-600',
    lightBg: 'bg-amber-50/70',
    border: 'border-amber-300',
    gradient: 'from-amber-600 to-orange-500',
    textPrimary: 'text-amber-900',
    tagBg: 'bg-amber-100 text-amber-800 border-amber-300',
    shadow: 'shadow-amber-500/20',
  },
  pink: {
    name: 'ピンク',
    badge: '🌸',
    primary: 'bg-rose-600',
    primaryHover: 'hover:bg-rose-700',
    accent: 'text-rose-600',
    lightBg: 'bg-rose-50/70',
    border: 'border-rose-300',
    gradient: 'from-rose-600 to-pink-500',
    textPrimary: 'text-rose-950',
    tagBg: 'bg-rose-100 text-rose-800 border-rose-300',
    shadow: 'shadow-rose-500/20',
  },
  green: {
    name: 'グリーン',
    badge: '🌿',
    primary: 'bg-emerald-600',
    primaryHover: 'hover:bg-emerald-700',
    accent: 'text-emerald-600',
    lightBg: 'bg-emerald-50/70',
    border: 'border-emerald-300',
    gradient: 'from-emerald-600 to-teal-500',
    textPrimary: 'text-emerald-950',
    tagBg: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    shadow: 'shadow-emerald-500/20',
  },
  blue: {
    name: 'ブルー',
    badge: '🔷',
    primary: 'bg-sky-600',
    primaryHover: 'hover:bg-sky-700',
    accent: 'text-sky-600',
    lightBg: 'bg-sky-50/70',
    border: 'border-sky-300',
    gradient: 'from-sky-600 to-blue-600',
    textPrimary: 'text-sky-950',
    tagBg: 'bg-sky-100 text-sky-800 border-sky-300',
    shadow: 'shadow-sky-500/20',
  },
};

export const getTemplateFont = (template: DesignTemplate) => {
  switch (template) {
    case 'business':
      return 'font-sans tracking-tight';
    case 'friendly':
      return 'font-zen-maru font-medium';
    case 'illustration':
      return 'font-sans';
    case 'photo':
    default:
      return 'font-sans';
  }
};
