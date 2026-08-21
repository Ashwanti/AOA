import { Router } from 'express';
import type { ResultSetHeader } from 'mysql2';
import { pool } from '../db.js';
import { sendInquiryNotification } from '../mailer.js';
import { validateInquiry } from '../validators.js';

export const inquiriesRouter = Router();

inquiriesRouter.post('/', async (req, res) => {
  // Honeypot: real visitors never fill this hidden field.
  if (typeof req.body?.company === 'string' && req.body.company.trim() !== '') {
    return res.status(200).json({
      message: "Thanks — we'll be in touch within 24 hours.",
    });
  }

  const result = validateInquiry(req.body);
  if (!result.valid) {
    return res.status(400).json({ message: result.error });
  }

  const { name, email, projectType, budget, message } = result.data;

  try {
    await pool.execute<ResultSetHeader>(
      'INSERT INTO inquiries (name, email, project_type, budget, message) VALUES (?, ?, ?, ?, ?)',
      [name, email, projectType, budget, message]
    );
  } catch (error) {
    console.error('Failed to save inquiry', error);
    return res.status(503).json({
      message:
        'Something went wrong on our end. Email us directly at hello@aoa.in and we’ll pick it up from there.',
    });
  }

  // Email is a best-effort notification layered on top of the DB write, which already
  // succeeded — a failed/unconfigured mail send should never fail the whole request.
  const emailResult = await sendInquiryNotification({ name, email, projectType, budget, message });

  return res.status(201).json({
    message: "Thanks — your message is in. We'll reply within 24 hours.",
    emailSent: emailResult.sent,
  });
});
