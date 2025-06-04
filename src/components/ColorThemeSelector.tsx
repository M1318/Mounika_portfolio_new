
import React from 'react';
import { motion } from 'framer-motion';
import { useColorTheme } from './ColorThemeProvider';
import { Palette } from 'lucide-react';

export const ColorThemeSelector = () => {
  const { theme, setTheme } = useColorTheme();

  const themes = [
    { name: 'slate', color: 'bg-slate-400' },
    { name: 'blue', color: 'bg-blue-400' },
    { name: 'emerald', color: 'bg-emerald-400' },
    { name: 'purple', color: 'bg-purple-400' },
    { name: 'amber', color: 'bg-amber-400' },
  ] as const;

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      className="fixed top-20 right-4 z-40 bg-slate-800/90 backdrop-blur-sm border border-slate-700 rounded-lg p-3"
    >
      <div className="flex items-center gap-2 mb-2">
        <Palette size={16} className="text-slate-400" />
        <span className="text-xs text-slate-400 font-poppins">Theme</span>
      </div>
      
      <div className="flex gap-2">
        {themes.map((themeOption) => (
          <motion.button
            key={themeOption.name}
            onClick={() => setTheme(themeOption.name)}
            className={`w-6 h-6 rounded-full ${themeOption.color} border-2 transition-all duration-200 ${
              theme === themeOption.name ? 'border-white scale-110' : 'border-slate-600 hover:border-slate-400'
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          />
        ))}
      </div>
    </motion.div>
  );
};
