import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import StepPage from '@/app/guide/[step]/page';
import { useProgressStore } from '@/store/useProgressStore';
import { guideSteps } from '@/lib/guideData';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

// Mock next/navigation
const mockPush = vi.fn();
vi.mock('next/navigation', () => ({
  useParams: () => ({ step: 'eligibility' }), // First step
  useRouter: () => ({
    push: mockPush,
  }),
}));

// Mock firebase
vi.mock('@/lib/firebase', () => ({
  auth: { currentUser: null }, // Test unauthenticated flow which saves to localStorage
  db: {},
  logAppEvent: vi.fn(),
}));

vi.mock('firebase/firestore', () => ({
  doc: vi.fn(),
  setDoc: vi.fn(),
}));

describe('User Flow Integration: Guide Progress', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    useProgressStore.getState().resetProgress();
  });

  it('allows user to open guide, check items, and complete a step', async () => {
    const stepContent = guideSteps[0]; // Eligibility
    
    render(<StepPage />);
    
    // 1. User opens guide: Check if title is rendered
    expect(screen.getByText(stepContent.title)).toBeInTheDocument();
    
    // Initial state: Step is not completed
    expect(useProgressStore.getState().steps[0].isCompleted).toBe(false);
    
    // The "Mark Complete & Continue" button should NOT be there initially
    expect(screen.queryByText(/Mark Complete & Continue/i)).not.toBeInTheDocument();
    
    // 2. User checks off all items in the checklist
    for (const item of stepContent.checklist) {
      const checkbox = screen.getByLabelText(item.label) as HTMLInputElement;
      expect(checkbox.checked).toBe(false);
      fireEvent.click(checkbox);
    }
    
    // Verify checklist state in store
    const storeChecklist = useProgressStore.getState().steps[0].checklist;
    for (const item of stepContent.checklist) {
      expect(storeChecklist[item.id]).toBe(true);
    }
    
    // The "Mark Complete & Continue" button should now be visible
    await waitFor(() => {
      expect(screen.getByText(/Mark Complete & Continue/i)).toBeInTheDocument();
    });
    const completeBtn = screen.getByText(/Mark Complete & Continue/i);
    
    // 3. User completes step
    fireEvent.click(completeBtn);
    
    // Verify progress saves (zustand stores it, and since we use persist middleware, it goes to localStorage)
    expect(useProgressStore.getState().steps[0].isCompleted).toBe(true);
    
    // Verify navigation to next step
    expect(mockPush).toHaveBeenCalledWith(`/guide/${guideSteps[1].id}`);
  });
});
