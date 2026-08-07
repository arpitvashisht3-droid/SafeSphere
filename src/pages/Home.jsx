import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import PlaceCard from '../components/PlaceCard';
import { getPlaces } from '../data/places';
import { 
  FiShield, 
  FiUsers, 
  FiCpu, 
  FiLock, 
  FiArrowRight, 
  FiSearch, 
  FiPlusCircle,
  FiTrendingUp,
  FiCheckCircle
} from 'react-icons/fi';

function FeatureCard({ icon: Icon, title, description, iconBg, iconColor }) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-soft card-hover flex flex-col justify-between space-y-4">
      <div className="space-y-3">
        <div className={`w-12 h-12 rounded-xl ${iconBg} ${iconColor} border border-slate-200/60 flex items-center justify-center`}>
          <Icon className="w-6 h-6 stroke-[2]" />
        </div>
        <h3 className="text-lg font-bold text-slate-900">{title}</h3>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          {description}
        </p>
      </div>
      <div className="pt-2 text-xs font-semibold text-violet-600 flex items-center gap-1 group/feat cursor-pointer">
        <span>Learn more</span>
        <FiArrowRight className="w-3.5 h-3.5 group-hover/feat:translate-x-1 transition-transform" />
      </div>
    </div>
  );
}

export default function Home() {
  const [featuredPlaces, setFeaturedPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getPlaces().then((data) => {
      const sorted = [...data].sort((a, b) => b.safetyScore - a.safetyScore);
      setFeaturedPlaces(sorted);
      setLoading(false);
    });
  }, []);

  const handleHeroSearch = ({ query, category, safetyLevel }) => {
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    if (category && category !== 'All Categories') params.set('category', category);
    if (safetyLevel && safetyLevel !== 'All Safety Levels') params.set('safety', safetyLevel);
    navigate(`/search?${params.toString()}`);
  };

  const featureItems = [
    {
      icon: FiUsers,
      title: "Community Reviews",
      description: "Real experiences and safety observations shared by local residents, students, and night shift commuters.",
      iconBg: "bg-indigo-50",
      iconColor: "text-indigo-600"
    },
    {
      icon: FiCpu,
      title: "AI Safety Summary",
      description: "Instant AI-generated risk overviews aggregating lighting quality, crowd density, and guard presence.",
      iconBg: "bg-violet-50",
      iconColor: "text-violet-600"
    },
    {
      icon: FiShield,
      title: "Safety Score",
      description: "Standardized 0-100 composite safety index evaluating lighting, police patrols, and emergency help points.",
      iconBg: "bg-emerald-50",
      iconColor: "text-emerald-600"
    },
    {
      icon: FiLock,
      title: "Anonymous Reviews",
      description: "Submit and read safe, encrypted safety feedback without compromising personal privacy.",
      iconBg: "bg-amber-50",
      iconColor: "text-amber-600"
    }
  ];

  return (
    <div className="space-y-16 sm:space-y-24 pb-16 animate-fade-in">
      
      {/* HERO SECTION */}
      <section className="relative pt-12 sm:pt-20 pb-16 overflow-hidden bg-gradient-to-b from-violet-50/70 via-slate-50 to-slate-50">
        
        {/* Ambient Pulse Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-violet-200/40 rounded-full blur-[120px] pointer-events-none animate-pulse-glow" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-100 border border-violet-200 text-violet-700 text-xs font-bold shadow-2xs">
                <FiShield className="w-4 h-4 text-violet-600" />
                <span>Next-Gen Urban Safety Platform</span>
              </div>

              <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
                Find Safe Places <br className="hidden sm:inline" />
                <span className="gradient-text-purple">Before You Go</span>
              </h1>

              <p className="max-w-2xl mx-auto lg:mx-0 text-base sm:text-lg text-slate-600 leading-relaxed">
                Discover safety ratings, AI insights, and community reviews before visiting any place.
              </p>

              {/* Embedded Search Bar */}
              <div className="pt-2">
                <SearchBar onSearch={handleHeroSearch} showFilters={true} />
              </div>

              {/* Explore Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  to="/search"
                  className="px-6 py-3.5 rounded-xl font-bold text-sm bg-violet-600 hover:bg-violet-700 text-white shadow-md shadow-violet-600/25 flex items-center gap-2 btn-animated"
                >
                  <FiSearch className="w-4 h-4 stroke-[2.2]" />
                  <span>Explore Places</span>
                </Link>

                <Link
                  to="/about"
                  className="px-6 py-3.5 rounded-xl font-bold text-sm bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 shadow-xs transition-all flex items-center gap-2 hover:scale-102"
                >
                  <span>Learn How It Works</span>
                  <FiArrowRight className="w-4 h-4" />
                </Link>
              </div>

            </div>

            {/* Right Hero Visual Card */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-md bg-white rounded-3xl p-6 border border-slate-200/80 shadow-soft-lg card-hover space-y-5">
                <div className="relative h-56 rounded-2xl overflow-hidden bg-slate-100 group">
                  <img
                    src="https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=800&q=80"
                    alt="Safe Transit Hub Preview"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 px-3 py-1.5 rounded-xl bg-white/95 text-slate-900 border border-slate-200 backdrop-blur-md flex items-center gap-1.5 font-bold text-xs shadow-sm">
                    <FiShield className="w-4 h-4 text-violet-600" />
                    <span>94/100 Safe</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span className="font-semibold text-violet-600">Transit & Public Space</span>
                    <span>140+ Reports</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">Central Metro Hub</h3>
                  <div className="p-3 rounded-xl bg-violet-50/70 border border-violet-100 text-xs text-slate-700 space-y-1">
                    <div className="font-bold text-violet-700 flex items-center gap-1">
                      <FiCpu className="w-3.5 h-3.5" /> AI Safety Summary:
                    </div>
                    <p className="line-clamp-2 text-slate-600">
                      High LED illumination, 24/7 CISF security presence, and active female coach patrols.
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-violet-100 text-violet-700 text-xs font-bold">
            <FiCheckCircle className="w-4 h-4" /> Core Features
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Designed for Complete Safety & Peace of Mind
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Everything you need to evaluate location lighting, security officer presence, and community observations.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featureItems.map((item, idx) => (
            <FeatureCard key={idx} {...item} />
          ))}
        </div>
      </section>

      {/* FEATURED LOCATIONS GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-violet-600 text-xs font-bold uppercase tracking-wider">
              <FiTrendingUp className="w-4 h-4" /> Top Verified Locations
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              Top Rated Safe Places
            </h2>
          </div>

          <Link
            to="/search"
            className="inline-flex items-center gap-2 text-sm font-bold text-violet-600 hover:text-violet-700 transition-colors group/all"
          >
            <span>Explore All Places</span>
            <FiArrowRight className="w-4 h-4 group-hover/all:translate-x-1 transition-transform" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-96 rounded-2xl bg-slate-200 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredPlaces.map((place) => (
              <PlaceCard key={place.id} place={place} />
            ))}
          </div>
        )}
      </section>

      {/* CTA SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl p-8 sm:p-12 overflow-hidden bg-slate-800 text-white shadow-soft-lg border border-slate-700/80">
          <div className="absolute right-0 bottom-0 translate-x-10 translate-y-10 w-96 h-96 bg-violet-600/25 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />

          <div className="relative z-10 max-w-2xl space-y-6">
            <span className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-violet-500/20 text-violet-300 border border-violet-400/30">
              Join Our Safety Network
            </span>

            <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
              Know a transit stop or neighborhood hostel? Share your report.
            </h3>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Your 60-second review helps night shift workers, students, and travelers make safe navigation choices every single day.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                to="/add-review"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm bg-violet-600 hover:bg-violet-500 text-white shadow-md shadow-violet-600/30 btn-animated"
              >
                <FiPlusCircle className="w-5 h-5 stroke-[2.2]" />
                <span>Submit Location Safety Report</span>
              </Link>

              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm bg-slate-700/80 hover:bg-slate-700 text-slate-200 border border-slate-600 transition-all hover:scale-102"
              >
                <span>Contact Team</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
