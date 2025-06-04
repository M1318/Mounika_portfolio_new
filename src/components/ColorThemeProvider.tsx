
import React, { createContext, useContext, useState, useEffect } from 'react';

type ColorTheme = 'slate' | 'blue' | 'emerald' | 'purple' | 'amber';

interface ColorThemeContextType {
  theme: ColorTheme;
  setTheme: (theme: ColorTheme) => void;
  getThemeClasses: () => {
    primary: string;
    secondary: string;
    accent: string;
    gradient: string;
  };
}

const ColorThemeContext = createContext<ColorThemeContextType | undefined>(undefined);

export const useColorTheme = () => {
  const context = useContext(ColorThemeContext);
  if (!context) {
    throw new Error('useColorTheme must be used within ColorThemeProvider');
  }
  return context;
};

const themeClasses = {
  slate: {
    primary: 'slate-300',
    secondary: 'slate-400',
    accent: 'slate-500',
    gradient: 'from-slate-300 to-slate-500'
  },
  blue: {
    primary: 'blue-300',
    secondary: 'blue-400',
    accent: 'blue-500',
    gradient: 'from-blue-300 to-blue-500'
  },
  emerald: {
    primary: 'emerald-300',
    secondary: 'emerald-400',
    accent: 'emerald-500',
    gradient: 'from-emerald-300 to-emerald-500'
  },
  purple: {
    primary: 'purple-300',
    secondary: 'purple-400',
    accent: 'purple-500',
    gradient: 'from-purple-300 to-purple-500'
  },
  amber: {
    primary: 'amber-300',
    secondary: 'amber-400',
    accent: 'amber-500',
    gradient: 'from-amber-300 to-amber-500'
  }
};

export const ColorThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<ColorTheme>('slate');

  const getThemeClasses = () => themeClasses[theme];

  useEffect(() => {
    const savedTheme = localStorage.getItem('colorTheme') as ColorTheme;
    if (savedTheme && themeClasses[savedTheme]) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('colorTheme', theme);
  }, [theme]);

  return (
    <ColorThemeContext.Provider value={{ theme, setTheme, getThemeClasses }}>
      {children}
    </ColorThemeContext.Provider>
  );
};
