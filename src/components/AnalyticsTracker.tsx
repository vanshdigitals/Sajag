'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { logAppEvent } from '@/lib/firebase';

export const AnalyticsTracker = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (pathname) {
      logAppEvent('page_view', {
        page_path: pathname,
        page_search: searchParams?.toString() || '',
      });
    }
  }, [pathname, searchParams]);

  return null;
};
