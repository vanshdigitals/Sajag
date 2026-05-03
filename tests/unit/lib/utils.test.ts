import { describe, it, expect } from 'vitest';
import { calculateDistance } from '@/lib/booth';

describe('Utils', () => {
  describe('Haversine Distance Formula Accuracy', () => {
    it('returns 0 for identical coordinates', () => {
      const dist = calculateDistance(28.6139, 77.2090, 28.6139, 77.2090);
      expect(dist).toBe(0);
    });

    it('calculates standard long distances accurately (~1150km Delhi-Mumbai)', () => {
      const dist = calculateDistance(28.6139, 77.2090, 19.0760, 72.8777);
      expect(dist).toBeGreaterThan(1140);
      expect(dist).toBeLessThan(1160);
    });
  });
});
