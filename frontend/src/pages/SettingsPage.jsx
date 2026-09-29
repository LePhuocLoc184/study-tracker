import React from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../context/ThemeContext';
import { Globe, Moon, Sun, Laptop, Settings as SettingsIcon } from 'lucide-react';

const SettingsPage = () => {
  const { t, i18n } = useTranslation();
  const { theme, setTheme } = useTheme();

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem('language', lang);
  };

  return (
    <div className="p-6 md:p-8 max-w-4xl mx-auto dark:text-slate-200 transition-colors">
      <div className="mb-8 flex items-center gap-3">
        <SettingsIcon className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">{t('settings.title', 'Settings')}</h1>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 md:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-10">
        
        {/* Language Section */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Globe className="w-5 h-5 text-indigo-500" />
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">{t('settings.language', 'Language')}</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button 
              onClick={() => changeLanguage('en')}
              className={`p-4 rounded-xl border-2 text-left transition-all ${
                i18n.language === 'en' 
                  ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-900/30' 
                  : 'border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700'
              }`}
            >
              <h3 className={`font-bold ${i18n.language === 'en' ? 'text-indigo-700 dark:text-indigo-400' : 'text-slate-900 dark:text-slate-100'}`}>English</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Select English as your primary language.</p>
            </button>
            <button 
              onClick={() => changeLanguage('vi')}
              className={`p-4 rounded-xl border-2 text-left transition-all ${
                i18n.language === 'vi' 
                  ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-900/30' 
                  : 'border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700'
              }`}
            >
              <h3 className={`font-bold ${i18n.language === 'vi' ? 'text-indigo-700 dark:text-indigo-400' : 'text-slate-900 dark:text-slate-100'}`}>Tiếng Việt</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Chọn Tiếng Việt làm ngôn ngữ chính.</p>
            </button>
          </div>
        </section>

        {/* Theme Section */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Sun className="w-5 h-5 text-indigo-500" />
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">{t('settings.theme', 'Theme Preferences')}</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <button 
              onClick={() => setTheme('light')}
              className={`p-4 rounded-xl border-2 text-center flex flex-col items-center gap-3 transition-all ${
                theme === 'light' 
                  ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-900/30' 
                  : 'border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700'
              }`}
            >
              <Sun className={`w-8 h-8 ${theme === 'light' ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400'}`} />
              <span className={`font-bold ${theme === 'light' ? 'text-indigo-700 dark:text-indigo-400' : 'text-slate-900 dark:text-slate-100'}`}>Light Mode</span>
            </button>
            <button 
              onClick={() => setTheme('dark')}
              className={`p-4 rounded-xl border-2 text-center flex flex-col items-center gap-3 transition-all ${
                theme === 'dark' 
                  ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-900/30' 
                  : 'border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700'
              }`}
            >
              <Moon className={`w-8 h-8 ${theme === 'dark' ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400'}`} />
              <span className={`font-bold ${theme === 'dark' ? 'text-indigo-700 dark:text-indigo-400' : 'text-slate-900 dark:text-slate-100'}`}>Dark Mode</span>
            </button>
            <button 
              onClick={() => setTheme('system')}
              className={`p-4 rounded-xl border-2 text-center flex flex-col items-center gap-3 transition-all ${
                theme === 'system' 
                  ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-900/30' 
                  : 'border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700'
              }`}
            >
              <Laptop className={`w-8 h-8 ${theme === 'system' ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400'}`} />
              <span className={`font-bold ${theme === 'system' ? 'text-indigo-700 dark:text-indigo-400' : 'text-slate-900 dark:text-slate-100'}`}>System</span>
            </button>
          </div>
        </section>

      </div>
    </div>
  );
};

export default SettingsPage;
