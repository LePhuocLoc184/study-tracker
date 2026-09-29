import React from 'react';
import { PHASES, STATUS_FILTERS } from '../../utils/constants';
import { Filter } from 'lucide-react';

const Roadmap = ({ phaseFilter, setPhaseFilter, statusFilter, setStatusFilter }) => {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 flex-wrap">
      {/* Phase pills */}
      <div className="flex items-center gap-2 flex-wrap">
        {PHASES.map(phase => (
          <button
            key={phase}
            onClick={() => setPhaseFilter(phase)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              phaseFilter === phase
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:bg-slate-50'
            }`}
          >
            {phase === 'All' ? 'All Phases' : phase}
          </button>
        ))}
      </div>

      {/* Status filter */}
      <div className="flex items-center gap-2">
        <Filter className="w-4 h-4 text-slate-400" />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-medium text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
        >
          {STATUS_FILTERS.map(s => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Roadmap;
