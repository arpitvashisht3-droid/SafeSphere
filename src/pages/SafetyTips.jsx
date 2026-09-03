import React, { useEffect, useState } from 'react';
import { fetchSafetyTips } from '../api';
import { FiCheckSquare, FiShield, FiAlertCircle, FiRefreshCw } from 'react-icons/fi';

export default function SafetyTips() {
  const [tips, setTips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadTips = () => {
    setLoading(true);
    setError(null);
    fetchSafetyTips()
      .then((data) => {
        setTips(data.tips || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError('Unable to load safety tips from backend.');
        setLoading(false);
      });
  };

  useEffect(() => {
    loadTips();
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 space-y-10 animate-fade-in">
      
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-700 text-xs font-bold">
          <FiCheckSquare className="w-4 h-4 text-emerald-600" /> Best Practices
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          Practical Safety Tips
        </h1>
        <p className="max-w-2xl mx-auto text-sm sm:text-base text-slate-600 leading-relaxed">
          Actionable advice and precautions covering transit, online privacy, emergency preparedness, and public space awareness.
        </p>
      </div>

      {/* Loading state */}
      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-44 rounded-3xl bg-slate-200 animate-pulse" />
          ))}
        </div>
      )}

      {/* Error state */}
      {error && (
        <div className="bg-rose-50 border border-rose-200 p-6 rounded-3xl text-center space-y-4 max-w-md mx-auto">
          <FiAlertCircle className="w-10 h-10 text-rose-600 mx-auto" />
          <p className="text-sm font-medium text-rose-800">{error}</p>
          <button
            type="button"
            onClick={loadTips}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-rose-600 text-white hover:bg-rose-700 cursor-pointer btn-animated"
          >
            <FiRefreshCw className="w-4 h-4" /> Try Again
          </button>
        </div>
      )}

      {/* Tips grid */}
      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tips.map((tip, idx) => (
            <div
              key={idx}
              className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-soft card-hover space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-xl text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    {tip.category}
                  </span>
                  <FiShield className="w-5 h-5 text-emerald-600" />
                </div>

                <h3 className="text-lg font-bold text-slate-900 leading-snug">
                  {tip.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {tip.description}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-100 text-xs text-slate-400 font-medium">
                Verified Advisory Tip
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
