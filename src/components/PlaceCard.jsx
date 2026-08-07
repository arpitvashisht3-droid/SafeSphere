import React from 'react';
import { Link } from 'react-router-dom';
import { FiShield, FiMapPin, FiStar, FiChevronRight } from 'react-icons/fi';

export default function PlaceCard(props) {
  const data = props.place || props;

  const {
    id = '1',
    name = 'Location Name',
    category = 'General',
    location = 'City',
    rating = 4.5,
    safetyScore = 90,
    image = 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=800&q=80',
    address,
    aiSummary
  } = data;

  const getBadgeColors = (score) => {
    if (score >= 85) {
      return {
        bg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
        label: 'High Safety'
      };
    } else if (score >= 70) {
      return {
        bg: 'bg-amber-50 text-amber-700 border-amber-200',
        label: 'Moderate Safety'
      };
    } else {
      return {
        bg: 'bg-rose-50 text-rose-700 border-rose-200',
        label: 'Caution Advised'
      };
    }
  };

  const badgeStyle = getBadgeColors(safetyScore);

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-soft card-hover overflow-hidden flex flex-col h-full group">
      
      {/* Image Banner Header with Smooth Scale on Hover */}
      <div className="relative h-48 w-full overflow-hidden bg-slate-100">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent" />
        
        {/* Category Pill Tag */}
        <div className="absolute top-3 left-3">
          <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-white/95 text-slate-800 border border-slate-200 backdrop-blur-md shadow-xs">
            {category}
          </span>
        </div>

        {/* Safety Score Pill Badge */}
        <div className="absolute top-3 right-3 px-3 py-1 rounded-xl bg-white/95 text-slate-900 border border-slate-200 backdrop-blur-md flex items-center gap-1.5 font-bold text-xs shadow-sm">
          <FiShield className="w-3.5 h-3.5 text-violet-600" />
          <span>{safetyScore}/100</span>
        </div>

        {/* Location Label Overlay */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white">
          <span className="flex items-center gap-1 font-medium drop-shadow-sm">
            <FiMapPin className="w-3.5 h-3.5 text-violet-300" />
            {location}
          </span>
          <span className="flex items-center gap-1 text-amber-300 font-bold drop-shadow-sm">
            <FiStar className="w-3 h-3 fill-amber-300" /> {rating}
          </span>
        </div>
      </div>

      {/* Body Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <h3 className="text-base font-bold text-slate-900 group-hover:text-violet-600 transition-colors duration-200 line-clamp-1">
            {name}
          </h3>

          {address && (
            <p className="text-xs text-slate-500 line-clamp-1">
              {address}
            </p>
          )}

          {aiSummary && (
            <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-2.5 rounded-xl border border-slate-100 line-clamp-2 mt-2">
              <strong className="text-violet-600 font-semibold">AI Overview: </strong>{aiSummary}
            </p>
          )}
        </div>

        {/* Footer Bar: Safety Level & Animated View Details Button */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
          <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${badgeStyle.bg}`}>
            {badgeStyle.label}
          </span>

          <Link
            to={`/place/${id}`}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-violet-50 text-violet-700 hover:bg-violet-600 hover:text-white border border-violet-200/80 transition-all duration-200 group/btn cursor-pointer btn-animated"
          >
            <span>View Details</span>
            <FiChevronRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform duration-200" />
          </Link>
        </div>

      </div>

    </div>
  );
}
