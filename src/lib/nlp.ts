import { ExternalServiceError, ValidationError } from './errors';

export interface SentimentResult {
  /** Sentiment polarity in [-1.0, 1.0]: negative → positive. */
  score: number;
  /** Strength of emotion irrespective of polarity. */
  magnitude: number;
  /** Human-readable label derived from score. */
  label: 'positive' | 'negative' | 'neutral';
}

/**
 * Analyzes the sentiment of plain text using the Google Cloud Natural Language API.
 *
 * @param text - The text to analyze (max 10,000 characters)
 * @returns Sentiment score, magnitude, and a categorical label
 */
export async function analyzeSentiment(text: string): Promise<SentimentResult> {
  if (!text || text.trim().length === 0) {
    throw new ValidationError('Text is required for sentiment analysis');
  }

  if (text.length > 10000) {
    throw new ValidationError('Text must be 10,000 characters or fewer');
  }

  const apiKey = process.env.GOOGLE_CLOUD_API_KEY;
  if (!apiKey) {
    throw new ExternalServiceError('Google Cloud API key not configured');
  }

  const url = `https://language.googleapis.com/v1/documents:analyzeSentiment?key=${apiKey}`;

  let response: Response;
  try {
    response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        document: { type: 'PLAIN_TEXT', content: text },
        encodingType: 'UTF8',
      }),
    });
  } catch (err) {
    throw new ExternalServiceError(
      `NLP API network error: ${err instanceof Error ? err.message : String(err)}`,
    );
  }

  if (!response.ok) {
    throw new ExternalServiceError(`NLP API error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json() as {
    documentSentiment?: { score: number; magnitude: number };
  };
  const sentiment = data?.documentSentiment;

  if (!sentiment) {
    throw new ExternalServiceError('NLP API returned no sentiment data');
  }

  const score = sentiment.score;
  const label: SentimentResult['label'] =
    score > 0.1 ? 'positive' : score < -0.1 ? 'negative' : 'neutral';

  return { score, magnitude: sentiment.magnitude, label };
}
