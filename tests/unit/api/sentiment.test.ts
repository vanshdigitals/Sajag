import { describe, it, expect, vi, beforeEach } from 'vitest';
import { POST } from '@/app/api/sentiment/route';

vi.mock('@/lib/nlp', () => ({
  analyzeSentiment: vi.fn(),
}));

import { analyzeSentiment } from '@/lib/nlp';

const createRequest = (body: unknown) =>
  new Request('http://localhost/api/sentiment', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: body !== null ? JSON.stringify(body) : null,
  });

describe('POST /api/sentiment', () => {
  beforeEach(() => vi.clearAllMocks());

  it('returns 200 with sentiment data on valid request', async () => {
    vi.mocked(analyzeSentiment).mockResolvedValueOnce({
      score: 0.8,
      magnitude: 1.2,
      label: 'positive',
    });

    const res = await POST(createRequest({ text: 'I love elections!' }));
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.label).toBe('positive');
    expect(data.score).toBe(0.8);
  });

  it('returns 400 when text is missing', async () => {
    const res = await POST(createRequest({}));
    expect(res.status).toBe(400);
  });

  it('returns 400 when text is empty string', async () => {
    const res = await POST(createRequest({ text: '' }));
    expect(res.status).toBe(400);
  });

  it('returns 400 when text exceeds 10,000 characters', async () => {
    const res = await POST(createRequest({ text: 'a'.repeat(10001) }));
    expect(res.status).toBe(400);
  });

  it('returns 400 for invalid JSON body', async () => {
    const req = new Request('http://localhost/api/sentiment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: '{ bad json',
    });
    const res = await POST(req);
    expect(res.status).toBe(400);
  });

  it('trims whitespace from text before sending to analyzeSentiment', async () => {
    vi.mocked(analyzeSentiment).mockResolvedValueOnce({
      score: 0,
      magnitude: 0,
      label: 'neutral',
    });

    await POST(createRequest({ text: '  Hello world  ' }));
    expect(analyzeSentiment).toHaveBeenCalledWith('Hello world');
  });

  it('returns 502 when analyzeSentiment throws ExternalServiceError', async () => {
    const { ExternalServiceError } = await import('@/lib/errors');
    vi.mocked(analyzeSentiment).mockRejectedValueOnce(
      new ExternalServiceError('NLP API down'),
    );
    const res = await POST(createRequest({ text: 'Some text' }));
    expect(res.status).toBe(502);
  });

  it('returns negative label for sad text', async () => {
    vi.mocked(analyzeSentiment).mockResolvedValueOnce({
      score: -0.6,
      magnitude: 0.8,
      label: 'negative',
    });

    const res = await POST(createRequest({ text: 'This is terrible.' }));
    const data = await res.json();
    expect(data.label).toBe('negative');
  });
});
