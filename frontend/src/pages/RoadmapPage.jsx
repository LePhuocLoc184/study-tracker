import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useTasks } from '../hooks/useTasks';
import { useAuth } from '../context/AuthContext';
import RoadmapFilter from '../components/roadmap/Roadmap';
import DayCard from '../components/roadmap/DayCard';
import { AlertCircle } from 'lucide-react';

const RoadmapPage = () => {
  const { searchQuery } = useOutletContext();
  const { tasks, loading, error, toggleStatus, saveNote } = useTasks();
  const { user } = useAuth();
  const { t } = useTranslation();
  
  const [phaseFilter, setPhaseFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  if (loading) {
    return (
      <div className="p-6 md:p-8 max-w-7xl mx-auto flex justify-center items-center h-64">
        <div className="flex flex-col items-center gap-3">
          <svg className="animate-spin h-8 w-8 text-indigo-600 dark:text-indigo-400" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <span className="text-slate-500 dark:text-slate-400 font-medium text-sm">Loading roadmap...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 md:p-8 max-w-7xl mx-auto">
        <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-4 rounded-xl flex items-center gap-3">
          <AlertCircle className="w-5 h-5" />
          {error}
        </div>
      </div>
    );
  }

  const isUserA = user?.email === 'loc@gmail.com';

  // Apply filters
  let filteredTasks = tasks;

  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    filteredTasks = filteredTasks.filter(tItem => 
      tItem.title.toLowerCase().includes(q) || 
      tItem.topic.toLowerCase().includes(q) || 
      tItem.phase.toLowerCase().includes(q)
    );
  }

  if (phaseFilter !== 'All') {
    filteredTasks = filteredTasks.filter(tItem => tItem.phase === phaseFilter);
  }

  if (statusFilter !== 'All') {
    filteredTasks = filteredTasks.filter(tItem => {
      const isCompleted = isUserA 
        ? (tItem.user_a_completed ?? tItem.userACompleted) 
        : (tItem.user_b_completed ?? tItem.userBCompleted);
      
      if (statusFilter === 'Completed') return isCompleted;
      if (statusFilter === 'Not Started' || statusFilter === 'In Progress') return !isCompleted;
      return true;
    });
  }

  // Group by day
  const groupedByDay = filteredTasks.reduce((acc, task) => {
    if (!acc[task.day]) {
      acc[task.day] = [];
    }
    acc[task.day].push(task);
    return acc;
  }, {});

  const days = Object.keys(groupedByDay).map(Number).sort((a, b) => a - b);

  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto dark:text-slate-200 transition-colors">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">{t('roadmap.title', '30-Day Learning Roadmap')}</h1>
        <p className="text-slate-500 dark:text-slate-400">Track your daily progress and complete lessons.</p>
      </div>

      <div className="mb-6">
        <RoadmapFilter 
          phaseFilter={phaseFilter} 
          setPhaseFilter={setPhaseFilter}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
        />
      </div>

      <div className="space-y-4">
        {days.length > 0 ? (
          days.map(day => (
            <DayCard 
              key={day}
              day={day}
              tasks={groupedByDay[day]}
              onStatusChange={toggleStatus}
              onNoteSave={saveNote}
              currentUserEmail={user?.email}
            />
          ))
        ) : (
          <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 border-dashed">
            <p className="text-slate-500 dark:text-slate-400">No tasks found matching your filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoadmapPage;
