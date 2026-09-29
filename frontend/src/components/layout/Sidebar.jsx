import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';
import {
  BookOpen, LayoutDashboard, Route, BarChart3,
  ChevronLeft, ChevronRight, LogOut, User, Settings
} from 'lucide-react';

const Sidebar = ({ collapsed, setCollapsed }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const navItems = [
    { path: '/dashboard', label: t('dashboard.title', 'Dashboard'), icon: LayoutDashboard },
    { path: '/roadmap', label: t('roadmap.title', '30-Day Roadmap'), icon: Route },
    { path: '/progress', label: t('dashboard.progress', 'Progress'), icon: BarChart3 },
    { path: '/settings', label: t('settings.title', 'Settings'), icon: Settings },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside className={`hidden lg:flex flex-col bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transition-all duration-300 ${collapsed ? 'w-[72px]' : 'w-64'}`}>
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 h-16 border-b border-slate-100 dark:border-slate-800 shrink-0">
        <div className="w-9 h-9 bg-indigo-600 rounded-lg flex items-center justify-center shrink-0">
          <BookOpen className="w-5 h-5 text-white" />
        </div>
        {!collapsed && <span className="font-bold text-slate-900 dark:text-white whitespace-nowrap">Study Tracker</span>}
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        {navItems.map(({ path, label, icon: Icon }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-sm font-medium ${
                isActive
                  ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-slate-200'
              }`
            }
          >
            <Icon className="w-5 h-5 shrink-0" />
            {!collapsed && <span>{label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Collapse toggle */}
      <div className="px-3 py-2 border-t border-slate-100 dark:border-slate-800">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-xl transition-all text-sm"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <><ChevronLeft className="w-4 h-4" /><span>{t('sidebar.collapse', 'Collapse')}</span></>}
        </button>
      </div>

      {/* User profile mini-card */}
      <div className="px-3 pb-4 border-t border-slate-100 dark:border-slate-800 pt-3">
        <div className={`flex items-center gap-3 ${collapsed ? 'justify-center' : ''}`}>
          <div className="w-9 h-9 bg-indigo-100 dark:bg-indigo-900/50 rounded-full flex items-center justify-center shrink-0">
            <User className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-900 dark:text-slate-200 truncate">{user?.name}</p>
              <p className="text-xs text-slate-400 dark:text-slate-500 truncate">{user?.email}</p>
            </div>
          )}
        </div>
        <button
          onClick={handleLogout}
          className={`mt-2 w-full flex items-center gap-2 px-3 py-2 text-slate-500 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all text-sm ${collapsed ? 'justify-center' : ''}`}
        >
          <LogOut className="w-4 h-4" />
          {!collapsed && <span>{t('nav.logout', 'Logout')}</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
