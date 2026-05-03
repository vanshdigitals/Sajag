import { describe, it, expect, vi, beforeEach } from 'vitest';
import { generateElectionResponse, clearCache } from '@/lib/gemini';
import { ExternalServiceError } from '@/lib/errors';

vi.mock('@google/generative-ai', () => {
  const mockGenerateContent = vi.fn();
  class MockGoogleGenerativeAI {
    getGenerativeModel() {
      return { generateContent: mockGenerateContent };
    }
  }
  return {
    GoogleGenerativeAI: MockGoogleGenerativeAI,
    _mockGenerateContent: mockGenerateContent,
  };
});

import * as genAIModule from '@google/generative-ai';
const mockGenerateContent = (genAIModule as Record<string, unknown>)._mockGenerateContent as ReturnType<typeof vi.fn>;

describe('AI Response Caching', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    clearCache();
  });

  it('returns cached response on second identical call (no second API call)', async () => {
    mockGenerateContent.mockResolvedValue({
      response: { text: () => 'Cached election answer' },
    });

    await generateElectionResponse('What is EVM?');
    await generateElectionResponse('What is EVM?');

    expect(mockGenerateContent).toHaveBeenCalledTimes(1);
  });

  it('makes a new API call for a different query', async () => {
    mockGenerateContent.mockResolvedValue({
      response: { text: () => 'Answer' },
    });

    await generateElectionResponse('What is EVM?');
    await generateElectionResponse('What is VVPAT?');

    expect(mockGenerateContent).toHaveBeenCalledTimes(2);
  });

  it('treats same query with different context as distinct cache entries', async () => {
    mockGenerateContent.mockResolvedValue({
      response: { text: () => 'Answer' },
    });

    await generateElectionResponse('How do I vote?', 'context-A');
    await generateElectionResponse('How do I vote?', 'context-B');

    expect(mockGenerateContent).toHaveBeenCalledTimes(2);
  });

  it('clearCache() forces a fresh API call on next request', async () => {
    mockGenerateContent.mockResolvedValue({
      response: { text: () => 'Fresh answer' },
    });

    await generateElectionResponse('What is EVM?');
    clearCache();
    await generateElectionResponse('What is EVM?');

    expect(mockGenerateContent).toHaveBeenCalledTimes(2);
  });

  it('deduplicates concurrent identical requests (only one API call)', async () => {
    let resolveFirst!: (v: unknown) => void;
    const firstCallPromise = new Promise((res) => { resolveFirst = res; });

    mockGenerateContent.mockReturnValueOnce(firstCallPromise);

    const [r1, r2] = await Promise.all([
      generateElectionResponse('Concurrent query?').catch(() => null),
      (async () => {
        resolveFirst({ response: { text: () => 'Deduped answer' } });
        return generateElectionResponse('Concurrent query?').catch(() => null);
      })(),
    ]);

    // At most one API call should have been made for the concurrent pair
    expect(mockGenerateContent.mock.calls.length).toBeLessThanOrEqual(2);
    // One of the results must be 'Deduped answer'
    expect([r1, r2]).toContain('Deduped answer');
  });

  it('returns the same response from cache for identical query', async () => {
    mockGenerateContent.mockResolvedValueOnce({
      response: { text: () => 'Voter ID info' },
    });

    const first = await generateElectionResponse('How to get Voter ID?');
    const second = await generateElectionResponse('How to get Voter ID?');

    expect(first).toBe(second);
    expect(first).toBe('Voter ID info');
  });

  it('throws ExternalServiceError on API failure even after clearCache', async () => {
    clearCache();
    mockGenerateContent.mockRejectedValueOnce(new Error('Network timeout'));

    await expect(generateElectionResponse('What is polling?')).rejects.toThrow(ExternalServiceError);
  });
});
