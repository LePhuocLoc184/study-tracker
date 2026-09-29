import React from 'react';
import { formatDuration } from '../../utils/timeUtils';
import { Play, Pause, CheckSquare } from 'lucide-react';
import { useStudySession } from '../../hooks/useStudySession';

const StudyTimer = ({ currentDay, onSessionUpdate }) => {
  const { session, elapsed, loading, startSession, pauseSession, resumeSession, finishSession } = useStudySession();

  // Notify parent when session changes (e.g. to update stats), but not on every tick
  React.useEffect(() => {
    if (onSessionUpdate) {
      onSessionUpdate(session?.status);
    }
  }, [session?.status, onSessionUpdate]);

  // Render stable layout for timer
  const timeString = formatDuration(elapsed);

  return (
    <>
      <div className="text-4xl font-black text-slate-800 dark:text-slate-100 tracking-wider mb-2 tabular-nums font-mono">
        {timeString}
      </div>
      <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-6 uppercase tracking-widest">
        Study Time
      </p>

      <div className="w-full flex flex-col gap-3">
        {!session || session.status === 'COMPLETED' ? (
          <button 
            onClick={() => startSession('java_backend', currentDay)}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-md transition-colors flex items-center justify-center gap-2"
            disabled={loading}
          >
            <Play className="w-5 h-5 fill-current" />
            Start Session
          </button>
        ) : (
          <div className="flex gap-2">
            {session.status === 'ACTIVE' ? (
              <button 
                onClick={pauseSession}
                className="flex-1 py-3 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl shadow-md transition-colors flex items-center justify-center gap-2"
              >
                <Pause className="w-5 h-5 fill-current" />
                Pause
              </button>
            ) : (
              <button 
                onClick={resumeSession}
                className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-md transition-colors flex items-center justify-center gap-2"
              >
                <Play className="w-5 h-5 fill-current" />
                Resume
              </button>
            )}
            
            <button 
              onClick={finishSession}
              className="flex-1 py-3 bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-800 dark:text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              <CheckSquare className="w-5 h-5" />
              Finish
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default React.memo(StudyTimer);
