import { describe, it, expect, vi, beforeEach } from 'vitest';
import { POST } from '@/app/api/assistant/route';
import { generateElectionResponse } from '@/lib/gemini';
import { verifyRecaptcha } from '@/lib/recaptcha';

vi.mock('@/lib/gemini', () => ({
  generateElectionResponse: vi.fn(),
  checkGeminiHealth: vi.fn(),
}));

vi.mock('@/lib/recaptcha', () => ({
  verifyRecaptcha: vi.fn(),
}));

describe('Assistant API Route', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const createRequest = (body: any, ip: string = '127.0.0.1') => {
    return new Request('http://localhost/api/assistant', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-forwarded-for': ip,
      },
      body: body ? JSON.stringify(body) : null,
    });
  };

  it('returns 200 for a valid request', async () => {
    vi.mocked(verifyRecaptcha).mockResolvedValueOnce({ success: true, score: 0.9 });
    vi.mocked(generateElectionResponse).mockResolvedValueOnce('Valid AI response');

    const req = createRequest({ query: 'How do I vote?', recaptchaToken: 'valid' });
    const res = await POST(req);
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.response).toBe('Valid AI response');
  });

  it('returns 400 for missing query', async () => {
    vi.mocked(verifyRecaptcha).mockResolvedValueOnce({ success: true, score: 0.9 });

    const req = createRequest({ recaptchaToken: 'valid' });
    const res = await POST(req);
    const data = await res.json();

    expect(res.status).toBe(400);
    expect(data.code).toBe('VALIDATION_ERROR');
  });

  it('returns 400 for empty query', async () => {
    vi.mocked(verifyRecaptcha).mockResolvedValueOnce({ success: true, score: 0.9 });

    const req = createRequest({ query: '', recaptchaToken: 'valid' });
    const res = await POST(req);
    
    expect(res.status).toBe(400);
  });

  it('returns 400 for query > 500 chars', async () => {
    vi.mocked(verifyRecaptcha).mockResolvedValueOnce({ success: true, score: 0.9 });

    const req = createRequest({ query: 'a'.repeat(501), recaptchaToken: 'valid' });
    const res = await POST(req);
    
    expect(res.status).toBe(400);
  });

  it('returns 400 for missing recaptcha', async () => {
    const req = createRequest({ query: 'How do I vote?' });
    const res = await POST(req);
    
    expect(res.status).toBe(400);
    expect(verifyRecaptcha).not.toHaveBeenCalled();
  });

  it('returns 401/403 (AuthenticationError) for failed recaptcha', async () => {
    vi.mocked(verifyRecaptcha).mockResolvedValueOnce({ success: false, score: 0 });

    const req = createRequest({ query: 'How do I vote?', recaptchaToken: 'invalid' });
    const res = await POST(req);
    const data = await res.json();
    
    expect(res.status).toBe(401);
    expect(data.code).toBe('AUTHENTICATION_ERROR');
  });

  it('returns 401/403 for low recaptcha score', async () => {
    vi.mocked(verifyRecaptcha).mockResolvedValueOnce({ success: true, score: 0.2 });

    const req = createRequest({ query: 'How do I vote?', recaptchaToken: 'low_score' });
    const res = await POST(req);
    
    expect(res.status).toBe(401);
  });

  it('returns 429 for rate limiting', async () => {
    vi.mocked(verifyRecaptcha).mockResolvedValue({ success: true, score: 0.9 });
    vi.mocked(generateElectionResponse).mockResolvedValue('Response');

    let res;
    // Spam the endpoint to trigger rate limit (max 10)
    for (let i = 0; i < 15; i++) {
      const req = createRequest({ query: 'How do I vote?', recaptchaToken: 'valid' }, '2.2.2.2');
      res = await POST(req);
    }
    
    expect(res?.status).toBe(429);
    const data = await res?.json();
    expect(data?.code).toBe('RATE_LIMIT_EXCEEDED');
  });

  it('returns 500 when AI generation fails', async () => {
    vi.mocked(verifyRecaptcha).mockResolvedValueOnce({ success: true, score: 0.9 });
    vi.mocked(generateElectionResponse).mockRejectedValueOnce(new Error('AI failure'));

    const req = createRequest({ query: 'How do I vote?', recaptchaToken: 'valid' }, '3.3.3.3');
    const res = await POST(req);
    const data = await res.json();
    
    expect(res.status).toBe(500);
    expect(data.code).toBe('INTERNAL_ERROR');
  });

  it('sanitizes HTML from query before processing', async () => {
    vi.mocked(verifyRecaptcha).mockResolvedValueOnce({ success: true, score: 0.9 });
    vi.mocked(generateElectionResponse).mockResolvedValueOnce('Valid response');

    const req = createRequest({ query: '<b>How</b> do I <script>alert("vote")</script> vote?', recaptchaToken: 'valid' }, '4.4.4.4');
    await POST(req);
    
    expect(generateElectionResponse).toHaveBeenCalledWith('How do I  vote?', undefined);
  });

  it('returns 400 for invalid JSON body', async () => {
    const req = new Request('http://localhost/api/assistant', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: '{ invalid_json: true',
    });
    const res = await POST(req);
    
    expect(res.status).toBe(400);
  });
});
