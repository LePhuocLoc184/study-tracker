import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  ArrowLeft, ArrowRight, Clock, CheckCircle2, 
  ExternalLink, ShieldCheck, PlayCircle, BookOpen, Code, StickyNote, Save 
} from 'lucide-react';
import { useTasks } from '../hooks/useTasks';
import { useAuth } from '../context/AuthContext';
import { getLearningModule } from '../data/learningModules';
import TaskCard from '../components/roadmap/TaskCard';
import studyNoteService from '../services/studyNoteService';

const LearningModulePage = () => {
  const { moduleId } = useParams();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { tasks, loading, toggleStatus, saveNote } = useTasks();
  const { user } = useAuth();
  
  const match = moduleId?.match(/^day-(\d+)/);
  const day = match ? parseInt(match[1]) : 0;
  
  const moduleTasks = tasks.filter(t => t.day === day);
  const phase = moduleTasks[0]?.phase || '';
  const topic = moduleTasks[0]?.topic || phase;
  
  const moduleData = getLearningModule(moduleId, topic, phase);

  // Hooks must be declared before any early returns!
  const isUserA = user?.email === 'loc@gmail.com';
    
  const [noteContent, setNoteContent] = React.useState('');
  const [learnedContent, setLearnedContent] = React.useState('');
  const [keyConcepts, setKeyConcepts] = React.useState('');
  const [difficultParts, setDifficultParts] = React.useState('');
  const [reviewItems, setReviewItems] = React.useState('');
  const [isSavingNote, setIsSavingNote] = React.useState(false);
  
  React.useEffect(() => {
    if (!day || !user) return;
    studyNoteService.getNote('java_backend', day)
      .then(note => {
        if (note.content) setNoteContent(note.content);
        if (note.learnedContent) setLearnedContent(note.learnedContent);
        if (note.keyConcepts) setKeyConcepts(note.keyConcepts);
        if (note.difficultParts) setDifficultParts(note.difficultParts);
        if (note.reviewItems) setReviewItems(note.reviewItems);
      })
      .catch(console.error);
  }, [day, user]);

  const handleSaveNote = async () => {
    setIsSavingNote(true);
    try {
      await studyNoteService.saveNote({
        courseId: 'java_backend',
        dayNumber: day,
        content: noteContent,
        learnedContent,
        keyConcepts,
        difficultParts,
        reviewItems
      });
      // Legacy compatibility
      if (moduleTasks.length > 0) {
        saveNote(moduleTasks[0].id, noteContent);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsSavingNote(false);
    }
  };

  const hasValidNote = noteContent.trim().length >= 30;

  if (loading) {
    return (
      <div className="p-6 md:p-8 max-w-4xl mx-auto flex justify-center items-center h-64">
        <svg className="animate-spin h-8 w-8 text-indigo-600" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      </div>
    );
  }

  if (moduleTasks.length === 0 && !moduleData) {
    return (
      <div className="p-6 md:p-8 max-w-4xl mx-auto text-center py-20">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-4">Module Not Found</h2>
        <button 
          onClick={() => navigate('/roadmap')}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Roadmap
        </button>
      </div>
    );
  }

  const completedCount = moduleTasks.filter(tsk =>
    isUserA ? (tsk.user_a_completed ?? tsk.userACompleted) : (tsk.user_b_completed ?? tsk.userBCompleted)
  ).length;
  const totalCount = moduleTasks.length;
  const allTasksDone = totalCount > 0 && completedCount === totalCount;
  const isDayCompleted = allTasksDone && hasValidNote;

  const pct = totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100);

  const currentLang = i18n.language === 'vi' ? 'vi' : 'en';
  const title = moduleData.title?.[currentLang] || moduleData.title?.en || '';
  const desc = moduleData.description?.[currentLang] || moduleData.description?.en || '';
  const objectives = moduleData.objectives?.[currentLang] || moduleData.objectives?.en || [];

  return (
    <div className="max-w-5xl mx-auto pb-20 dark:text-slate-200">
      {/* Top Navigation */}
      <div className="px-6 md:px-8 py-4 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 sticky top-0 z-10 flex justify-between items-center transition-colors">
        <Link to="/roadmap" className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          {t('nav.back', 'Back to Roadmap')}
        </Link>
        <div className="flex items-center gap-4 text-sm font-medium">
          {day > 1 && (
             <Link to={`/learning/day-${day - 1}-prev`} className="text-slate-500 dark:text-slate-400 hover:text-indigo-600">
               Previous Day
             </Link>
          )}
          <Link to={`/learning/day-${day + 1}-next`} className="text-slate-500 dark:text-slate-400 hover:text-indigo-600 flex items-center gap-1">
            Next Day <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-6 md:px-8 py-10 md:py-16 transition-colors">
        <div className="flex flex-col-reverse md:flex-row gap-10 items-center">
          <div className="flex-1 w-full">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 px-2 py-1 rounded-md">
                DAY {String(day).padStart(2, '0')}
              </span>
              <span className="text-sm font-medium text-slate-500 dark:text-slate-400">{phase}</span>
            </div>

            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-slate-100 mb-2">{title}</h1>
            {moduleData.subtitle && <h2 className="text-xl text-slate-600 dark:text-slate-400 mb-4">{moduleData.subtitle}</h2>}
            
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 max-w-2xl leading-relaxed">
              {desc}
            </p>
            
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg text-sm font-semibold">
                <Clock className="w-4 h-4" />
                {moduleData.estimatedMinutes} {t('module.minutes', 'Minutes')}
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg text-sm font-semibold">
                <ShieldCheck className="w-4 h-4" />
                {t('exercise.difficulty', 'Difficulty')}: {moduleData.difficulty}
              </div>
            </div>
            
            <div className="max-w-md">
              <div className="flex justify-between text-sm font-medium mb-2">
                <span className="text-slate-700 dark:text-slate-300">Module Progress</span>
                <span className={isDayCompleted ? 'text-emerald-600 dark:text-emerald-400' : 'text-indigo-600 dark:text-indigo-400'}>{pct}%</span>
              </div>
              <div className="w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-500 ${isDayCompleted ? 'bg-emerald-500' : 'bg-indigo-600'}`} 
                  style={{ width: `${pct}%` }} 
                />
              </div>
              {isDayCompleted && (
                <div className="mt-3 flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-sm font-bold bg-emerald-50 dark:bg-emerald-900/20 px-3 py-2 rounded-lg border border-emerald-100 dark:border-emerald-800/30">
                  <CheckCircle2 className="w-4 h-4" /> Day Completed!
                </div>
              )}
              {!isDayCompleted && allTasksDone && !hasValidNote && (
                <div className="mt-3 flex items-center gap-2 text-amber-600 dark:text-amber-400 text-sm font-bold bg-amber-50 dark:bg-amber-900/20 px-3 py-2 rounded-lg border border-amber-100 dark:border-amber-800/30">
                  <StickyNote className="w-4 h-4" /> Please write your Study Note to finish.
                </div>
              )}
            </div>
          </div>
          
          {moduleData.imageUrl && (
            <div className="w-full md:w-1/3 max-w-xs shrink-0 flex justify-center">
              <div className="w-48 h-48 md:w-64 md:h-64 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 flex items-center justify-center p-6 shadow-inner">
                <img 
                  src={moduleData.imageUrl} 
                  alt={moduleData.imageAlt || 'Illustration'} 
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="px-6 md:px-8 py-12 grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Left Column: Learning Content */}
        <div className="lg:col-span-2 space-y-12">
          


          {/* What You Will Learn */}
          {objectives && objectives.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">{t('module.whatYouWillLearn', "What you'll learn")}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {objectives.map((obj, idx) => (
                  <div key={idx} className="flex items-start gap-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-xl shadow-sm">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="text-slate-700 dark:text-slate-300 font-medium text-sm">{obj}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Detailed Lessons */}
          {moduleData.lessons && moduleData.lessons.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">Detailed Lessons</h2>
              <div className="space-y-4">
                {moduleData.lessons.map((lesson, idx) => (
                  <div key={idx} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 overflow-hidden">
                    <h3 className="font-bold text-lg text-slate-900 dark:text-slate-100 mb-2">
                      {idx + 1}. {lesson.title?.[currentLang] || lesson.title?.en || lesson.title}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                      {lesson.explanation?.[currentLang] || lesson.explanation?.en || lesson.explanation}
                    </p>
                    {lesson.codeExample && (
                      <div className="bg-slate-900 rounded-xl p-4 overflow-x-auto text-sm text-slate-300 font-mono mb-4">
                        <pre><code>{lesson.codeExample}</code></pre>
                      </div>
                    )}
                    {lesson.commonMistakes && lesson.commonMistakes.length > 0 && (
                      <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-xl border border-red-100 dark:border-red-900/30">
                        <h4 className="text-sm font-bold text-red-800 dark:text-red-400 mb-2 flex items-center gap-2">
                          Common Mistakes
                        </h4>
                        <ul className="list-disc pl-5 text-sm text-red-700 dark:text-red-300 space-y-1">
                          {lesson.commonMistakes.map((mistake, mIdx) => (
                            <li key={mIdx}>{mistake}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* YouTube Videos */}
          {moduleData.videos && moduleData.videos.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
                <PlayCircle className="w-6 h-6 text-red-500" />
                {t('module.watch', 'Watch & Learn')}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {moduleData.videos.map((vid, idx) => (
                  <div key={idx} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
                    <div className="aspect-video bg-slate-100 dark:bg-slate-800 relative">
                       {/* Placeholder for actual iframe embedding */}
                       <iframe
                         className="w-full h-full absolute inset-0"
                         src={vid.url.replace("watch?v=", "embed/")}
                         title={vid.title}
                         allowFullScreen
                       />
                    </div>
                    <div className="p-4">
                      <h4 className="font-bold text-slate-900 dark:text-slate-100 text-sm mb-1">{vid.title}</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">{vid.provider} • {vid.duration}</p>
                      {vid.provider && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs font-semibold rounded-md">
                          <ShieldCheck className="w-3 h-3" /> Official
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Official Resources */}
          {moduleData.officialResources && moduleData.officialResources.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
                <BookOpen className="w-6 h-6 text-indigo-500" />
                {t('module.officialResources', 'Official Resources')}
              </h2>
              <div className="grid grid-cols-1 gap-4">
                {moduleData.officialResources.map((res, idx) => (
                  <a 
                    key={idx}
                    href={res.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="group block bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 hover:border-indigo-300 dark:hover:border-indigo-700 hover:shadow-md transition-all"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{res.title}</span>
                      </div>
                      <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-indigo-500" />
                    </div>
                    <div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400 mb-3">
                      <span className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-md">{res.provider}</span>
                      <span>•</span>
                      <span>{res.type}</span>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{res.description}</p>
                  </a>
                ))}
              </div>
            </section>
          )}

          {/* Practice Section */}
          {moduleData.practice && (
            <section>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
                <Code className="w-6 h-6 text-emerald-500" />
                {t('module.practice', 'Practice Exercise')}
              </h2>
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-4">
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-slate-100 text-lg">{moduleData.practice.title}</h3>
                    <div className="flex items-center gap-3 mt-1 text-xs">
                      <span className="font-semibold px-2.5 py-1 bg-orange-50 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 rounded-lg">
                        {t('exercise.difficulty', 'Difficulty')}: {moduleData.practice.difficulty}
                      </span>
                      <span className="text-slate-500 dark:text-slate-400">
                        {moduleData.practice.estimatedMinutes} mins
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-5">
                  {moduleData.practice.description}
                </p>
                
                <Link 
                  to={`/learning/day-${day}/exercise/${moduleData.practice.id}`}
                  className="flex items-center justify-center w-full py-3 bg-slate-900 dark:bg-indigo-600 text-white rounded-xl font-medium hover:bg-slate-800 dark:hover:bg-indigo-700 transition-colors gap-2"
                >
                  {t('exercise.start', 'Start Exercise')}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </section>
          )}
        </div>

        {/* Right Column: Existing Tasks / Tracking */}
        <div className="lg:col-span-1">
          <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sticky top-24">
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-indigo-500" />
              {currentLang === 'vi' ? 'Checklist học tập' : 'Learning Checklist'}
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
              {currentLang === 'vi' 
                ? 'Hoàn thành các mục dưới đây để cập nhật tiến độ học tập của bạn.' 
                : 'Complete the checklist items below to update your learning progress.'}
            </p>
            <div className="space-y-4">
              {moduleTasks.map(task => (
                <TaskCard 
                  key={task.id}
                  task={task}
                  onStatusChange={toggleStatus}
                  onNoteSave={saveNote}
                  currentUserEmail={user?.email}
                />
              ))}
            </div>
          </div>

          {/* Study Note Section */}
          <div className="mt-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sticky top-[450px]">
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2 flex items-center gap-2">
              <StickyNote className="w-5 h-5 text-amber-500" />
              {currentLang === 'vi' ? 'Ghi chú học tập' : 'Study Note'}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
              {currentLang === 'vi' 
                ? 'BẮT BUỘC: Điền ít nhất một nội dung (≥ 30 ký tự) để xác nhận hoàn thành.' 
                : 'REQUIRED: Fill at least one section (≥ 30 chars) to complete this day.'}
            </p>
            <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
              
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  What did I learn today? <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={noteContent}
                  onChange={(e) => setNoteContent(e.target.value)}
                  placeholder="Summary of today's learning..."
                  className="w-full h-24 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-sm text-slate-700 dark:text-slate-300 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Key Concepts
                </label>
                <textarea
                  value={keyConcepts}
                  onChange={(e) => setKeyConcepts(e.target.value)}
                  placeholder="e.g., HashMap works on hashing principle..."
                  className="w-full h-20 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-sm text-slate-700 dark:text-slate-300 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  What was difficult?
                </label>
                <textarea
                  value={difficultParts}
                  onChange={(e) => setDifficultParts(e.target.value)}
                  placeholder="I struggled with..."
                  className="w-full h-20 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-sm text-slate-700 dark:text-slate-300 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  What should I review later?
                </label>
                <textarea
                  value={reviewItems}
                  onChange={(e) => setReviewItems(e.target.value)}
                  placeholder="Need to reread documentation on..."
                  className="w-full h-20 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-sm text-slate-700 dark:text-slate-300 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all resize-none"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className={`text-xs font-medium ${hasValidNote ? 'text-emerald-500' : 'text-amber-500'}`}>
                  {noteContent.length}/30 {currentLang === 'vi' ? 'ký tự' : 'characters'}
                </span>
                <button
                  onClick={handleSaveNote}
                  disabled={isSavingNote}
                  className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-sm font-medium rounded-xl transition-colors"
                >
                  <Save className="w-4 h-4" />
                  {isSavingNote ? 'Saving...' : (currentLang === 'vi' ? 'Lưu Note' : 'Save Note')}
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default LearningModulePage;
