import { describe, it, expect, vi } from 'vitest';
import { 
  AppError, 
  ValidationError, 
  AuthenticationError, 
  NotFoundError, 
  RateLimitError, 
  ExternalServiceError,
  formatErrorResponse,
  logError
} from '@/lib/errors';

describe('Error Handling System', () => {
  describe('Error Classes', () => {
    it('AppError creates correctly with defaults', () => {
      const err = new AppError('Default error');
      expect(err.message).toBe('Default error');
      expect(err.statusCode).toBe(500);
      expect(err.code).toBe('INTERNAL_ERROR');
      expect(err.isOperational).toBe(true);
      expect(err.stack).toBeDefined();
    });

    it('AppError accepts custom values', () => {
      const err = new AppError('Custom error', 418, 'I_AM_A_TEAPOT', false);
      expect(err.message).toBe('Custom error');
      expect(err.statusCode).toBe(418);
      expect(err.code).toBe('I_AM_A_TEAPOT');
      expect(err.isOperational).toBe(false);
    });

    it('ValidationError has correct default properties', () => {
      const err = new ValidationError();
      expect(err.message).toBe('Invalid input data');
      expect(err.statusCode).toBe(400);
      expect(err.code).toBe('VALIDATION_ERROR');
    });

    it('AuthenticationError has correct default properties', () => {
      const err = new AuthenticationError();
      expect(err.message).toBe('Authentication required');
      expect(err.statusCode).toBe(401);
      expect(err.code).toBe('AUTHENTICATION_ERROR');
    });

    it('NotFoundError has correct default properties', () => {
      const err = new NotFoundError();
      expect(err.message).toBe('Resource not found');
      expect(err.statusCode).toBe(404);
      expect(err.code).toBe('NOT_FOUND');
    });

    it('RateLimitError has correct default properties', () => {
      const err = new RateLimitError();
      expect(err.message).toBe('Too many requests');
      expect(err.statusCode).toBe(429);
      expect(err.code).toBe('RATE_LIMIT_EXCEEDED');
    });

    it('ExternalServiceError has correct default properties', () => {
      const err = new ExternalServiceError();
      expect(err.message).toBe('External service unavailable');
      expect(err.statusCode).toBe(502);
      expect(err.code).toBe('EXTERNAL_SERVICE_ERROR');
    });

    it('Captures stack traces', () => {
      function throwError() {
        throw new ValidationError('test');
      }
      try {
        throwError();
      } catch (e: any) {
        expect(e.stack).toBeDefined();
        expect(e.stack).toContain('throwError');
      }
    });
  });

  describe('formatErrorResponse', () => {
    it('formats AppError correctly', () => {
      const err = new NotFoundError('User not found');
      const response = formatErrorResponse(err);
      
      expect(response).toEqual({
        success: false,
        error: 'User not found',
        code: 'NOT_FOUND',
        statusCode: 404,
      });
    });

    it('formats generic Error correctly', () => {
      const err = new Error('Something broke natively');
      const response = formatErrorResponse(err);
      
      expect(response).toEqual({
        success: false,
        error: 'Something broke natively',
        code: 'INTERNAL_ERROR',
        statusCode: 500,
      });
    });

    it('formats non-Error string correctly', () => {
      const response = formatErrorResponse('String error');
      
      expect(response).toEqual({
        success: false,
        error: 'An unexpected error occurred',
        code: 'INTERNAL_ERROR',
        statusCode: 500,
      });
    });

    it('formats null correctly', () => {
      const response = formatErrorResponse(null);
      expect(response.error).toBe('An unexpected error occurred');
    });

    it('formats undefined correctly', () => {
      const response = formatErrorResponse(undefined);
      expect(response.error).toBe('An unexpected error occurred');
    });

    it('formats numbers correctly', () => {
      const response = formatErrorResponse(404);
      expect(response.error).toBe('An unexpected error occurred');
    });
  });

  describe('logError', () => {
    beforeEach(() => {
      vi.clearAllMocks();
      vi.spyOn(console, 'error').mockImplementation(() => {});
    });

    it('logs Error objects with stack trace and empty context', () => {
      const err = new Error('Test error');
      logError(err);
      
      expect(console.error).toHaveBeenCalled();
      const callArgs = vi.mocked(console.error).mock.calls[0];
      expect(callArgs[0]).toMatch(/\[ERROR .*\]/);
      expect(callArgs[1]).toEqual({
        message: 'Test error',
        stack: err.stack,
        context: {},
      });
    });

    it('logs Error objects with custom context', () => {
      const err = new Error('Test error');
      logError(err, { userId: 123 });
      
      const callArgs = vi.mocked(console.error).mock.calls[0];
      expect(callArgs[1].context).toEqual({ userId: 123 });
    });

    it('logs non-Error string values gracefully', () => {
      logError('Plain string error');
      
      const callArgs = vi.mocked(console.error).mock.calls[0];
      expect(callArgs[1]).toEqual({
        message: 'Plain string error',
        stack: undefined,
        context: {},
      });
    });
  });
});
