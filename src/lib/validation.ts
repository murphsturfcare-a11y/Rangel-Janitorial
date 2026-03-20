import type { ServiceType, ValidationErrors } from '@/types';

/**
 * Valid service types offered by Murphy's Turf.
 */
export const SERVICE_TYPES: readonly ServiceType[] = [
  'lawn-mowing',
  'fertilization',
  'weed-control',
  'aeration',
  'overseeding',
  'leaf-removal',
  'spring-cleanup',
  'fall-cleanup',
  'lawn-installation',
  'other',
] as const;

/**
 * Validates an email address against RFC 5322 simplified pattern.
 */
export function validateEmail(email: string): boolean {
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email.trim());
}

/**
 * Validates a US phone number. Accepts common formats:
 * (123) 456-7890, 123-456-7890, 123.456.7890, 1234567890, +1 123 456 7890, etc.
 */
export function validatePhone(phone: string): boolean {
  const stripped = phone.replace(/[\s().+-]/g, '');

  // After stripping formatting, we expect 10 digits or 11 digits starting with 1
  if (/^\d{10}$/.test(stripped)) return true;
  if (/^1\d{10}$/.test(stripped)) return true;

  return false;
}

/**
 * Validates that a value is present and non-empty.
 */
export function validateRequired(
  value: unknown,
  fieldName: string
): { valid: boolean; error?: string } {
  if (value === null || value === undefined) {
    return { valid: false, error: `${fieldName} is required` };
  }

  if (typeof value === 'string' && value.trim().length === 0) {
    return { valid: false, error: `${fieldName} is required` };
  }

  return { valid: true };
}

/**
 * Strips HTML tags, trims whitespace, and performs basic XSS prevention
 * by encoding potentially dangerous characters.
 */
export function sanitizeInput(input: string): string {
  return input
    .replace(/<[^>]*>/g, '') // Strip HTML tags
    .replace(/[<>]/g, '') // Remove any remaining angle brackets
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+\s*=/gi, '') // Remove inline event handlers (onclick=, etc.)
    .replace(/&(?!amp;|lt;|gt;|quot;|#39;)/g, '&amp;') // Encode unescaped ampersands
    .trim();
}

/**
 * Validates all fields for the lead capture form.
 */
export function validateLeadForm(data: unknown): ValidationErrors {
  const errors: Record<string, string> = {};

  if (!data || typeof data !== 'object') {
    return { valid: false, errors: { form: 'Invalid form data' } };
  }

  const form = data as Record<string, unknown>;

  // Name: required, minimum 2 characters
  const nameCheck = validateRequired(form.name, 'Name');
  if (!nameCheck.valid) {
    errors.name = nameCheck.error!;
  } else if (typeof form.name === 'string' && form.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters';
  }

  // Email: required, must be valid format
  const emailCheck = validateRequired(form.email, 'Email');
  if (!emailCheck.valid) {
    errors.email = emailCheck.error!;
  } else if (typeof form.email === 'string' && !validateEmail(form.email)) {
    errors.email = 'Please enter a valid email address';
  }

  // Phone: required, must be valid US format
  const phoneCheck = validateRequired(form.phone, 'Phone');
  if (!phoneCheck.valid) {
    errors.phone = phoneCheck.error!;
  } else if (typeof form.phone === 'string' && !validatePhone(form.phone)) {
    errors.phone = 'Please enter a valid US phone number';
  }

  // Service type: required, must be a recognised value
  const serviceCheck = validateRequired(form.serviceType, 'Service type');
  if (!serviceCheck.valid) {
    errors.serviceType = serviceCheck.error!;
  } else if (
    typeof form.serviceType === 'string' &&
    !SERVICE_TYPES.includes(form.serviceType as ServiceType)
  ) {
    errors.serviceType = 'Please select a valid service type';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Validates all fields for the contact form.
 */
export function validateContactForm(data: unknown): ValidationErrors {
  const errors: Record<string, string> = {};

  if (!data || typeof data !== 'object') {
    return { valid: false, errors: { form: 'Invalid form data' } };
  }

  const form = data as Record<string, unknown>;

  // Name: required, minimum 2 characters
  const nameCheck = validateRequired(form.name, 'Name');
  if (!nameCheck.valid) {
    errors.name = nameCheck.error!;
  } else if (typeof form.name === 'string' && form.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters';
  }

  // Email: required, must be valid format
  const emailCheck = validateRequired(form.email, 'Email');
  if (!emailCheck.valid) {
    errors.email = emailCheck.error!;
  } else if (typeof form.email === 'string' && !validateEmail(form.email)) {
    errors.email = 'Please enter a valid email address';
  }

  // Phone: optional, but must be valid if provided
  if (
    form.phone !== undefined &&
    form.phone !== null &&
    typeof form.phone === 'string' &&
    form.phone.trim().length > 0 &&
    !validatePhone(form.phone)
  ) {
    errors.phone = 'Please enter a valid US phone number';
  }

  // Subject: required
  const subjectCheck = validateRequired(form.subject, 'Subject');
  if (!subjectCheck.valid) {
    errors.subject = subjectCheck.error!;
  }

  // Message: required
  const messageCheck = validateRequired(form.message, 'Message');
  if (!messageCheck.valid) {
    errors.message = messageCheck.error!;
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}
