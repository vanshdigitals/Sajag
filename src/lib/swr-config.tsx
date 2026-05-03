'use client';

import React from 'react';
import { SWRConfig } from 'swr';

export const SWRProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <SWRConfig
      value={{
        fetcher: (url: string) => fetch(url).then((res) => res.json()),
        revalidateOnFocus: false,
        revalidateOnReconnect: true,
        dedupingInterval: 5000, // 5 seconds
        errorRetryCount: 3,
      }}
    >
      {children}
    </SWRConfig>
  );
};
