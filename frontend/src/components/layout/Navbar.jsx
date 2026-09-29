import React, { useState, useRef, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTranslation } from 'react-i18next';
import {
  Search, Bell, User, LogOut, ChevronDown,
  Menu, X, BookOpen, LayoutDashboard, Route, BarChart3,
  Coffee, Settings
} from 'lucide-react';
import ThemeSwitcher from '../shared/ThemeSwitcher';
import LanguageSwitcher from '../shared/LanguageSwitcher';
import NotificationBell from './NotificationBell';

const Navbar = ({ searchQuery, onSearchChange }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { path: '/dashboard', label: t('dashboard.title', 'Dashboard') },
    { path: '/roadmap', label: t('roadmap.title', 'Roadmap') },
    { path: '/progress', label: t('dashboard.progress', 'Progress') },
    { path: '/review', label: 'Review' },
  ];

  const mobileNavItems = [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/roadmap', label: 'Roadmap', icon: Route },
    { path: '/progress', label: 'Progress', icon: BarChart3 },
    { path: '/review', label: 'Review', icon: BookOpen },
    { path: '/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <>
      <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 h-16 flex items-center px-4 lg:px-6 z-30 sticky top-0 shadow-sm transition-colors">
        
        {/* LEFT: Logo & Course Indicator */}
        <div className="flex items-center gap-6">
          <Link to="/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shrink-0 shadow-sm shadow-indigo-600/30">
              <BookOpen className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-slate-900 dark:text-white hidden lg:block tracking-tight">Study Tracker</span>
          </Link>
          
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-full border border-slate-200 dark:border-slate-700">
            <Coffee className="w-4 h-4 text-orange-600 dark:text-orange-400" />
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Java Backend</span>
            <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
          </div>
        </div>

        {/* CENTER: Navigation */}
        <nav className="hidden lg:flex items-center gap-1 mx-auto">
          {navItems.map(({ path, label }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-indigo-50 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-400'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        {/* RIGHT: Search, Tools, Profile */}
        <div className="flex items-center gap-2 ml-auto">
          {/* Desktop Search */}
          <div className="hidden sm:flex relative w-48 lg:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery || ''}
              onChange={(e) => onSearchChange?.(e.target.value)}
              className="w-full pl-9 pr-4 py-1.5 bg-slate-100 dark:bg-slate-800 border-transparent focus:border-indigo-500 focus:bg-white dark:focus:bg-slate-900 rounded-full text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
            />
          </div>

          <div className="hidden sm:flex items-center gap-1 border-r border-slate-200 dark:border-slate-700 pr-2 mr-1">
            <NotificationBell />
            <ThemeSwitcher />
            <LanguageSwitcher />
          </div>

          {/* User dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center gap-2 p-1 lg:pl-1 lg:pr-3 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
            >
              <div className="w-8 h-8 bg-gradient-to-tr from-indigo-600 to-blue-500 rounded-full flex items-center justify-center text-white shadow-inner">
                <span className="text-xs font-bold">{user?.name?.charAt(0) || 'U'}</span>
              </div>
              <span className="hidden lg:block text-sm font-bold text-slate-700 dark:text-slate-300">{user?.name}</span>
              <ChevronDown className="hidden lg:block w-3.5 h-3.5 text-slate-400" />
            </button>

            {showDropdown && (
              <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 py-2 z-50">
                <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-700">
                  <p className="text-sm font-bold text-slate-900 dark:text-slate-100">{user?.name}</p>
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400">{user?.email}</p>
                </div>
                <Link
                  to="/progress"
                  onClick={() => setShowDropdown(false)}
                  className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
                >
                  <BarChart3 className="w-4 h-4" />
                  My Progress
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="lg:hidden p-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 bg-slate-100 dark:bg-slate-800 rounded-lg transition-colors ml-1"
          >
            {showMobileMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {showMobileMenu && (
        <div className="lg:hidden fixed inset-0 z-40">
          <div className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm" onClick={() => setShowMobileMenu(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-72 bg-white dark:bg-slate-900 shadow-2xl z-50 flex flex-col border-l border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between px-4 h-16 border-b border-slate-100 dark:border-slate-800">
              <span className="font-bold text-slate-900 dark:text-white">Menu</span>
              <button onClick={() => setShowMobileMenu(false)} className="p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile search */}
            <div className="px-4 py-4 sm:hidden">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery || ''}
                  onChange={(e) => onSearchChange?.(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border-transparent rounded-xl text-sm dark:text-white"
                />
              </div>
            </div>

            <nav className="flex-1 py-2 px-3 space-y-1">
              {mobileNavItems.map(({ path, label, icon: Icon }) => (
                <Link
                  key={path}
                  to={path}
                  onClick={() => setShowMobileMenu(false)}
                  className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200 transition-colors"
                >
                  <Icon className="w-5 h-5" />
                  <span>{label}</span>
                </Link>
              ))}
            </nav>
            
            <div className="p-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-around">
              <ThemeSwitcher />
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
