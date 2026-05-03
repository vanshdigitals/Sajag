'use client';
import React from 'react';
import dynamic from 'next/dynamic';
import { ChatSkeleton } from '@/components/shared/Skeletons';
import AIChatInterfaceSync from '@/components/assistant/AIChatInterface';

const AIChatInterfaceDynamic = dynamic(
  () => import('@/components/assistant/AIChatInterface'),
  { ssr: false, loading: () => <ChatSkeleton /> }
);

const AssistantPage = () => {
  if (process.env.NODE_ENV === 'test') {
    return <AIChatInterfaceSync />;
  }
  return <AIChatInterfaceDynamic />;
};

export default AssistantPage;
