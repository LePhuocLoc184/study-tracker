import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Target } from 'lucide-react';

const MainProgressCard = ({ progress }) => {
  const navigate = useNavigate();
  const completed = progress?.current_user?.completed || 0;
  const total = progress?.total_tasks || 0;
  const pct = progress?.current_user?.progress || 0;

  return (
    <div className="bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-2xl p-6 lg:p-8 text-white shadow-lg shadow-indigo-200 relative overflow-hidden">
      {/* Decorative bg element */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/3 translate-x-1/4" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/4" />

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-5 h-5 text-indigo-200" />
              <span className="text-indigo-200 text-sm font-medium">Your Learning Progress</span>
            </div>
            <h2 className="text-xl lg:text-2xl font-bold">Java Full Stack — 30-Day Roadmap</h2>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex items-end gap-2 mb-3">
            <span className="text-4xl lg:text-5xl font-bold">{Math.round(pct)}%</span>
            <span className="text-indigo-200 mb-1.5">{completed} / {total} tasks</span>
          </div>
          <div className="w-full h-3 bg-white/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-white rounded-full transition-all duration-700 ease-out"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>

        <button
          onClick={() => navigate('/roadmap')}
          className="flex items-center gap-2 mt-4 px-5 py-2.5 bg-white/15 hover:bg-white/25 rounded-xl text-sm font-medium transition-colors backdrop-blur-sm"
        >
          Continue Learning
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default MainProgressCard;
