/**
 * Base custom error class for application errors.
 */
export class AppError extends Error {
  public readonly isAppError = true;
  public readonly statusCode: number;
  public readonly code: string;
  public readonly isOperational: boolean;

  constructor(
    message: string,
    statusCode: number = 500,
    code: string = 'INTERNAL_ERROR',
    isOperational: boolean = true
  ) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.isOperational = isOperational;
    // Maintains proper stack trace for where our error was thrown
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

/**
 * Thrown when input validation fails (e.g., Zod validation error).
 */
export class ValidationError extends AppError {
  constructor(message: string = 'Invalid input data') {
    super(message, 400, 'VALIDATION_ERROR', true);
  }
}

/**
 * Thrown when an unauthenticated user attempts to access a protected resource.
 */
export class AuthenticationError extends AppError {
  constructor(message: string = 'Authentication required') {
    super(message, 401, 'AUTHENTICATION_ERROR', true);
  }
}

/**
 * Thrown when a requested resource (e.g., polling booth or user profile) cannot be found.
 */
export class NotFoundError extends AppError {
  constructor(message: string = 'Resource not found') {
    super(message, 404, 'NOT_FOUND', true);
  }
}

/**
 * Thrown when a user exceeds rate limits for an API route.
 */
export class RateLimitError extends AppError {
  constructor(message: string = 'Too many requests') {
    super(message, 429, 'RATE_LIMIT_EXCEEDED', true);
  }
}

/**
 * Thrown when a third-party service (like Google GenAI or Firebase) fails.
 */
export class ExternalServiceError extends AppError {
  constructor(message: string = 'External service unavailable') {
    super(message, 502, 'EXTERNAL_SERVICE_ERROR', true);
  }
}

/**
 * Formats an error into a standardized JSON response format.
 * 
 * @param error - The error to format
 * @returns A standardized error object suitable for API responses
 */
export function formatErrorResponse(error: unknown) {
  if (error instanceof AppError || (typeof error === 'object' && error !== null && 'isAppError' in error && (error as AppError).isAppError)) {
    const appErr = error as AppError;
    return {
      success: false as const,
      error: appErr.message,
      code: appErr.code,
      statusCode: appErr.statusCode,
    };
  }
  const message =
    error instanceof Error ? error.message : 'An unexpected error occurred';
  return {
    success: false as const,
    error: message,
    code: 'INTERNAL_ERROR',
    statusCode: 500,
  };
}

/**
 * Safely logs an error with an optional context object.
 * 
 * @param error - The error to log
 * @param context - Additional contextual information
 */
export function logError(error: unknown, context: Record<string, unknown> = {}): void {
  const timestamp = new Date().toISOString();
  const errorMessage = error instanceof Error ? error.message : String(error);
  const stack = error instanceof Error ? error.stack : undefined;
  console.error(`[ERROR ${timestamp}]`, {
    message: errorMessage,
    stack,
    context,
  });
}
