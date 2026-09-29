import { useState, useEffect, useCallback } from 'react';
import studySessionService from '../services/studySessionService';

export const useStudySession = () => {
  const [session, setSession] = useState(null);
  const [elapsed, setElapsed] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchActiveSession = useCallback(async () => {
    try {
      setLoading(true);
      const active = await studySessionService.getActiveSession();
      setSession(active || null);
      if (active) {
        setElapsed(active.durationSeconds || 0);
      }
    } catch (error) {
      console.error('Failed to fetch active session', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchActiveSession();
  }, [fetchActiveSession]);

  useEffect(() => {
    let interval;
    if (session && session.status === 'ACTIVE') {
      interval = setInterval(() => {
        setElapsed(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [session]);

  const startSession = async (courseId, dayNumber) => {
    try {
      const newSession = await studySessionService.startSession(courseId, dayNumber);
      setSession(newSession);
      setElapsed(0);
      return newSession;
    } catch (error) {
      console.error('Failed to start session', error);
      throw error;
    }
  };

  const pauseSession = async () => {
    if (!session) return;
    try {
      const updated = await studySessionService.pauseSession(session.id);
      setSession(updated);
      setElapsed(updated.durationSeconds);
    } catch (error) {
      console.error('Failed to pause session', error);
    }
  };

  const resumeSession = async () => {
    if (!session) return;
    try {
      const updated = await studySessionService.resumeSession(session.id);
      setSession(updated);
    } catch (error) {
      console.error('Failed to resume session', error);
    }
  };

  const finishSession = async () => {
    if (!session) return;
    try {
      await studySessionService.finishSession(session.id);
      setSession(null);
      setElapsed(0);
    } catch (error) {
      console.error('Failed to finish session', error);
    }
  };

  return {
    session,
    elapsed,
    loading,
    startSession,
    pauseSession,
    resumeSession,
    finishSession,
    refreshSession: fetchActiveSession
  };
};
