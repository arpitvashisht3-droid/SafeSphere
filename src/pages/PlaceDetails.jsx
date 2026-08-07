import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import ReviewCard from '../components/ReviewCard';
import { getPlaceById } from '../data/places';
import { 
  FiShield, 
  FiMapPin, 
  FiPlusCircle, 
  FiArrowLeft, 
  FiCheckCircle,
  FiStar,
  FiCpu
} from 'react-icons/fi';

export default function PlaceDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [place, setPlace] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getPlaceById(id).then((data) => {
      setPlace(data);
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="h-96 rounded-3xl bg-slate-200 animate-pulse" />
      </div>
    );
  }

  if (!place) {
    return (
      <div className="max-w-md mx-auto my-20 px-4 text-center space-y-4 animate-fade-in">
        <h2 className="text-2xl font-bold text-slate-900">Location Not Found</h2>
        <p className="text-sm text-slate-500">The requested safety report ID does not exist or has been archived.</p>
        <Link
          to="/search"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-violet-600 text-white hover:bg-violet-700 shadow-sm btn-animated"
        >
          <FiArrowLeft className="w-4 h-4" /> Back to Search Index
        </Link>
      </div>
    );
  }

  const {
    name,
    category,
    address,
    location,
    safetyScore,
    rating,
    aiSummary,
    reviews = [],
    image
  } = place;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10 animate-fade-in">
      
      {/* Back Navigation Bar */}
      <div>
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-violet-600 transition-colors cursor-pointer"
        >
          <FiArrowLeft className="w-4 h-4" />
          <span>Back to previous page</span>
        </button>
      </div>

      {/* Main Header & Image Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Image Banner & AI Summary */}
        <div className="lg:col-span-2 space-y-6">
          
          <div className="relative rounded-3xl overflow-hidden h-72 sm:h-96 bg-slate-100 border border-slate-200/80 shadow-md group">
            <img
              src={image || 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=800&q=80'}
              alt={name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent" />
            
            <div className="absolute top-4 left-4">
              <span className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-white/95 text-violet-700 border border-violet-200 backdrop-blur-md shadow-xs">
                {category}
              </span>
            </div>

            <div className="absolute bottom-6 left-6 right-6 space-y-2">
              <span className="text-xs font-bold text-violet-300 flex items-center gap-1">
                <FiMapPin className="w-4 h-4 text-violet-400" /> {location}
              </span>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                {name}
              </h1>
              <p className="text-xs sm:text-sm text-slate-200">
                {address}
              </p>
            </div>
          </div>

          {/* AI Safety Summary Card */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-soft card-hover space-y-3">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <FiCpu className="w-5 h-5 text-violet-600" /> AI Safety Summary
            </h3>
            <p className="text-sm text-slate-700 leading-relaxed bg-violet-50/60 p-4 rounded-2xl border border-violet-100 font-medium">
              {aiSummary}
            </p>
          </div>

        </div>

        {/* Right Column: Composite Safety Index & Action Box */}
        <div className="space-y-6">
          
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-soft-lg space-y-6 text-center">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Composite Safety Score
              </span>
              <div className="text-5xl font-extrabold text-slate-900 py-2">
                <span className="gradient-text-purple">{safetyScore}</span><span className="text-2xl text-slate-400">/100</span>
              </div>
              
              <div className="flex items-center justify-center gap-1.5 text-amber-600 font-bold text-sm bg-amber-50 py-1.5 px-3 rounded-full border border-amber-200 w-fit mx-auto">
                <FiStar className="w-4 h-4 fill-amber-400" />
                <span>{rating} / 5 Rating</span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 text-xs text-slate-500 space-y-2.5 text-left">
              <div className="flex items-center gap-2">
                <FiCheckCircle className="w-4 h-4 text-emerald-600" />
                <span>Verified location entry</span>
              </div>
              <div className="flex items-center gap-2">
                <FiShield className="w-4 h-4 text-violet-600" />
                <span>{reviews.length} verified community reports</span>
              </div>
            </div>

            {/* Add Review Action Button */}
            <Link
              to={`/add-review?placeId=${place.id}`}
              className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-bold text-sm bg-violet-600 hover:bg-violet-700 text-white shadow-md shadow-violet-600/20 btn-animated cursor-pointer"
            >
              <FiPlusCircle className="w-4.5 h-4.5 stroke-[2.2]" />
              <span>Add Review</span>
            </Link>
          </div>

        </div>
      </div>

      {/* Community Reviews Section */}
      <div className="space-y-6 pt-6 border-t border-slate-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900">Community Reviews</h2>
            <p className="text-xs text-slate-500">Real observations submitted by visitors and residents.</p>
          </div>
          <Link
            to={`/add-review?placeId=${place.id}`}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-violet-50 text-violet-700 hover:bg-violet-600 hover:text-white border border-violet-200 transition-all btn-animated"
          >
            <FiPlusCircle className="w-3.5 h-3.5" />
            <span>Add Review</span>
          </Link>
        </div>

        {reviews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reviews.map((rev, idx) => (
              <ReviewCard key={idx} review={rev} />
            ))}
          </div>
        ) : (
          <div className="p-8 rounded-2xl bg-white border border-slate-200/80 text-center text-slate-500 text-sm shadow-xs">
            No community reports recorded for this location yet. Be the first to add a review!
          </div>
        )}
      </div>

    </div>
  );
}
