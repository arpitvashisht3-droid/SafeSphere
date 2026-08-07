import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

/**
 * BackButton
 *
 * Renders a small back-navigation control that calls `navigate(-1)`.
 * Accepts an optional `label` prop for screen-reader clarity.
 *
 * @param {{ label?: string }} props
 */
export default function BackButton({ label = 'Back to previous page' }) {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      onClick={() => navigate(-1)}
      className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-violet-600 transition-colors cursor-pointer"
    >
      <FiArrowLeft className="w-4 h-4" />
      <span>{label}</span>
    </button>
  );
}
