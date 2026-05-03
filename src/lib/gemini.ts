import { GoogleGenerativeAI } from '@google/generative-ai';
import { assistantQuerySchema, safeValidate } from './validators';
import { ExternalServiceError, ValidationError, logError } from './errors';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
const DEFAULT_MODEL = 'gemini-1.5-flash';

/**
 * Generates an election response using the Google Gemini API.
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
  
  try {
    const model = genAI.getGenerativeModel({ 
      model: DEFAULT_MODEL,
      // Default safety settings would go here depending on the SDK version
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
  } catch (error) {
    logError(error, { query: safeQuery, service: 'gemini' });
    
    if (error instanceof ExternalServiceError) {
      throw error;
    }
    
    throw new ExternalServiceError(
      error instanceof Error ? error.message : 'Failed to generate content'
    );
  }
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
