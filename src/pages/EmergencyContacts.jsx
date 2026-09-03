import React, { useEffect, useState } from 'react';
import { fetchEmergencyContacts } from '../api';
import { FiPhoneCall, FiShield, FiAlertCircle, FiRefreshCw, FiPhone } from 'react-icons/fi';

export default function EmergencyContacts() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadContacts = () => {
    setLoading(true);
    setError(null);
    fetchEmergencyContacts()
      .then((data) => {
        setContacts(data.contacts || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError('Unable to load emergency contacts from backend.');
        setLoading(false);
      });
  };

  useEffect(() => {
    loadContacts();
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 space-y-10 animate-fade-in">
      
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-100 border border-rose-200 text-rose-700 text-xs font-bold">
          <FiPhoneCall className="w-4 h-4 text-rose-600" /> Emergency Helplines
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          Women's Emergency Contacts
        </h1>
        <p className="max-w-2xl mx-auto text-sm sm:text-base text-slate-600 leading-relaxed">
          Critical emergency numbers and safety helplines across India.
        </p>
      </div>

      {/* Loading state */}
      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-44 rounded-3xl bg-slate-200 animate-pulse" />
          ))}
        </div>
      )}

      {/* Error state */}
      {error && (
        <div className="bg-rose-50 border border-rose-200 p-6 rounded-3xl text-center space-y-4 max-w-md mx-auto">
          <FiAlertCircle className="w-10 h-10 text-rose-600 mx-auto" />
          <p className="text-sm font-medium text-rose-800">{error}</p>
          <button
            type="button"
            onClick={loadContacts}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-rose-600 text-white hover:bg-rose-700 cursor-pointer btn-animated"
          >
            <FiRefreshCw className="w-4 h-4" /> Try Again
          </button>
        </div>
      )}

      {/* Contacts grid */}
      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {contacts.map((contact, idx) => (
            <div
              key={idx}
              className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-soft card-hover space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="w-10 h-10 rounded-2xl bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center font-bold">
                    <FiShield className="w-5 h-5" />
                  </span>
                  <span className="text-2xl font-black text-rose-600 font-mono tracking-wider">
                    {contact.number}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900">{contact.name}</h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {contact.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100">
                <a
                  href={`tel:${contact.number}`}
                  className="w-full py-3 rounded-xl font-bold text-xs bg-rose-600 hover:bg-rose-700 text-white shadow-md shadow-rose-600/20 flex items-center justify-center gap-2 btn-animated"
                >
                  <FiPhone className="w-4 h-4" />
                  <span>Call {contact.number}</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
