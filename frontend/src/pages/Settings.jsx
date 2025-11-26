import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Sun, Moon, Trash2, Info } from 'lucide-react';

export default function Settings() {
  const { t, i18n } = useTranslation();
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const clearCache = () => {
    if (confirm('Are you sure you want to clear all cached data?')) {
      localStorage.removeItem('predictions');
      alert('Cache cleared successfully!');
    }
  };

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'ta', name: 'தமிழ்' },
    { code: 'te', name: 'తెలుగు' },
    { code: 'hi', name: 'हिन्दी' },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
        {t('settings.title')}
      </h1>

      <div className="max-w-2xl space-y-6">
        {/* Language Settings */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
            {t('settings.language')}
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className={`px-4 py-3 rounded-md font-medium transition-colors ${
                  i18n.language === lang.code
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {lang.name}
              </button>
            ))}
          </div>
        </div>

        {/* Theme Settings */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
            {t('settings.theme')}
          </h2>
          <button
            onClick={toggleTheme}
            className="flex items-center justify-between w-full px-4 py-3 rounded-md bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            <span className="font-medium text-gray-900 dark:text-white">
              {theme === 'light' ? t('settings.light') : t('settings.dark')}
            </span>
            {theme === 'light' ? (
              <Sun className="w-6 h-6 text-yellow-500" />
            ) : (
              <Moon className="w-6 h-6 text-blue-400" />
            )}
          </button>
        </div>

        {/* Cache Settings */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
            Storage
          </h2>
          <button
            onClick={clearCache}
            className="flex items-center space-x-2 bg-red-500 text-white px-4 py-3 rounded-md hover:bg-red-600 transition-colors"
          >
            <Trash2 className="w-5 h-5" />
            <span>{t('settings.clearCache')}</span>
          </button>
        </div>

        {/* About */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Info className="w-6 h-6 text-primary" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              {t('settings.about')}
            </h2>
          </div>
          <div className="space-y-2 text-gray-700 dark:text-gray-300">
            <p>
              <strong>Sugarcane Disease Detection</strong>
            </p>
            <p>{t('settings.version')}</p>
            <p className="text-sm mt-4">
              Advanced disease detection system for identifying sugarcane diseases. Supports detection of multiple diseases including
              Red Rot, Smut, Rust, Leaf Scald, Mosaic Virus, and many more.
            </p>
            <p className="text-sm mt-2">
              Provides accurate analysis with detailed symptoms, treatment recommendations, and prevention strategies.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
