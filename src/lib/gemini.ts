import { GoogleGenerativeAI } from '@google/generative-ai';
import { assistantQuerySchema, safeValidate } from './validators';
import { ExternalServiceError, ValidationError, logError } from './errors';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
const DEFAULT_MODEL = 'gemini-1.5-flash';

const pendingQueries = new Map<string, Promise<string>>();
const responseCache = new Map<string, { response: string; timestamp: number }>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

/**
 * Internal function to call the Gemini API.
 */
async function _generateElectionResponse(safeQuery: string, context?: string): Promise<string> {
  const model = genAI.getGenerativeModel({ 
    model: DEFAULT_MODEL,
  });
  
  const prompt = context ? `Context: ${context}\n\nQuery: ${safeQuery}` : safeQuery;
  const result = await model.generateContent(prompt);
  
  if (!result) {
    throw new ExternalServiceError('Empty response from AI service');
  }
  
  const response = await result.response;
  const text = response.text();
  
  if (!text || text.trim() === '') {
    throw new ExternalServiceError('AI service returned empty content');
  }
  
  return text;
}

/**
 * Generates an election response using the Google Gemini API with deduplication and caching.
 * 
 * @param query - The user's query
 * @param context - Optional context to prepend to the query
 * @returns The AI's generated response
 */
export async function generateElectionResponse(query: string, context?: string): Promise<string> {
  const validation = safeValidate(assistantQuerySchema, query);
  
  if (!validation.success) {
    throw new ValidationError(validation.errors.join(', '));
  }

  const safeQuery = validation.data;
  const cacheKey = `${safeQuery}:${context || ''}`;

  // 1. Check Cache
  const cached = responseCache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.response;
  }

  // 2. Check Pending Queries (Deduplication)
  if (pendingQueries.has(cacheKey)) {
    return pendingQueries.get(cacheKey)!;
  }
  
  try {
    const promise = _generateElectionResponse(safeQuery, context);
    pendingQueries.set(cacheKey, promise);
    
    const text = await promise;
    
    // Store in cache
    responseCache.set(cacheKey, { response: text, timestamp: Date.now() });
    
    return text;
  } catch (error) {
    logError(error, { query: safeQuery, service: 'gemini' });
    
    if (error instanceof ExternalServiceError) {
      throw error;
    }
    
    throw new ExternalServiceError(
      error instanceof Error ? error.message : 'Failed to generate content'
    );
  } finally {
    pendingQueries.delete(cacheKey);
  }
}

/** Clears the response cache and pending query map. Intended for use in tests only. */
export function clearCache(): void {
  responseCache.clear();
  pendingQueries.clear();
}

/**
 * Checks the health of the Gemini API integration.
 *
 * @returns A boolean indicating whether the API is healthy
 */
export async function checkGeminiHealth(): Promise<boolean> {
  try {
    const model = genAI.getGenerativeModel({ model: DEFAULT_MODEL });
    const result = await model.generateContent('ping');
    const response = await result.response;
    const text = response.text();
    return !!text && text.length > 0;
  } catch (error) {
    logError(error, { service: 'gemini_health_check' });
    return false;
  }
}
