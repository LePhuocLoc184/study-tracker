import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useTranslation } from 'react-i18next';
import PartnerProgress from '../components/dashboard/PartnerProgress';
import ProgressScene from '../components/3d/ProgressScene';
import { useTasks } from '../hooks/useTasks';
import { getPhaseColor } from '../utils/constants';

const Progress = () => {
  const { progress, tasks, loading } = useTasks();
  const { user } = useAuth();
  const { t } = useTranslation();

  if (loading) {
    return (
      <div className="p-6 md:p-8 max-w-5xl mx-auto flex justify-center items-center h-64">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/50 rounded-xl" />
          <div className="h-4 w-32 bg-slate-200 dark:bg-slate-800 rounded" />
        </div>
      </div>
    );
  }

  const isUserA = user?.email === 'loc@gmail.com';
  const myProgress = isUserA ? progress?.current_user : progress?.other_user;

  // Group tasks by phase to show detailed stats
  const phaseStats = tasks.reduce((acc, task) => {
    if (!acc[task.phase]) {
      acc[task.phase] = { total: 0, completed: 0 };
    }
    acc[task.phase].total++;
    const isCompleted = isUserA ? (task.user_a_completed ?? task.userACompleted) : (task.user_b_completed ?? task.userBCompleted);
    if (isCompleted) {
      acc[task.phase].completed++;
    }
    return acc;
  }, {});

  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto dark:text-slate-200 transition-colors">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">{t('dashboard.progress', 'Detailed Progress')}</h1>
        <p className="text-slate-500 dark:text-slate-400">Compare your learning stats with your study partner.</p>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm mb-8">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="relative w-48 h-48 shrink-0">
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="96" cy="96" r="88" className="stroke-slate-100 dark:stroke-slate-800" strokeWidth="16" fill="none" />
              <circle 
                cx="96" cy="96" r="88" 
                className="stroke-indigo-600 dark:stroke-indigo-500 transition-all duration-1000" 
                strokeWidth="16" fill="none" 
                strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 88}
                strokeDashoffset={2 * Math.PI * 88 * (1 - (myProgress?.progress || 0) / 100)}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-bold text-slate-900 dark:text-slate-100">{Math.round(myProgress?.progress || 0)}%</span>
              <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Complete</span>
            </div>
          </div>
          
          <div className="flex-1 grid grid-cols-2 gap-6 w-full">
            <div className="bg-emerald-50 dark:bg-emerald-900/20 p-6 rounded-2xl border border-emerald-100 dark:border-emerald-900/30">
              <div className="text-emerald-600 dark:text-emerald-400 font-medium mb-1">Completed Tasks</div>
              <div className="text-3xl font-bold text-emerald-700 dark:text-emerald-300">{myProgress?.completed || 0}</div>
            </div>
            <div className="bg-indigo-50 dark:bg-indigo-900/20 p-6 rounded-2xl border border-indigo-100 dark:border-indigo-900/30">
              <div className="text-indigo-600 dark:text-indigo-400 font-medium mb-1">Total Tasks</div>
              <div className="text-3xl font-bold text-indigo-700 dark:text-indigo-300">{progress?.total_tasks || 0}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="space-y-6">
          <PartnerProgress progress={progress} />
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm h-[400px] flex flex-col">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">Learning Orbit</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
            A visual representation of your combined progress. The outer ring represents your progress, while the inner ring represents your partner.
          </p>
          <div className="flex-1 bg-slate-50 dark:bg-slate-950 rounded-xl overflow-hidden border border-slate-100 dark:border-slate-800 relative">
            <ProgressScene 
              userAProgress={progress?.current_user?.progress || 0}
              userBProgress={progress?.other_user?.progress || 0}
            />
          </div>
        </div>
      </div>

      <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-6">Phase Breakdown</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(phaseStats).map(([phase, stats]) => {
          const pct = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;
          return (
            <div key={phase} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <div className={`w-3 h-3 rounded-full ${getPhaseColor(phase)}`} />
                <h3 className="font-semibold text-slate-900 dark:text-slate-100">{phase}</h3>
              </div>
              <div className="flex justify-between items-end mb-2">
                <span className="text-3xl font-bold text-slate-900 dark:text-slate-100">{pct}%</span>
                <span className="text-sm font-medium text-slate-500 dark:text-slate-400">{stats.completed} / {stats.total}</span>
              </div>
              <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${pct}%` }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Progress;
