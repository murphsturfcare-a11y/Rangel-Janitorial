'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';

const STORAGE_KEY = 'murphys_exit_dismissed';

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function ExitIntentPopup() {
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const dialogRef = useRef<HTMLDivElement>(null);
  const firstFocusRef = useRef<HTMLInputElement>(null);
  const lastFocusRef = useRef<HTMLButtonElement>(null);
  const hasFiredRef = useRef(false);

  // Show popup on exit intent
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Already dismissed this session
    try {
      if (localStorage.getItem(STORAGE_KEY)) return;
    } catch {
      // localStorage unavailable — proceed anyway
    }

    function handleMouseLeave(e: MouseEvent) {
      if (e.clientY <= 0 && !hasFiredRef.current) {
        hasFiredRef.current = true;
        setVisible(true);
      }
    }

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, []);

  // Focus the email input when the popup appears
  useEffect(() => {
    if (visible) {
      firstFocusRef.current?.focus();
    }
  }, [visible]);

  // Trap focus within dialog
  useEffect(() => {
    if (!visible) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        dismiss();
        return;
      }

      if (e.key !== 'Tab') return;

      const first = firstFocusRef.current;
      const last = lastFocusRef.current;
      if (!first || !last) return;

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  const dismiss = useCallback(() => {
    setVisible(false);
    try {
      localStorage.setItem(STORAGE_KEY, '1');
    } catch {
      // localStorage unavailable
    }
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setError('');

      if (!isValidEmail(email)) {
        setError('Please enter a valid email address.');
        return;
      }

      setSubmitting(true);

      try {
        const res = await fetch('/api/leads', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, source: 'exit_intent' }),
        });

        if (!res.ok) throw new Error('Network error');

        setSubmitted(true);
        setTimeout(() => dismiss(), 2000);
      } catch {
        setError('Something went wrong. Please try again.');
      } finally {
        setSubmitting(false);
      }
    },
    [email, dismiss],
  );

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="exit-popup-heading"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 animate-[fadeIn_300ms_ease-out_forwards]"
        onClick={dismiss}
        aria-hidden="true"
      />

      {/* Dialog panel */}
      <div
        ref={dialogRef}
        className="relative w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl animate-[popIn_300ms_ease-out_forwards]"
      >
        {/* Close button */}
        <button
          onClick={dismiss}
          className="absolute right-4 top-4 rounded-full p-1 text-charcoal-light transition-colors hover:bg-gray-100 hover:text-charcoal focus:outline-none focus:ring-2 focus:ring-forest/50"
          aria-label="Close"
          ref={lastFocusRef}
        >
          <X size={20} />
        </button>

        {submitted ? (
          <div className="text-center py-4">
            <h2 className="font-heading text-2xl font-bold text-forest mb-2">
              Thank You!
            </h2>
            <p className="text-charcoal-light font-body">
              Check your inbox for your 10% discount code.
            </p>
          </div>
        ) : (
          <>
            <h2
              id="exit-popup-heading"
              className="font-heading text-2xl font-bold text-charcoal text-center mb-2"
            >
              Wait! Get 10% Off Your First Service
            </h2>
            <p className="text-charcoal-light font-body text-center mb-6">
              Enter your email to claim your exclusive discount.
            </p>

            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              <div>
                <label htmlFor="exit-email" className="sr-only">
                  Email address
                </label>
                <input
                  ref={firstFocusRef}
                  id="exit-email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError('');
                  }}
                  aria-invalid={error ? 'true' : undefined}
                  aria-describedby={error ? 'exit-email-error' : undefined}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 font-body text-charcoal placeholder:text-gray-400 transition-colors focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest/50"
                />
                {error && (
                  <p id="exit-email-error" className="mt-1.5 text-sm text-red-600" role="alert">
                    {error}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded-lg bg-forest px-6 py-3 font-semibold text-white transition-all duration-200 hover:bg-forest-dark focus:outline-none focus:ring-2 focus:ring-forest/50 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <span className="inline-flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Submitting...
                  </span>
                ) : (
                  'Claim My 10% Discount'
                )}
              </button>
            </form>
          </>
        )}
      </div>

      {/* Keyframe animations injected via style tag */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes popIn {
          from { opacity: 0; transform: scale(0.9); }
          to   { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
