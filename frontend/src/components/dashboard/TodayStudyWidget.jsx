import React from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import StudyTimer from './StudyTimer';

const TodayStudyWidget = ({ 
  currentDay, 
  displayTitle, 
  displayDesc, 
  completedTasks, 
  totalTasks, 
  moduleId, 
  hasValidNote, 
  onSessionUpdate 
}) => {
  const { t } = useTranslation();

  const pct = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  


  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-lg overflow-hidden group">
      <div className="p-6 md:p-8 flex flex-col md:flex-row gap-8">
        
        {/* Left Side: Info */}
        <div className="flex-1 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-lg text-xs font-bold tracking-wide uppercase">
            Today's Study
          </div>
          
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">Day {currentDay}</span>
              <span className="text-slate-300 dark:text-slate-600">•</span>
              <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">Java Backend</span>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">{displayTitle}</h2>
          </div>
          
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
            <div>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Tasks</p>
              <p className="text-lg font-bold text-slate-900 dark:text-slate-100">{completedTasks} / {totalTasks}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Progress</p>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${pct}%` }} />
                </div>
                <span className="text-sm font-bold text-slate-700 dark:text-slate-300">{pct}%</span>
              </div>
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Note</p>
              <p className={`text-sm font-bold ${hasValidNote ? 'text-emerald-500' : 'text-amber-500'}`}>
                {hasValidNote ? '✓ Completed' : 'Pending'}
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Session Control */}
        <div className="w-full md:w-72 flex flex-col items-center justify-center p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800">
          <div className="w-full flex flex-col gap-3">
            <StudyTimer currentDay={currentDay} onSessionUpdate={onSessionUpdate} />
            
            <Link 
              to={`/learning/${moduleId}`}
              className="w-full py-3 border-2 border-indigo-100 dark:border-indigo-900/50 text-indigo-600 dark:text-indigo-400 font-bold rounded-xl hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-colors flex items-center justify-center gap-2"
            >
              Go to Lesson <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodayStudyWidget;
