import React from 'react';

/**
 * SkeletonGrid
 *
 * Renders `count` animated pulse skeleton cards in a responsive grid.
 * Mirrors the grid column layout used by the places grid so the loading
 * state matches the loaded state with zero extra markup in parent pages.
 *
 * @param {{ count?: number, className?: string }} props
 */
export default function SkeletonGrid({ count = 6, className = '' }) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className="h-96 rounded-2xl bg-slate-200 animate-pulse" />
      ))}
    </div>
  );
}
