/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { ThemePreset } from '../types';

interface ThemeContextType {
  theme: ThemePreset;
  setTheme: (theme: ThemePreset) => void;
  themeConfig: {
    bg: string;
    text: string;
    primary: string;
    border: string;
    card: string;
    secondary: string;
    accent: string;
    muted: string;
    paperBg: string;
  };
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const THEME_STYLES: Record<ThemePreset, ThemeContextType['themeConfig']> = {
  parchment: {
    bg: '#ffffff',
    text: '#121212',
    primary: '#121212', // Black accent
    secondary: '#525252', // Muted slate gray
    accent: '#171717', // Timeless charcoal
    border: '#e5e5e5', // Crisp grid line border
    card: '#ffffff', // Pure white flat gallery shape
    muted: '#737373', // Studio gray text
    paperBg: '#ffffff',
  },
  midnight: {
    bg: '#0a0a0a',
    text: '#f5f5f5',
    primary: '#f5f5f5', // Pristine soft white
    secondary: '#a3a3a3', // Structural gray
    accent: '#e5e5e5', // Stark focus focus
    border: '#262626', // Razor obsidian border
    card: '#121212', // Obsidian block
    muted: '#737373', // Dark studio gray
    paperBg: '#121212',
  },
  rose: {
    bg: '#fafaf9',
    text: '#1c1917',
    primary: '#1c1917', // Stone granite accent
    secondary: '#8a7a6e', // Sand linen tone
    accent: '#44403c', // Curated raw brass
    border: '#e7e5e4', // Travertine marble border
    card: '#ffffff', // Bright white canvas blocks
    muted: '#78716c', // Stoneware warm gray
    paperBg: '#ffffff',
  },
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemePreset>(() => {
    const saved = localStorage.getItem('theme-preset');
    return (saved as ThemePreset) || 'parchment';
  });

  const setTheme = (newTheme: ThemePreset) => {
    setThemeState(newTheme);
    localStorage.setItem('theme-preset', newTheme);
  };

  useEffect(() => {
    // Sync with HTML class/attribute for external styles if needed
    const root = document.documentElement;
    root.classList.remove('theme-parchment', 'theme-midnight', 'theme-rose');
    root.classList.add(`theme-${theme}`);
    
    // Also change root styling for nice background scroll boundaries
    root.style.backgroundColor = THEME_STYLES[theme].bg;
    document.body.style.backgroundColor = THEME_STYLES[theme].bg;
  }, [theme]);

  const value = {
    theme,
    setTheme,
    themeConfig: THEME_STYLES[theme],
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
