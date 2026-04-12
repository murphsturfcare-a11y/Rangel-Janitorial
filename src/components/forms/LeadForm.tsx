'use client';

import { useState } from 'react';
import { ArrowRight, CheckCircle, Loader2 } from 'lucide-react';

interface LeadFormProps {
  formId: string;
  location: string;
}

const facilityOptions = [
  'Office Building',
  'Medical / Dental',
  'Industrial / Warehouse',
  'Multi-Unit Property',
  'Fitness Center',
  'Government / Municipality',
  'Homeowners Association',
  'Shopping Center',
  'School / Educational',
  'Other',
];

const frequencyOptions = [
  'Daily (5x/week)',
  '3x per week',
  'Weekly',
  'Bi-Weekly',
  'Monthly',
  'One-Time Deep Clean',
  'Not Sure',
];

const referralOptions = [
  'Google Search',
  'Referral',
  'Social Media',
  'Yelp',
  'Drove By',
  'Other',
];

export default function LeadForm({ formId, location }: LeadFormProps) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [loadedAt] = useState(() => Date.now());

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    const form = e.currentTarget;
    const data = new FormData(form);

    // Bot detection: honeypot field filled
    if (data.get('website')) {
      // Fake success — don't tell bots they were caught
      setStatus('success');
      return;
    }

    // Bot detection: submitted in under 3 seconds
    if (Date.now() - loadedAt < 3000) {
      setStatus('success');
      return;
    }

    const payload = {
      formId,
      location,
      firstName: data.get('firstName'),
      lastName: data.get('lastName'),
      phone: data.get('phone'),
      email: data.get('email'),
      facilityType: data.get('facilityType'),
      frequency: data.get('frequency'),
      referralSource: data.get('referralSource'),
      message: data.get('message'),
    };

    try {
      const res = await fetch('/.netlify/functions/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setStatus('success');
      } else {
        setStatus('error');
        setErrorMsg('Something went wrong. Please call us directly.');
      }
    } catch {
      setStatus('error');
      setErrorMsg('Network error. Please try again or call us directly.');
    }
  }

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
        <div className="w-16 h-16 bg-sage/15 rounded-full flex items-center justify-center mb-4">
          <CheckCircle className="w-8 h-8 text-sage" />
        </div>
        <h3 className="text-xl font-bold text-charcoal font-heading mb-2">
          Quote Request Received!
        </h3>
        <p className="text-charcoal-light font-body text-sm max-w-sm">
          Thank you! A member of our team will be in touch within 1 business day
          with your custom quote.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 sm:p-6">
      <h3 className="text-lg font-bold text-charcoal font-heading text-center mb-1">
        Get Your Free Quote
      </h3>
      <p className="text-charcoal-light font-body text-xs text-center mb-4">
        Tell us about your facility and we&apos;ll provide a custom estimate.
      </p>

      {/* Honeypot — hidden from humans, bots fill it */}
      <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', top: '-9999px', height: 0, overflow: 'hidden' }}>
        <label htmlFor="website">Website</label>
        <input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      {/* Name row */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor="firstName" className="block text-xs font-semibold text-charcoal font-body mb-1">
            First Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            required
            className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm font-body text-charcoal placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-sage/40 focus:border-sage"
            placeholder="First Name"
          />
        </div>
        <div>
          <label htmlFor="lastName" className="block text-xs font-semibold text-charcoal font-body mb-1">
            Last Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            required
            className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm font-body text-charcoal placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-sage/40 focus:border-sage"
            placeholder="Last Name"
          />
        </div>
      </div>

      {/* Contact row */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor="phone" className="block text-xs font-semibold text-charcoal font-body mb-1">
            Phone <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            required
            className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm font-body text-charcoal placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-sage/40 focus:border-sage"
            placeholder="(555) 555-5555"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-xs font-semibold text-charcoal font-body mb-1">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm font-body text-charcoal placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-sage/40 focus:border-sage"
            placeholder="you@company.com"
          />
        </div>
      </div>

      {/* Facility + Frequency row */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor="facilityType" className="block text-xs font-semibold text-charcoal font-body mb-1">
            Type of Facility
          </label>
          <select
            id="facilityType"
            name="facilityType"
            className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm font-body text-charcoal focus:outline-none focus:ring-2 focus:ring-sage/40 focus:border-sage bg-white"
          >
            <option value="">Select...</option>
            {facilityOptions.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="frequency" className="block text-xs font-semibold text-charcoal font-body mb-1">
            Frequency
          </label>
          <select
            id="frequency"
            name="frequency"
            className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm font-body text-charcoal focus:outline-none focus:ring-2 focus:ring-sage/40 focus:border-sage bg-white"
          >
            <option value="">Select...</option>
            {frequencyOptions.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Referral */}
      <div>
        <label htmlFor="referralSource" className="block text-xs font-semibold text-charcoal font-body mb-1">
          How Did You Hear About Us?
        </label>
        <select
          id="referralSource"
          name="referralSource"
          className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm font-body text-charcoal focus:outline-none focus:ring-2 focus:ring-sage/40 focus:border-sage bg-white"
        >
          <option value="">Select...</option>
          {referralOptions.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-xs font-semibold text-charcoal font-body mb-1">
          Questions / Comments
        </label>
        <textarea
          id="message"
          name="message"
          rows={3}
          className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm font-body text-charcoal placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-sage/40 focus:border-sage resize-none"
          placeholder="Tell us about your facility..."
        />
      </div>

      {errorMsg && (
        <p className="text-red-600 text-xs font-body text-center">{errorMsg}</p>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full bg-sage hover:bg-sage-dark text-white font-bold py-3 px-6 rounded-lg font-body text-sm transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
      >
        {status === 'loading' ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Submitting...
          </>
        ) : (
          <>
            Get Your Free Quote
            <ArrowRight className="w-4 h-4" />
          </>
        )}
      </button>

      <p className="text-[11px] text-gray-400 font-body text-center leading-snug">
        By submitting, you agree to receive communications from Rangel Janitorial.
        You may opt out at any time.
      </p>
    </form>
  );
}
