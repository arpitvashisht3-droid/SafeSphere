import React, { useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { MOCK_PLACES, PLACE_CATEGORIES, submitPlaceReview } from '../data/places';
import { 
  FiPlusCircle, 
  FiStar, 
  FiCheckCircle, 
  FiArrowLeft, 
  FiLock,
  FiAlertCircle
} from 'react-icons/fi';

export default function AddReview() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const preselectedPlaceId = searchParams.get('placeId') || '';

  const preselectedPlace = MOCK_PLACES.find((p) => String(p.id) === String(preselectedPlaceId));

  const [placeName, setPlaceName] = useState(preselectedPlace ? preselectedPlace.name : (MOCK_PLACES[0]?.name || ''));
  const [category, setCategory] = useState(preselectedPlace ? preselectedPlace.category : 'PG & Hostels');
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState('');
  const [anonymous, setAnonymous] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!placeName.trim()) {
      setErrorMsg('Please enter or select a place name.');
      return;
    }
    if (!reviewText.trim()) {
      setErrorMsg('Please provide your review text.');
      return;
    }

    setSubmitting(true);

    try {
      const targetPlace = MOCK_PLACES.find(
        (p) => p.name.toLowerCase() === placeName.trim().toLowerCase()
      ) || MOCK_PLACES[0];

      await submitPlaceReview(targetPlace.id, {
        comment: reviewText.trim(),
        anonymous,
        rating
      });

      setSubmitting(false);
      setShowSuccessAlert(true);

      setPlaceName(MOCK_PLACES[0]?.name || '');
      setCategory('PG & Hostels');
      setRating(5);
      setReviewText('');
      setAnonymous(false);
    } catch (err) {
      console.error(err);
      setSubmitting(false);
      setErrorMsg('Failed to submit review. Please try again.');
    }
  };

  const categoriesList = PLACE_CATEGORIES.filter((c) => c !== 'All Categories');

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8 animate-fade-in">
      
      {/* Back Link */}
      <div>
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-violet-600 transition-colors cursor-pointer"
        >
          <FiArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>
      </div>

      {/* Success Notification Banner */}
      {showSuccessAlert && (
        <div className="bg-emerald-50 border border-emerald-200 p-6 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-soft animate-fade-in">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
              <FiCheckCircle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-emerald-900">Review Submitted Successfully!</h3>
              <p className="text-xs text-emerald-700 mt-0.5">
                Thank you for contributing. Your review has been saved and the form has been reset.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowSuccessAlert(false)}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-700 transition-colors shrink-0 cursor-pointer btn-animated"
          >
            Dismiss Alert
          </button>
        </div>
      )}

      {/* Main Form Container */}
      <form 
        onSubmit={handleSubmit} 
        className="bg-white p-6 sm:p-10 rounded-3xl space-y-8 border border-slate-200/80 shadow-soft-lg"
      >
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-violet-600 text-xs font-bold uppercase tracking-wider">
            <FiPlusCircle className="w-4 h-4" /> Community Contribution
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Add a Safety Review
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Share your experiences to help commuters, students, and travelers make safe choices.
          </p>
        </div>

        {errorMsg && (
          <div className="bg-rose-50 border border-rose-200 text-rose-700 p-4 rounded-xl text-xs flex items-center gap-2 font-medium">
            <FiAlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
            <span>{errorMsg}</span>
          </div>
        )}

        <div className="space-y-6">
          
          {/* Field 1: Place Name */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              Place Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              list="place-suggestions"
              value={placeName}
              onChange={(e) => setPlaceName(e.target.value)}
              placeholder="e.g. ABC Girls PG, Rajiv Chowk Metro..."
              className="w-full px-4 py-3 bg-slate-50 rounded-xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:border-violet-500 focus:bg-white focus:ring-2 focus:ring-violet-500/20"
              required
            />
            <datalist id="place-suggestions">
              {MOCK_PLACES.map((p) => (
                <option key={p.id} value={p.name} />
              ))}
            </datalist>
          </div>

          {/* Field 2: Category */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              Category <span className="text-rose-500">*</span>
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 rounded-xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:border-violet-500 focus:bg-white focus:ring-2 focus:ring-violet-500/20 cursor-pointer"
              required
            >
              {categoriesList.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Field 3: Rating (1-5) */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              Rating (1-5 Stars) <span className="text-rose-500">*</span>
            </label>
            <div className="flex items-center gap-2 pt-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="p-1 focus:outline-none transition-transform hover:scale-115 active:scale-90 cursor-pointer"
                  aria-label={`Rate ${star} Stars`}
                >
                  <FiStar
                    className={`w-8 h-8 ${
                      star <= rating ? 'text-amber-400 fill-amber-400' : 'text-slate-200'
                    }`}
                  />
                </button>
              ))}
              <span className="text-xs font-bold text-slate-600 ml-2">
                {rating} / 5 Stars
              </span>
            </div>
          </div>

          {/* Field 4: Review Text */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              Review Text <span className="text-rose-500">*</span>
            </label>
            <textarea
              rows="4"
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Describe lighting conditions, security guards presence, emergency help access, or overall safety feel..."
              className="w-full p-4 bg-slate-50 rounded-xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:border-violet-500 focus:bg-white focus:ring-2 focus:ring-violet-500/20 leading-relaxed"
              required
            />
          </div>

          {/* Field 5: Anonymous Checkbox */}
          <div className="pt-2">
            <label className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200 cursor-pointer hover:bg-slate-100/70 transition-colors">
              <input
                type="checkbox"
                checked={anonymous}
                onChange={(e) => setAnonymous(e.target.checked)}
                className="w-4 h-4 text-violet-600 rounded border-slate-300 focus:ring-violet-500 accent-violet-600 cursor-pointer"
              />
              <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                <FiLock className="w-4 h-4 text-violet-600" />
                <span>Submit as Anonymous Review</span>
              </div>
            </label>
          </div>

        </div>

        {/* Field 6: Submit Button */}
        <button
          type="submit"
          disabled={submitting}
          className="w-full py-4 rounded-xl font-bold text-sm bg-violet-600 hover:bg-violet-700 text-white shadow-md shadow-violet-600/20 btn-animated disabled:opacity-50 cursor-pointer"
        >
          {submitting ? 'Submitting Review...' : 'Submit Review'}
        </button>

      </form>

    </div>
  );
}
