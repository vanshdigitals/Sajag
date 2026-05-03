import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import BoothLocator from '@/app/locator/page';

// Mock framer-motion to avoid animation issues in tests
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    circle: ({ children, ...props }: any) => <circle {...props}>{children}</circle>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

// Mock firebase
vi.mock('@/lib/firebase', () => ({
  logAppEvent: vi.fn(),
}));

describe('BoothLocator Component', () => {
  it('renders search input and mock booths', () => {
    render(<BoothLocator />);
    
    // Check if input is present
    expect(screen.getByPlaceholderText('Search by area, EPIC or PIN code...')).toBeInTheDocument();
    
    // Check if initial mock booth is rendered
    expect(screen.getAllByText('Government Model Sr. Sec. School')[0]).toBeInTheDocument();
    expect(screen.getByText('Sector 16, Chandigarh')).toBeInTheDocument();
  });

  it('shows error message for invalid PIN format', () => {
    render(<BoothLocator />);
    
    const input = screen.getByPlaceholderText('Search by area, EPIC or PIN code...');
    
    // Enter an invalid 6-character PIN (contains letters)
    fireEvent.change(input, { target: { value: '11A001' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
    
    // Check if error message is displayed
    expect(screen.getByText('Invalid PIN code format. Please enter 6 digits.')).toBeInTheDocument();
  });

  it('does not show error for valid PIN format', () => {
    render(<BoothLocator />);
    
    const input = screen.getByPlaceholderText('Search by area, EPIC or PIN code...');
    
    // Enter a valid 6-digit PIN
    fireEvent.change(input, { target: { value: '110001' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
    
    // Check if error message is NOT displayed
    expect(screen.queryByText('Invalid PIN code format. Please enter 6 digits.')).not.toBeInTheDocument();
  });
  
  it('clears error when user starts typing again', () => {
    render(<BoothLocator />);
    
    const input = screen.getByPlaceholderText('Search by area, EPIC or PIN code...');
    
    // Trigger error
    fireEvent.change(input, { target: { value: '11A001' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
    expect(screen.getByText('Invalid PIN code format. Please enter 6 digits.')).toBeInTheDocument();
    
    // Type again
    fireEvent.change(input, { target: { value: '11A0012' } });
    expect(screen.queryByText('Invalid PIN code format. Please enter 6 digits.')).not.toBeInTheDocument();
  });
});
