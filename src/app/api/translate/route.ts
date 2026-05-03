import { NextResponse } from 'next/server';
import { translateText, SUPPORTED_LANGUAGES } from '@/lib/translate';
import { withErrorHandler } from '@/lib/middleware';
import { ValidationError } from '@/lib/errors';

export const POST = withErrorHandler(async (request: Request) => {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    throw new ValidationError('Invalid JSON payload');
  }

  const { text, targetLanguage, sourceLanguage } = body as {
    text?: unknown;
    targetLanguage?: unknown;
    sourceLanguage?: unknown;
  };

  if (!text || typeof text !== 'string' || text.trim().length === 0) {
    throw new ValidationError('text is required');
  }

  if (!targetLanguage || !(SUPPORTED_LANGUAGES as readonly string[]).includes(String(targetLanguage))) {
    throw new ValidationError(
      `targetLanguage must be one of: ${SUPPORTED_LANGUAGES.join(', ')}`,
    );
  }

  const result = await translateText(
    text.trim(),
    String(targetLanguage),
    sourceLanguage ? String(sourceLanguage) : 'en',
  );

  return NextResponse.json({ success: true, ...result });
});
