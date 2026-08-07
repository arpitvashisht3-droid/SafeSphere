import React, { useState } from 'react';
import { FiStar, FiThumbsUp, FiShield, FiUser, FiCheckCircle } from 'react-icons/fi';

export default function ReviewCard(props) {
  const data = props.review && typeof props.review === 'object' ? props.review : props;

  const {
    review = 'Location is clean and well-lit with active security.',
    rating = 5,
    anonymous = false
  } = data;

  const [likes, setLikes] = useState(4);
  const [hasLiked, setHasLiked] = useState(false);

  const handleLike = () => {
    if (hasLiked) {
      setLikes((prev) => prev - 1);
      setHasLiked(false);
    } else {
      setLikes((prev) => prev + 1);
      setHasLiked(true);
    }
  };

  return (
    <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-soft space-y-4 card-hover">
      
      {/* Header: User Info & Anonymous Badge */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs border transition-colors duration-200 ${
            anonymous 
              ? 'bg-slate-100 text-slate-600 border-slate-200' 
              : 'bg-violet-50 text-violet-700 border-violet-200'
          }`}>
            {anonymous ? <FiUser className="w-4 h-4" /> : <FiShield className="w-4 h-4" />}
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-bold text-slate-900">
                {anonymous ? 'Anonymous Commuter' : 'Verified Member'}
              </h4>
              {!anonymous && (
                <FiCheckCircle className="w-3.5 h-3.5 text-violet-600" title="Verified Reporter" />
              )}
            </div>
            
            {anonymous ? (
              <span className="inline-block px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-600 border border-slate-200 mt-0.5">
                Anonymous Report
              </span>
            ) : (
              <span className="text-[11px] text-slate-400">Verified Safety Entry</span>
            )}
          </div>
        </div>

        {/* Star Rating Badge */}
        <div className="flex items-center gap-1 bg-amber-50 px-2.5 py-1 rounded-xl border border-amber-200/70">
          <FiStar className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
          <span className="text-xs font-bold text-amber-700">{rating} / 5</span>
        </div>
      </div>

      {/* Review Commentary */}
      <p className="text-sm text-slate-700 leading-relaxed italic">
        "{review}"
      </p>

      {/* Footer: Helpful Action */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <span>Was this report helpful?</span>
        <button
          type="button"
          onClick={handleLike}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-all duration-200 cursor-pointer hover:scale-105 active:scale-95 ${
            hasLiked
              ? 'bg-violet-50 text-violet-700 border-violet-300 font-semibold'
              : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-violet-50 hover:text-violet-600 hover:border-violet-200'
          }`}
        >
          <FiThumbsUp className="w-3.5 h-3.5" />
          <span>Helpful ({likes})</span>
        </button>
      </div>

    </div>
  );
}
