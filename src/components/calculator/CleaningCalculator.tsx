'use client';

import { useEffect, useId, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Calculator, Check, ChevronDown, ClipboardCheck, Mail, Ruler } from 'lucide-react';
import LeadForm from '@/components/forms/LeadForm';
import regions from '@/data/regions.json';
import {
  CLEANING_INDUSTRIES, CLEANING_PACKAGES, CLEANING_TASKS,
  normalizeCleaningEstimateInput,
  type CleaningIndustry, type CleaningPackage, type CleaningTaskId, type CleaningEstimateInput,
} from '@/lib/cleaning-estimate';
import styles from './CleaningCalculator.module.css';
import { useCleaningEstimate } from './useCleaningEstimate';

const money = (amount: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);

interface CleaningCalculatorProps {
  regionSlug?: string;
  sourcePage: string;
  variant?: 'site' | 'landing';
}

/** The same estimate and request flow is shared by the website and paid landing pages. */
export default function CleaningCalculator({ regionSlug, sourcePage, variant = 'site' }: CleaningCalculatorProps) {
  const id = useId();
  const [industry, setIndustry] = useState<CleaningIndustry>('Office');
  const [squareFootage, setSquareFootage] = useState('10000');
  const [daysPerWeek, setDaysPerWeek] = useState(5);
  const [tasks, setTasks] = useState<CleaningTaskId[]>([]);
  const [selectedPackage, setSelectedPackage] = useState<CleaningPackage>('standard');
  const [office, setOffice] = useState(regionSlug || '');
  const [contactOpen, setContactOpen] = useState(false);
  const [requestDraft, setRequestDraft] = useState<{ input: CleaningEstimateInput; office: string; pricingVersion: string } | null>(null);
  const [deliveryLocked, setDeliveryLocked] = useState(false);
  const section = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  const contactHeading = useRef<HTMLHeadingElement>(null);
  const estimateHeading = useRef<HTMLHeadingElement>(null);
  const validation = normalizeCleaningEstimateInput({ industry, squareFootage: Number(squareFootage), daysPerWeek, tasks, package: selectedPackage });
  const input = validation.success ? validation.data : null;
  const { estimate, pricingVersion, loading, error: estimateError, refresh } = useCleaningEstimate(input);
  const selected = estimate?.packages[selectedPackage];
  const selectedLabel = CLEANING_PACKAGES.find(entry => entry.id === selectedPackage)!.label;
  const region = regions.find(entry => entry.slug === office);
  const requestRegion = regions.find(entry => entry.slug === requestDraft?.office);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting));
    if (section.current) observer.observe(section.current);
    return () => observer.disconnect();
  }, []);

  function openContact() {
    if (!input || !region || !estimate || !pricingVersion) return;
    setRequestDraft({ input, office, pricingVersion });
    setContactOpen(true);
    requestAnimationFrame(() => {
      contactHeading.current?.scrollIntoView({ block: 'start', behavior: 'instant' });
      contactHeading.current?.focus({ preventScroll: true });
    });
  }

  function editEstimate() {
    if (deliveryLocked) return;
    setContactOpen(false);
    refresh();
    requestAnimationFrame(() => {
      estimateHeading.current?.scrollIntoView({ block: 'start', behavior: 'instant' });
      estimateHeading.current?.focus({ preventScroll: true });
    });
  }

  return (
    <section ref={section} id="cleaning-calculator" data-in-view={inView} aria-labelledby={`${id}-title`} className={`${styles.section} ${variant === 'landing' ? styles.landing : ''}`}>
      <div className={styles.container}>
        <div className={styles.intro}>
          <div className={styles.titleIcon}><Calculator size={25} strokeWidth={1.6} aria-hidden="true" /></div>
          <div>
            <h2 id={`${id}-title`} ref={estimateHeading} tabIndex={-1}>Know your cleaning budget.</h2>
            <p>Start with your space and schedule. Compare estimates instantly, then send your details to our team for a personal quote.</p>
          </div>
        </div>

        <div className={styles.calculator}>
          <fieldset disabled={contactOpen} className={styles.inputs}>
            <legend className="sr-only">Your cleaning estimate details</legend>
            <div className={styles.inputHeading}><BuildingOutline /><h3>Tell us about your space</h3></div>
            <div className={styles.field}>
              <label htmlFor={`${id}-industry`}>Industry type</label>
              <select id={`${id}-industry`} value={industry} onChange={event => setIndustry(event.target.value as CleaningIndustry)}>
                {CLEANING_INDUSTRIES.map(entry => <option key={entry.id} value={entry.id}>{entry.label}</option>)}
              </select>
            </div>
            <div className={styles.field}>
              <label htmlFor={`${id}-footage`}>Square footage</label>
              <div className={styles.areaInput}>
                <input id={`${id}-footage`} type="number" inputMode="numeric" min="1" max="1000000" step="1" value={squareFootage} onChange={event => setSquareFootage(event.target.value)} aria-invalid={!input} aria-describedby={`${id}-area-help`} />
                <span aria-hidden="true">sq ft</span>
              </div>
              <p id={`${id}-area-help`} className={!input ? styles.error : styles.hint}>{!input ? 'Enter a square footage from 1 to 1,000,000.' : 'An approximate size is a good place to start.'}</p>
            </div>
            <fieldset className={styles.frequency}>
              <legend>Days per week</legend>
              <div className={styles.dayChoices}>
                {[1, 2, 3, 4, 5, 6, 7].map(day => <label key={day}>
                  <input type="radio" name={`${id}-days`} aria-label={`${day} ${day === 1 ? 'day' : 'days'} per week`} value={day} checked={daysPerWeek === day} onChange={() => setDaysPerWeek(day)} />
                  <span>{day}<span className="sr-only"> {day === 1 ? 'day' : 'days'} per week</span></span>
                </label>)}
              </div>
              <p className={styles.hint}>Choose how often you’d like us to visit.</p>
            </fieldset>
            {!regionSlug && <div className={styles.field}>
              <label htmlFor={`${id}-office`}>Your local office</label>
              <select id={`${id}-office`} value={office} onChange={event => setOffice(event.target.value)}>
                <option value="">Choose your service area</option>
                {regions.map(entry => <option key={entry.slug} value={entry.slug}>{entry.name}</option>)}
              </select>
            </div>}
            <details className={styles.tasks}>
              <summary><span><ClipboardCheck size={18} aria-hidden="true" />Add specific tasks <span className={styles.taskCount}>{tasks.length ? `${tasks.length} selected` : 'Optional'}</span></span><ChevronDown size={17} aria-hidden="true" /></summary>
              <p>Each selected task adds about 10 minutes per visit to every package estimate.</p>
              <div className={styles.taskChoices}>
                {CLEANING_TASKS.map(task => <label key={task.id}>
                  <input type="checkbox" checked={tasks.includes(task.id)} onChange={event => setTasks(current => event.target.checked ? [...current, task.id] : current.filter(entry => entry !== task.id))} />
                  <span>{task.label}</span>
                </label>)}
              </div>
            </details>
          </fieldset>

          <div className={styles.result} aria-busy={loading}>
            <div className={styles.resultHeading}><span className={styles.liveDot} aria-hidden="true" /><h3>Your monthly estimate</h3></div>
            <div aria-live="polite" aria-atomic="true" className={styles.total}>
              <span>{selected ? money(selected.monthlyCost) : '—'}</span>
              <span className={styles.period}>per month · {selectedLabel}</span>
            </div>
            {loading && <p className={styles.quoteStatus}>Calculating your estimate…</p>}
            {estimateError && <div className={styles.quoteError} role="alert">
              <p>Your estimate couldn’t be calculated. Try again, or contact your local office for a quote.</p>
              <button type="button" onClick={refresh}>Try again</button>
            </div>}
            <fieldset disabled={contactOpen || !estimate} className={styles.packages}>
              <legend>Compare packages</legend>
              {CLEANING_PACKAGES.map(entry => <label key={entry.id} className={selectedPackage === entry.id ? styles.selectedPackage : ''}>
                <input type="radio" name={`${id}-package`} aria-label={`${entry.label} ${estimate ? money(estimate.packages[entry.id].costPerVisit) : 'unavailable'} per visit`} value={entry.id} checked={selectedPackage === entry.id} onChange={() => setSelectedPackage(entry.id)} />
                <span className={styles.packageName}>{entry.label}</span>
                <span className={styles.packagePrice}>{estimate ? money(estimate.packages[entry.id].costPerVisit) : '—'}<small>per visit</small></span>
              </label>)}
            </fieldset>
            <dl className={styles.breakdown}>
              <div><dt>Time per visit</dt><dd>{estimate ? `${Number(estimate.hoursPerVisit.toFixed(2))} hours` : '—'}</dd></div>
              <div><dt>Estimated visits per month</dt><dd>{estimate?.visitsPerMonth ?? '—'}</dd></div>
            </dl>
            <p className={styles.estimateNote}>For planning purposes. Final pricing and package scope are confirmed after a walkthrough of your facility.</p>
            {!contactOpen ? <>
              <button type="button" onClick={openContact} disabled={!input || !region || !estimate || !pricingVersion} className={styles.sendButton}>Send my estimate <ArrowRight size={18} aria-hidden="true" /></button>
              <p className={styles.sendHint}>{!region ? 'Choose your local office to send your estimate.' : <><Check size={14} aria-hidden="true" />No obligation. Your details go to our {region.city} team.</>}</p>
            </> : <p className={styles.continueHint}><Mail size={18} aria-hidden="true" />Add your contact details below to send this estimate.</p>}
          </div>
        </div>

        {requestDraft && <div hidden={!contactOpen} className={styles.contact}>
          <div className={styles.contactIntro}>
            <h3 ref={contactHeading} tabIndex={-1}>Let’s make it your cleaning plan.</h3>
            <p>Your {CLEANING_PACKAGES.find(entry => entry.id === requestDraft.input.package)!.label.toLowerCase()} estimate, {requestDraft.input.squareFootage.toLocaleString('en-US')} sq ft, {requestDraft.input.daysPerWeek} {requestDraft.input.daysPerWeek === 1 ? 'day' : 'days'} per week, and {requestDraft.input.tasks.length} selected {requestDraft.input.tasks.length === 1 ? 'task' : 'tasks'} will be included.</p>
            <p className={styles.contactOffice}><Check size={16} aria-hidden="true" />For our {requestRegion?.city} team</p>
            <button type="button" onClick={editEstimate} disabled={deliveryLocked} className={styles.editButton}><ArrowLeft size={15} aria-hidden="true" />Edit estimate</button>
          </div>
          <div className={styles.contactForm}>
            <LeadForm regionSlug={requestDraft.office} sourcePage={sourcePage} variant="compact" formPlacement="bottom" cleaningEstimate={requestDraft.input} cleaningEstimateVersion={requestDraft.pricingVersion} onSubmissionLockedChange={setDeliveryLocked} />
          </div>
        </div>}
        <noscript><p className={styles.hint}>Enable JavaScript to use the calculator, or <Link href="/locations">contact your local Rangel office</Link> for a free quote.</p></noscript>
      </div>
    </section>
  );
}

function BuildingOutline() {
  return <Ruler size={19} strokeWidth={1.6} aria-hidden="true" />;
}
