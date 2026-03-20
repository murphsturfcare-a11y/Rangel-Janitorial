'use client';

import { useState, type FormEvent } from 'react';
import { Loader2 } from 'lucide-react';

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[\d\s()+-]{7,}$/;

export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  function validate(): boolean {
    const errors: Record<string, string> = {};

    if (!name.trim()) {
      errors.name = 'Name is required.';
    }
    if (!email.trim()) {
      errors.email = 'Email is required.';
    } else if (!EMAIL_REGEX.test(email.trim())) {
      errors.email = 'Please enter a valid email address.';
    }
    if (!phone.trim()) {
      errors.phone = 'Phone number is required.';
    } else if (!PHONE_REGEX.test(phone.trim())) {
      errors.phone = 'Please enter a valid phone number.';
    }
    if (!message.trim()) {
      errors.message = 'Message is required.';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === 'submitting') return;
    if (!validate()) return;

    setStatus('submitting');
    setErrorMessage('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          subject: subject.trim(),
          message: message.trim(),
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to send message. Please try again.');
      }

      setStatus('success');
      setName('');
      setEmail('');
      setPhone('');
      setSubject('');
      setMessage('');
      setValidationErrors({});
    } catch (err) {
      setStatus('error');
      setErrorMessage(
        err instanceof Error ? err.message : 'Something went wrong. Please try again.'
      );
    }
  }

  const inputClasses =
    'w-full border border-gray-300 rounded-lg px-4 py-3 text-charcoal font-body focus:border-forest focus:ring-2 focus:ring-forest/20 outline-none transition-colors';

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl shadow-lg p-8"
      noValidate
    >
      <h2 className="font-heading text-2xl md:text-3xl font-bold text-charcoal mb-6">
        Send Us a Message
      </h2>

      {status === 'success' && (
        <div className="mb-6 rounded-lg bg-green-50 border border-green-200 p-4 text-green-800 font-body">
          Thank you! We&apos;ll contact you within 24 hours.
        </div>
      )}

      {status === 'error' && errorMessage && (
        <div className="mb-6 rounded-lg bg-red-50 border border-red-200 p-4 text-red-700 font-body">
          {errorMessage}
        </div>
      )}

      <div className="space-y-5">
        {/* Name */}
        <div>
          <label htmlFor="contact-name" className="block font-medium text-charcoal mb-1 font-body">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            id="contact-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={inputClasses}
            placeholder="John Murphy"
          />
          {validationErrors.name && (
            <p className="mt-1 text-sm text-red-600 font-body">{validationErrors.name}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="contact-email" className="block font-medium text-charcoal mb-1 font-body">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            id="contact-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClasses}
            placeholder="john@example.com"
          />
          {validationErrors.email && (
            <p className="mt-1 text-sm text-red-600 font-body">{validationErrors.email}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="contact-phone" className="block font-medium text-charcoal mb-1 font-body">
            Phone <span className="text-red-500">*</span>
          </label>
          <input
            id="contact-phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={inputClasses}
            placeholder="(555) 123-4567"
          />
          {validationErrors.phone && (
            <p className="mt-1 text-sm text-red-600 font-body">{validationErrors.phone}</p>
          )}
        </div>

        {/* Subject */}
        <div>
          <label htmlFor="contact-subject" className="block font-medium text-charcoal mb-1 font-body">
            Subject
          </label>
          <input
            id="contact-subject"
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className={inputClasses}
            placeholder="How can we help?"
          />
        </div>

        {/* Message */}
        <div>
          <label htmlFor="contact-message" className="block font-medium text-charcoal mb-1 font-body">
            Message <span className="text-red-500">*</span>
          </label>
          <textarea
            id="contact-message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={5}
            className={inputClasses + ' resize-y'}
            placeholder="Tell us what you need..."
          />
          {validationErrors.message && (
            <p className="mt-1 text-sm text-red-600 font-body">{validationErrors.message}</p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="w-full bg-forest text-white font-heading font-semibold py-3 px-6 rounded-lg hover:bg-forest-dark transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {status === 'submitting' ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Sending...
            </>
          ) : (
            'Send Message'
          )}
        </button>
      </div>
    </form>
  );
}
