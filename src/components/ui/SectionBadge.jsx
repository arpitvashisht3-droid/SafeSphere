import React from 'react';

/**
 * SectionBadge
 *
 * Renders the violet pill badge used as a section eyebrow label.
 * Accepts an optional React-Icons `icon` and a required `label` string.
 *
 * @param {{ icon?: React.ElementType, label: string }} props
 */
export default function SectionBadge({ icon: Icon, label }) {
  return (
    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-100 border border-violet-200 text-violet-700 text-xs font-bold">
      {Icon && <Icon className="w-4 h-4 text-violet-600" />}
      {label}
    </div>
  );
}
