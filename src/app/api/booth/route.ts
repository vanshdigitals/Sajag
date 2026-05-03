import { NextResponse } from 'next/server';
import { unstable_cache } from 'next/cache';
import { findBoothsByPin, findNearestBooths, isValidPinArea } from '@/lib/booth';
import { formatErrorResponse, logError, RateLimitError, ValidationError } from '@/lib/errors';
import { safeValidate, pinCodeSchema } from '@/lib/validators';

// Simple in-memory rate limiter for demonstration.
const rateLimitMap = new Map<string, { count: number; timestamp: number }>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 30; // 30 req/min

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

export async function GET(request: Request) {
  try {
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    checkRateLimit(ip);

    const { searchParams } = new URL(request.url);
    const pin = searchParams.get('pin');
    const lat = searchParams.get('lat');
    const lng = searchParams.get('lng');
    const radius = searchParams.get('radius');

    let booths = [];
    let searchType = '';

    if (pin) {
      searchType = 'pin';
      const getCachedBoothsByPin = unstable_cache(
        async (p: string) => findBoothsByPin(p),
        [`booths-pin-${pin}`],
        { revalidate: 3600 }
      );
      booths = await getCachedBoothsByPin(pin);
    } else if (lat && lng) {
      searchType = 'coordinates';
      const parsedLat = parseFloat(lat);
      const parsedLng = parseFloat(lng);
      
      if (isNaN(parsedLat) || isNaN(parsedLng)) {
        throw new ValidationError('Latitude and longitude must be valid numbers');
      }

      const parsedRadius = radius ? parseFloat(radius) : 5;
      if (radius && isNaN(parsedRadius)) {
        throw new ValidationError('Radius must be a valid number');
      }

      const getCachedBoothsByCoords = unstable_cache(
        async (lt: number, lg: number, rad: number) => findNearestBooths(lt, lg, rad),
        [`booths-coords-${parsedLat}-${parsedLng}-${parsedRadius}`],
        { revalidate: 3600 }
      );
      booths = await getCachedBoothsByCoords(parsedLat, parsedLng, parsedRadius);
    } else {
      throw new ValidationError('Must provide either a "pin" parameter or "lat" and "lng" parameters');
    }

    return NextResponse.json({
      success: true,
      booths,
      count: booths.length,
      searchType,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    logError(error, { route: '/api/booth', method: 'GET' });
    const formattedError = formatErrorResponse(error);
    return NextResponse.json(formattedError, { status: formattedError.statusCode });
  }
}

export async function HEAD(request: Request) {
  try {
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    checkRateLimit(ip);

    const { searchParams } = new URL(request.url);
    const pin = searchParams.get('pin');

    if (!pin) {
      return new Response(null, { status: 400 });
    }

    const validation = safeValidate(pinCodeSchema, pin);
    if (!validation.success) {
      return new Response(null, { status: 400 });
    }

    const isValid = isValidPinArea(validation.data);
    
    if (isValid) {
      return new Response(null, { status: 200 });
    } else {
      return new Response(null, { status: 404 });
    }
  } catch (error) {
    if (error instanceof RateLimitError) {
      return new Response(null, { status: 429 });
    }
    return new Response(null, { status: 500 });
  }
}
