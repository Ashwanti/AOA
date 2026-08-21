const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type InquiryInput = {
  name: string;
  email: string;
  projectType: string;
  budget: string;
  message: string;
};

export type ValidationResult =
  | { valid: true; data: InquiryInput }
  | { valid: false; error: string };

export function validateInquiry(body: unknown): ValidationResult {
  if (typeof body !== 'object' || body === null) {
    return { valid: false, error: 'Invalid request body.' };
  }

  const record = body as Record<string, unknown>;
  const name = String(record.name ?? '').trim();
  const email = String(record.email ?? '').trim();
  const projectType = String(record.projectType ?? '').trim();
  const budget = String(record.budget ?? '').trim();
  const message = String(record.message ?? '').trim();

  if (!name || !email || !projectType || !budget || !message) {
    return { valid: false, error: 'Please fill in every field before sending.' };
  }
  if (!EMAIL_PATTERN.test(email)) {
    return { valid: false, error: 'That email address doesn’t look right.' };
  }
  if (name.length > 120) {
    return { valid: false, error: 'Name is too long.' };
  }
  if (message.length > 4000) {
    return { valid: false, error: 'Message is too long — please keep it under 4000 characters.' };
  }

  return { valid: true, data: { name, email, projectType, budget, message } };
}
