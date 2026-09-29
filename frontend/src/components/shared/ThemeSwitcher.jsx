import React from 'react';
import { Moon, Sun, Laptop } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex bg-slate-100 dark:bg-slate-800 rounded-lg p-1">
      <button
        onClick={() => setTheme('light')}
        className={`p-1.5 rounded-md transition-colors ${theme === 'light' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'}`}
        title="Light Mode"
      >
        <Sun className="w-4 h-4" />
      </button>
      <button
        onClick={() => setTheme('dark')}
        className={`p-1.5 rounded-md transition-colors ${theme === 'dark' ? 'bg-slate-700 shadow-sm text-indigo-400' : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'}`}
        title="Dark Mode"
      >
        <Moon className="w-4 h-4" />
      </button>
      <button
        onClick={() => setTheme('system')}
        className={`p-1.5 rounded-md transition-colors ${theme === 'system' ? 'bg-white dark:bg-slate-700 shadow-sm text-indigo-600 dark:text-indigo-400' : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'}`}
        title="System Theme"
      >
        <Laptop className="w-4 h-4" />
      </button>
    </div>
  );
};

export default ThemeSwitcher;
