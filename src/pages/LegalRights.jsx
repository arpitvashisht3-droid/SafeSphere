import React, { useEffect, useState } from 'react';
import { fetchLegalRights } from '../api';
import { FiBookOpen, FiShield, FiAlertCircle, FiRefreshCw } from 'react-icons/fi';

export default function LegalRights() {
  const [rights, setRights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadLegalRights = () => {
    setLoading(true);
    setError(null);
    fetchLegalRights()
      .then((data) => {
        setRights(data.rights || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError('Unable to load legal rights information from backend.');
        setLoading(false);
      });
  };

  useEffect(() => {
    loadLegalRights();
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 space-y-10 animate-fade-in">
      
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-100 border border-violet-200 text-violet-700 text-xs font-bold">
          <FiBookOpen className="w-4 h-4 text-violet-600" /> Know Your Rights
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          Women's Legal Rights
        </h1>
        <p className="max-w-2xl mx-auto text-sm sm:text-base text-slate-600 leading-relaxed">
          Informational guidance on legal protection, workplace safety regulations, and public safety rights.
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
            onClick={loadLegalRights}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-rose-600 text-white hover:bg-rose-700 cursor-pointer btn-animated"
          >
            <FiRefreshCw className="w-4 h-4" /> Try Again
          </button>
        </div>
      )}

      {/* Rights list */}
      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {rights.map((item, idx) => (
            <div
              key={idx}
              className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-soft card-hover space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-xl text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
                    {item.category}
                  </span>
                  <FiShield className="w-5 h-5 text-violet-600" />
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 text-xs text-slate-400 font-medium">
                Informational Overview
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
