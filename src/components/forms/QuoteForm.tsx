'use client';

import { useState, type FormEvent } from 'react';
import { Loader2 } from 'lucide-react';

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

const SERVICE_OPTIONS = [
  'Lawn Cleaning',
  'Aeration',
  'Seeding',
  'Fertilization',
  'Pest Control',
  'Seasonal Maintenance',
] as const;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[\d\s()+-]{7,}$/;

export default function QuoteForm() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [serviceType, setServiceType] = useState('');
  const [propertyAddress, setPropertyAddress] = useState('');
  const [message, setMessage] = useState('');

  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  function validate(): boolean {
    const errors: Record<string, string> = {};

    if (!fullName.trim()) {
      errors.fullName = 'Full name is required.';
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
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: fullName.trim(),
          email: email.trim(),
          phone: phone.trim(),
          serviceType,
          propertyAddress: propertyAddress.trim(),
          message: message.trim(),
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to submit. Please try again.');
      }

      setStatus('success');
      setFullName('');
      setEmail('');
      setPhone('');
      setServiceType('');
      setPropertyAddress('');
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
        Get Your Free Quote
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
        {/* Full Name */}
        <div>
          <label htmlFor="quote-fullName" className="block font-medium text-charcoal mb-1 font-body">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            id="quote-fullName"
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className={inputClasses}
            placeholder="John Murphy"
          />
          {validationErrors.fullName && (
            <p className="mt-1 text-sm text-red-600 font-body">{validationErrors.fullName}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="quote-email" className="block font-medium text-charcoal mb-1 font-body">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            id="quote-email"
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
          <label htmlFor="quote-phone" className="block font-medium text-charcoal mb-1 font-body">
            Phone <span className="text-red-500">*</span>
          </label>
          <input
            id="quote-phone"
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

        {/* Service Type */}
        <div>
          <label htmlFor="quote-serviceType" className="block font-medium text-charcoal mb-1 font-body">
            Service Type
          </label>
          <select
            id="quote-serviceType"
            value={serviceType}
            onChange={(e) => setServiceType(e.target.value)}
            className={inputClasses}
          >
            <option value="">Select a service...</option>
            {SERVICE_OPTIONS.map((service) => (
              <option key={service} value={service}>
                {service}
              </option>
            ))}
          </select>
        </div>

        {/* Property Address */}
        <div>
          <label htmlFor="quote-address" className="block font-medium text-charcoal mb-1 font-body">
            Property Address
          </label>
          <input
            id="quote-address"
            type="text"
            value={propertyAddress}
            onChange={(e) => setPropertyAddress(e.target.value)}
            className={inputClasses}
            placeholder="123 Main St, Denver, CO"
          />
        </div>

        {/* Message */}
        <div>
          <label htmlFor="quote-message" className="block font-medium text-charcoal mb-1 font-body">
            Message <span className="text-charcoal-light text-sm">(optional)</span>
          </label>
          <textarea
            id="quote-message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
            className={inputClasses + ' resize-y'}
            placeholder="Tell us about your lawn care needs..."
          />
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
              Submitting...
            </>
          ) : (
            'Request Free Quote'
          )}
        </button>
      </div>
    </form>
  );
}
