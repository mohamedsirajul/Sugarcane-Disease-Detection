import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Leaf, Home, Search, BookOpen, History, Settings } from 'lucide-react';

export default function Header() {
  const { t } = useTranslation();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <header className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Leaf className="w-8 h-8 text-primary" />
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                {t('app.title')}
              </h1>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {t('app.subtitle')}
              </p>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-6">
            <NavLink to="/" icon={Home} isActive={isActive('/')}>
              {t('nav.home')}
            </NavLink>
            <NavLink to="/detection" icon={Search} isActive={isActive('/detection')}>
              {t('nav.detection')}
            </NavLink>
            <NavLink to="/diseases" icon={BookOpen} isActive={isActive('/diseases')}>
              {t('nav.diseases')}
            </NavLink>
            <NavLink to="/history" icon={History} isActive={isActive('/history')}>
              {t('nav.history')}
            </NavLink>
            <NavLink to="/settings" icon={Settings} isActive={isActive('/settings')}>
              {t('nav.settings')}
            </NavLink>
          </nav>
        </div>

        {/* Mobile Navigation */}
        <nav className="md:hidden flex justify-around pb-2">
          <MobileNavLink to="/" icon={Home} isActive={isActive('/')}>
            {t('nav.home')}
          </MobileNavLink>
          <MobileNavLink to="/detection" icon={Search} isActive={isActive('/detection')}>
            {t('nav.detection')}
          </MobileNavLink>
          <MobileNavLink to="/diseases" icon={BookOpen} isActive={isActive('/diseases')}>
            {t('nav.diseases')}
          </MobileNavLink>
          <MobileNavLink to="/history" icon={History} isActive={isActive('/history')}>
            {t('nav.history')}
          </MobileNavLink>
          <MobileNavLink to="/settings" icon={Settings} isActive={isActive('/settings')}>
            {t('nav.settings')}
          </MobileNavLink>
        </nav>
      </div>
    </header>
  );
}

function NavLink({ to, icon: Icon, isActive, children }) {
  return (
    <Link
      to={to}
      className={`flex items-center space-x-1 px-3 py-2 rounded-md transition-colors ${
        isActive
          ? 'bg-primary text-white'
          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
      }`}
    >
      <Icon className="w-5 h-5" />
      <span>{children}</span>
    </Link>
  );
}

function MobileNavLink({ to, icon: Icon, isActive, children }) {
  return (
    <Link
      to={to}
      className={`flex flex-col items-center space-y-1 px-2 py-1 ${
        isActive ? 'text-primary' : 'text-gray-600 dark:text-gray-400'
      }`}
    >
      <Icon className="w-5 h-5" />
      <span className="text-xs">{children}</span>
    </Link>
  );
}
