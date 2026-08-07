import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import PlaceCard from '../components/PlaceCard';
import { getPlaces } from '../data/places';
import { FiSearch, FiInbox, FiFilter, FiRefreshCw } from 'react-icons/fi';

export default function SearchResults() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);

  const query = searchParams.get('q') || '';
  const category = searchParams.get('category') || 'All Categories';
  const safetyLevel = searchParams.get('safety') || 'All Safety Levels';

  useEffect(() => {
    setLoading(true);
    getPlaces({ query, category, safetyLevel }).then((data) => {
      setPlaces(data);
      setLoading(false);
    });
  }, [query, category, safetyLevel]);

  const handleSearchSubmit = ({ query: newQ, category: newCat, safetyLevel: newSafety }) => {
    const params = new URLSearchParams();
    if (newQ) params.set('q', newQ);
    if (newCat && newCat !== 'All Categories') params.set('category', newCat);
    if (newSafety && newSafety !== 'All Safety Levels') params.set('safety', newSafety);
    setSearchParams(params);
  };

  const handleResetFilters = () => {
    setSearchParams({});
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8 animate-fade-in">
      
      {/* Header Section */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-violet-600 text-xs font-bold uppercase tracking-wider">
          <FiSearch className="w-4 h-4" /> Location Safety Directory
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Explore Safety Index Reports
        </h1>
        <p className="text-slate-600 text-sm max-w-2xl">
          Filter urban locations, public transit interchanges, hostels, and public parks by verified community safety ratings.
        </p>
      </div>

      {/* Embedded Search & Filter Controls */}
      <div className="sticky top-20 z-30">
        <SearchBar
          initialQuery={query}
          initialCategory={category}
          initialSafetyLevel={safetyLevel}
          onSearch={handleSearchSubmit}
          navigateOnSubmit={false}
        />
      </div>

      {/* Results Header Meta */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-b border-slate-200 pb-4">
        <div className="text-sm text-slate-600">
          Showing <span className="font-bold text-violet-600">{places.length}</span> location reports
          {query && <span> for "<strong className="text-slate-900">{query}</strong>"</span>}
        </div>

        {(query || category !== 'All Categories' || safetyLevel !== 'All Safety Levels') && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 flex items-center gap-1">
              <FiFilter className="w-3.5 h-3.5 text-violet-600" /> Filters active
            </span>
            <button
              type="button"
              onClick={handleResetFilters}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-200/80 text-slate-700 hover:text-slate-900 hover:bg-slate-300 transition-all cursor-pointer"
            >
              <FiRefreshCw className="w-3 h-3" /> Clear Filters
            </button>
          </div>
        )}
      </div>

      {/* Responsive Grid Layout */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-96 rounded-2xl bg-slate-200 animate-pulse" />
          ))}
        </div>
      ) : places.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {places.map((place) => (
            <PlaceCard key={place.id} place={place} />
          ))}
        </div>
      ) : (
        <div className="p-12 rounded-3xl bg-white border border-slate-200/80 shadow-soft text-center space-y-4 max-w-md mx-auto my-12">
          <div className="w-16 h-16 rounded-full bg-violet-50 border border-violet-100 flex items-center justify-center mx-auto text-violet-500">
            <FiInbox className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-slate-900">No Places Found</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            No safety reports match your search query. Try broadening your keywords or clearing active filters.
          </p>
          <button
            type="button"
            onClick={handleResetFilters}
            className="px-5 py-2.5 rounded-xl text-xs font-bold bg-violet-600 text-white hover:bg-violet-700 transition-colors shadow-sm cursor-pointer btn-animated"
          >
            Clear Search Query
          </button>
        </div>
      )}

    </div>
  );
}
