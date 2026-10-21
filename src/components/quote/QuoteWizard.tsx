'use client';

import { createContext, useContext, useEffect, useId, useRef, useState, type ReactNode } from 'react';
import { Sparkles, X } from 'lucide-react';
import LeadForm, { type LeadFormHandle } from '@/components/forms/LeadForm';
import regions from '@/data/regions.json';
import styles from './QuoteWizard.module.css';

interface WizardContextValue {
  dialogId: string;
  isOpen: boolean;
  open: (trigger: HTMLButtonElement, options?: { facilityType?: string; showFacilities?: boolean }) => void;
}

const WizardContext = createContext<WizardContextValue | null>(null);

export function QuoteWizardProvider({ regionSlug, children }: { regionSlug: string; children: ReactNode }) {
  const id = useId();
  const dialogId = `${id}-quote-dialog`;
  const titleId = `${id}-quote-title`;
  const dialog = useRef<HTMLDialogElement>(null);
  const leadForm = useRef<LeadFormHandle>(null);
  const trigger = useRef<HTMLButtonElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const region = regions.find(entry => entry.slug === regionSlug);

  useEffect(() => {
    if (!isOpen) return;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = overflow; };
  }, [isOpen]);

  function open(button: HTMLButtonElement, options?: { facilityType?: string; showFacilities?: boolean }) {
    if (!dialog.current || dialog.current.open) return;
    trigger.current = button;
    dialog.current.showModal();
    if (options?.showFacilities) leadForm.current?.showFacilities();
    else if (options?.facilityType) leadForm.current?.selectFacility(options.facilityType);
    setIsOpen(true);
    const target = Array.from(dialog.current.querySelectorAll<HTMLElement>('[role="status"], [role="alert"]')).find(element => !element.closest('[hidden]'))
      || dialog.current.querySelector<HTMLElement>('[data-wizard-heading]')
      || dialog.current.querySelector<HTMLElement>('h2');
    target?.focus();
  }

  function closed() {
    setIsOpen(false);
    trigger.current?.focus();
  }

  return (
    <WizardContext.Provider value={{ dialogId, isOpen, open }}>
      {children}
      <dialog
        ref={dialog}
        id={dialogId}
        aria-labelledby={titleId}
        onClose={closed}
        onKeyDown={(event) => {
          if (event.key !== 'Tab') return;
          const controls = Array.from(event.currentTarget.querySelectorAll<HTMLElement>('button, a[href], input:not([type="hidden"]), select, textarea, [tabindex]'))
            .filter(element => element.tabIndex >= 0 && !element.matches(':disabled') && !element.closest('[hidden]'));
          const first = controls[0];
          const last = controls[controls.length - 1];
          if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last?.focus();
          } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first?.focus();
          }
        }}
        onClick={(event) => {
          if (event.target !== event.currentTarget) return;
          const bounds = event.currentTarget.getBoundingClientRect();
          if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) {
            event.currentTarget.close();
          }
        }}
        className={`${styles.dialog} fixed inset-0 m-auto max-h-[calc(100dvh-1.5rem)] w-[calc(100%-1.5rem)] max-w-2xl overflow-y-auto overscroll-contain rounded-2xl bg-white p-0 text-charcoal`}
      >
        <div className={`${styles.header} sticky top-0 z-10 flex items-center justify-between gap-3 border-b border-forest/10 px-5 py-3 sm:px-8`}>
          <div className="flex items-center gap-3">
            <Sparkles className="h-6 w-6 shrink-0 text-forest" strokeWidth={1.6} aria-hidden="true" />
            <div><h2 id={titleId} tabIndex={-1} className="font-heading text-sm font-bold outline-none">Your free walkthrough</h2><p className="mt-1 text-xs text-charcoal-light">Rangel Janitorial{region ? ` · ${region.city}` : ''}</p></div>
          </div>
          <button
            type="button"
            aria-label="Close quote wizard"
            onClick={() => dialog.current?.close()}
            className="flex min-h-11 min-w-11 items-center justify-center rounded-full border border-forest/10 bg-white text-charcoal-light transition-colors hover:bg-forest/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
        <LeadForm ref={leadForm} regionSlug={regionSlug} sourcePage={`/quote/${regionSlug}`} formPlacement="hero" variant="wizard" requestType="walkthrough" />
      </dialog>
    </WizardContext.Provider>
  );
}

export function QuoteWizardButton({ children, className, facilityType, showFacilities }: { children: ReactNode; className?: string; facilityType?: string; showFacilities?: boolean }) {
  const wizard = useContext(WizardContext);
  if (!wizard) throw new Error('QuoteWizardButton requires QuoteWizardProvider');

  return (
    <button type="button" className={className} aria-haspopup="dialog" aria-controls={wizard.dialogId} aria-expanded={wizard.isOpen} onClick={(event) => wizard.open(event.currentTarget, { facilityType, showFacilities })}>
      {children}
    </button>
  );
}
