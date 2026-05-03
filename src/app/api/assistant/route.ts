import { NextResponse } from 'next/server';
import { generateElectionResponse, checkGeminiHealth } from '@/lib/gemini';
import { verifyRecaptcha } from '@/lib/recaptcha';
import { formatErrorResponse, logError, RateLimitError, AuthenticationError, ValidationError } from '@/lib/errors';
import { assistantQuerySchema, safeValidate } from '@/lib/validators';

// Simple in-memory rate limiter for demonstration.
// In production, use Redis or a proper edge-compatible rate limiting solution.
const rateLimitMap = new Map<string, { count: number; timestamp: number }>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 10; // 10 req/min

function checkRateLimit(ip: string): void {
  const now = Date.now();
  const record = rateLimitMap.get(ip);
  
  if (!record || now - record.timestamp > RATE_LIMIT_WINDOW_MS) {
    rateLimitMap.set(ip, { count: 1, timestamp: now });
    return;
  }
  
  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    throw new RateLimitError();
  }
  
  record.count += 1;
  rateLimitMap.set(ip, record);
}

export async function POST(request: Request) {
  try {
    // Basic IP extraction for rate limiting
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    checkRateLimit(ip);

    let body;
    try {
      body = await request.json();
    } catch (e) {
      throw new ValidationError('Invalid JSON payload');
    }

    const { query, recaptchaToken, context } = body;

    // Validate recaptcha
    if (!recaptchaToken) {
      throw new ValidationError('reCAPTCHA token is required');
    }

    const recaptchaResult = await verifyRecaptcha(recaptchaToken);
    if (!recaptchaResult.success || recaptchaResult.score < 0.5) {
      throw new AuthenticationError('reCAPTCHA verification failed or score too low');
    }

    // Validate query
    const validation = safeValidate(assistantQuerySchema, query);
    if (!validation.success) {
      throw new ValidationError(validation.errors.join(', '));
    }

    const safeQuery = validation.data;
    const responseText = await generateElectionResponse(safeQuery, context);

    return NextResponse.json({
      success: true,
      response: responseText,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    logError(error, { route: '/api/assistant', method: 'POST' });
    const formattedError = formatErrorResponse(error);
    return NextResponse.json(formattedError, { status: formattedError.statusCode });
  }
}

export async function GET() {
  try {
    const isHealthy = await checkGeminiHealth();
    
    if (isHealthy) {
      return NextResponse.json({
        success: true,
        status: 'healthy',
        timestamp: new Date().toISOString()
      });
    } else {
      return NextResponse.json({
        success: false,
        status: 'degraded',
        error: 'Gemini API is unreachable or returning invalid responses'
      }, { status: 503 });
    }
  } catch (error) {
    logError(error, { route: '/api/assistant', method: 'GET' });
    const formattedError = formatErrorResponse(error);
    return NextResponse.json(formattedError, { status: formattedError.statusCode });
  }
}
