import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AssistantPage from '@/app/assistant/page';

global.fetch = vi.fn();

vi.mock('framer-motion', () => ({
  motion: {
    div: vi.fn().mockImplementation((props: any) => props.children),
    form: vi.fn().mockImplementation((props: any) => props.children),
  },
  AnimatePresence: vi.fn().mockImplementation((props: any) => props.children),
}));

global.scrollTo = vi.fn();
Element.prototype.scrollIntoView = vi.fn();

describe('Assistant Flow Integration', () => {
  const user = userEvent.setup();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('completes the full flow: ask question -> get response', async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ text: 'This is an AI response about elections.' })
    } as Response);

    render(<AssistantPage />);

    const input = screen.getByPlaceholderText(/Ask a question.../i);
    await user.type(input, 'How do I register to vote?');
    
    fireEvent.keyPress(input, { key: 'Enter', code: 'Enter', charCode: 13 });

    expect(screen.getByText('How do I register to vote?')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('This is an AI response about elections.')).toBeInTheDocument();
    });
  });

  it('handles network failure gracefully', async () => {
    vi.mocked(fetch).mockRejectedValueOnce(new Error('Network error'));

    render(<AssistantPage />);

    const input = screen.getByPlaceholderText(/Ask a question.../i);
    await user.type(input, 'Will this fail?');
    fireEvent.keyPress(input, { key: 'Enter', code: 'Enter', charCode: 13 });

    await waitFor(() => {
      expect(screen.getByText(/I'm sorry, I'm having trouble connecting/i)).toBeInTheDocument();
    });
  });

  it('handles malicious input rejection from API', async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: false,
      status: 400,
      json: async () => ({ error: 'Bad input' })
    } as Response);

    render(<AssistantPage />);

    const input = screen.getByPlaceholderText(/Ask a question.../i);
    await user.type(input, 'a');
    fireEvent.keyPress(input, { key: 'Enter', code: 'Enter', charCode: 13 });

    await waitFor(() => {
      expect(screen.getByText(/I'm sorry, I'm having trouble connecting/i)).toBeInTheDocument();
    });
  });
});
