'use client';

import { useEffect, useId, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Building2, CalendarCheck2, CalendarDays, CalendarRange, CalendarSync, Check, CheckCircle, ChevronRight, CircleHelp, Dumbbell, Ellipsis, GraduationCap, House, Landmark, Loader2, Mail, Pencil, Phone, Repeat2, Sparkles, Stethoscope, Store, Trees, Warehouse, type LucideIcon } from 'lucide-react';
import wizardStyles from '@/components/quote/QuoteWizard.module.css';
import regions from '@/data/regions.json';
import { facilityOptions, frequencyOptions, referralOptions, leadLimits, type FormPlacement, type LeadResult } from '@/lib/leads';
import { hasAdsConsent } from '@/lib/analytics/gtag';
import { captureAdAttribution } from '@/lib/analytics/ad-attribution';
import { GOOGLE_ADS_CONFIGURED } from '@/lib/analytics/ads-config';

const facilityIcons: Record<typeof facilityOptions[number], LucideIcon> = {
  'Office Building': Building2, 'Medical / Dental': Stethoscope,
  'Industrial / Warehouse': Warehouse, 'Multi-Unit Property': House,
  'Fitness Center': Dumbbell, 'Government / Municipality': Landmark,
  'Homeowners Association': Trees, 'Shopping Center': Store,
  'School / Educational': GraduationCap, Other: Ellipsis,
};
const frequencyIcons: Record<typeof frequencyOptions[number], LucideIcon> = {
  'Daily (5x/week)': CalendarDays, '3x per week': CalendarSync, Weekly: CalendarCheck2,
  'Bi-Weekly': Repeat2, Monthly: CalendarRange, 'One-Time Deep Clean': Sparkles, 'Not Sure': CircleHelp,
};

interface LeadFormProps {
  regionSlug?: string;
  formPlacement?: FormPlacement;
  sourcePage?: string;
  variant?: 'standard' | 'compact' | 'wizard';
  /** Kept while existing callers migrate from the former embedded GHL forms. */
  formId?: string;
  location?: string;
}

function campaignLabels(): Record<string, string> {
  if (!GOOGLE_ADS_CONFIGURED || !hasAdsConsent()) return {};
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

function focusVisibleWizardElement(element: HTMLElement | null): void {
  if (!element || element.closest('[hidden]')) return;
  const dialog = element.closest('dialog');
  if (!dialog || dialog.open) element.focus();
}

export default function LeadForm({ regionSlug, location, formPlacement = 'hero', sourcePage, variant = 'standard' }: LeadFormProps) {
  const instanceId = useId();
  const id = (field: string) => instanceId + '-' + field;
  const region = regions.find(region => region.slug === regionSlug || (!regionSlug && region.city === location));
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error' | 'unknown'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [retryAllowed, setRetryAllowed] = useState(true);
  const [reference, setReference] = useState('');
  const isWizard = variant === 'wizard';
  const isCondensed = variant !== 'standard';
  const [wizardStep, setWizardStep] = useState<1 | 2 | 3>(1);
  const [selectedFacility, setSelectedFacility] = useState('');
  const [selectedFrequency, setSelectedFrequency] = useState('');
  const navigationLocked = status === 'loading' || status === 'unknown' || !retryAllowed;
  const questionRef = useRef<HTMLHeadingElement>(null);
  const previousStep = useRef(wizardStep);
  const attemptId = useRef<string | null>(null);
  const inFlight = useRef(false);
  const started = useRef(false);
  const errorRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // The dialog owns initial/reopen focus. Only a user's step change moves focus here.
    if (isWizard && previousStep.current !== wizardStep) focusVisibleWizardElement(questionRef.current);
    previousStep.current = wizardStep;
  }, [isWizard, wizardStep]);

  useEffect(() => {
    if (isWizard && status === 'success') focusVisibleWizardElement(successRef.current);
  }, [isWizard, status]);

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
    requestAnimationFrame(() => isWizard ? focusVisibleWizardElement(errorRef.current) : errorRef.current?.focus());
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (isWizard && (wizardStep !== 3 || !selectedFacility || !selectedFrequency)) return;
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
      sourcePage: sourcePage ?? '/locations/' + region.slug,
      attribution: campaignLabels(),
      adAttribution: captureAdAttribution(),
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
      <div ref={successRef} role="status" aria-live="polite" tabIndex={isWizard ? -1 : undefined} className="flex flex-col items-center justify-center py-12 px-6 text-center">
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
    <form onSubmit={handleSubmit} onFocus={begin} onKeyDown={event => {
      if (isWizard && wizardStep !== 3 && event.key === 'Enter'
        && !(event.target instanceof Element && event.target.closest('button[type="button"]'))) event.preventDefault();
    }} aria-busy={status === 'loading'} aria-labelledby={id('heading')} className={isWizard ? wizardStyles.form : 'space-y-4 p-4 sm:p-6'}>
      {isWizard && <>
        <ol aria-label="Quote progress" className={wizardStyles.progress}>
          {['Facility', 'Schedule', 'Contact'].map((label, index) => <li key={label} aria-current={wizardStep === index + 1 ? 'step' : undefined} data-complete={wizardStep > index + 1}>
            <span className={wizardStyles.stepNumber} aria-hidden="true">{wizardStep > index + 1 ? <Check size={14} /> : index + 1}</span>
            <span>{label}<span className="sr-only">{wizardStep > index + 1 ? ', completed' : ''}</span></span>
          </li>)}
        </ol>
        <div className={wizardStyles.stepMeta}>
          {wizardStep > 1 ? <button type="button" onClick={() => setWizardStep(wizardStep === 3 ? 2 : 1)} disabled={navigationLocked} aria-label={wizardStep === 3 ? 'Back to cleaning frequency' : 'Back to facility type'} className={wizardStyles.back}><ArrowLeft size={16} aria-hidden="true" />Back</button> : <span />}
          <p aria-live="polite" aria-atomic="true">Step {wizardStep} of 3</p>
        </div>
      </>}
      <h3 id={id('heading')} ref={isWizard ? questionRef : undefined} data-wizard-heading={isWizard ? '' : undefined} tabIndex={isWizard ? -1 : undefined} className={isWizard ? wizardStyles.question : 'text-lg font-bold text-charcoal font-heading text-center mb-1'}>
        {isWizard ? wizardStep === 1 ? 'What type of facility needs cleaning?' : wizardStep === 2 ? 'How often do you need cleaning?' : 'Where can we send your quote?' : 'Get Your Free Quote'}
      </h3>
      <p className={isWizard ? wizardStyles.helper : 'text-charcoal-light font-body text-xs text-center mb-4'}>
        {isWizard ? wizardStep === 3 ? 'Our team will contact you to talk through your cleaning needs.' : wizardStep === 2 ? 'Choose a schedule, or let us help you decide. Tap to continue.' : 'Choose the closest match. One tap takes you to the next step.' : "Tell us about your facility and we'll provide a custom estimate."}
      </p>

      {isWizard && <>
        <input type="hidden" name="facilityType" value={selectedFacility} />
        <input type="hidden" name="frequency" value={selectedFrequency} />
        {wizardStep < 3 && <div role="group" aria-labelledby={id('heading')} className={wizardStyles.choices}>
          {(wizardStep === 1 ? facilityOptions : frequencyOptions).map(option => {
            const Icon = wizardStep === 1 ? facilityIcons[option as keyof typeof facilityIcons] : frequencyIcons[option as keyof typeof frequencyIcons];
            const selected = (wizardStep === 1 ? selectedFacility : selectedFrequency) === option;
            return <button key={option} type="button" aria-pressed={selected} onClick={() => {
              begin();
              if (wizardStep === 1) { setSelectedFacility(option); setWizardStep(2); }
              else { setSelectedFrequency(option); setWizardStep(3); }
            }} className={wizardStyles.choice} data-wide={option === 'Not Sure'}>
              <span className={wizardStyles.choiceIcon}><Icon size={23} strokeWidth={1.6} aria-hidden="true" /></span>
              <span className={wizardStyles.choiceLabel}>{option}</span>
              {selected ? <Check size={17} className={wizardStyles.choiceArrow} aria-hidden="true" /> : <ChevronRight size={17} className={wizardStyles.choiceArrow} aria-hidden="true" />}
            </button>;
          })}
        </div>}
        {wizardStep === 3 && <div className={wizardStyles.summary} role="group" aria-label="Your cleaning details">
          <button type="button" aria-label={`Change facility type: Your facility, ${selectedFacility}`} disabled={navigationLocked} onClick={() => setWizardStep(1)}><Building2 size={18} aria-hidden="true" /><span><span className={wizardStyles.summaryLabel}>Your facility</span>{selectedFacility}</span><Pencil size={14} aria-hidden="true" /></button>
          <button type="button" aria-label={`Change cleaning frequency: Your schedule, ${selectedFrequency}`} disabled={navigationLocked} onClick={() => setWizardStep(2)}><CalendarDays size={18} aria-hidden="true" /><span><span className={wizardStyles.summaryLabel}>Your schedule</span>{selectedFrequency}</span><Pencil size={14} aria-hidden="true" /></button>
        </div>}
        {wizardStep < 3 && <p className={wizardStyles.reassurance}><CheckCircle size={15} aria-hidden="true" />Free quote. No obligation to book.</p>}
      </>}

      {/* Honeypot — hidden from humans, bots fill it */}
      <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', top: '-9999px', height: 0, overflow: 'hidden' }}>
        <label htmlFor={id('website')}>Website</label>
        <input type="text" id={id('website')} name="website" tabIndex={-1} autoComplete="off" />
      </div>

      {/* Keep contact fields mounted so Back and dialog close/reopen preserve entered details. */}
      <fieldset hidden={isWizard && wizardStep !== 3} disabled={isWizard && wizardStep !== 3} aria-label={isWizard ? 'Contact details' : undefined} className="min-w-0 space-y-4 border-0 p-0">
      {/* Name row */}
      <div className={isWizard ? wizardStyles.nameRow : 'grid grid-cols-2 gap-3'}>
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
            className={`w-full px-3 py-2.5 rounded-lg border border-gray-200 ${isCondensed ? 'text-base sm:text-sm' : 'text-sm'} font-body text-charcoal placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-sage/40 focus:border-sage`}
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
            className={`w-full px-3 py-2.5 rounded-lg border border-gray-200 ${isCondensed ? 'text-base sm:text-sm' : 'text-sm'} font-body text-charcoal placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-sage/40 focus:border-sage`}
            placeholder="Last Name"
          />
        </div>
      </div>

      {/* Contact row */}
      <div className={isWizard ? wizardStyles.contactRow : 'grid grid-cols-2 gap-3'}>
        <div>
          <label htmlFor={id('phone')} className="block text-xs font-semibold text-charcoal font-body mb-1">
            {isWizard && <Phone size={14} aria-hidden="true" />} Phone <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            id={id('phone')}
            name="phone"
            autoComplete="tel"
            maxLength={leadLimits.phone}
            required
            className={`w-full px-3 py-2.5 rounded-lg border border-gray-200 ${isCondensed ? 'text-base sm:text-sm' : 'text-sm'} font-body text-charcoal placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-sage/40 focus:border-sage`}
            placeholder="(555) 555-5555"
          />
        </div>
        <div>
          <label htmlFor={id('email')} className="block text-xs font-semibold text-charcoal font-body mb-1">
            {isWizard && <Mail size={14} aria-hidden="true" />} Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id={id('email')}
            name="email"
            autoComplete="email"
            maxLength={leadLimits.email}
            required
            className={`w-full px-3 py-2.5 rounded-lg border border-gray-200 ${isCondensed ? 'text-base sm:text-sm' : 'text-sm'} font-body text-charcoal placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-sage/40 focus:border-sage`}
            placeholder="you@company.com"
          />
        </div>
      </div>

      {/* Facility + Frequency row */}
      {!isWizard && <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor={id('facilityType')} className="block text-xs font-semibold text-charcoal font-body mb-1">
            Type of Facility
          </label>
          <select
            id={id('facilityType')}
            name="facilityType"
            className={`w-full px-3 py-2.5 rounded-lg border border-gray-200 ${isCondensed ? 'text-base sm:text-sm' : 'text-sm'} font-body text-charcoal focus:outline-none focus:ring-2 focus:ring-sage/40 focus:border-sage bg-white`}
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
            className={`w-full px-3 py-2.5 rounded-lg border border-gray-200 ${isCondensed ? 'text-base sm:text-sm' : 'text-sm'} font-body text-charcoal focus:outline-none focus:ring-2 focus:ring-sage/40 focus:border-sage bg-white`}
          >
            <option value="">Select...</option>
            {frequencyOptions.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
      </div>}

      {/* Referral */}
      {variant === 'standard' && <div>
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
      </div>}

      {/* Message */}
      <div>
        <label htmlFor={id('message')} className="block text-xs font-semibold text-charcoal font-body mb-1">
          {isCondensed ? 'Company, facility city, and cleaning needs (optional)' : 'Questions / Comments'}
        </label>
        <textarea
          id={id('message')}
          name="message"
          maxLength={leadLimits.message}
          rows={isCondensed ? 2 : 3}
          className={`w-full px-3 py-2.5 rounded-lg border border-gray-200 ${isCondensed ? 'text-base sm:text-sm' : 'text-sm'} font-body text-charcoal placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-sage/40 focus:border-sage resize-none`}
          placeholder={isCondensed ? 'Company, city, and what you need cleaned' : 'Tell us about your facility...'}
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
        className={`w-full ${isWizard ? wizardStyles.submit : ''} ${isCondensed ? 'bg-forest hover:bg-forest/90' : 'bg-sage hover:bg-sage-dark'} text-white font-bold py-3 px-6 rounded-lg font-body text-sm transition-colors flex items-center justify-center gap-2 disabled:opacity-70`}
      >
        {status === 'loading' ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Submitting...
          </>
        ) : (
          <>
            {isWizard ? 'Send quote request' : 'Get Your Free Quote'}
            <ArrowRight className="w-4 h-4" />
          </>
        )}
      </button>

      <p className={`${isCondensed ? 'text-xs text-charcoal-light' : 'text-[11px] text-gray-400'} font-body text-center leading-snug`}>
        By submitting, you ask Rangel Janitorial to contact you about this quote.
        See our <Link href="/privacy-policy" className="underline">privacy policy</Link> for how we handle your information.
      </p>
      </fieldset>
    </form>
  );
}
