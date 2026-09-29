import { useState, useEffect, useCallback } from 'react';
import { fetchTasks, fetchProgress, updateTaskStatus, updateTaskNote, initTasks } from '../services/api';

export const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadData = useCallback(async () => {
    try {
      setError(null);
      const [tasksData, progressData] = await Promise.all([
        fetchTasks(),
        fetchProgress()
      ]);
      setTasks(tasksData);
      setProgress(progressData);
    } catch (err) {
      if (err.response?.status !== 401) {
        setError('Unable to connect to the learning server. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const toggleStatus = async (taskId, completed) => {
    // Optimistic update
    const previousTasks = [...tasks];
    setTasks(prev => prev.map(t => {
      if (t.id === taskId) {
        // We don't know which field from frontend, just mark optimistically
        return { ...t, _optimisticCompleted: completed };
      }
      return t;
    }));

    try {
      await updateTaskStatus(taskId, completed);
      // Reload to get real state from backend
      await loadData();
    } catch (err) {
      setTasks(previousTasks);
      if (err.response?.status !== 401) {
        setError('Failed to update task status. Please try again.');
      }
    }
  };

  const saveNote = async (taskId, note) => {
    try {
      await updateTaskNote(taskId, note);
      await loadData();
    } catch (err) {
      if (err.response?.status !== 401) {
        setError('Failed to save note. Please try again.');
      }
    }
  };

  const seedTasks = async (seedData) => {
    try {
      await initTasks(seedData);
      await loadData();
    } catch (err) {
      if (err.response?.status !== 401) {
        setError('Failed to seed tasks.');
      }
    }
  };

  return {
    tasks,
    progress,
    loading,
    error,
    toggleStatus,
    saveNote,
    seedTasks,
    refreshData: loadData,
    clearError: () => setError(null)
  };
};
