import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// the translations
const resources = {
  en: {
    translation: {
      "dashboard.title": "Dashboard",
      "dashboard.continue": "Continue learning",
      "dashboard.upcoming": "Upcoming lessons",
      "dashboard.completed": "Recently completed",
      "dashboard.overall": "Overall learning progress",
      "roadmap.title": "30-Day Learning Roadmap",
      "nav.search": "Search tasks, topics...",
      "nav.logout": "Logout",
      "dayCard.progress": "Progress",
      "dayCard.viewModule": "View Learning Module",
      "module.minutes": "Minutes",
      "module.whatYouWillLearn": "What you'll learn",
      "module.quickSummary": "Quick Summary",
      "module.officialResources": "Official Resources",
      "module.practice": "Practice Exercise",
      "module.watch": "Watch & Learn",
      "exercise.difficulty": "Difficulty",
      "exercise.start": "Start exercise",
      "settings.title": "Settings",
      "settings.language": "Language",
      "settings.theme": "Theme Preferences",
      "dashboard.progress": "Progress"
    }
  },
  vi: {
    translation: {
      "dashboard.title": "Bảng Điều Khiển",
      "dashboard.continue": "Tiếp tục học",
      "dashboard.upcoming": "Bài học sắp tới",
      "dashboard.completed": "Hoàn thành gần đây",
      "dashboard.overall": "Tiến độ học tập tổng thể",
      "roadmap.title": "Lộ trình học tập 30 ngày",
      "nav.search": "Tìm kiếm...",
      "nav.logout": "Đăng xuất",
      "dayCard.progress": "Tiến độ",
      "dayCard.viewModule": "Xem bài học",
      "module.minutes": "Phút",
      "module.whatYouWillLearn": "Bạn sẽ học được gì",
      "module.quickSummary": "Tóm tắt",
      "module.officialResources": "Tài liệu chính thức",
      "module.practice": "Bài tập thực hành",
      "module.watch": "Xem & Học",
      "exercise.difficulty": "Độ khó",
      "exercise.start": "Bắt đầu làm bài",
      "settings.title": "Cài đặt",
      "settings.language": "Ngôn ngữ",
      "settings.theme": "Chủ đề",
      "dashboard.progress": "Tiến độ"
    }
  }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: localStorage.getItem('language') || 'en',
    fallbackLng: "en",
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;
