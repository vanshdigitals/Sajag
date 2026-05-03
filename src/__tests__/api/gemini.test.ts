import { describe, it, expect, vi, beforeEach } from 'vitest';
import { POST } from '@/app/api/gemini/route';

// Mock the GoogleGenerativeAI library
vi.mock('@google/generative-ai', () => {
  const mockGenerateContent = vi.fn();
  
  class MockGoogleGenerativeAI {
    getGenerativeModel() {
      return { generateContent: mockGenerateContent };
    }
  }
  
  return {
    GoogleGenerativeAI: MockGoogleGenerativeAI,
    // Export the mock so we can control it in tests
    _mockGenerateContent: mockGenerateContent
  };
});

// Import the mock to use it
import { _mockGenerateContent } from '@google/generative-ai';

describe('Gemini API Route (/api/gemini)', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns response for a valid prompt', async () => {
    // Setup the mock response
    (_mockGenerateContent as any).mockResolvedValueOnce({
      response: {
        text: () => 'This is a mocked Gemini response'
      }
    });

    const request = new Request('http://localhost/api/gemini', {
      method: 'POST',
      body: JSON.stringify({ prompt: 'Hello Gemini' })
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.text).toBe('This is a mocked Gemini response');
  });

  it('returns 400 error when prompt is empty', async () => {
    const request = new Request('http://localhost/api/gemini', {
      method: 'POST',
      body: JSON.stringify({ prompt: '' })
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe('Prompt is required');
  });

  it('returns 500 error on API failure', async () => {
    // Setup the mock to throw an error
    (_mockGenerateContent as any).mockRejectedValueOnce(new Error('API rate limit exceeded'));

    const request = new Request('http://localhost/api/gemini', {
      method: 'POST',
      body: JSON.stringify({ prompt: 'Cause an error' })
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data.error).toBe('Failed to generate content');
  });
});
