import nodemailer from 'nodemailer';
import { config, isEmailConfigured } from './config.js';

const transporter = isEmailConfigured
  ? nodemailer.createTransport({
      host: config.smtp.host,
      port: config.smtp.port,
      secure: config.smtp.port === 465,
      auth: {
        user: config.smtp.user,
        pass: config.smtp.password,
      },
    })
  : null;

export type InquiryPayload = {
  name: string;
  email: string;
  projectType: string;
  budget: string;
  message: string;
};

export async function sendInquiryNotification(inquiry: InquiryPayload) {
  if (!transporter) {
    console.warn('Email not sent — SMTP_HOST/SMTP_USER/SMTP_PASSWORD are not configured.');
    return { sent: false as const };
  }

  try {
    await transporter.sendMail({
      from: `"AOA website" <${config.smtp.user}>`,
      to: config.notifyEmail,
      replyTo: inquiry.email,
      subject: `New inquiry: ${inquiry.name} — ${inquiry.projectType}`,
      text: [
        `Name: ${inquiry.name}`,
        `Email: ${inquiry.email}`,
        `Project type: ${inquiry.projectType}`,
        `Budget: ${inquiry.budget}`,
        '',
        'Message:',
        inquiry.message,
      ].join('\n'),
      html: `
        <div style="font-family: sans-serif; line-height: 1.6; color: #211d17;">
          <h2 style="margin-bottom: 4px;">New project inquiry</h2>
          <p style="color: #6e6759; margin-top: 0;">Submitted via the AOA website contact form.</p>
          <table cellpadding="6" style="border-collapse: collapse;">
            <tr><td><strong>Name</strong></td><td>${escapeHtml(inquiry.name)}</td></tr>
            <tr><td><strong>Email</strong></td><td><a href="mailto:${escapeHtml(inquiry.email)}">${escapeHtml(inquiry.email)}</a></td></tr>
            <tr><td><strong>Project type</strong></td><td>${escapeHtml(inquiry.projectType)}</td></tr>
            <tr><td><strong>Budget</strong></td><td>${escapeHtml(inquiry.budget)}</td></tr>
          </table>
          <p><strong>Message</strong></p>
          <p style="white-space: pre-wrap;">${escapeHtml(inquiry.message)}</p>
        </div>
      `,
    });
    return { sent: true as const };
  } catch (error) {
    console.error('Failed to send inquiry notification email', error);
    return { sent: false as const };
  }
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
