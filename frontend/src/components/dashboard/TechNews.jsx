import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Newspaper, ExternalLink, Clock, RefreshCw, AlertTriangle,
  Globe, Filter
} from 'lucide-react';
import api from '../../services/api';

const CATEGORIES = [
  { key: '', label: { en: 'All', vi: 'Tất cả' }, icon: null },
  { key: 'JAVA', label: { en: 'Java', vi: 'Java' }, icon: '☕' },
  { key: 'SPRING', label: { en: 'Spring', vi: 'Spring' }, icon: '🌱' },
  { key: 'REACT', label: { en: 'React', vi: 'React' }, icon: '⚛' },
  { key: 'BACKEND', label: { en: 'Backend', vi: 'Backend' }, icon: '💻' },
  { key: 'AI', label: { en: 'AI', vi: 'AI' }, icon: '🤖' },
  { key: 'DOCKER', label: { en: 'Docker', vi: 'Docker' }, icon: '🐳' },
  { key: 'DATABASE', label: { en: 'Database', vi: 'Database' }, icon: '🗃' },
  { key: 'DEVOPS', label: { en: 'DevOps', vi: 'DevOps' }, icon: '⚙' },
  { key: 'WEB_DEVELOPMENT', label: { en: 'Web', vi: 'Web' }, icon: '🌐' },
];

const LANG_FILTERS = [
  { key: '', label: { en: 'All', vi: 'Tất cả' }, icon: null },
  { key: 'vi', label: { en: '🇻🇳 Vietnam', vi: '🇻🇳 Việt Nam' }, icon: null },
  { key: 'en', label: { en: '🌎 International', vi: '🌎 Quốc tế' }, icon: null },
];

function timeAgo(dateStr) {
  if (!dateStr) return '';
  const now = new Date();
  const date = new Date(dateStr);
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString();
}

function getCategoryColor(cat) {
  const colors = {
    JAVA: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
    SPRING: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
    REACT: 'bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-400',
    BACKEND: 'bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400',
    AI: 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400',
    DOCKER: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    DATABASE: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
    DEVOPS: 'bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400',
    WEB_DEVELOPMENT: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400',
    TYPESCRIPT: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    PYTHON: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
    CLOUD: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400',
    CYBERSECURITY: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    GENERAL_TECH: 'bg-slate-100 text-slate-700 dark:bg-slate-700/30 dark:text-slate-400',
  };
  return colors[cat] || colors.GENERAL_TECH;
}

const TechNews = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language === 'vi' ? 'vi' : 'en';

  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState('');
  const [activeLang, setActiveLang] = useState('');
  const [imgErrors, setImgErrors] = useState({});

  const fetchNews = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (activeCategory) params.set('category', activeCategory);
      if (activeLang) params.set('language', activeLang);
      params.set('limit', '20');

      const res = await api.get(`/news?${params.toString()}`);
      setNews(res.data.items || []);
    } catch (err) {
      console.error('Failed to fetch news:', err);
      setError(true);
      setNews([]);
    } finally {
      setLoading(false);
    }
  }, [activeCategory, activeLang]);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  const handleImgError = (id) => {
    setImgErrors(prev => ({ ...prev, [id]: true }));
  };

  const featured = news.length > 0 ? news[0] : null;
  const latest = news.slice(1, 8);

  // --- Skeleton ---
  const Skeleton = () => (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
      <div className="lg:col-span-3 animate-pulse">
        <div className="w-full h-52 bg-slate-200 dark:bg-slate-800 rounded-2xl mb-4" />
        <div className="h-5 bg-slate-200 dark:bg-slate-800 rounded w-3/4 mb-3" />
        <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-full mb-2" />
        <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-2/3" />
      </div>
      <div className="lg:col-span-2 space-y-4 animate-pulse">
        {[1,2,3,4].map(i => (
          <div key={i} className="flex gap-3">
            <div className="w-16 h-16 bg-slate-200 dark:bg-slate-800 rounded-xl shrink-0" />
            <div className="flex-1 space-y-2 py-1">
              <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-full" />
              <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-2/3" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // --- Error State ---
  const ErrorState = () => (
    <div className="text-center py-12">
      <AlertTriangle className="w-10 h-10 text-amber-500 mx-auto mb-3" />
      <p className="font-bold text-slate-700 dark:text-slate-300 mb-1">
        {lang === 'vi' ? 'Không thể tải tin tức lúc này.' : 'Unable to load news right now.'}
      </p>
      <button
        onClick={fetchNews}
        className="mt-3 inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-colors"
      >
        <RefreshCw className="w-4 h-4" />
        {lang === 'vi' ? 'Thử lại' : 'Retry'}
      </button>
    </div>
  );

  // --- Empty State ---
  const EmptyState = () => (
    <div className="text-center py-12">
      <Newspaper className="w-10 h-10 text-slate-400 mx-auto mb-3" />
      <p className="font-medium text-slate-500 dark:text-slate-400">
        {lang === 'vi' ? 'Không tìm thấy tin tức phù hợp.' : 'No matching news found.'}
      </p>
    </div>
  );

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-6 pt-6 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center justify-between mb-1">
          <h2 className="text-xl font-black text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Newspaper className="w-5 h-5 text-indigo-500" />
            {lang === 'vi' ? 'Tin công nghệ' : 'Technology News'}
          </h2>
        </div>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          {lang === 'vi' ? 'Tin tức công nghệ và lập trình mới nhất' : 'Latest technology & developer news'}
        </p>
      </div>

      {/* Filters */}
      <div className="px-6 py-3 border-b border-slate-100 dark:border-slate-800 space-y-2">
        {/* Language filter */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          <Globe className="w-4 h-4 text-slate-400 shrink-0" />
          {LANG_FILTERS.map(f => (
            <button
              key={f.key}
              onClick={() => setActiveLang(f.key)}
              className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                activeLang === f.key
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {f.label[lang]}
            </button>
          ))}
        </div>
        {/* Category filter */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          <Filter className="w-4 h-4 text-slate-400 shrink-0" />
          {CATEGORIES.map(c => (
            <button
              key={c.key}
              onClick={() => setActiveCategory(c.key)}
              className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                activeCategory === c.key
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {c.icon ? `${c.icon} ` : ''}{c.label[lang]}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {loading ? (
          <Skeleton />
        ) : error ? (
          <ErrorState />
        ) : news.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            {/* Featured Article */}
            {featured && (
              <a
                href={featured.url}
                target="_blank"
                rel="noopener noreferrer"
                className="lg:col-span-3 group block"
              >
                {/* Image */}
                {featured.image_url && !imgErrors[featured.id] ? (
                  <div className="w-full h-52 rounded-2xl overflow-hidden mb-4 bg-slate-100 dark:bg-slate-800">
                    <img
                      src={featured.image_url}
                      alt=""
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={() => handleImgError(featured.id)}
                    />
                  </div>
                ) : (
                  <div className="w-full h-32 rounded-2xl mb-4 bg-gradient-to-br from-indigo-500/10 to-blue-500/10 dark:from-indigo-900/30 dark:to-blue-900/30 flex items-center justify-center">
                    <Newspaper className="w-12 h-12 text-indigo-300 dark:text-indigo-700" />
                  </div>
                )}

                {/* Category badge */}
                {featured.category && (
                  <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider mb-2 ${getCategoryColor(featured.category)}`}>
                    {featured.category.replace('_', ' ')}
                  </span>
                )}

                <h3 className="text-lg font-black text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors mb-2 line-clamp-2">
                  {featured.title}
                </h3>
                {featured.summary && (
                  <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-3 mb-3">{featured.summary}</p>
                )}
                <div className="flex items-center gap-3 text-xs font-bold text-slate-400 dark:text-slate-500">
                  <span className="uppercase tracking-wider">{featured.source_name}</span>
                  {featured.published_at && (
                    <>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {timeAgo(featured.published_at)}
                      </span>
                    </>
                  )}
                  <ExternalLink className="w-3.5 h-3.5 ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-indigo-500" />
                </div>
              </a>
            )}

            {/* Latest News List */}
            <div className="lg:col-span-2 space-y-1">
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3">
                {lang === 'vi' ? 'Tin mới nhất' : 'Latest News'}
              </h4>
              {latest.map(item => (
                <a
                  key={item.id}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex gap-3 p-2.5 -mx-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                >
                  {/* Thumbnail */}
                  {item.image_url && !imgErrors[item.id] ? (
                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 shrink-0">
                      <img
                        src={item.image_url}
                        alt=""
                        className="w-full h-full object-cover"
                        onError={() => handleImgError(item.id)}
                      />
                    </div>
                  ) : (
                    <div className="w-16 h-16 rounded-xl bg-slate-100 dark:bg-slate-800 shrink-0 flex items-center justify-center">
                      <Newspaper className="w-5 h-5 text-slate-300 dark:text-slate-600" />
                    </div>
                  )}

                  <div className="flex-1 min-w-0">
                    {item.category && (
                      <span className={`inline-block px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider mb-1 ${getCategoryColor(item.category)}`}>
                        {item.category.replace('_', ' ')}
                      </span>
                    )}
                    <h5 className="text-sm font-bold text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2 leading-snug">
                      {item.title}
                    </h5>
                    <div className="flex items-center gap-2 text-[10px] font-semibold text-slate-400 dark:text-slate-500 mt-1">
                      <span className="uppercase tracking-wider">{item.source_name}</span>
                      {item.published_at && (
                        <>
                          <span>·</span>
                          <span>{timeAgo(item.published_at)}</span>
                        </>
                      )}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TechNews;
