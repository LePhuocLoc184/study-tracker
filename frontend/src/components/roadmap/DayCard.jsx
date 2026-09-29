import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { BookOpen, Check, Clock, FileText, ArrowRight, PlayCircle } from 'lucide-react';
import { getPhaseColor } from '../../utils/constants';
import { getLearningModule } from '../../data/learningModules';

const DayCard = ({ day, tasks, currentUserEmail }) => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const isUserA = currentUserEmail === 'loc@gmail.com';
  const completedCount = tasks.filter(t =>
    isUserA ? (t.user_a_completed ?? t.userACompleted) : (t.user_b_completed ?? t.userBCompleted)
  ).length;
  const totalCount = tasks.length;
  const pct = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
  
  const moduleId = `day-${day}`;
  const moduleData = getLearningModule(moduleId);
  
  if (!moduleData) {
    return null;
  }
  
  const currentLang = i18n.language === 'vi' ? 'vi' : 'en';
  const displayTitle = moduleData.title?.[currentLang] || moduleData.title?.en;
  const displayPhase = moduleData.phase?.[currentLang] || moduleData.phase?.en;
  const displayDesc = moduleData.description?.[currentLang] || moduleData.description?.en;
  
  const topicsCovered = [...new Set(tasks.map(tsk => tsk.title))].join(' • ');

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden hover:shadow-md hover:border-slate-300 dark:hover:border-slate-700 transition-all">
      <div className="p-6">
        <div className="flex flex-col md:flex-row md:items-start gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 px-2 py-1 rounded-md">
                DAY {String(day).padStart(2, '0')}
              </span>
              <span className="text-sm font-medium text-slate-500 dark:text-slate-400">{displayPhase}</span>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/30 px-2 py-1 rounded-md">
                {moduleData.difficulty}
              </span>
            </div>
            
            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-1">{displayTitle}</h3>
            <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-3 line-clamp-1">{topicsCovered}</p>
            
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-5 leading-relaxed max-w-2xl line-clamp-2">
              {displayDesc}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-slate-600 dark:text-slate-400">
              <div className="flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-indigo-500" />
                <span>{moduleData.lessons?.length || 0} {t('dayCard.lessons', 'lessons')}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <PlayCircle className="w-4 h-4 text-red-500" />
                <span>{moduleData.videos?.length || 0} {t('dayCard.videos', 'videos')}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-emerald-500" />
                <span>{moduleData.officialResources?.length || 0} docs</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-orange-500" />
                <span>{moduleData.estimatedMinutes} {t('module.minutes', 'min')}</span>
              </div>
            </div>
          </div>

          <div className="w-full md:w-64 flex flex-col md:items-end justify-between shrink-0">
            <div className="w-full h-24 bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 rounded-xl border border-indigo-100/50 dark:border-indigo-800/30 flex items-center justify-center mb-4">
              <BookOpen className="w-8 h-8 text-indigo-200 dark:text-indigo-800" />
            </div>

            <div className="w-full">
              <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
                <span className={pct === 100 ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-500 dark:text-slate-400'}>
                  {pct === 100 ? t('dayCard.completed', 'Completed') : `${t('dayCard.progress', 'Progress')}: ${pct}%`}
                </span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden mb-4">
                <div 
                  className={`h-full rounded-full transition-all duration-500 ${pct === 100 ? 'bg-emerald-500' : 'bg-indigo-500'}`} 
                  style={{ width: `${pct}%` }} 
                />
              </div>

              <button
                onClick={() => navigate(`/learning/${moduleId}`)}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-white dark:bg-slate-900 border-2 border-indigo-600 dark:border-indigo-500 text-indigo-700 dark:text-indigo-400 font-semibold rounded-xl hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-colors"
              >
                {t('dashboard.continue', 'Continue Learning')}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DayCard;
