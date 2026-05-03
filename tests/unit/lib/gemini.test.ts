import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';
import { generateElectionResponse, checkGeminiHealth } from '@/lib/gemini';
import { ValidationError, ExternalServiceError } from '@/lib/errors';

// Mock GoogleGenerativeAI
vi.mock('@google/generative-ai', () => {
  const mockGenerateContent = vi.fn();
  
  class MockGoogleGenerativeAI {
    getGenerativeModel() {
      return { generateContent: mockGenerateContent };
    }
  }
  
  return {
    GoogleGenerativeAI: MockGoogleGenerativeAI,
    _mockGenerateContent: mockGenerateContent
  };
});

// We need to import the mock reference after it's defined
import * as genAIModule from '@google/generative-ai';
const _mockGenerateContent = (genAIModule as Record<string, unknown>)._mockGenerateContent as Mock;

describe('Gemini Library', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('generateElectionResponse', () => {
    it('returns AI response for a valid query', async () => {
      _mockGenerateContent.mockResolvedValueOnce({
        response: { text: () => 'You can vote at your nearest polling booth.' }
      });

      const response = await generateElectionResponse('Where do I vote?');
      expect(response).toBe('You can vote at your nearest polling booth.');
      expect(_mockGenerateContent).toHaveBeenCalledWith('Where do I vote?');
    });

    it('includes context in the prompt when provided', async () => {
      _mockGenerateContent.mockResolvedValueOnce({
        response: { text: () => 'Response based on context' }
      });

      await generateElectionResponse('My query', 'Some context about election');
      expect(_mockGenerateContent).toHaveBeenCalledWith('Context: Some context about election\n\nQuery: My query');
    });

    it('throws ValidationError for empty query', async () => {
      await expect(generateElectionResponse('')).rejects.toThrow(ValidationError);
    });

    it('throws ValidationError for single character query', async () => {
      await expect(generateElectionResponse('a')).rejects.toThrow(ValidationError);
    });

    it('throws ValidationError for query > 500 characters', async () => {
      const longQuery = 'a'.repeat(501);
      await expect(generateElectionResponse(longQuery)).rejects.toThrow(ValidationError);
    });

    it('throws ValidationError for HTML-only query that becomes empty after stripping', async () => {
      await expect(generateElectionResponse('<b></b>')).rejects.toThrow(ValidationError);
    });

    it('strips HTML from query before sending to AI', async () => {
      _mockGenerateContent.mockResolvedValueOnce({
        response: { text: () => 'Mock response' }
      });
      await generateElectionResponse('How <b>do</b> I <script>vote()</script> vote?');
      expect(_mockGenerateContent).toHaveBeenCalledWith('How do I  vote?');
    });

    it('trims whitespace from query', async () => {
      _mockGenerateContent.mockResolvedValueOnce({
        response: { text: () => 'Mock response' }
      });
      await generateElectionResponse('  Am I eligible?  ');
      expect(_mockGenerateContent).toHaveBeenCalledWith('Am I eligible?');
    });

    it('returns neutral response for political queries (simulated)', async () => {
      // Since actual moderation depends on the real API, we just verify our mock resolves it
      _mockGenerateContent.mockResolvedValueOnce({
        response: { text: () => 'I cannot provide political opinions.' }
      });
      const response = await generateElectionResponse('Who should I vote for?');
      expect(response).toBe('I cannot provide political opinions.');
    });

    it('throws ExternalServiceError if AI response is empty', async () => {
      _mockGenerateContent.mockResolvedValueOnce({
        response: { text: () => '' }
      });
      await expect(generateElectionResponse('Hello')).rejects.toThrow(ExternalServiceError);
    });

    it('throws ExternalServiceError if AI returns null/undefined result', async () => {
      _mockGenerateContent.mockResolvedValueOnce(null);
      await expect(generateElectionResponse('Hello')).rejects.toThrow(ExternalServiceError);
    });

    it('throws ExternalServiceError on API failure', async () => {
      _mockGenerateContent.mockRejectedValueOnce(new Error('API quota exceeded'));
      await expect(generateElectionResponse('Hello')).rejects.toThrow(ExternalServiceError);
    });
  });

  describe('checkGeminiHealth', () => {
    it('returns true for OK response', async () => {
      _mockGenerateContent.mockResolvedValueOnce({
        response: { text: () => 'pong' }
      });
      const isHealthy = await checkGeminiHealth();
      expect(isHealthy).toBe(true);
    });

    it('returns true for unexpected text response', async () => {
      _mockGenerateContent.mockResolvedValueOnce({
        response: { text: () => 'I am an AI' }
      });
      const isHealthy = await checkGeminiHealth();
      expect(isHealthy).toBe(true);
    });

    it('returns false for error', async () => {
      _mockGenerateContent.mockRejectedValueOnce(new Error('Network error'));
      const isHealthy = await checkGeminiHealth();
      expect(isHealthy).toBe(false);
    });

    it('returns false for no text', async () => {
      _mockGenerateContent.mockResolvedValueOnce({
        response: { text: () => '' }
      });
      const isHealthy = await checkGeminiHealth();
      expect(isHealthy).toBe(false);
    });
  });
});
