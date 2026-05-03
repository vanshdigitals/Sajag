import React from 'react';

interface Props {
  size?: number;
  label?: string;
}

/**
 * Accessible animated loading spinner.
 *
 * @param size - Diameter in pixels (default: 24)
 * @param label - Screen-reader label (default: 'Loading…')
 */
export function LoadingSpinner({ size = 24, label = 'Loading…' }: Props) {
  return (
    <span
      role="status"
      aria-label={label}
      style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        style={{ animation: 'sajag-spin 0.8s linear infinite' }}
      >
        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
      </svg>
      <style>{`@keyframes sajag-spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`}</style>
      <span style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0,0,0,0)' }}>
        {label}
      </span>
    </span>
  );
}
