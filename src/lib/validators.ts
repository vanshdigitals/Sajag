import { z } from 'zod';

/**
 * Validates PIN codes to ensure they are exactly 6 digits and do not start with 0.
 */
export const pinCodeSchema = z
  .string()
  .min(1, 'PIN code is required')
  .transform((val) => val.trim())
  .refine((val) => /^\d+$/.test(val), {
    message: 'PIN code must contain only numbers',
  })
  .refine((val) => val.length === 6, {
    message: 'PIN code must be exactly 6 digits',
  })
  .refine((val) => !val.startsWith('0'), {
    message: 'PIN code cannot start with 0',
  });

/**
 * Validates AI assistant queries with length constraints and basic sanitization.
 */
export const assistantQuerySchema = z
  .string()
  .transform((val) =>
    val
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/<[^>]*>/g, '')
      .trim()
  )
  .refine((val) => val.length >= 2, 'Question must be at least 2 characters')
  .refine((val) => val.length <= 500, 'Question must be less than 500 characters');

/**
 * Validates geographic coordinates within standard Earth boundaries.
 */
export const coordinatesSchema = z.object({
  lat: z.number().min(-90).max(90),
  lng: z.number().min(-180).max(180),
});

/**
 * Validates user preferences for localization and app experience.
 */
export const userPreferenceSchema = z.object({
  language: z.enum(['en', 'hi']).default('en'),
  experienceLevel: z.enum(['beginner', 'advanced']).default('beginner'),
});

/**
 * Validates user guide step progress updates.
 */
export const progressSchema = z.object({
  stepId: z.string().min(1, 'Step ID is required'),
  completed: z.boolean().default(false),
  notes: z.string().max(500).optional().transform((v) => v?.trim()),
});

/**
 * Generic helper to safely validate data against any Zod schema.
 * Returns either successful data or an array of error messages.
 * 
 * @param schema - The Zod schema to validate against
 * @param data - The unknown data to validate
 */
export function safeValidate<T>(
  schema: z.ZodSchema<T>,
  data: unknown
): { success: true; data: T } | { success: false; errors: string[] } {
  const result = schema.safeParse(data);
  if (result.success) return { success: true, data: result.data };
  return { success: false, errors: result.error.issues.map((e) => e.message) };
}
