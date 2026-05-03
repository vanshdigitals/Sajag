import { NextResponse } from 'next/server';
import { formatErrorResponse, logError } from './errors';

type RouteHandler = (request: Request) => Promise<NextResponse>;

/**
 * Wraps a Next.js route handler with centralised error handling.
 * Any thrown error is formatted via `formatErrorResponse` and returned as JSON.
 *
 * @param handler - The route handler to wrap
 */
export function withErrorHandler(handler: RouteHandler): RouteHandler {
  return async (request: Request) => {
    try {
      return await handler(request);
    } catch (error) {
      logError(error, { url: request.url, method: request.method });
      const formatted = formatErrorResponse(error);
      return NextResponse.json(formatted, { status: formatted.statusCode });
    }
  };
}
