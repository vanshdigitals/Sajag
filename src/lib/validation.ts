export const isValidPIN = (pin: string): boolean => {
  if (!pin) return false;
  // Indian PIN codes are exactly 6 digits
  const pinRegex = /^[1-9][0-9]{5}$/;
  return pinRegex.test(pin);
};

export const sanitizePrompt = (prompt: string): string => {
  if (!prompt) return '';
  // Basic sanitization: remove potentially harmful characters
  // This is a simple example, in production you'd use a robust library
  return prompt.replace(/[<>{}()]/g, '').trim();
};
