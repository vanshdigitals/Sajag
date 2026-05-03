import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import BoothLocatorPage from '@/app/locator/page';

global.fetch = vi.fn();

const mockGeolocation = {
  getCurrentPosition: vi.fn(),
  watchPosition: vi.fn(),
  clearWatch: vi.fn(),
};
(global.navigator as unknown as { geolocation: typeof mockGeolocation }).geolocation = mockGeolocation;

vi.mock('framer-motion', () => ({
  motion: {
    div: vi.fn().mockImplementation((props: { children: React.ReactNode }) => props.children),
  },
  AnimatePresence: vi.fn().mockImplementation((props: { children: React.ReactNode }) => props.children),
}));

describe('Booth Locator Flow Integration', () => {
  const user = userEvent.setup();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('completes the full flow: enter PIN', async () => {
    render(<BoothLocatorPage />);

    const input = screen.getByPlaceholderText(/Search by area, EPIC or PIN code/i);
    await user.type(input, '110001');

    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter', charCode: 13 });

    await waitFor(() => {
      const elements = screen.getAllByText('Government Model Sr. Sec. School');
      expect(elements.length).toBeGreaterThan(0);
      expect(elements[0]).toBeInTheDocument();
    });
  });

  it('handles invalid PIN input correctly', async () => {
    render(<BoothLocatorPage />);

    const input = screen.getByPlaceholderText(/Search by area, EPIC or PIN code/i);
    await user.type(input, '1234A6'); 
    
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter', charCode: 13 });

    await waitFor(() => {
      expect(screen.getByText(/Invalid PIN code format/i)).toBeInTheDocument();
    });
  });
});
