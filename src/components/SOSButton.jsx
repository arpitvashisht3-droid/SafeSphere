import React, { useState } from 'react';
import { triggerSOS } from '../api';
import { FiAlertTriangle, FiCheckCircle, FiX, FiLoader, FiMapPin } from 'react-icons/fi';

export default function SOSButton({ variant = 'floating' }) {
  const [loading, setLoading] = useState(false);
  const [sosResult, setSosResult] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSOSClick = () => {
    setLoading(true);
    setErrorMsg('');

    const sendAlert = (lat = null, lng = null) => {
      const payload = {
        message: 'Emergency SOS alert triggered from SafeSphere web client!',
        latitude: lat,
        longitude: lng,
      };

      triggerSOS(payload)
        .then((data) => {
          setLoading(false);
          setSosResult(data);
        })
        .catch((err) => {
          setLoading(false);
          setErrorMsg(err.message || 'Failed to send SOS alert. Please try again.');
        });
    };

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          sendAlert(position.coords.latitude, position.coords.longitude);
        },
        (err) => {
          console.warn('Geolocation access denied or unavailable:', err.message);
          sendAlert(null, null);
        },
        { timeout: 5000, maximumAge: 60000 }
      );
    } else {
      sendAlert(null, null);
    }
  };

  const closeModal = () => {
    setSosResult(null);
    setErrorMsg('');
  };

  return (
    <>
      {variant === 'nav' ? (
        <button
          type="button"
          onClick={handleSOSClick}
          disabled={loading}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl font-extrabold text-xs bg-rose-600 hover:bg-rose-700 text-white shadow-md shadow-rose-600/30 transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer disabled:opacity-50"
        >
          {loading ? (
            <FiLoader className="w-4 h-4 animate-spin" />
          ) : (
            <FiAlertTriangle className="w-4 h-4 animate-bounce" />
          )}
          <span>{loading ? 'SENDING SOS...' : 'SOS EMERGENCY'}</span>
        </button>
      ) : (
        <button
          type="button"
          onClick={handleSOSClick}
          disabled={loading}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-5 py-3.5 rounded-full font-black text-sm bg-rose-600 hover:bg-rose-700 text-white shadow-xl shadow-rose-600/40 border-2 border-rose-400/50 transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer disabled:opacity-50 group"
          title="Send Emergency SOS Alert"
        >
          {loading ? (
            <FiLoader className="w-5 h-5 animate-spin" />
          ) : (
            <FiAlertTriangle className="w-5 h-5 group-hover:rotate-12 transition-transform" />
          )}
          <span className="tracking-wider">{loading ? 'SENDING...' : 'EMERGENCY SOS'}</span>
        </button>
      )}

      {/* SOS Result / Error Modal */}
      {(sosResult || errorMsg) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white max-w-md w-full rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl border border-slate-200 relative">
            <button
              type="button"
              onClick={closeModal}
              className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
            >
              <FiX className="w-5 h-5" />
            </button>

            {sosResult ? (
              <div className="text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                  <FiCheckCircle className="w-8 h-8 stroke-[2.2]" />
                </div>

                <div className="space-y-1">
                  <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-extrabold text-xs uppercase tracking-wider">
                    Status: {sosResult.status}
                  </span>
                  <h3 className="text-2xl font-extrabold text-slate-900 pt-2">
                    SOS Alert Dispatched
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Your emergency alert has been recorded on the SafeSphere network.
                  </p>
                </div>

                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2 text-left text-xs font-mono text-slate-700">
                  <div className="flex justify-between">
                    <span className="text-slate-400 font-sans">Alert ID:</span>
                    <span className="font-bold text-violet-700">{sosResult.alert_id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400 font-sans">Timestamp:</span>
                    <span>{new Date(sosResult.timestamp).toLocaleTimeString()}</span>
                  </div>
                  {sosResult.latitude && sosResult.longitude ? (
                    <div className="flex justify-between items-center text-emerald-700 pt-1 border-t border-slate-200">
                      <span className="text-slate-400 font-sans flex items-center gap-1">
                        <FiMapPin className="w-3.5 h-3.5 text-emerald-600" /> Location:
                      </span>
                      <span>
                        {sosResult.latitude.toFixed(4)}, {sosResult.longitude.toFixed(4)}
                      </span>
                    </div>
                  ) : (
                    <div className="text-slate-400 font-sans italic pt-1 border-t border-slate-200">
                      Location not available
                    </div>
                  )}
                </div>

                <button
                  type="button"
                  onClick={closeModal}
                  className="w-full py-3 rounded-xl font-bold text-sm bg-violet-600 hover:bg-violet-700 text-white shadow-md btn-animated cursor-pointer"
                >
                  Acknowledge & Close
                </button>
              </div>
            ) : (
              <div className="text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
                  <FiAlertTriangle className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Failed to Trigger SOS</h3>
                <p className="text-xs text-rose-600 bg-rose-50 p-3 rounded-xl border border-rose-200 font-medium">
                  {errorMsg}
                </p>
                <button
                  type="button"
                  onClick={closeModal}
                  className="w-full py-3 rounded-xl font-bold text-sm bg-slate-800 text-white hover:bg-slate-900 transition-colors"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
