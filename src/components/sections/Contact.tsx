'use client';

import { useState, type FormEvent } from 'react';
import { AlertCircle, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import Reveal from '@/components/interactive/Reveal';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000';

type Status = 'idle' | 'pending' | 'success' | 'error';

const FALLBACK_ERROR =
  'Something went wrong on our end. Email us directly at hello@aoa.in and we’ll pick it up from there.';

export default function Contact() {
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState('');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    // Honeypot: real visitors never fill this hidden field.
    if (String(formData.get('company') ?? '').trim() !== '') {
      setStatus('success');
      setMessage("Thanks — we'll be in touch within 24 hours.");
      form.reset();
      return;
    }

    setStatus('pending');
    try {
      const response = await fetch(`${API_URL}/api/inquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.get('name'),
          email: formData.get('email'),
          projectType: formData.get('projectType'),
          budget: formData.get('budget'),
          message: formData.get('message'),
        }),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        setStatus('error');
        setMessage(data?.message || FALLBACK_ERROR);
        return;
      }

      setStatus('success');
      setMessage(data?.message || "Thanks — your message is in. We'll reply within 24 hours.");
      form.reset();
    } catch {
      setStatus('error');
      setMessage(FALLBACK_ERROR);
    }
  }

  const pending = status === 'pending';

  return (
    <section className="section-pad" id="contact">
      <div className="contact-section">
        <div className="contact-grid">
          <Reveal className="contact-intro">
            <p className="eyebrow">Have a project in mind?</p>
            <h2>
              Let&apos;s build something <span className="accent-text">worth remembering.</span>
            </h2>
            <p>
              Wherever you&apos;re writing from — Pune or Portland — tell us what you&apos;re
              imagining. We reply personally, within 24 hours.
            </p>
            <div className="contact-direct">
              <a href="mailto:hello@aoa.in" data-cursor="hover">
                hello@aoa.in <ArrowUpRight size={14} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" data-cursor="hover">
                @weareaoa on Instagram <ArrowUpRight size={14} />
              </a>
            </div>
          </Reveal>

          <Reveal delay={1}>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="company"
                className="honeypot-field"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
              />

              <div className="field-group">
                <div className="field">
                  <label htmlFor="name">Name</label>
                  <input id="name" name="name" type="text" required placeholder="Jane Doe" />
                </div>
                <div className="field">
                  <label htmlFor="email">Email</label>
                  <input id="email" name="email" type="email" required placeholder="jane@company.com" />
                </div>
              </div>

              <div className="field-group">
                <div className="field">
                  <label htmlFor="projectType">Project type</label>
                  <select id="projectType" name="projectType" required defaultValue="">
                    <option value="" disabled>Select one</option>
                    <option>Website</option>
                    <option>E-commerce</option>
                    <option>Web app</option>
                    <option>Ongoing support</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="field">
                  <label htmlFor="budget">Budget (USD)</label>
                  <select id="budget" name="budget" required defaultValue="">
                    <option value="" disabled>Select a range</option>
                    <option>Under $1,000</option>
                    <option>$1,000 – $5,000</option>
                    <option>$5,000 – $15,000</option>
                    <option>$15,000+</option>
                  </select>
                </div>
              </div>

              <div className="field">
                <label htmlFor="message">Project details</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  placeholder="Tell us about your project, timeline, and goals."
                />
              </div>

              <button className="form-submit" type="submit" disabled={pending} data-cursor="hover">
                {pending ? 'Sending…' : 'Send inquiry'} <ArrowUpRight size={16} />
              </button>

              {status !== 'idle' && status !== 'pending' && (
                <div className={`form-status ${status}`} role="status">
                  {status === 'success' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
                  {message}
                </div>
              )}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
