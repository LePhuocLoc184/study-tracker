import React, { useState, useEffect } from 'react';
import { Check, StickyNote, ChevronDown, ChevronUp, Save, BookOpen, User } from 'lucide-react';
import { getPhaseColor } from '../../utils/constants';

const TaskCard = ({ task, onStatusChange, onNoteSave, currentUserEmail }) => {
  const [notesOpen, setNotesOpen] = useState(false);

  const isUserA = currentUserEmail === 'loc@gmail.com';
  const myCompleted = task._optimisticCompleted !== undefined 
    ? task._optimisticCompleted 
    : (isUserA
      ? (task.user_a_completed ?? task.userACompleted)
      : (task.user_b_completed ?? task.userBCompleted));
  
  const partnerCompleted = isUserA
    ? (task.user_b_completed ?? task.userBCompleted)
    : (task.user_a_completed ?? task.userACompleted);

  const partnerName = isUserA ? 'Hưng' : 'Lộc';

  // Note state removed from here as it is now at the Day level

  const handleToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onStatusChange(task.id, !myCompleted);
  };



  const colors = getPhaseColor(task.phase);

  return (
    <div className={`bg-white rounded-xl border transition-all ${myCompleted ? 'border-emerald-200 bg-emerald-50/30' : 'border-slate-200 hover:border-slate-300 hover:shadow-sm'}`}>
      <div className="p-4 flex items-start gap-4">
        {/* Checkbox */}
        <button
          onClick={handleToggle}
          className={`w-6 h-6 mt-0.5 rounded-lg border-2 flex items-center justify-center shrink-0 transition-all ${
            myCompleted
              ? 'bg-emerald-500 border-emerald-500 text-white'
              : 'border-slate-300 hover:border-indigo-400'
          }`}
        >
          {myCompleted && <Check className="w-4 h-4" />}
        </button>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span className={`text-[11px] font-medium px-2 py-0.5 rounded-md ${colors.bg} ${colors.text}`}>
              {task.phase}
            </span>
            {task.topic && (
              <span className="text-[11px] text-slate-400">{task.topic}</span>
            )}
          </div>
          <h4 className={`text-sm font-medium ${myCompleted ? 'text-slate-500 line-through' : 'text-slate-900'}`}>
            {task.title}
          </h4>

          {/* Partner status */}
          <div className="flex items-center gap-3 mt-2 text-xs text-slate-400">
            <span className="flex items-center gap-1">
              <User className="w-3 h-3" />
              {partnerName}: {partnerCompleted ? (
                <span className="text-emerald-500 flex items-center gap-0.5"><Check className="w-3 h-3" />Done</span>
              ) : (
                <span>Pending</span>
              )}
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default TaskCard;
