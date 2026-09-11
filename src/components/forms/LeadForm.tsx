'use client';

import { useId, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle, Loader2, Phone } from 'lucide-react';
import regions from '@/data/regions.json';
import { facilityOptions, frequencyOptions, referralOptions, leadLimits, type FormPlacement, type LeadResult } from '@/lib/leads';

interface LeadFormProps {
  regionSlug?: string;
  formPlacement?: FormPlacement;
  /** Kept while existing callers migrate from the former embedded GHL forms. */
  formId?: string;
  location?: string;
}

function campaignLabels(): Record<string, string> {
  let stored: Record<string, unknown> = {};
  try {
    const parsed: unknown = JSON.parse(sessionStorage.getItem('rangel_janitorial_utm') || '{}');
    if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) stored = parsed as Record<string, unknown>;
  } catch { /* Storage may be unavailable; submitting a quote still works. */ }
  const query = new URLSearchParams(window.location.search);
  return Object.fromEntries(['source', 'medium', 'campaign'].flatMap(key => {
    const value = query.get('utm_' + key) || stored[key];
    return typeof value === 'string' && /^[a-zA-Z0-9][a-zA-Z0-9._ -]{0,79}$/.test(value) && !/\d(?:[ ._-]*\d){6,}/.test(value) ? [[key, value]] : [];
  }));
}

export default function LeadForm({ regionSlug, location, formPlacement = 'hero' }: LeadFormProps) {
  const instanceId = useId();
  const id = (field: string) => instanceId + '-' + field;
  const region = regions.find(region => region.slug === regionSlug || (!regionSlug && region.city === location));
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error' | 'unknown'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [retryAllowed, setRetryAllowed] = useState(true);
  const [reference, setReference] = useState('');
  const attemptId = useRef<string | null>(null);
  const inFlight = useRef(false);
  const started = useRef(false);
  const errorRef = useRef<HTMLDivElement>(null);

  function emit(name: string, submissionId: string) {
    window.dispatchEvent(new CustomEvent(name, {
      detail: { region: region?.slug, form_placement: formPlacement, submission_id: submissionId },
    }));
  }

  function begin() {
    if (!attemptId.current) attemptId.current = crypto.randomUUID();
    if (!started.current) {
      started.current = true;
      emit('rangel:lead-started', attemptId.current);
    }
  }

  function showError(message: string, unknown: boolean, canRetry: boolean) {
    setStatus(unknown ? 'unknown' : 'error');
    setErrorMsg(message);
    setRetryAllowed(canRetry);
    requestAnimationFrame(() => errorRef.current?.focus());
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (inFlight.current || status === 'success' || status === 'unknown' || !retryAllowed) return;
    if (!region) {
      showError('Please choose your local office to request a quote.', false, false);
      return;
    }
    begin();
    const submissionId = attemptId.current!;
    const data = new FormData(e.currentTarget);
    const payload = {
      submissionId,
      regionSlug: region.slug,
      formPlacement,
      sourcePage: '/locations/' + region.slug,
      attribution: campaignLabels(),
      website: data.get('website'),
      firstName: data.get('firstName'),
      lastName: data.get('lastName'),
      phone: data.get('phone'),
      email: data.get('email'),
      facilityType: data.get('facilityType'),
      frequency: data.get('frequency'),
      referralSource: data.get('referralSource'),
      message: data.get('message'),
    };
    inFlight.current = true;
    setStatus('loading');
    setErrorMsg('');
    setReference(submissionId);
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 20_000);
    try {
      const response = await fetch('/.netlify/functions/lead', {
        method: 'POST',
        signal: controller.signal,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      // Platform rate limiting can return text rather than the function's JSON contract.
      if (response.status === 429) {
        showError('Please wait a minute before trying again, or call your local office.', false, true);
        return;
      }
      const result: Partial<LeadResult> | null = await response.json();
      if (response.ok && result?.success === true && result.outcome === 'accepted' && result.submissionId === submissionId) {
        setStatus('success');
        emit('rangel:lead-accepted', submissionId);
      } else if (result?.success === false && result.outcome === 'rejected' && typeof result.message === 'string' && result.message.length <= 300) {
        showError(result.message, false, result.retryAllowed === true);
      } else {
        showError('We could not confirm receipt. Please call your local office before submitting again.', true, false);
      }
    } catch {
      // Losing the response does not establish that the request failed to reach the office.
      showError('We could not confirm receipt. Please call your local office before submitting again.', true, false);
    } finally {
      window.clearTimeout(timeout);
      inFlight.current = false;
    }
  }

  if (status === 'success') {
    return (
      <div role="status" aria-live="polite" className="flex flex-col items-center justify-center py-12 px-6 text-center">
        <div className="w-16 h-16 bg-sage/15 rounded-full flex items-center justify-center mb-4">
          <CheckCircle className="w-8 h-8 text-sage" />
        </div>
        <h3 className="text-xl font-bold text-charcoal font-heading mb-2">
          Quote Request Received!
        </h3>
        <p className="text-charcoal-light font-body text-sm max-w-sm">
          Thank you! Your request is recorded. Our team will review your facility details and contact you about your estimate.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} onFocus={begin} aria-busy={status === 'loading'} aria-labelledby={id('heading')} className="space-y-4 p-4 sm:p-6">
      <h3 id={id('heading')} className="text-lg font-bold text-charcoal font-heading text-center mb-1">
        Get Your Free Quote
      </h3>
      <p className="text-charcoal-light font-body text-xs text-center mb-4">
        Tell us about your facility and we&apos;ll provide a custom estimate.
      </p>

      {/* Honeypot — hidden from humans, bots fill it */}
      <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', top: '-9999px', height: 0, overflow: 'hidden' }}>
        <label htmlFor={id('website')}>Website</label>
        <input type="text" id={id('website')} name="website" tabIndex={-1} autoComplete="off" />
      </div>

      {/* Name row */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor={id('firstName')} className="block text-xs font-semibold text-charcoal font-body mb-1">
            First Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id={id('firstName')}
            name="firstName"
            autoComplete="given-name"
            maxLength={leadLimits.name}
            required
            className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm font-body text-charcoal placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-sage/40 focus:border-sage"
            placeholder="First Name"
          />
        </div>
        <div>
          <label htmlFor={id('lastName')} className="block text-xs font-semibold text-charcoal font-body mb-1">
            Last Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id={id('lastName')}
            name="lastName"
            autoComplete="family-name"
            maxLength={leadLimits.name}
            required
            className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm font-body text-charcoal placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-sage/40 focus:border-sage"
            placeholder="Last Name"
          />
        </div>
      </div>

      {/* Contact row */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor={id('phone')} className="block text-xs font-semibold text-charcoal font-body mb-1">
            Phone <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            id={id('phone')}
            name="phone"
            autoComplete="tel"
            maxLength={leadLimits.phone}
            required
            className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm font-body text-charcoal placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-sage/40 focus:border-sage"
            placeholder="(555) 555-5555"
          />
        </div>
        <div>
          <label htmlFor={id('email')} className="block text-xs font-semibold text-charcoal font-body mb-1">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id={id('email')}
            name="email"
            autoComplete="email"
            maxLength={leadLimits.email}
            required
            className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm font-body text-charcoal placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-sage/40 focus:border-sage"
            placeholder="you@company.com"
          />
        </div>
      </div>

      {/* Facility + Frequency row */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor={id('facilityType')} className="block text-xs font-semibold text-charcoal font-body mb-1">
            Type of Facility
          </label>
          <select
            id={id('facilityType')}
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
          <label htmlFor={id('frequency')} className="block text-xs font-semibold text-charcoal font-body mb-1">
            Frequency
          </label>
          <select
            id={id('frequency')}
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
        <label htmlFor={id('referralSource')} className="block text-xs font-semibold text-charcoal font-body mb-1">
          How Did You Hear About Us?
        </label>
        <select
          id={id('referralSource')}
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
        <label htmlFor={id('message')} className="block text-xs font-semibold text-charcoal font-body mb-1">
          Questions / Comments
        </label>
        <textarea
          id={id('message')}
          name="message"
          maxLength={leadLimits.message}
          rows={3}
          className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm font-body text-charcoal placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-sage/40 focus:border-sage resize-none"
          placeholder="Tell us about your facility..."
        />
      </div>

      {errorMsg && (
        <div ref={errorRef} role="alert" tabIndex={-1} className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm font-body">
          <p className="text-red-800">{errorMsg}</p>
          {region ? (
            <a href={region.phoneHref} className="mt-2 inline-flex items-center gap-2 font-semibold text-forest underline">
              <Phone className="h-4 w-4" aria-hidden="true" /> Call {region.phone}
            </a>
          ) : <Link href="/locations" className="underline">Find your local office</Link>}
          {reference && <p className="mt-2 break-all text-xs text-charcoal-light">Request reference: {reference}</p>}
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'loading' || status === 'unknown' || !retryAllowed}
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
        By submitting, you ask Rangel Janitorial to contact you about this quote.
        See our <Link href="/privacy-policy" className="underline">privacy policy</Link> for how we handle your information.
      </p>
    </form>
  );
}
