import React from 'react';
import { useOutletContext, useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useTasks } from '../hooks/useTasks';
import { useAuth } from '../context/AuthContext';
import { PlayCircle, ArrowRight, BookOpen } from 'lucide-react';
import WelcomeHeader from '../components/dashboard/WelcomeHeader';
import MainProgressCard from '../components/dashboard/MainProgressCard';
import PartnerProgress from '../components/dashboard/PartnerProgress';
import ProgressScene from '../components/3d/ProgressScene';
import TechNews from '../components/dashboard/TechNews';
import OtherCourses from '../components/dashboard/OtherCourses';
import { PHASES } from '../utils/constants';
import { learningModules, getLearningModule } from '../data/learningModules';
import TodayStudyWidget from '../components/dashboard/TodayStudyWidget';
import StudyStatsCard from '../components/dashboard/StudyStatsCard';

const Dashboard = () => {
  const { searchQuery } = useOutletContext();
  const { tasks, progress, loading } = useTasks();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [sessionStatus, setSessionStatus] = React.useState(null);

  if (loading) {
    return (
      <div className="p-6 md:p-8 max-w-7xl mx-auto flex justify-center items-center h-64">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/50 rounded-xl" />
          <div className="h-4 w-32 bg-slate-200 dark:bg-slate-800 rounded" />
        </div>
      </div>
    );
  }

  // Determine current day based on progress
  const isUserA = user?.email === 'loc@gmail.com';
  let currentDay = 1;
  let currentDayTasks = [];
  
  if (tasks.length > 0) {
    const tasksByDay = tasks.reduce((acc, task) => {
      if (!acc[task.day]) acc[task.day] = [];
      acc[task.day].push(task);
      return acc;
    }, {});

    const sortedDays = Object.keys(tasksByDay).map(Number).sort((a, b) => a - b);
    
    for (const d of sortedDays) {
      const dTasks = tasksByDay[d];
      const completedCount = dTasks.filter(tsk => 
        isUserA ? (tsk.user_a_completed ?? tsk.userACompleted) : (tsk.user_b_completed ?? tsk.userBCompleted)
      ).length;
      
      const noteContent = isUserA ? (dTasks[0]?.user_a_note ?? dTasks[0]?.userANote) : (dTasks[0]?.user_b_note ?? dTasks[0]?.userBNote);
      const hasValidNote = noteContent && noteContent.trim().length >= 30;
      
      if (completedCount < dTasks.length || !hasValidNote) {
        currentDay = d;
        currentDayTasks = dTasks;
        break;
      }
    }
    
    // If all are completed, show the last available day
    if (currentDayTasks.length === 0 && sortedDays.length > 0) {
      currentDay = sortedDays[sortedDays.length - 1];
      currentDayTasks = tasksByDay[currentDay];
    }
  }
  
  const phase = currentDayTasks[0]?.phase || '';
  const moduleId = `day-${currentDay}`;
  
  const currentModule = getLearningModule(moduleId);
  
  const currentLang = i18n.language === 'vi' ? 'vi' : 'en';
  const displayTitle = currentModule?.title?.[currentLang] || currentModule?.title?.en || '';
  const displayDesc = currentModule?.description?.[currentLang] || currentModule?.description?.en || '';

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8 dark:text-slate-200 transition-colors">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <WelcomeHeader progress={progress} tasks={tasks} currentDay={currentDay} isUserA={isUserA} />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="xl:col-span-2 space-y-6">
          
          {/* Today's Study (Replaces Continue Learning Banner) */}
          <TodayStudyWidget
            currentDay={currentDay}
            displayTitle={displayTitle}
            displayDesc={displayDesc}
            completedTasks={currentDayTasks.filter(tsk => 
              isUserA ? (tsk.user_a_completed ?? tsk.userACompleted) : (tsk.user_b_completed ?? tsk.userBCompleted)
            ).length}
            totalTasks={currentDayTasks.length}
            moduleId={moduleId}
            hasValidNote={(() => {
              const noteContent = currentDayTasks.length > 0 ? (isUserA ? (currentDayTasks[0].user_a_note ?? currentDayTasks[0].userANote) : (currentDayTasks[0].user_b_note ?? currentDayTasks[0].userBNote)) : '';
              return noteContent && noteContent.trim().length >= 30;
            })()}
            onSessionUpdate={setSessionStatus}
          />

          <MainProgressCard progress={progress} />
          
          {/* Technology News — PRIMARY section */}
          <TechNews />
          
          {/* Upcoming Lessons */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">{t('dashboard.upcoming', 'Upcoming Lessons')}</h2>
              <Link to="/roadmap" className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:underline">View Roadmap</Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               {/* Quick scaffold for next 2 days */}
               {[currentDay + 1, currentDay + 2].map(d => {
                 if (d > 30) return null;
                 const dTasks = tasks.filter(t => t.day === d);
                 const p = dTasks[0]?.phase || 'Upcoming Phase';
                 const tp = dTasks[0]?.topic || p;
                 return (
                   <div key={d} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 flex flex-col hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors cursor-pointer" onClick={() => navigate('/roadmap')}>
                     <div className="flex items-center gap-2 mb-2 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                        <BookOpen className="w-4 h-4" /> Day {String(d).padStart(2, '0')}
                     </div>
                     <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-1">{tp}</h3>
                     <p className="text-sm text-slate-500 dark:text-slate-400 mt-auto pt-2">{p}</p>
                   </div>
                 );
               })}
            </div>
          </div>
          
          <OtherCourses />
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <StudyStatsCard refreshTrigger={sessionStatus} />
          <PartnerProgress progress={progress} />
          
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm hidden sm:block">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-4">Learning Orbit</h3>
            <div className="h-64 w-full bg-slate-50 dark:bg-slate-950 rounded-xl overflow-hidden border border-slate-100 dark:border-slate-800 relative">
              <ProgressScene 
                userAProgress={progress?.current_user?.progress || 0}
                userBProgress={progress?.other_user?.progress || 0}
              />
              <div className="absolute bottom-3 left-0 w-full flex justify-center gap-4 text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 bg-white/50 dark:bg-black/50 py-1 backdrop-blur-sm">
                <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-emerald-500" /> You</span>
                <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-indigo-500" /> Partner</span>
              </div>
            </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Dashboard;
