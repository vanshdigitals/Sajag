/**
 * Validates whether a given string is a valid Indian PIN code.
 * A valid Indian PIN code is exactly 6 digits long and does not start with 0.
 * 
 * @param {string} pin - The PIN code string to validate.
 * @returns {boolean} True if the PIN is valid, false otherwise.
 */
export const isValidPIN = (pin: string): boolean => {
  if (!pin) return false;
  // Indian PIN codes are exactly 6 digits
  const pinRegex = /^[1-9][0-9]{5}$/;
  return pinRegex.test(pin);
};

/**
 * Sanitizes a user prompt by removing potentially harmful characters.
 * This provides basic protection against injection attacks.
 * 
 * @param {string} prompt - The raw user input string.
 * @returns {string} The sanitized string with harmful characters removed and whitespace trimmed.
 */
export const sanitizePrompt = (prompt: string): string => {
  if (!prompt) return '';
  // Basic sanitization: remove potentially harmful characters
  // This is a simple example, in production you'd use a robust library
  return prompt.replace(/[<>{}()]/g, '').trim();
};
