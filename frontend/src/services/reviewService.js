import api from './api';

const reviewService = {
  getPendingReviews: async (courseId = 'java_backend') => {
    const response = await api.get(`/reviews?courseId=${courseId}`);
    return response.data;
  },
  
  markAsReviewed: async (courseId, dayNumber) => {
    const response = await api.post(`/reviews/${courseId}/${dayNumber}/mark`);
    return response.data;
  }
};

export default reviewService;
