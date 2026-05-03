import { describe, it, expect } from 'vitest';
import { 
  pinCodeSchema, 
  assistantQuerySchema, 
  coordinatesSchema, 
  userPreferenceSchema, 
  progressSchema,
  safeValidate
} from '@/lib/validators';

describe('Validation Layer', () => {
  describe('pinCodeSchema', () => {
    it('validates correct 6-digit PIN codes', () => {
      expect(pinCodeSchema.parse('110001')).toBe('110001');
      expect(pinCodeSchema.parse('560001')).toBe('560001');
    });

    it('trims whitespace from valid PINs', () => {
      expect(pinCodeSchema.parse('  110001  ')).toBe('110001');
    });

    it('rejects PIN codes starting with 0', () => {
      expect(() => pinCodeSchema.parse('010001')).toThrow('PIN code cannot start with 0');
    });

    it('rejects PIN codes that are too short', () => {
      expect(() => pinCodeSchema.parse('11000')).toThrow('PIN code must be exactly 6 digits');
    });

    it('rejects PIN codes that are too long', () => {
      expect(() => pinCodeSchema.parse('1100012')).toThrow('PIN code must be exactly 6 digits');
    });

    it('rejects PIN codes containing letters', () => {
      expect(() => pinCodeSchema.parse('1100A1')).toThrow('PIN code must contain only numbers');
    });

    it('rejects PIN codes containing special characters', () => {
      expect(() => pinCodeSchema.parse('110-01')).toThrow('PIN code must contain only numbers');
    });

    it('rejects empty strings or just whitespace', () => {
      expect(() => pinCodeSchema.parse('')).toThrow('PIN code is required');
      expect(() => pinCodeSchema.parse('      ')).toThrow('PIN code must contain only numbers');
    });
  });

  describe('assistantQuerySchema', () => {
    it('validates a correct query', () => {
      expect(assistantQuerySchema.parse('How do I vote?')).toBe('How do I vote?');
    });

    it('rejects queries that are too short', () => {
      expect(() => assistantQuerySchema.parse('a')).toThrow('Question must be at least 2 characters');
    });

    it('rejects queries that are too long', () => {
      const longQuery = 'a'.repeat(501);
      expect(() => assistantQuerySchema.parse(longQuery)).toThrow('Question must be less than 500 characters');
    });

    it('strips HTML from queries', () => {
      const query = 'How do I vote? <script>alert("hack")</script> <b>Please</b>';
      const parsed = assistantQuerySchema.parse(query);
      expect(parsed).toBe('How do I vote?  Please');
      expect(parsed).not.toContain('<script>');
      expect(parsed).not.toContain('<b>');
    });

    it('rejects empty queries', () => {
      expect(() => assistantQuerySchema.parse('')).toThrow('Question must be at least 2 characters'); // Zod min(2) catches empty strings
    });
  });

  describe('userPreferenceSchema', () => {
    it('validates valid preferences', () => {
      expect(userPreferenceSchema.parse({ language: 'hi', experienceLevel: 'advanced' }))
        .toEqual({ language: 'hi', experienceLevel: 'advanced' });
    });

    it('provides defaults when empty object is passed', () => {
      expect(userPreferenceSchema.parse({}))
        .toEqual({ language: 'en', experienceLevel: 'beginner' });
    });

    it('rejects invalid language', () => {
      expect(() => userPreferenceSchema.parse({ language: 'fr' })).toThrow();
    });

    it('rejects invalid experience level', () => {
      expect(() => userPreferenceSchema.parse({ experienceLevel: 'expert' })).toThrow();
    });
  });

  describe('progressSchema', () => {
    it('validates valid progress object', () => {
      expect(progressSchema.parse({ stepId: 'step1', completed: true, notes: 'Done' }))
        .toEqual({ stepId: 'step1', completed: true, notes: 'Done' });
    });

    it('provides default completed false', () => {
      expect(progressSchema.parse({ stepId: 'step2' }))
        .toEqual({ stepId: 'step2', completed: false });
    });

    it('rejects empty stepId', () => {
      expect(() => progressSchema.parse({ stepId: '' })).toThrow('Step ID is required');
    });

    it('trims optional notes', () => {
      expect(progressSchema.parse({ stepId: 's1', notes: '  hello  ' }).notes).toBe('hello');
    });
  });

  describe('coordinatesSchema', () => {
    it('validates normal coordinates', () => {
      expect(coordinatesSchema.parse({ lat: 28.6139, lng: 77.2090 }))
        .toEqual({ lat: 28.6139, lng: 77.2090 });
    });

    it('validates boundary coordinates', () => {
      expect(coordinatesSchema.parse({ lat: 90, lng: 180 })).toEqual({ lat: 90, lng: 180 });
      expect(coordinatesSchema.parse({ lat: -90, lng: -180 })).toEqual({ lat: -90, lng: -180 });
    });

    it('rejects out of range latitude', () => {
      expect(() => coordinatesSchema.parse({ lat: 91, lng: 0 })).toThrow();
      expect(() => coordinatesSchema.parse({ lat: -91, lng: 0 })).toThrow();
    });

    it('rejects out of range longitude', () => {
      expect(() => coordinatesSchema.parse({ lat: 0, lng: 181 })).toThrow();
      expect(() => coordinatesSchema.parse({ lat: 0, lng: -181 })).toThrow();
    });

    it('rejects non-numeric coordinates', () => {
      expect(() => coordinatesSchema.parse({ lat: '28.6', lng: 77.2 })).toThrow();
    });
  });

  describe('safeValidate helper', () => {
    it('returns success object when validation passes', () => {
      const result = safeValidate(pinCodeSchema, '110001');
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toBe('110001');
      }
    });

    it('returns failure object with errors when validation fails', () => {
      const result = safeValidate(pinCodeSchema, 'invalid');
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.errors).toBeInstanceOf(Array);
        expect(result.errors.length).toBeGreaterThan(0);
      }
    });
  });
});
