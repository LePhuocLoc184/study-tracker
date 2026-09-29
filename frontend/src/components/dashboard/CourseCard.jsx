import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, BookOpen } from 'lucide-react';
import { getPhaseColor } from '../../utils/constants';

const CourseCard = ({ phase, tasks }) => {
  const navigate = useNavigate();
  const colors = getPhaseColor(phase);
  const totalLessons = tasks.length;
  const completedCount = tasks.filter(t => t.user_a_completed || t.userACompleted).length; // current user
  const pct = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  // Estimate days covered
  const days = [...new Set(tasks.map(t => t.day))].length;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md hover:border-slate-300 transition-all group">
      <div className={`inline-flex px-2.5 py-1 rounded-lg text-xs font-medium mb-3 ${colors.bg} ${colors.text}`}>
        {phase}
      </div>

      <h3 className="text-base font-semibold text-slate-900 mb-1">{phase} Fundamentals</h3>
      <p className="text-sm text-slate-500 mb-4">{days} days • {totalLessons} lessons</p>

      <div className="mb-4">
        <div className="flex justify-between text-xs mb-1.5">
          <span className="text-slate-500">{pct}% complete</span>
          <span className="text-slate-400">{completedCount}/{totalLessons}</span>
        </div>
        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-indigo-500 rounded-full transition-all duration-500"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      <button
        onClick={() => navigate('/roadmap')}
        className="flex items-center gap-1.5 text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors group-hover:translate-x-0.5"
      >
        Continue learning
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
};

export default CourseCard;
