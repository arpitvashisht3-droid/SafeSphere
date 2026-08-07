import React, { useState } from 'react';
import { FiSearch, FiFilter, FiShield, FiX } from 'react-icons/fi';
import { PLACE_CATEGORIES, SAFETY_LEVELS } from '../data/places';
import { useNavigate } from 'react-router-dom';

export default function SearchBar({ 
  placeholder = "Search by place name, neighborhood, or transit stop...",
  initialQuery = '', 
  initialCategory = 'All Categories', 
  initialSafetyLevel = 'All Safety Levels',
  onSearch, 
  showFilters = true,
  navigateOnSubmit = true
}) {
  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState(initialCategory);
  const [safetyLevel, setSafetyLevel] = useState(initialSafetyLevel);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedQuery = query.trim();

    if (onSearch) {
      onSearch({ query: trimmedQuery, category, safetyLevel });
    }

    if (navigateOnSubmit) {
      const params = new URLSearchParams();
      if (trimmedQuery) params.set('q', trimmedQuery);
      if (category && category !== 'All Categories') params.set('category', category);
      if (safetyLevel && safetyLevel !== 'All Safety Levels') params.set('safety', safetyLevel);
      navigate(`/search${params.toString() ? `?${params.toString()}` : ''}`);
    }
  };

  const handleClear = () => {
    setQuery('');
    if (onSearch) {
      onSearch({ query: '', category, safetyLevel });
    }
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className="w-full bg-white border border-slate-200/80 rounded-2xl p-2.5 sm:p-3 shadow-soft-lg transition-all duration-300 focus-within:border-violet-500/80 focus-within:shadow-soft-lg"
    >
      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
        
        {/* Search Text Input */}
        <div className="relative flex-1 flex items-center">
          <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 transition-colors duration-200" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            className="w-full pl-11 pr-10 py-3 bg-slate-50 rounded-xl border border-slate-200 text-slate-800 placeholder-slate-400 text-sm font-medium focus:outline-none focus:border-violet-500 focus:bg-white focus:ring-2 focus:ring-violet-500/20 transition-all duration-200"
          />
          {query && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 hover:scale-110 transition-all duration-200"
              aria-label="Clear Search Input"
            >
              <FiX className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Filter Dropdowns */}
        {showFilters && (
          <div className="flex flex-col sm:flex-row items-center gap-2">
            
            <div className="relative w-full sm:w-48">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full pl-3.5 pr-8 py-3 bg-slate-50 rounded-xl border border-slate-200 text-slate-700 text-xs sm:text-sm font-medium focus:outline-none focus:border-violet-500 focus:bg-white focus:ring-2 focus:ring-violet-500/20 cursor-pointer appearance-none transition-all duration-200"
              >
                {PLACE_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <FiFilter className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
            </div>

            <div className="relative w-full sm:w-48">
              <select
                value={safetyLevel}
                onChange={(e) => setSafetyLevel(e.target.value)}
                className="w-full pl-3.5 pr-8 py-3 bg-slate-50 rounded-xl border border-slate-200 text-slate-700 text-xs sm:text-sm font-medium focus:outline-none focus:border-violet-500 focus:bg-white focus:ring-2 focus:ring-violet-500/20 cursor-pointer appearance-none transition-all duration-200"
              >
                {SAFETY_LEVELS.map((lvl) => (
                  <option key={lvl} value={lvl}>{lvl}</option>
                ))}
              </select>
              <FiShield className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
            </div>

          </div>
        )}

        {/* Search Submit Button */}
        <button
          type="submit"
          className="px-6 py-3 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-bold text-sm shadow-md shadow-violet-600/25 flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap btn-animated"
        >
          <FiSearch className="w-4 h-4 stroke-[2.2]" />
          <span>Search</span>
        </button>

      </div>
    </form>
  );
}
