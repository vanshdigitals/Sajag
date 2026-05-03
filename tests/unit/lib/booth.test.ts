import { describe, it, expect } from 'vitest';
import { findBoothsByPin, findNearestBooths, calculateDistance, isValidPinArea } from '@/lib/booth';
import { NotFoundError, ValidationError } from '@/lib/errors';

describe('Booth Library', () => {
  describe('findBoothsByPin', () => {
    it('returns booths for a valid known PIN', () => {
      const booths = findBoothsByPin('110001');
      expect(booths.length).toBeGreaterThan(0);
      expect(booths[0].pinCode).toBe('110001');
    });

    it('throws NotFoundError for unknown PIN', () => {
      expect(() => findBoothsByPin('999999')).toThrow(NotFoundError);
    });

    it('throws ValidationError for letters in PIN', () => {
      expect(() => findBoothsByPin('110A01')).toThrow(ValidationError);
    });

    it('throws ValidationError for short PIN', () => {
      expect(() => findBoothsByPin('11000')).toThrow(ValidationError);
    });

    it('throws ValidationError for long PIN', () => {
      expect(() => findBoothsByPin('1100011')).toThrow(ValidationError);
    });

    it('throws ValidationError for PIN starting with 0', () => {
      expect(() => findBoothsByPin('010001')).toThrow(ValidationError);
    });

    it('throws ValidationError for empty PIN', () => {
      expect(() => findBoothsByPin('')).toThrow(ValidationError);
    });

    it('trims whitespace and validates', () => {
      const booths = findBoothsByPin('  110001  ');
      expect(booths.length).toBeGreaterThan(0);
      expect(booths[0].pinCode).toBe('110001');
    });

    it('includes accessibility info in returned booths', () => {
      const booths = findBoothsByPin('110001');
      expect(booths[0]).toHaveProperty('accessibility');
      expect(typeof booths[0].accessibility.wheelchair).toBe('boolean');
      expect(typeof booths[0].accessibility.ramp).toBe('boolean');
      expect(typeof booths[0].accessibility.assistance).toBe('boolean');
    });
  });

  describe('findNearestBooths', () => {
    it('returns sorted results by distance for coordinate search', () => {
      // 28.6315, 77.2167 (Delhi)
      const booths = findNearestBooths(28.6320, 77.2100, 10);
      expect(booths.length).toBeGreaterThan(0);
      if (booths.length > 1) {
        expect(booths[0].distance).toBeLessThanOrEqual(booths[1].distance);
      }
    });

    it('throws NotFoundError if no booths in radius', () => {
      // Coordinates in Antarctica
      expect(() => findNearestBooths(-80.0000, 0.0000, 10)).toThrow(NotFoundError);
    });

    it('throws ValidationError for invalid lat/lng', () => {
      expect(() => findNearestBooths(91, 0, 10)).toThrow(ValidationError);
      expect(() => findNearestBooths(0, 181, 10)).toThrow(ValidationError);
    });

    it('throws ValidationError for invalid radius', () => {
      expect(() => findNearestBooths(28.6, 77.2, -5)).toThrow(ValidationError);
      expect(() => findNearestBooths(28.6, 77.2, 0)).toThrow(ValidationError);
    });
  });

  describe('calculateDistance', () => {
    it('returns 0 for same coordinates', () => {
      const dist = calculateDistance(28.6, 77.2, 28.6, 77.2);
      expect(dist).toBe(0);
    });

    it('calculates Delhi to Mumbai distance correctly (~1150km)', () => {
      const dist = calculateDistance(28.6139, 77.2090, 19.0760, 72.8777);
      // Rough distance is around 1140-1160km using Haversine
      expect(dist).toBeGreaterThan(1140);
      expect(dist).toBeLessThan(1160);
    });

    it('calculates small distances correctly', () => {
      const dist = calculateDistance(28.6139, 77.2090, 28.6140, 77.2090);
      expect(dist).toBeGreaterThan(0);
      expect(dist).toBeLessThan(0.1); // should be around 11 meters
    });

    it('handles negative coordinates correctly', () => {
      const dist = calculateDistance(-33.8688, 151.2093, -37.8136, 144.9631); // Sydney to Melbourne
      expect(dist).toBeGreaterThan(700);
      expect(dist).toBeLessThan(730);
    });

    it('rounds to 2 decimals', () => {
      const dist = calculateDistance(28.6139, 77.2090, 19.0760, 72.8777);
      const strDist = dist.toString();
      const decimals = strDist.includes('.') ? strDist.split('.')[1].length : 0;
      expect(decimals).toBeLessThanOrEqual(2);
    });
  });

  describe('isValidPinArea', () => {
    it('returns true for known PIN', () => {
      expect(isValidPinArea('110001')).toBe(true);
    });

    it('returns false for unknown PIN', () => {
      expect(isValidPinArea('999999')).toBe(false);
    });

    it('returns false for invalid format', () => {
      expect(isValidPinArea('ABCDEF')).toBe(false);
      expect(isValidPinArea('123')).toBe(false);
    });

    it('returns false for empty PIN', () => {
      expect(isValidPinArea('')).toBe(false);
    });
  });
});
