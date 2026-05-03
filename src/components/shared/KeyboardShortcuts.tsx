'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

/**
 * Registers app-wide keyboard shortcuts.
 * Ctrl+/ → navigate to /assistant
 */
export function KeyboardShortcuts() {
  const router = useRouter();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === '/') {
        e.preventDefault();
        router.push('/assistant');
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [router]);

  return null;
}
