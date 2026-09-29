import React, { useState, useEffect } from 'react';
import { Check, MessageSquare, ChevronDown, ChevronUp } from 'lucide-react';

const TaskCard = ({ task, activeUser, onStatusChange, onNoteSave }) => {
  const [isNotesOpen, setIsNotesOpen] = useState(false);
  const [localNoteA, setLocalNoteA] = useState(task.userANote || '');
  const [localNoteB, setLocalNoteB] = useState(task.userBNote || '');
  
  // Update local state if props change (e.g. from websocket or refetch)
  useEffect(() => {
    setLocalNoteA(task.userANote || '');
    setLocalNoteB(task.userBNote || '');
  }, [task.userANote, task.userBNote]);

  const handleNoteDebounceSave = (user, note) => {
    // We could use a proper debounce here, but for simplicity we'll just have a save button or save on blur
    onNoteSave(task.id, user, note);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-lg p-4 hover:border-slate-700 transition-colors">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        
        {/* Task Info */}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
              {task.phase}
            </span>
          </div>
          <h3 className="text-lg font-medium text-slate-100">{task.title}</h3>
          <p className="text-sm text-slate-400 mt-1">{task.topic}</p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-4">
          {/* User A Checkbox */}
          <button 
            onClick={() => onStatusChange(task.id, 'user_a', !task.userACompleted)}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all border-2 ${
              task.userACompleted 
                ? 'bg-emerald-500/20 border-emerald-500 text-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.3)]' 
                : 'border-slate-700 text-transparent hover:border-emerald-500/50'
            } ${activeUser !== 'user_a' ? 'opacity-60 grayscale' : ''}`}
            title="Lộc (User A)"
            disabled={activeUser !== 'user_a'}
          >
            <Check size={20} className={task.userACompleted ? 'opacity-100' : 'opacity-0'} />
          </button>

          {/* User B Checkbox */}
          <button 
            onClick={() => onStatusChange(task.id, 'user_b', !task.userBCompleted)}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all border-2 ${
              task.userBCompleted 
                ? 'bg-indigo-500/20 border-indigo-500 text-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.3)]' 
                : 'border-slate-700 text-transparent hover:border-indigo-500/50'
            } ${activeUser !== 'user_b' ? 'opacity-60 grayscale' : ''}`}
            title="Hưng (User B)"
            disabled={activeUser !== 'user_b'}
          >
            <Check size={20} className={task.userBCompleted ? 'opacity-100' : 'opacity-0'} />
          </button>

          <button 
            onClick={() => setIsNotesOpen(!isNotesOpen)}
            className={`ml-2 p-2 rounded-lg transition-colors ${isNotesOpen ? 'bg-slate-800 text-slate-200' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'}`}
          >
            <MessageSquare size={20} />
          </button>
        </div>
      </div>

      {/* Expandable Notes Section */}
      {isNotesOpen && (
        <div className="mt-4 pt-4 border-t border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-4 duration-300">
          
          {/* User A Note */}
          <div className="bg-slate-950/50 rounded-lg p-3 border border-emerald-900/30">
            <label className="block text-xs font-medium text-emerald-400 mb-2">Lộc's Notes</label>
            <textarea
              className="w-full bg-slate-900 border border-slate-800 rounded-md p-2 text-sm text-slate-300 focus:outline-none focus:border-emerald-500/50 resize-none h-24"
              placeholder="Add your notes here..."
              value={localNoteA}
              onChange={(e) => setLocalNoteA(e.target.value)}
              onBlur={(e) => handleNoteDebounceSave('user_a', e.target.value)}
              readOnly={activeUser !== 'user_a'}
            />
          </div>

          {/* User B Note */}
          <div className="bg-slate-950/50 rounded-lg p-3 border border-indigo-900/30">
            <label className="block text-xs font-medium text-indigo-400 mb-2">Hưng's Notes</label>
            <textarea
              className="w-full bg-slate-900 border border-slate-800 rounded-md p-2 text-sm text-slate-300 focus:outline-none focus:border-indigo-500/50 resize-none h-24"
              placeholder="Add your notes here..."
              value={localNoteB}
              onChange={(e) => setLocalNoteB(e.target.value)}
              onBlur={(e) => handleNoteDebounceSave('user_b', e.target.value)}
              readOnly={activeUser !== 'user_b'}
            />
          </div>

        </div>
      )}
    </div>
  );
};

export default TaskCard;
