import { describe, it, expect, vi, beforeEach } from 'vitest';
import { translateText, getSupportedLanguages, SUPPORTED_LANGUAGES } from '@/lib/translate';
import { ValidationError, ExternalServiceError } from '@/lib/errors';

const mockFetch = vi.fn();
vi.stubGlobal('fetch', mockFetch);

const mockResponse = (body: unknown, ok = true, status = 200) =>
  Promise.resolve({
    ok,
    status,
    statusText: ok ? 'OK' : 'Bad Request',
    json: () => Promise.resolve(body),
  } as Response);

describe('translate library', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubEnv('GOOGLE_CLOUD_API_KEY', 'test-api-key');
  });

  describe('translateText', () => {
    it('returns translated text for a valid request', async () => {
      mockFetch.mockReturnValueOnce(
        mockResponse({
          data: { translations: [{ translatedText: 'नमस्ते', detectedSourceLanguage: 'en' }] },
        }),
      );

      const result = await translateText('Hello', 'hi');

      expect(result.translatedText).toBe('नमस्ते');
      expect(result.targetLanguage).toBe('hi');
      expect(result.sourceLanguage).toBe('en');
    });

    it('throws ValidationError for empty text', async () => {
      await expect(translateText('', 'hi')).rejects.toThrow(ValidationError);
    });

    it('throws ValidationError for text exceeding 5000 characters', async () => {
      await expect(translateText('a'.repeat(5001), 'hi')).rejects.toThrow(ValidationError);
    });

    it('throws ValidationError for unsupported target language', async () => {
      await expect(translateText('Hello', 'xx')).rejects.toThrow(ValidationError);
    });

    it('throws ExternalServiceError when API key is missing', async () => {
      vi.stubEnv('GOOGLE_CLOUD_API_KEY', '');
      await expect(translateText('Hello', 'hi')).rejects.toThrow(ExternalServiceError);
    });

    it('throws ExternalServiceError on non-OK HTTP response', async () => {
      mockFetch.mockReturnValueOnce(mockResponse({}, false, 403));
      await expect(translateText('Hello', 'hi')).rejects.toThrow(ExternalServiceError);
    });

    it('throws ExternalServiceError when API returns no translations', async () => {
      mockFetch.mockReturnValueOnce(mockResponse({ data: { translations: [] } }));
      await expect(translateText('Hello', 'hi')).rejects.toThrow(ExternalServiceError);
    });

    it('throws ExternalServiceError on network failure', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Network error'));
      await expect(translateText('Hello', 'hi')).rejects.toThrow(ExternalServiceError);
    });

    it('falls back to sourceLanguage when detectedSourceLanguage is absent', async () => {
      mockFetch.mockReturnValueOnce(
        mockResponse({
          data: { translations: [{ translatedText: 'नमस्ते' }] },
        }),
      );
      const result = await translateText('Hello', 'hi', 'en');
      expect(result.sourceLanguage).toBe('en');
    });
  });

  describe('getSupportedLanguages', () => {
    it('returns a non-empty array', () => {
      const langs = getSupportedLanguages();
      expect(langs.length).toBeGreaterThan(0);
    });

    it('includes English and Hindi', () => {
      const langs = getSupportedLanguages();
      expect(langs).toContain('en');
      expect(langs).toContain('hi');
    });

    it('matches the SUPPORTED_LANGUAGES constant', () => {
      expect(getSupportedLanguages()).toEqual(SUPPORTED_LANGUAGES);
    });
  });
});
