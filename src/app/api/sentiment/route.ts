import { NextResponse } from 'next/server';
import { analyzeSentiment } from '@/lib/nlp';
import { withErrorHandler } from '@/lib/middleware';
import { ValidationError } from '@/lib/errors';

export const POST = withErrorHandler(async (request: Request) => {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    throw new ValidationError('Invalid JSON payload');
  }

  const { text } = body as { text?: unknown };

  if (!text || typeof text !== 'string' || text.trim().length === 0) {
    throw new ValidationError('text is required');
  }

  if (text.length > 10000) {
    throw new ValidationError('text must be 10,000 characters or fewer');
  }

  const result = await analyzeSentiment(text.trim());

  return NextResponse.json({ success: true, ...result });
});
