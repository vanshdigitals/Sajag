import { describe, it, expect } from 'vitest';
import { isValidPIN, sanitizePrompt } from '@/lib/validation';

describe('Validation Library', () => {
  describe('isValidPIN', () => {
    it('returns true for a valid 6-digit PIN', () => {
      expect(isValidPIN('110001')).toBe(true);
      expect(isValidPIN('400001')).toBe(true);
    });

    it('returns false for an empty string', () => {
      expect(isValidPIN('')).toBe(false);
    });

    it('returns false for strings with letters', () => {
      expect(isValidPIN('11A001')).toBe(false);
      expect(isValidPIN('ABCDEF')).toBe(false);
    });

    it('returns false for PINs not exactly 6 digits', () => {
      expect(isValidPIN('12345')).toBe(false);
      expect(isValidPIN('1234567')).toBe(false);
    });

    it('returns false for PINs starting with 0', () => {
      expect(isValidPIN('012345')).toBe(false);
    });
  });

  describe('sanitizePrompt', () => {
    it('removes harmful characters from prompt', () => {
      expect(sanitizePrompt('<script>alert("test")</script>')).toBe('scriptalert"test"/script');
      expect(sanitizePrompt('SELECT * FROM users;')).toBe('SELECT * FROM users;');
      expect(sanitizePrompt('function() { return true; }')).toBe('function  return true;');
    });

    it('trims whitespace', () => {
      expect(sanitizePrompt('   hello world   ')).toBe('hello world');
    });

    it('returns empty string for empty input', () => {
      expect(sanitizePrompt('')).toBe('');
    });
  });
});
