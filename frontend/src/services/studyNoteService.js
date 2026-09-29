import api from './api';

const studyNoteService = {
  getNote: async (courseId, dayNumber) => {
    const response = await api.get(`/notes?courseId=${courseId}&dayNumber=${dayNumber}`);
    return response.data;
  },
  
  saveNote: async (data) => {
    const response = await api.post('/notes', data);
    return response.data;
  }
};

export default studyNoteService;
