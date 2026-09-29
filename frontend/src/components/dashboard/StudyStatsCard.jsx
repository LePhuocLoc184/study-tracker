import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Clock, Calendar, BookOpen, Flame } from 'lucide-react';
import studySessionService from '../../services/studySessionService';
import { formatDurationShort } from '../../utils/timeUtils';

const StudyStatsCard = ({ refreshTrigger }) => {
  const { t } = useTranslation();
  const [stats, setStats] = useState({ todayDurationSeconds: 0, thisWeekDurationSeconds: 0, courseDurationSeconds: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const data = await studySessionService.getStats();
        setStats(data);
      } catch (error) {
        console.error('Failed to fetch stats', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, [refreshTrigger]);

  if (loading) {
    return <div className="animate-pulse bg-slate-100 dark:bg-slate-800 h-32 rounded-2xl" />;
  }

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
      <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
        <Clock className="w-5 h-5 text-indigo-500" /> Study Statistics
      </h3>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 border border-slate-100 dark:border-slate-800/50">
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" /> Today
          </p>
          <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            {formatDurationShort(stats.todayDurationSeconds)}
          </p>
        </div>
        
        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 border border-slate-100 dark:border-slate-800/50">
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
            <Flame className="w-3.5 h-3.5 text-orange-500" /> This Week
          </p>
          <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            {formatDurationShort(stats.thisWeekDurationSeconds)}
          </p>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-slate-600 dark:text-slate-400 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-emerald-500" /> Java Backend Total
          </span>
          <span className="text-sm font-bold text-slate-900 dark:text-slate-100">
            {formatDurationShort(stats.courseDurationSeconds)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default StudyStatsCard;
