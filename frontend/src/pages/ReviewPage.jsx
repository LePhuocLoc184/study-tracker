import React, { useState, useEffect } from 'react';
import { BookOpen, CheckCircle2, ChevronRight, AlertTriangle } from 'lucide-react';
import reviewService from '../services/reviewService';
import { getLearningModule } from '../data/learningModules';

const ReviewPage = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const data = await reviewService.getPendingReviews();
      // Filter out notes that are completely empty
      const validReviews = data.filter(r => 
        (r.note.content && r.note.content.length > 0) ||
        (r.note.learnedContent && r.note.learnedContent.length > 0) ||
        (r.note.keyConcepts && r.note.keyConcepts.length > 0) ||
        (r.note.difficultParts && r.note.difficultParts.length > 0) ||
        (r.note.reviewItems && r.note.reviewItems.length > 0)
      );
      setReviews(validReviews);
    } catch (error) {
      console.error('Failed to fetch reviews', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkReviewed = async (courseId, dayNumber) => {
    try {
      await reviewService.markAsReviewed(courseId, dayNumber);
      await fetchReviews(); // Refresh
      setExpandedId(null);
    } catch (error) {
      console.error('Failed to mark reviewed', error);
    }
  };

  if (loading) {
    return (
      <div className="p-6 md:p-8 max-w-7xl mx-auto flex justify-center items-center h-64">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/50 rounded-xl" />
          <div className="h-4 w-32 bg-slate-200 dark:bg-slate-800 rounded" />
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8 max-w-4xl mx-auto space-y-8 dark:text-slate-200">
      <div className="flex items-center gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
          <BookOpen className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Study Review</h1>
          <p className="text-slate-500 dark:text-slate-400">Review your past notes and reinforce your learning.</p>
        </div>
      </div>

      {reviews.length === 0 ? (
        <div className="text-center py-20 bg-slate-50 dark:bg-slate-800/50 rounded-3xl border border-slate-200 dark:border-slate-800">
          <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">All caught up!</h2>
          <p className="text-slate-500 dark:text-slate-400">You don't have any pending reviews at the moment.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {reviews.map((r, idx) => {
            const moduleData = getLearningModule(`day-${r.dayNumber}`);
            const title = moduleData?.title?.en || moduleData?.title?.vi || `Day ${r.dayNumber}`;
            const isExpanded = expandedId === idx;
            
            return (
              <div key={idx} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm transition-all hover:shadow-md">
                <button 
                  onClick={() => setExpandedId(isExpanded ? null : idx)}
                  className="w-full p-5 flex items-center justify-between text-left hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-lg flex items-center justify-center font-bold text-sm">
                      D{r.dayNumber}
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 dark:text-white text-lg">{title}</h3>
                      <div className="flex items-center gap-3 mt-1 text-xs text-slate-500 dark:text-slate-400">
                        <span>Java Backend</span>
                        <span>•</span>
                        <span>Reviewed {r.reviewCount} times</span>
                        {r.lastReviewedAt && (
                          <>
                            <span>•</span>
                            <span>Last: {new Date(r.lastReviewedAt).toLocaleDateString()}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <ChevronRight className={`w-5 h-5 text-slate-400 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                </button>
                
                {isExpanded && (
                  <div className="p-6 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 space-y-6">
                    {r.note.content && (
                      <div className="space-y-2">
                        <h4 className="text-sm font-bold text-slate-700 dark:text-slate-300">Legacy Note</h4>
                        <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-sm text-slate-600 dark:text-slate-300 whitespace-pre-wrap">
                          {r.note.content}
                        </div>
                      </div>
                    )}

                    {r.note.learnedContent && (
                      <div className="space-y-2">
                        <h4 className="text-sm font-bold text-slate-700 dark:text-slate-300">What I Learned</h4>
                        <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-sm text-slate-600 dark:text-slate-300 whitespace-pre-wrap">
                          {r.note.learnedContent}
                        </div>
                      </div>
                    )}
                    
                    {r.note.keyConcepts && (
                      <div className="space-y-2">
                        <h4 className="text-sm font-bold text-slate-700 dark:text-slate-300">Key Concepts</h4>
                        <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-sm text-slate-600 dark:text-slate-300 whitespace-pre-wrap">
                          {r.note.keyConcepts}
                        </div>
                      </div>
                    )}
                    
                    {r.note.difficultParts && (
                      <div className="space-y-2">
                        <h4 className="text-sm font-bold text-amber-700 dark:text-amber-400 flex items-center gap-1.5">
                          <AlertTriangle className="w-4 h-4" /> What was difficult?
                        </h4>
                        <div className="p-4 bg-amber-50 dark:bg-amber-900/10 rounded-xl border border-amber-200 dark:border-amber-800/30 text-sm text-amber-900 dark:text-amber-200 whitespace-pre-wrap">
                          {r.note.difficultParts}
                        </div>
                      </div>
                    )}
                    
                    {r.note.reviewItems && (
                      <div className="space-y-2">
                        <h4 className="text-sm font-bold text-emerald-700 dark:text-emerald-400">Review Later</h4>
                        <div className="p-4 bg-emerald-50 dark:bg-emerald-900/10 rounded-xl border border-emerald-200 dark:border-emerald-800/30 text-sm text-emerald-900 dark:text-emerald-200 whitespace-pre-wrap">
                          {r.note.reviewItems}
                        </div>
                      </div>
                    )}

                    <div className="flex justify-end pt-4 border-t border-slate-200 dark:border-slate-800 mt-6">
                      <button 
                        onClick={() => handleMarkReviewed(r.courseId, r.dayNumber)}
                        className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl transition-colors shadow-sm"
                      >
                        <CheckCircle2 className="w-4 h-4" /> Mark as Reviewed
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ReviewPage;
