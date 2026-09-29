export const formatDuration = (seconds) => {
  if (isNaN(seconds) || seconds < 0) return '00:00:00';
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  
  const pad = (num) => num.toString().padStart(2, '0');
  
  return `${pad(h)}:${pad(m)}:${pad(s)}`;
};

export const formatDurationShort = (seconds) => {
  if (isNaN(seconds) || seconds < 0) return '0m';
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  
  if (h > 0) {
    return m > 0 ? `${h}h ${m}m` : `${h}h`;
  }
  return `${m}m`;
};
