import React, { useState } from 'react';
import { FiMail, FiMapPin, FiPhoneCall, FiSend, FiCheckCircle } from 'react-icons/fi';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 space-y-12 animate-fade-in">
      
      {/* Page Title */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-100 border border-violet-200 text-violet-700 text-xs font-bold">
          <FiMail className="w-4 h-4 text-violet-600" /> Contact SafeSphere Team
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          Get in Touch with Us
        </h1>
        <p className="max-w-2xl mx-auto text-sm sm:text-base text-slate-600 leading-relaxed">
          Have questions about our urban safety methodology, partnership inquiries, or data integration? We'd love to hear from you.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Contact Info Cards */}
        <div className="space-y-4">
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-soft card-hover space-y-3">
            <div className="p-3 rounded-xl bg-violet-50 text-violet-600 border border-violet-200 w-fit">
              <FiMail className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Email Inquiry</h3>
            <p className="text-xs text-slate-600">contact@safesphere.org</p>
            <p className="text-xs text-slate-400">Response time: within 24 hours</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-soft card-hover space-y-3">
            <div className="p-3 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-200 w-fit">
              <FiMapPin className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Headquarters</h3>
            <p className="text-xs text-slate-600">SafeSphere Urban Safety Initiative</p>
            <p className="text-xs text-slate-400">Connaught Place, Central Hub, New Delhi</p>
          </div>

          <div className="bg-slate-800 text-white p-6 rounded-2xl border border-slate-700 shadow-soft space-y-3">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
              <FiPhoneCall className="w-4 h-4" /> Emergency Hotline
            </div>
            <p className="text-xs text-slate-300">For immediate emergency assistance always call 911 / 112.</p>
          </div>
        </div>

        {/* Right Column: Interactive Form */}
        <div className="lg:col-span-2">
          {submitted ? (
            <div className="bg-white p-8 sm:p-12 rounded-3xl text-center space-y-4 border border-slate-200/80 shadow-soft-lg animate-fade-in">
              <div className="w-16 h-16 rounded-full bg-violet-50 text-violet-600 border border-violet-200 flex items-center justify-center mx-auto">
                <FiCheckCircle className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-extrabold text-slate-900">Message Received!</h2>
              <p className="text-sm text-slate-600 max-w-md mx-auto">
                Thank you for contacting SafeSphere. Our team will get back to your inquiry shortly.
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="px-6 py-2.5 rounded-xl text-xs font-bold bg-violet-600 text-white hover:bg-violet-700 shadow-sm btn-animated"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-10 rounded-3xl space-y-6 border border-slate-200/80 shadow-soft-lg">
              <h2 className="text-xl font-bold text-slate-900">Send Us a Message</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your Full Name"
                    className="w-full px-4 py-3 bg-slate-50 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-violet-500 focus:bg-white focus:ring-2 focus:ring-violet-500/20 transition-all duration-200"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@example.com"
                    className="w-full px-4 py-3 bg-slate-50 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-violet-500 focus:bg-white focus:ring-2 focus:ring-violet-500/20 transition-all duration-200"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">Subject</label>
                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="Inquiry topic..."
                  className="w-full px-4 py-3 bg-slate-50 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-violet-500 focus:bg-white focus:ring-2 focus:ring-violet-500/20 transition-all duration-200"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">Message</label>
                <textarea
                  rows="4"
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="How can we assist you?"
                  className="w-full p-4 bg-slate-50 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-violet-500 focus:bg-white focus:ring-2 focus:ring-violet-500/20 transition-all duration-200"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl font-bold text-sm bg-violet-600 hover:bg-violet-700 text-white shadow-md shadow-violet-600/20 flex items-center justify-center gap-2 cursor-pointer btn-animated"
              >
                <FiSend className="w-4 h-4" />
                <span>Send Message</span>
              </button>
            </form>
          )}
        </div>

      </div>

    </div>
  );
}
