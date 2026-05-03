import { ExternalServiceError, ValidationError } from './errors';

export interface TranslationResult {
  translatedText: string;
  sourceLanguage: string;
  targetLanguage: string;
}

/** ISO 639-1 language codes supported by this integration. */
export const SUPPORTED_LANGUAGES = [
  'en', 'hi', 'bn', 'te', 'mr', 'ta', 'gu', 'kn', 'ml', 'pa',
  'or', 'ur', 'as', 'mai', 'sa', 'ne', 'si', 'sd', 'ks', 'doi', 'mni',
] as const;

export type SupportedLanguage = typeof SUPPORTED_LANGUAGES[number];

/**
 * Translates text using the Google Cloud Translation API v2.
 *
 * @param text - The text to translate (max 5,000 characters)
 * @param targetLanguage - ISO 639-1 code of the target language
 * @param sourceLanguage - ISO 639-1 code of the source language (default: 'en')
 * @returns Translated text with detected/confirmed source language
 */
export async function translateText(
  text: string,
  targetLanguage: string,
  sourceLanguage: string = 'en',
): Promise<TranslationResult> {
  if (!text || text.trim().length === 0) {
    throw new ValidationError('Text is required for translation');
  }

  if (text.length > 5000) {
    throw new ValidationError('Text must be 5,000 characters or fewer');
  }

  if (!(SUPPORTED_LANGUAGES as readonly string[]).includes(targetLanguage)) {
    throw new ValidationError(`Unsupported language: ${targetLanguage}`);
  }

  const apiKey = process.env.GOOGLE_CLOUD_API_KEY;
  if (!apiKey) {
    throw new ExternalServiceError('Google Cloud API key not configured');
  }

  const url = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;

  let response: Response;
  try {
    response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        q: text,
        source: sourceLanguage,
        target: targetLanguage,
        format: 'text',
      }),
    });
  } catch (err) {
    throw new ExternalServiceError(
      `Translation API network error: ${err instanceof Error ? err.message : String(err)}`,
    );
  }

  if (!response.ok) {
    throw new ExternalServiceError(`Translation API error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json() as {
    data?: { translations?: Array<{ translatedText: string; detectedSourceLanguage?: string }> };
  };
  const translation = data?.data?.translations?.[0];

  if (!translation) {
    throw new ExternalServiceError('Translation API returned no results');
  }

  return {
    translatedText: translation.translatedText,
    sourceLanguage: translation.detectedSourceLanguage ?? sourceLanguage,
    targetLanguage,
  };
}

/** Returns the list of supported ISO 639-1 language codes. */
export function getSupportedLanguages(): readonly string[] {
  return SUPPORTED_LANGUAGES;
}
