import React from 'react';
import { Lock, BookOpen } from 'lucide-react';

const courses = [
  { id: 'react', name: 'React', status: 'COMING_SOON', color: 'bg-cyan-50 text-cyan-600 dark:bg-cyan-900/30 dark:text-cyan-400' },
  { id: 'python', name: 'Python', status: 'COMING_SOON', color: 'bg-yellow-50 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400' },
  { id: 'typescript', name: 'TypeScript', status: 'COMING_SOON', color: 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' },
  { id: 'docker', name: 'Docker', status: 'COMING_SOON', color: 'bg-sky-50 text-sky-600 dark:bg-sky-900/30 dark:text-sky-400' }
];

const OtherCourses = () => {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 mt-6 shadow-sm">
      <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
        <BookOpen className="w-5 h-5 text-indigo-500" />
        Other Courses
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {courses.map(course => (
          <div 
            key={course.id}
            className="group relative bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 border border-slate-200 dark:border-slate-800 flex flex-col justify-center items-center text-center overflow-hidden cursor-not-allowed"
          >
            <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 ${course.color}`}>
               <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-700 dark:text-slate-300 mb-1">{course.name}</h3>
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-[2px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="flex flex-col items-center">
                <Lock className="w-5 h-5 text-slate-500 mb-1" />
                <span className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase">Coming Soon</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OtherCourses;
