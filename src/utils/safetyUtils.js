/**
 * SafeSphere — Safety Score Utilities
 *
 * Centralises the safety-score threshold logic so that the ≥85 / ≥70 / <70
 * boundaries are defined in exactly one place and imported everywhere they
 * are needed.
 */

export const SAFETY_THRESHOLDS = {
  HIGH: 85,
  MODERATE: 70,
};

/**
 * Returns badge styling and label for a given composite safety score.
 *
 * @param {number} score - Safety score between 0 and 100.
 * @returns {{ label: string, className: string }}
 */
export function getSafetyBadge(score) {
  if (score >= SAFETY_THRESHOLDS.HIGH) {
    return {
      label: 'High Safety',
      className: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    };
  }
  if (score >= SAFETY_THRESHOLDS.MODERATE) {
    return {
      label: 'Moderate Safety',
      className: 'bg-amber-50 text-amber-700 border-amber-200',
    };
  }
  return {
    label: 'Caution Advised',
    className: 'bg-rose-50 text-rose-700 border-rose-200',
  };
}
