import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Flame, Bell } from 'lucide-react';

const WelcomeHeader = ({ progress, tasks, currentDay, isUserA }) => {
  const { user } = useAuth();
  const [showReminder, setShowReminder] = useState(true);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const getMotivation = () => {
    if (!progress) return null;

    const myPct = progress.current_user?.progress || 0;
    const partnerPct = progress.other_user?.progress || 0;
    const partnerName = progress.other_user_name || 'Partner';
    
    // Check if tasks completed but no note
    if (tasks && tasks.length > 0 && currentDay) {
      const dTasks = tasks.filter(t => t.day === currentDay);
      if (dTasks.length > 0) {
        const completedCount = dTasks.filter(tsk => 
          isUserA ? (tsk.user_a_completed ?? tsk.userACompleted) : (tsk.user_b_completed ?? tsk.userBCompleted)
        ).length;
        
        const allDone = completedCount === dTasks.length;
        const initialNote = isUserA ? dTasks[0].user_a_note : dTasks[0].user_b_note;
        const hasValidNote = initialNote && initialNote.trim().length >= 30;
        
        if (allDone && !hasValidNote) {
          return { text: `📝 Mày đã làm hết task nhưng chưa ghi Study Note Day ${currentDay}.`, type: 'warning' };
        }
      }
    }

    if (myPct === 0 && partnerPct === 0) {
      return { text: "🔔 Hôm nay chưa có progress. Vào học đi.", type: 'info' };
    }
    
    if (partnerPct > myPct) {
      return { text: `🔥 ${partnerName} vượt mặt mày rồi kìa 💀 (${partnerPct}% > ${myPct}%)`, type: 'danger' };
    } else if (myPct > partnerPct) {
      return { text: `😎 Đang dẫn trước ${partnerName} rồi. Đừng để bị vượt.`, type: 'success' };
    } else {
      return { text: `🤝 Hai đứa đang ngang nhau. Đứa nào lười trước là thua.`, type: 'info' };
    }
  };

  const motivation = getMotivation();

  const getStyle = (type) => {
    switch (type) {
      case 'warning': return "text-amber-600 dark:text-amber-500 bg-amber-50 dark:bg-amber-900/20 border-amber-100 dark:border-amber-800/30";
      case 'danger': return "text-red-600 dark:text-red-500 bg-red-50 dark:bg-red-900/20 border-red-100 dark:border-red-800/30";
      case 'success': return "text-emerald-600 dark:text-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 border-emerald-100 dark:border-emerald-800/30";
      default: return "text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20 border-indigo-100 dark:border-indigo-800/30";
    }
  };



  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
        {getGreeting()}, {user?.name} 👋
      </h1>
      {motivation && showReminder ? (
        <div className={`flex items-center gap-2 mt-2 text-sm font-medium px-3 py-1.5 rounded-lg border inline-flex transition-all ${getStyle(motivation.type)}`}>
          {motivation.type === 'danger' || motivation.type === 'success' ? <Flame className="w-4 h-4" /> : <Bell className="w-4 h-4" />}
          {motivation.text}
          <button onClick={() => setShowReminder(false)} className="ml-2 opacity-50 hover:opacity-100">&times;</button>
        </div>
      ) : (
        <p className="text-slate-500 dark:text-slate-400 mt-1">Continue your learning journey.</p>
      )}
    </div>
  );
};

export default WelcomeHeader;
