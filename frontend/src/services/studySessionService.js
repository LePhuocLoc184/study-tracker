import api from './api';

const studySessionService = {
  startSession: async (courseId, dayNumber) => {
    const response = await api.post('/study-sessions/start', { courseId, dayNumber });
    return response.data;
  },
  
  pauseSession: async (id) => {
    const response = await api.post(`/study-sessions/${id}/pause`);
    return response.data;
  },
  
  resumeSession: async (id) => {
    const response = await api.post(`/study-sessions/${id}/resume`);
    return response.data;
  },
  
  finishSession: async (id) => {
    const response = await api.post(`/study-sessions/${id}/finish`);
    return response.data;
  },
  
  getActiveSession: async () => {
    const response = await api.get('/study-sessions/active');
    return response.data; // might be empty/null if status is 204
  },
  
  getStats: async (courseId = 'java_backend') => {
    const response = await api.get(`/study-sessions/stats?courseId=${courseId}`);
    return response.data;
  }
};

export default studySessionService;
