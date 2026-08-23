'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

export type PaletteId = 'cyan' | 'indigo' | 'emerald' | 'amber' | 'purple' | 'rose';
export type FontId =
  | 'inter'
  | 'jakarta'
  | 'outfit'
  | 'space-grotesk'
  | 'poppins'
  | 'rajdhani'
  | 'roboto';

export interface PaletteOption {
  id: PaletteId;
  name: string;
  description: string;
  primaryColor: string;
  accentColor: string;
  badgeBg: string;
}

export interface FontOption {
  id: FontId;
  name: string;
  category: string;
  previewText: string;
}

export const PALETTES: PaletteOption[] = [
  {
    id: 'cyan',
    name: 'Electric Cyan',
    description: 'High-tech cyan with neon electric glow (Default)',
    primaryColor: '#01B4BA',
    accentColor: '#00D8DF',
    badgeBg: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
  },
  {
    id: 'indigo',
    name: 'Neon Indigo',
    description: 'Modern developer SaaS indigo & violet',
    primaryColor: '#6366F1',
    accentColor: '#818CF8',
    badgeBg: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
  },
  {
    id: 'emerald',
    name: 'Emerald Matrix',
    description: 'Fresh mint & cyberpunk terminal emerald',
    primaryColor: '#10B981',
    accentColor: '#34D399',
    badgeBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  },
  {
    id: 'amber',
    name: 'Sunset Amber',
    description: 'Warm golden amber with vibrant orange punch',
    primaryColor: '#F59E0B',
    accentColor: '#FBBF24',
    badgeBg: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  },
  {
    id: 'purple',
    name: 'Cyberpunk Purple',
    description: 'Deep futuristic violet & vibrant purple',
    primaryColor: '#A855F7',
    accentColor: '#C084FC',
    badgeBg: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  },
  {
    id: 'rose',
    name: 'Crimson Rose',
    description: 'Bold energetic ruby and neon coral',
    primaryColor: '#F43F5E',
    accentColor: '#FB7185',
    badgeBg: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
  },
];

export const FONTS: FontOption[] = [
  {
    id: 'inter',
    name: 'Inter',
    category: 'Sans-Serif (Default)',
    previewText: 'Clean, technical, and exceptionally balanced for UI',
  },
  {
    id: 'jakarta',
    name: 'Plus Jakarta Sans',
    category: 'Geometric Sans',
    previewText: 'Modern geometric elegance with refined proportions',
  },
  {
    id: 'outfit',
    name: 'Outfit',
    category: 'Display & Sans',
    previewText: 'Sleek, futuristic curves engineered for digital products',
  },
  {
    id: 'space-grotesk',
    name: 'Space Grotesk',
    category: 'Tech Monospace-Feel',
    previewText: 'Quirky developer aesthetic with high personality',
  },
  {
    id: 'poppins',
    name: 'Poppins',
    category: 'Geometric Rounded',
    previewText: 'Friendly, geometric, and vibrant across all weights',
  },
  {
    id: 'rajdhani',
    name: 'Rajdhani',
    category: 'Cyberpunk Modular',
    previewText: 'Squared technical industrial aesthetics',
  },
  {
    id: 'roboto',
    name: 'Roboto',
    category: 'Neo-Grotesque',
    previewText: 'Crisp readability and universal clarity',
  },
];

interface CustomThemeContextType {
  palette: PaletteId;
  setPalette: (palette: PaletteId) => void;
  font: FontId;
  setFont: (font: FontId) => void;
  resetTheme: () => void;
}

const CustomThemeContext = createContext<CustomThemeContextType | undefined>(undefined);

const PALETTE_STORAGE_KEY = 'portfolio_theme_palette';
const FONT_STORAGE_KEY = 'portfolio_theme_font';

export function CustomThemeProvider({ children }: { children: React.ReactNode }) {
  const [palette, setPaletteState] = useState<PaletteId>('cyan');
  const [font, setFontState] = useState<FontId>('inter');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const savedPalette = localStorage.getItem(PALETTE_STORAGE_KEY) as PaletteId | null;
      const savedFont = localStorage.getItem(FONT_STORAGE_KEY) as FontId | null;

      if (savedPalette && PALETTES.some((p) => p.id === savedPalette)) {
        setPaletteState(savedPalette);
        document.documentElement.setAttribute('data-palette', savedPalette);
      } else {
        document.documentElement.setAttribute('data-palette', 'cyan');
      }

      if (savedFont && FONTS.some((f) => f.id === savedFont)) {
        setFontState(savedFont);
        document.documentElement.setAttribute('data-font', savedFont);
      } else {
        document.documentElement.setAttribute('data-font', 'inter');
      }
    } catch (e) {
      console.warn('Failed to read theme settings from localStorage:', e);
    }

    setMounted(true);
  }, []);

  const setPalette = (newPalette: PaletteId) => {
    setPaletteState(newPalette);
    try {
      localStorage.setItem(PALETTE_STORAGE_KEY, newPalette);
      document.documentElement.setAttribute('data-palette', newPalette);
    } catch (e) {
      console.warn('Failed to save palette to localStorage:', e);
    }
  };

  const setFont = (newFont: FontId) => {
    setFontState(newFont);
    try {
      localStorage.setItem(FONT_STORAGE_KEY, newFont);
      document.documentElement.setAttribute('data-font', newFont);
    } catch (e) {
      console.warn('Failed to save font to localStorage:', e);
    }
  };

  const resetTheme = () => {
    setPalette('cyan');
    setFont('inter');
  };

  return (
    <CustomThemeContext.Provider
      value={{
        palette: mounted ? palette : 'cyan',
        setPalette,
        font: mounted ? font : 'inter',
        setFont,
        resetTheme,
      }}
    >
      {children}
    </CustomThemeContext.Provider>
  );
}

export function useCustomTheme() {
  const context = useContext(CustomThemeContext);
  if (!context) {
    throw new Error('useCustomTheme must be used within a CustomThemeProvider');
  }
  return context;
}
