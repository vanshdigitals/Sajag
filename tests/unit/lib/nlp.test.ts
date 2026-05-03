import { describe, it, expect, vi, beforeEach } from 'vitest';
import { analyzeSentiment } from '@/lib/nlp';
import { ValidationError, ExternalServiceError } from '@/lib/errors';

const mockFetch = vi.fn();
vi.stubGlobal('fetch', mockFetch);

const mockResponse = (body: unknown, ok = true, status = 200) =>
  Promise.resolve({
    ok,
    status,
    statusText: ok ? 'OK' : 'Internal Server Error',
    json: () => Promise.resolve(body),
  } as Response);

describe('nlp library', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubEnv('GOOGLE_CLOUD_API_KEY', 'test-api-key');
  });

  describe('analyzeSentiment', () => {
    it('returns positive label for high score', async () => {
      mockFetch.mockReturnValueOnce(
        mockResponse({ documentSentiment: { score: 0.8, magnitude: 1.5 } }),
      );
      const result = await analyzeSentiment('I love voting!');
      expect(result.label).toBe('positive');
      expect(result.score).toBe(0.8);
      expect(result.magnitude).toBe(1.5);
    });

    it('returns negative label for low score', async () => {
      mockFetch.mockReturnValueOnce(
        mockResponse({ documentSentiment: { score: -0.7, magnitude: 0.9 } }),
      );
      const result = await analyzeSentiment('This is terrible.');
      expect(result.label).toBe('negative');
    });

    it('returns neutral label for score near zero', async () => {
      mockFetch.mockReturnValueOnce(
        mockResponse({ documentSentiment: { score: 0.05, magnitude: 0.1 } }),
      );
      const result = await analyzeSentiment('The election is scheduled.');
      expect(result.label).toBe('neutral');
    });

    it('throws ValidationError for empty text', async () => {
      await expect(analyzeSentiment('')).rejects.toThrow(ValidationError);
    });

    it('throws ValidationError for text exceeding 10,000 characters', async () => {
      await expect(analyzeSentiment('a'.repeat(10001))).rejects.toThrow(ValidationError);
    });

    it('throws ExternalServiceError when API key is missing', async () => {
      vi.stubEnv('GOOGLE_CLOUD_API_KEY', '');
      await expect(analyzeSentiment('Hello')).rejects.toThrow(ExternalServiceError);
    });

    it('throws ExternalServiceError on non-OK HTTP response', async () => {
      mockFetch.mockReturnValueOnce(mockResponse({}, false, 500));
      await expect(analyzeSentiment('Some text')).rejects.toThrow(ExternalServiceError);
    });

    it('throws ExternalServiceError when API returns no sentiment data', async () => {
      mockFetch.mockReturnValueOnce(mockResponse({}));
      await expect(analyzeSentiment('Some text')).rejects.toThrow(ExternalServiceError);
    });

    it('throws ExternalServiceError on network failure', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Connection refused'));
      await expect(analyzeSentiment('Some text')).rejects.toThrow(ExternalServiceError);
    });

    it('accepts text exactly at the 10,000 character limit', async () => {
      mockFetch.mockReturnValueOnce(
        mockResponse({ documentSentiment: { score: 0, magnitude: 0 } }),
      );
      await expect(analyzeSentiment('a'.repeat(10000))).resolves.toBeDefined();
    });
  });
});
