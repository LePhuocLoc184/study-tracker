import React from 'react';
import { Search, Filter } from 'lucide-react';

const FilterBar = ({ 
  phaseFilter, setPhaseFilter, 
  searchQuery, setSearchQuery, 
  statusFilter, setStatusFilter 
}) => {
  const phases = ['All', 'Java Core', 'Spring Core', 'REST & JPA', 'Security & Docker'];
  const statuses = ['All', 'My Pending', 'Both Completed'];

  return (
    <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl shadow-lg flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
      
      {/* Search */}
      <div className="relative w-full md:w-64">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
        <input 
          type="text" 
          placeholder="Search topics..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-slate-950 border border-slate-700 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all text-slate-200"
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
        {/* Phase Filter */}
        <div className="flex items-center gap-2">
          <Filter size={16} className="text-slate-500" />
          <select 
            value={phaseFilter}
            onChange={(e) => setPhaseFilter(e.target.value)}
            className="bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all text-slate-200 cursor-pointer"
          >
            {phases.map(p => (
              <option key={p} value={p}>{p === 'All' ? 'All Phases' : p}</option>
            ))}
          </select>
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-2">
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all text-slate-200 cursor-pointer"
          >
            {statuses.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

    </div>
  );
};

export default FilterBar;
