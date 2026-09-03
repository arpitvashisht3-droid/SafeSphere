import React, { useEffect, useState } from 'react';
import { fetchResources } from '../api';
import { FiLifeBuoy, FiClock, FiPhone, FiAlertCircle, FiRefreshCw } from 'react-icons/fi';

export default function Resources() {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadResources = () => {
    setLoading(true);
    setError(null);
    fetchResources()
      .then((data) => {
        setResources(data.resources || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError('Unable to load support resources from backend.');
        setLoading(false);
      });
  };

  useEffect(() => {
    loadResources();
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 space-y-10 animate-fade-in">
      
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-100 border border-violet-200 text-violet-700 text-xs font-bold">
          <FiLifeBuoy className="w-4 h-4 text-violet-600" /> Support Services
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          Emergency & Support Resources
        </h1>
        <p className="max-w-2xl mx-auto text-sm sm:text-base text-slate-600 leading-relaxed">
          Access immediate assistance, safety hotlines, and local support services.
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
            onClick={loadResources}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-rose-600 text-white hover:bg-rose-700 cursor-pointer btn-animated"
          >
            <FiRefreshCw className="w-4 h-4" /> Try Again
          </button>
        </div>
      )}

      {/* Resources grid */}
      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {resources.map((res, idx) => (
            <div
              key={idx}
              className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-soft card-hover flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="px-3 py-1 rounded-xl text-xs font-bold bg-violet-50 text-violet-700 border border-violet-200">
                    {res.type}
                  </span>
                  <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                    <FiClock className="w-3.5 h-3.5 text-slate-400" /> {res.availability}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900">{res.name}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {res.description}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-400 font-medium">Contact Hotline</span>
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-900 text-white font-bold text-xs shadow-xs">
                  <FiPhone className="w-3.5 h-3.5 text-violet-400" />
                  {res.contact}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
