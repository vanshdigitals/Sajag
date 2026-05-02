import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface StepProgress {
  id: string;
  isCompleted: boolean;
  checklist: Record<string, boolean>;
}

interface ProgressState {
  currentStepIndex: number;
  steps: StepProgress[];
  setStepCompleted: (index: number, completed: boolean) => void;
  setChecklistItem: (stepIndex: number, itemId: string, checked: boolean) => void;
  setCurrentStep: (index: number) => void;
  resetProgress: () => void;
}

const initialSteps: StepProgress[] = [
  { id: 'eligibility', isCompleted: false, checklist: {} },
  { id: 'registration', isCompleted: false, checklist: {} },
  { id: 'booth', isCompleted: false, checklist: {} },
  { id: 'voting', isCompleted: false, checklist: {} },
  { id: 'after', isCompleted: false, checklist: {} },
];

export const useProgressStore = create<ProgressState>()(
  persist(
    (set) => ({
      currentStepIndex: 0,
      steps: initialSteps,
      
      setStepCompleted: (index, completed) => set((state) => {
        const newSteps = [...state.steps];
        newSteps[index] = { ...newSteps[index], isCompleted: completed };
        return { steps: newSteps };
      }),
      
      setChecklistItem: (stepIndex, itemId, checked) => set((state) => {
        const newSteps = [...state.steps];
        const newChecklist = { ...newSteps[stepIndex].checklist, [itemId]: checked };
        newSteps[stepIndex] = { ...newSteps[stepIndex], checklist: newChecklist };
        return { steps: newSteps };
      }),
      
      setCurrentStep: (index) => set({ currentStepIndex: index }),
      
      resetProgress: () => set({ currentStepIndex: 0, steps: initialSteps }),
    }),
    {
      name: 'sajag-progress',
    }
  )
);
