import React, { useState } from 'react';
import { submitComplaint } from '../api';
import { FiLock, FiCheckCircle, FiAlertCircle, FiSend, FiCalendar, FiBriefcase } from 'react-icons/fi';

export default function Complaints() {
  const [formData, setFormData] = useState({
    category: '',
    description: '',
    incident_date: '',
    organization: '',
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  const categories = [
    'Workplace Harassment',
    'Public Transport Safety',
    'Stalking & Harassment',
    'Domestic Abuse / Cyber Crime',
    'Institutional Discrimination',
    'Other Safety Concern',
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');
    setResult(null);

    if (!formData.category.trim()) {
      setErrorMsg('Please select or enter a complaint category.');
      return;
    }
    if (!formData.description.trim()) {
      setErrorMsg('Please enter a description of the incident.');
      return;
    }

    setLoading(true);

    const payload = {
      category: formData.category.trim(),
      description: formData.description.trim(),
      incident_date: formData.incident_date || null,
      organization: formData.organization.trim() || null,
    };

    submitComplaint(payload)
      .then((data) => {
        setLoading(false);
        setResult(data);
        setFormData({
          category: '',
          description: '',
          incident_date: '',
          organization: '',
        });
      })
      .catch((err) => {
        setLoading(false);
        setErrorMsg(err.message || 'Failed to submit complaint.');
      });
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8 animate-fade-in">
      
      {/* Page Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-100 border border-violet-200 text-violet-700 text-xs font-bold">
          <FiLock className="w-4 h-4 text-violet-600" /> Anonymous Reporting
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          File an Anonymous Complaint
        </h1>
        <p className="max-w-xl mx-auto text-sm sm:text-base text-slate-600 leading-relaxed">
          Report safety incidents, harassment, or workplace violations securely. No identifying information (name, email, phone) is stored.
        </p>
      </div>

      {/* Success Notification Banner */}
      {result && (
        <div className="bg-emerald-50 border border-emerald-200 p-6 sm:p-8 rounded-3xl space-y-4 shadow-soft animate-fade-in">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shrink-0">
              <FiCheckCircle className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-emerald-900">{result.message}</h3>
              <p className="text-xs text-emerald-700 mt-0.5">
                Your complaint has been logged anonymously with unique identifier:
              </p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-emerald-200 text-center font-mono font-bold text-lg text-violet-700 shadow-xs">
            Complaint ID: {result.complaint_id}
          </div>

          <button
            type="button"
            onClick={() => setResult(null)}
            className="w-full py-3 rounded-xl text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-700 transition-colors cursor-pointer btn-animated"
          >
            Submit Another Complaint
          </button>
        </div>
      )}

      {/* Main Complaint Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 sm:p-10 rounded-3xl space-y-6 border border-slate-200/80 shadow-soft-lg"
      >
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <h2 className="text-xl font-bold text-slate-900">Complaint Details</h2>
          <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 flex items-center gap-1">
            <FiLock className="w-3.5 h-3.5" /> 100% Anonymous
          </span>
        </div>

        {errorMsg && (
          <div className="bg-rose-50 border border-rose-200 text-rose-700 p-4 rounded-xl text-xs flex items-center gap-2 font-medium">
            <FiAlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
            <span>{errorMsg}</span>
          </div>
        )}

        <div className="space-y-5">
          
          {/* Field 1: Category */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              Category <span className="text-rose-500">*</span>
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              required
              className="w-full px-4 py-3 bg-slate-50 rounded-xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:border-violet-500 focus:bg-white focus:ring-2 focus:ring-violet-500/20 cursor-pointer"
            >
              <option value="" disabled>Select incident category...</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Field 2: Description */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              Incident Description <span className="text-rose-500">*</span>
            </label>
            <textarea
              rows="5"
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Provide objective details of what occurred, lighting conditions, location context..."
              className="w-full p-4 bg-slate-50 rounded-xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:border-violet-500 focus:bg-white focus:ring-2 focus:ring-violet-500/20 leading-relaxed"
            />
          </div>

          {/* Optional Fields Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Field 3: Incident Date (Optional) */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1">
                <FiCalendar className="w-3.5 h-3.5 text-slate-400" /> Incident Date (Optional)
              </label>
              <input
                type="date"
                value={formData.incident_date}
                onChange={(e) => setFormData({ ...formData, incident_date: e.target.value })}
                className="w-full px-4 py-3 bg-slate-50 rounded-xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:border-violet-500 focus:bg-white focus:ring-2 focus:ring-violet-500/20"
              />
            </div>

            {/* Field 4: Organization (Optional) */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1">
                <FiBriefcase className="w-3.5 h-3.5 text-slate-400" /> Organization / Location (Optional)
              </label>
              <input
                type="text"
                value={formData.organization}
                onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                placeholder="e.g. Metro Line 2, College Hostel..."
                className="w-full px-4 py-3 bg-slate-50 rounded-xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:border-violet-500 focus:bg-white focus:ring-2 focus:ring-violet-500/20"
              />
            </div>

          </div>

        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 rounded-xl font-bold text-sm bg-violet-600 hover:bg-violet-700 text-white shadow-md shadow-violet-600/20 flex items-center justify-center gap-2 cursor-pointer btn-animated disabled:opacity-50"
        >
          <FiSend className="w-4 h-4" />
          <span>{loading ? 'Submitting Anonymous Complaint...' : 'Submit Anonymous Complaint'}</span>
        </button>
      </form>

    </div>
  );
}
