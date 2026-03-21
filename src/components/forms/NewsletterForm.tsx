'use client';

import { useState, type FormEvent } from 'react';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [validationError, setValidationError] = useState('');

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setValidationError('Please enter a valid email address.');
      return;
    }
    setValidationError('');
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <p className="text-sage font-body text-sm">
        Thanks! Visit your{' '}
        <a href="/locations" className="underline hover:text-white transition-colors">
          local office page
        </a>{' '}
        to get started with a free quote.
      </p>
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
          className="bg-forest text-white font-heading font-semibold px-5 py-3 rounded-lg hover:bg-forest-dark transition-colors shrink-0"
        >
          Subscribe
        </button>
      </div>
      {validationError && (
        <p className="mt-2 text-sm text-red-400 font-body">{validationError}</p>
      )}
    </form>
  );
}
