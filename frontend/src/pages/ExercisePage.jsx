import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  ArrowLeft, CheckCircle2, PlayCircle, Lightbulb, 
  Code2, AlertCircle, FileCode2
} from 'lucide-react';
import { getLearningModule } from '../data/learningModules';

const ExercisePage = () => {
  const { dayId, exerciseId } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  const [code, setCode] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  
  // Minimal data extraction
  const match = dayId?.match(/^day-(\d+)/);
  const day = match ? parseInt(match[1]) : 0;
  
  // Attempt to find the specific module based on the day
  // Normally we would have an API call, but we are using local data
  // Since we only have day number in URL currently, let's find the first module for this day
  const { learningModules } = require('../data/learningModules');
  const moduleData = learningModules.find(m => m.day === day);
  
  const exercise = moduleData?.practice;

  useEffect(() => {
    if (exercise) {
      setCode(exercise.starterCode);
    }
    // Load local completion state if any
    const completed = localStorage.getItem(`exercise_${exerciseId}_completed`);
    if (completed === 'true') {
      setIsCompleted(true);
    }
  }, [exercise, exerciseId]);

  if (!exercise || exercise.id !== exerciseId) {
    return (
      <div className="p-6 md:p-8 max-w-4xl mx-auto text-center py-20">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-4">Exercise Not Found</h2>
        <button 
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700"
        >
          <ArrowLeft className="w-4 h-4" />
          Go Back
        </button>
      </div>
    );
  }

  const handleSubmit = () => {
    // Basic mock submission
    setIsCompleted(true);
    localStorage.setItem(`exercise_${exerciseId}_completed`, 'true');
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] bg-slate-50 dark:bg-slate-950 transition-colors">
      
      {/* Top Header */}
      <div className="px-6 py-4 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="font-bold text-slate-900 dark:text-slate-100">{exercise.title}</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">Day {day} Practice</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          {isCompleted && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 font-semibold text-sm rounded-lg border border-emerald-200 dark:border-emerald-800">
              <CheckCircle2 className="w-4 h-4" /> Completed
            </span>
          )}
          <button 
            onClick={handleSubmit}
            className={`px-6 py-2 rounded-xl font-medium transition-colors ${
              isCompleted 
                ? 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 cursor-not-allowed'
                : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm'
            }`}
            disabled={isCompleted}
          >
            {isCompleted ? 'Completed' : 'Mark as Completed'}
          </button>
        </div>
      </div>

      {/* Main Workspace */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        
        {/* Left Panel: Instructions */}
        <div className="w-full lg:w-1/3 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col overflow-y-auto">
          <div className="p-6">
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">Problem Statement</h2>
            <div className="prose prose-slate dark:prose-invert max-w-none mb-8 text-sm">
              <p>{exercise.description}</p>
            </div>
            
            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-800 p-4 mb-6">
              <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-2 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-orange-500" /> Requirements
              </h3>
              <ul className="text-sm text-slate-600 dark:text-slate-400 list-disc pl-5 space-y-1">
                {exercise.requirements?.map((req, idx) => (
                  <li key={idx}>{req}</li>
                )) || (
                  <>
                    <li>Follow the provided starter code structure.</li>
                    <li>Ensure output strictly matches expected formats.</li>
                    <li>Write clean, readable code.</li>
                  </>
                )}
              </ul>
            </div>
            
            <div className="border-t border-slate-200 dark:border-slate-800 pt-6">
              <button 
                onClick={() => setShowHint(!showHint)}
                className="flex items-center gap-2 text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300"
              >
                <Lightbulb className="w-4 h-4" /> 
                {showHint ? 'Hide Hint' : 'Show Hint'}
              </button>
              
              {showHint && (
                <div className="mt-3 p-4 bg-amber-50 dark:bg-amber-900/20 text-amber-800 dark:text-amber-300 text-sm rounded-xl border border-amber-200 dark:border-amber-800/30">
                  <p>{exercise.hints?.[0] || 'Think about the basic syntax and structure you learned in the corresponding learning module.'}</p>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Right Panel: Code Editor / Local Practice */}
        <div className="flex-1 flex flex-col bg-white dark:bg-slate-950 p-6 overflow-y-auto">
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
            <Code2 className="w-5 h-5 text-indigo-500" /> Starter Code
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
            {t('exercise.local', 'Copy this starter code to your favorite IDE (like IntelliJ IDEA or Eclipse) and complete the exercise locally.')}
          </p>
          
          <div className="flex-1 relative bg-slate-900 rounded-xl overflow-hidden border border-slate-800 flex flex-col min-h-[300px] mb-6">
            <div className="h-10 bg-slate-800/50 flex items-center px-4 border-b border-slate-800 shrink-0">
              <span className="text-xs font-semibold text-slate-400 tracking-wider">Main.java</span>
            </div>
            <pre className="p-4 text-sm text-slate-300 font-mono overflow-auto flex-1">
              <code>{code}</code>
            </pre>
          </div>
          
          <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800/30 rounded-xl p-5 mb-6">
            <h3 className="font-bold text-indigo-800 dark:text-indigo-300 mb-2">Self-Check Checklist</h3>
            <div className="space-y-2 text-sm text-indigo-700 dark:text-indigo-400">
              <label className="flex items-start gap-3 cursor-pointer">
                <input type="checkbox" className="mt-1 rounded text-indigo-600 focus:ring-indigo-500 bg-white border-indigo-300" />
                <span>My code compiles without errors.</span>
              </label>
              <label className="flex items-start gap-3 cursor-pointer">
                <input type="checkbox" className="mt-1 rounded text-indigo-600 focus:ring-indigo-500 bg-white border-indigo-300" />
                <span>I have tested it with different inputs.</span>
              </label>
              <label className="flex items-start gap-3 cursor-pointer">
                <input type="checkbox" className="mt-1 rounded text-indigo-600 focus:ring-indigo-500 bg-white border-indigo-300" />
                <span>The output matches the requirements.</span>
              </label>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default ExercisePage;
