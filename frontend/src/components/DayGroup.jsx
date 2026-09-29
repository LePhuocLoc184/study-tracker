import React, { useState } from 'react';
import TaskCard from './TaskCard';
import { Calendar, ChevronDown, ChevronUp } from 'lucide-react';

const DayGroup = ({ day, tasks, activeUser, onStatusChange, onNoteSave }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  // Calculate day progress
  const totalTasks = tasks.length * 2;
  const completedTasks = tasks.reduce((acc, task) => {
    return acc + (task.userACompleted ? 1 : 0) + (task.userBCompleted ? 1 : 0);
  }, 0);
  const isDayComplete = totalTasks > 0 && completedTasks === totalTasks;

  return (
    <div className="bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden">
      
      {/* Header */}
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 hover:bg-slate-800/50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${isDayComplete ? 'bg-indigo-500/20 text-indigo-400' : 'bg-slate-800 text-slate-400'}`}>
            <Calendar size={20} />
          </div>
          <div className="text-left">
            <h2 className="text-lg font-semibold text-slate-200">Day {day}</h2>
            <p className="text-sm text-slate-500">
              {completedTasks} / {totalTasks} tasks completed
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          {/* Visual Mini Progress Bar */}
          <div className="hidden sm:block w-32 h-2 bg-slate-800 rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-500 ${isDayComplete ? 'bg-gradient-to-r from-emerald-400 to-indigo-500' : 'bg-slate-500'}`}
              style={{ width: `${(completedTasks / totalTasks) * 100}%` }}
            />
          </div>
          
          <div className="text-slate-400">
            {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </div>
        </div>
      </button>

      {/* Task List */}
      {isExpanded && (
        <div className="p-4 pt-0 border-t border-slate-800/50 mt-2 space-y-3">
          {tasks.map(task => (
            <TaskCard 
              key={task.id} 
              task={task} 
              activeUser={activeUser}
              onStatusChange={onStatusChange}
              onNoteSave={onNoteSave}
            />
          ))}
        </div>
      )}

    </div>
  );
};

export default DayGroup;
