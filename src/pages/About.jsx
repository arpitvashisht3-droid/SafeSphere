import React from 'react';
import { 
  FiShield, 
  FiTarget, 
  FiEye, 
  FiZap, 
  FiUsers, 
  FiCheckCircle,
  FiArrowRight
} from 'react-icons/fi';
import { Link } from 'react-router-dom';

export default function About() {
  const steps = [
    {
      number: "01",
      title: "Community Submissions",
      description: "Commuters, students, and residents submit location reports evaluating night lighting, crowd density, and guard presence.",
      icon: FiUsers,
      color: "text-indigo-600 bg-indigo-50 border-indigo-200"
    },
    {
      number: "02",
      title: "AI Aggregation & Verification",
      description: "Our AI engine analyzes time-weighted observation inputs to generate a composite 0-100 safety score and risk overview.",
      icon: FiZap,
      color: "text-violet-600 bg-violet-50 border-violet-200"
    },
    {
      number: "03",
      title: "Real-Time Public Index",
      description: "Scores and AI summaries are immediately updated on the public directory to help everyone make informed navigation choices.",
      icon: FiCheckCircle,
      color: "text-emerald-600 bg-emerald-50 border-emerald-200"
    }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 space-y-12 animate-fade-in">
      
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-100 border border-violet-200 text-violet-700 text-xs font-bold">
          <FiShield className="w-4 h-4 text-violet-600" /> About SafeSphere
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          Building Safer Cities Through <br />
          <span className="gradient-text-purple">Transparent Community Data</span>
        </h1>
        <p className="max-w-2xl mx-auto text-sm sm:text-base text-slate-600 leading-relaxed">
          Discover our technology, core purpose, and step-by-step process for generating crowd-verified urban safety intelligence.
        </p>
      </div>

      {/* SECTION 1: WHAT IS SAFESPHERE? */}
      <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200/80 shadow-soft-lg space-y-4 card-hover">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-violet-50 border border-violet-200 text-violet-600 flex items-center justify-center font-bold">
            <FiShield className="w-6 h-6 stroke-[2.2]" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-violet-600">Platform Overview</span>
            <h2 className="text-2xl font-extrabold text-slate-900">What is SafeSphere?</h2>
          </div>
        </div>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed pt-2">
          SafeSphere is a modern, crowdsourced urban safety platform that provides street-level safety scores, night illumination assessments, and community-verified reports. Designed for commuters, students, and travelers, SafeSphere turns raw public observations into actionable safety intelligence so everyone can travel with confidence day or night.
        </p>
      </div>

      {/* SECTION 2 & 3: MISSION & VISION CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-soft space-y-4 flex flex-col justify-between card-hover">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-600 flex items-center justify-center">
              <FiTarget className="w-6 h-6 stroke-[2.2]" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 block">Core Purpose</span>
            <h2 className="text-xl font-extrabold text-slate-900">Our Mission</h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              To empower individuals with real-time, transparent, and verified safety insights. We strive to eliminate dark spots, improve transit safety, and ensure every commuter feels secure during evening hours.
            </p>
          </div>
        </div>

        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-soft space-y-4 flex flex-col justify-between card-hover">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-cyan-50 border border-cyan-200 text-cyan-600 flex items-center justify-center">
              <FiEye className="w-6 h-6 stroke-[2.2]" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-600 block">Future Impact</span>
            <h2 className="text-xl font-extrabold text-slate-900">Our Vision</h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              To create a connected global network of safer urban corridors where municipal authorities, public transport networks, and local communities collaborate seamlessly to eradicate urban safety blind spots.
            </p>
          </div>
        </div>

      </div>

      {/* SECTION 4: HOW IT WORKS */}
      <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200/80 shadow-soft-lg space-y-8">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-violet-600 text-xs font-bold uppercase tracking-wider">
              <FiZap className="w-4 h-4" /> Simple Methodology
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">How It Works</h2>
          </div>
          <Link
            to="/search"
            className="inline-flex items-center gap-2 text-xs font-bold text-violet-600 hover:text-violet-700 group/link"
          >
            <span>Explore Live Index</span>
            <FiArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div 
                key={idx} 
                className="bg-slate-50 p-6 rounded-2xl border border-slate-200/80 space-y-3 relative overflow-hidden group hover:bg-white hover:shadow-soft card-hover"
              >
                <div className="flex items-center justify-between">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${step.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-2xl font-extrabold text-slate-300 group-hover:text-violet-600 transition-colors">
                    {step.number}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 pt-1">{step.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>

    </div>
  );
}
