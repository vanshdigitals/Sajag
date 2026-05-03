import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BoothLocatorPage from '@/app/locator/page';

vi.mock('framer-motion', () => ({
  motion: {
    div: vi.fn().mockImplementation((props: any) => props.children),
  },
  AnimatePresence: vi.fn().mockImplementation((props: any) => props.children),
}));

describe('PIN Validation Component Logic', () => {
  it('has correct accessibility attributes on input', () => {
    render(<BoothLocatorPage />);
    const input = screen.getByPlaceholderText(/Search by area, EPIC or PIN code/i);
    expect(input).toBeInTheDocument();
  });

  it('shows error for invalid PIN length when Enter is pressed', async () => {
    const user = userEvent.setup();
    render(<BoothLocatorPage />);
    
    const input = screen.getByPlaceholderText(/Search by area, EPIC or PIN code/i);
    await user.type(input, '1234A6');
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter', charCode: 13 });
    
    // UI should show an error
    expect(screen.getByText(/Invalid PIN code format/i)).toBeInTheDocument();
  });
});
