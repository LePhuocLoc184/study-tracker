export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

export const PHASES = ['All', 'Java Core', 'Spring Core', 'REST & JPA', 'Security & Docker'];

export const STATUS_FILTERS = ['All', 'Not Started', 'In Progress', 'Completed'];

export const PHASE_COLORS = {
  'Java Core': { bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-200' },
  'Spring Core': { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200' },
  'REST & JPA': { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
  'Security & Docker': { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200' },
};

export const getPhaseColor = (phase) => {
  return PHASE_COLORS[phase] || { bg: 'bg-slate-50', text: 'text-slate-700', border: 'border-slate-200' };
};
