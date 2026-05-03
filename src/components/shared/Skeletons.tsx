import React from 'react';

export const MapSkeleton = () => (
  <div className="w-full h-[200px] bg-gray-200 animate-pulse rounded-lg border border-gray-300" />
);

export const ChatSkeleton = () => (
  <div className="w-full p-4 space-y-4">
    <div className="h-10 bg-gray-200 rounded animate-pulse w-3/4" />
    <div className="h-10 bg-gray-200 rounded animate-pulse w-1/2 ml-auto" />
    <div className="h-10 bg-gray-200 rounded animate-pulse w-2/3" />
  </div>
);

export const TimelineSkeleton = () => (
  <div className="w-full p-4 space-y-6">
    <div className="flex gap-4">
      <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse" />
      <div className="flex-1 h-20 bg-gray-200 rounded animate-pulse" />
    </div>
    <div className="flex gap-4">
      <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse" />
      <div className="flex-1 h-20 bg-gray-200 rounded animate-pulse" />
    </div>
    <div className="flex gap-4">
      <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse" />
      <div className="flex-1 h-20 bg-gray-200 rounded animate-pulse" />
    </div>
  </div>
);
