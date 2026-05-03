import { describe, it, expect, vi, beforeEach } from 'vitest';
import { POST } from '@/app/api/translate/route';

vi.mock('@/lib/translate', () => ({
  translateText: vi.fn(),
  SUPPORTED_LANGUAGES: ['en', 'hi', 'bn', 'te'],
}));

import { translateText } from '@/lib/translate';

const createRequest = (body: unknown) =>
  new Request('http://localhost/api/translate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: body !== null ? JSON.stringify(body) : null,
  });

describe('POST /api/translate', () => {
  beforeEach(() => vi.clearAllMocks());

  it('returns 200 with translation on valid request', async () => {
    vi.mocked(translateText).mockResolvedValueOnce({
      translatedText: 'नमस्ते',
      sourceLanguage: 'en',
      targetLanguage: 'hi',
    });

    const res = await POST(createRequest({ text: 'Hello', targetLanguage: 'hi' }));
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.translatedText).toBe('नमस्ते');
  });

  it('returns 400 when text is missing', async () => {
    const res = await POST(createRequest({ targetLanguage: 'hi' }));
    expect(res.status).toBe(400);
  });

  it('returns 400 when text is empty string', async () => {
    const res = await POST(createRequest({ text: '  ', targetLanguage: 'hi' }));
    expect(res.status).toBe(400);
  });

  it('returns 400 when targetLanguage is missing', async () => {
    const res = await POST(createRequest({ text: 'Hello' }));
    expect(res.status).toBe(400);
  });

  it('returns 400 for unsupported targetLanguage', async () => {
    const res = await POST(createRequest({ text: 'Hello', targetLanguage: 'klingon' }));
    expect(res.status).toBe(400);
  });

  it('returns 400 for invalid JSON body', async () => {
    const req = new Request('http://localhost/api/translate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: '{ bad json',
    });
    const res = await POST(req);
    expect(res.status).toBe(400);
  });

  it('passes sourceLanguage to translateText when provided', async () => {
    vi.mocked(translateText).mockResolvedValueOnce({
      translatedText: 'हैलो',
      sourceLanguage: 'en',
      targetLanguage: 'hi',
    });

    await POST(createRequest({ text: 'Hello', targetLanguage: 'hi', sourceLanguage: 'en' }));
    expect(translateText).toHaveBeenCalledWith('Hello', 'hi', 'en');
  });

  it('returns 502 when translateText throws ExternalServiceError', async () => {
    const { ExternalServiceError } = await import('@/lib/errors');
    vi.mocked(translateText).mockRejectedValueOnce(
      new ExternalServiceError('API unavailable'),
    );
    const res = await POST(createRequest({ text: 'Hello', targetLanguage: 'hi' }));
    expect(res.status).toBe(502);
  });
});
