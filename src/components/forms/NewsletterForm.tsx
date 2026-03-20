'use client';

import { useState, type FormEvent } from 'react';
import { Loader2 } from 'lucide-react';

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [validationError, setValidationError] = useState('');

  function validate(): boolean {
    if (!email.trim()) {
      setValidationError('Email is required.');
      return false;
    }
    if (!EMAIL_REGEX.test(email.trim())) {
      setValidationError('Please enter a valid email address.');
      return false;
    }
    setValidationError('');
    return true;
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === 'submitting') return;
    if (!validate()) return;

    setStatus('submitting');
    setErrorMessage('');

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      });

      if (!res.ok) {
        throw new Error('Failed to subscribe. Please try again.');
      }

      setStatus('success');
      setEmail('');
      setValidationError('');
    } catch (err) {
      setStatus('error');
      setErrorMessage(
        err instanceof Error ? err.message : 'Something went wrong. Please try again.'
      );
    }
  }

  if (status === 'success') {
    return (
      <div className="text-sage font-body text-sm">
        Thanks for subscribing!
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          aria-label="Email address"
          className="flex-1 min-w-0 bg-charcoal-light border border-charcoal-light rounded-lg px-4 py-3 text-white font-body placeholder:text-gray-400 focus:border-sage focus:ring-2 focus:ring-sage/20 outline-none transition-colors"
        />
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="bg-forest text-white font-heading font-semibold px-5 py-3 rounded-lg hover:bg-forest-dark transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2 shrink-0"
        >
          {status === 'submitting' ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            'Subscribe'
          )}
        </button>
      </div>

      {validationError && (
        <p className="mt-2 text-sm text-red-400 font-body">{validationError}</p>
      )}

      {status === 'error' && errorMessage && (
        <p className="mt-2 text-sm text-red-400 font-body">{errorMessage}</p>
      )}
    </form>
  );
}
