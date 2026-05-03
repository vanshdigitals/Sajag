'use client';
import React, { useCallback } from 'react';

/** Renders a visually-hidden "Skip to main content" link that becomes visible on keyboard focus. */
export function SkipLink() {
  const handleFocus = useCallback((e: React.FocusEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.top = '0';
  }, []);

  const handleBlur = useCallback((e: React.FocusEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.top = '-40px';
  }, []);

  return (
    <a
      href="#main-content"
      onFocus={handleFocus}
      onBlur={handleBlur}
      style={{
        position: 'fixed',
        top: '-40px',
        left: 0,
        zIndex: 9999,
        background: '#0066cc',
        color: '#ffffff',
        padding: '8px 16px',
        fontWeight: 600,
        textDecoration: 'none',
        borderRadius: '0 0 4px 0',
        transition: 'top 0.1s ease',
      }}
    >
      Skip to main content
    </a>
  );
}
