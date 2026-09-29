import React from 'react';
import { Users } from 'lucide-react';

const PartnerProgress = ({ progress }) => {
  const currentName = progress?.current_user_name || 'You';
  const otherName = progress?.other_user_name || 'Study Partner';
  const currentCompleted = progress?.current_user?.completed || 0;
  const otherCompleted = progress?.other_user?.completed || 0;
  const currentPct = progress?.current_user?.progress || 0;
  const otherPct = progress?.other_user?.progress || 0;
  const total = progress?.total_tasks || 0;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-5">
        <Users className="w-5 h-5 text-indigo-500" />
        <h3 className="text-lg font-semibold text-slate-900">Study Partner Progress</h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Current User */}
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
              <span className="text-xs font-bold text-emerald-600">
                {currentName.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-900">{currentName}</p>
              <p className="text-xs text-slate-400">You</p>
            </div>
          </div>
          <div className="flex items-end justify-between mb-2">
            <span className="text-2xl font-bold text-slate-900">{Math.round(currentPct)}%</span>
            <span className="text-xs text-slate-400">{currentCompleted}/{total}</span>
          </div>
          <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500 rounded-full transition-all duration-500" style={{ width: `${currentPct}%` }} />
          </div>
        </div>

        {/* Other User */}
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
              <span className="text-xs font-bold text-indigo-600">
                {otherName.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-900">{otherName}</p>
              <p className="text-xs text-slate-400">Study Partner</p>
            </div>
          </div>
          <div className="flex items-end justify-between mb-2">
            <span className="text-2xl font-bold text-slate-900">{Math.round(otherPct)}%</span>
            <span className="text-xs text-slate-400">{otherCompleted}/{total}</span>
          </div>
          <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
            <div className="h-full bg-indigo-500 rounded-full transition-all duration-500" style={{ width: `${otherPct}%` }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerProgress;
