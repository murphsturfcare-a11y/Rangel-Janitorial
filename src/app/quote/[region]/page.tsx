import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, Check, ClipboardCheck, Clock3, MessageCircle, Phone, UsersRound } from 'lucide-react';
import { QuoteWizardButton, QuoteWizardProvider } from '@/components/quote/QuoteWizard';
import QuotePrivacySettings from '@/components/quote/QuotePrivacySettings';
import business from '@/data/business.json';
import regions from '@/data/regions.json';
import { generatePageMetadata } from '@/lib/seo/metadata';

type QuotePageProps = { params: Promise<{ region: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return regions.map((region) => ({ region: region.slug }));
}

function getRegion(slug: string) {
  const region = regions.find((entry) => entry.slug === slug);
  if (!region) notFound();
  return region;
}

export async function generateMetadata({ params }: QuotePageProps): Promise<Metadata> {
  const region = getRegion((await params).region);
  return {
    ...generatePageMetadata(
      `Commercial Cleaning in ${region.city} | Free Walkthrough`,
      `Accountable commercial cleaning for professional facilities in ${region.name}. Request a free 20-minute walkthrough or call ${region.phone}.`,
      `/quote/${region.slug}`,
    ),
    robots: { index: false, follow: true, googleBot: { index: false, follow: true } },
  };
}

const cleaningScope = [
  { title: 'Offices & common areas', detail: 'Workspaces, meeting rooms and lobbies.' },
  { title: 'Restrooms & break rooms', detail: 'Cleaning, restocking and trash removal.' },
  { title: 'Floors & ongoing upkeep', detail: 'Floor care and a cleaning schedule suited to your facility.' },
];

const reasonsToSwitch = [
  {
    icon: ClipboardCheck,
    title: 'Consistent quality. Daily accountability.',
    detail: 'Documented checklists, supervisor inspections and measurable quality scores. Photo-verified inspections help us address issues before they reach your desk.',
  },
  {
    icon: MessageCircle,
    title: 'Communication you can count on.',
    detail: 'A real point of contact, proactive updates and fast response times. You stay informed without constant follow-up.',
  },
  {
    icon: UsersRound,
    title: 'Reliable, trained staff.',
    detail: 'Trained primary crews supported by backup coverage, so your facility has a team it can depend on.',
  },
];

const focusStyle = 'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-forest';

export default async function QuotePage({ params }: QuotePageProps) {
  const region = getRegion((await params).region);
  const faqs = [
    {
      question: 'What happens during the free walkthrough?',
      answer: 'We discuss your facility, the areas that need attention and your preferred cleaning schedule. The walkthrough takes 20 minutes and carries no obligation. Your facility size, scope and cleaning frequency help determine your quote.',
    },
    {
      question: `Do you serve businesses outside ${region.city}?`,
      answer: `Our ${region.name} team serves ${region.region} communities. Include your facility’s city in your request so we can confirm service for your address.`,
    },
    {
      question: 'What happens after I send my request?',
      answer: 'Our team responds the same business day to discuss your needs and arrange a walkthrough. We will confirm the appointment with you; submitting this form does not reserve a time or book a cleaning.',
    },
  ];

  return (
    <QuoteWizardProvider key={region.slug} regionSlug={region.slug}>
      <a href="#quote-form" className={`sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[60] focus:rounded-lg focus:bg-white focus:p-4 ${focusStyle}`}>
        Skip to walkthrough request
      </a>
      <header className="sticky top-0 z-40 border-b border-forest/10 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <Link href="/" aria-label={`${business.name} home`} className={`shrink-0 rounded ${focusStyle}`}>
            <Image src="/images/logo-small.webp" alt={business.name} width={480} height={235} priority className="h-12 w-auto sm:h-14" />
          </Link>
          <a href={region.phoneHref} className={`inline-flex min-h-11 items-center gap-2 rounded text-forest ${focusStyle}`}>
            <Phone className="hidden h-5 w-5 sm:block" aria-hidden="true" />
            <span className="text-right">
              <span className="block text-xs font-medium">Call our {region.city} team</span>
              <span className="block text-sm font-bold sm:text-base">{region.phone}</span>
            </span>
          </a>
        </div>
      </header>

      <main id="main-content" className="flex-1">
        <section aria-labelledby="quote-title" className="border-b border-forest/10 bg-cream">
          <div className="mx-auto grid max-w-6xl items-start gap-6 px-4 py-7 sm:px-6 sm:py-10 lg:grid-cols-[1fr_1fr] lg:gap-14 lg:px-8 lg:py-12">
            <div className="lg:py-8">
              <p className="mb-4 max-w-md text-xs leading-relaxed font-bold uppercase tracking-widest text-forest">Commercial cleaning for professional facilities</p>
              <h1 id="quote-title" className="font-heading text-3xl leading-tight font-extrabold text-charcoal sm:text-4xl lg:text-5xl">
                You don’t have a cleaning problem. <span className="mt-2 block text-forest">You have a reliability problem.</span>
              </h1>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-charcoal-light sm:text-lg">
                Missed details, poor communication and inconsistent crews create more work for your team. Rangel delivers accountable commercial cleaning across Northern &amp; Southern California.
              </p>
              <p className="mt-5 text-sm font-semibold text-forest">Serving {region.city} &amp; surrounding communities</p>
            </div>
            <section id="quote-form" tabIndex={-1} aria-labelledby="quote-form-label" className="scroll-mt-24 rounded-2xl border border-forest/15 bg-white p-6 shadow-[0_12px_40px_rgba(45,80,22,0.08)] outline-forest sm:p-8 lg:my-8">
              <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-forest"><Clock3 className="h-4 w-4" aria-hidden="true" />Free 20-minute walkthrough</p>
              <h2 id="quote-form-label" className="mt-3 font-heading text-2xl font-bold text-charcoal sm:text-3xl">Book your free walkthrough.</h2>
              <p className="mt-4 hidden text-base leading-relaxed text-charcoal-light sm:block">Choose your facility type and cleaning frequency, then tell us how to reach you.</p>
              <ol className="my-6 hidden space-y-3 text-sm font-medium text-charcoal sm:block">
                {['Your facility', 'Your cleaning schedule', 'Your contact details'].map((step, index) => <li key={step} className="flex items-center gap-3"><span aria-hidden="true" className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-forest/10 text-xs font-bold text-forest">{index + 1}</span>{step}</li>)}
              </ol>
              <QuoteWizardButton className={`mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-forest px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-forest/90 sm:mt-0 sm:text-base ${focusStyle}`}>
                Request my free walkthrough <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
              </QuoteWizardButton>
              <p className="mt-3 text-center text-xs leading-relaxed text-charcoal-light">No obligation · Response same business day</p>
              <p className="mt-2 text-center text-xs leading-relaxed text-charcoal-light">We’ll contact you to confirm a walkthrough time.</p>
            </section>
          </div>
        </section>

        <section aria-labelledby="reasons-title" className="bg-white">
          <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
            <p className="mb-3 text-xs font-bold uppercase tracking-widest text-forest">3 reasons to switch to Rangel</p>
            <h2 id="reasons-title" className="max-w-2xl font-heading text-2xl font-bold text-charcoal sm:text-3xl">A cleaning company that reduces work instead of creating more of it.</h2>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-charcoal-light">When communication disappears and quality changes from shift to shift, your team becomes the cleaning company’s account manager. Rangel replaces that uncertainty with a documented system.</p>
            <ol className="mt-8 grid gap-7 sm:grid-cols-3">
              {reasonsToSwitch.map(({ icon: Icon, title, detail }, index) => (
                <li key={title} className="border-t-2 border-forest/20 pt-5">
                  <div className="mb-4 flex items-center justify-between text-forest"><Icon className="h-7 w-7" strokeWidth={1.6} aria-hidden="true" /><span className="text-xs font-bold" aria-hidden="true">0{index + 1}</span></div>
                  <h3 className="font-heading text-lg font-bold text-charcoal">{title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-charcoal-light">{detail}</p>
                </li>
              ))}
            </ol>
            <p className="mt-9 border-t border-forest/10 pt-7 font-heading text-xl leading-relaxed font-bold text-forest sm:text-2xl">We show up. We follow through. We handle it.</p>
          </div>
        </section>

        <section aria-labelledby="scope-title" className="border-t border-forest/10 bg-white">
          <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
            <h2 id="scope-title" className="font-heading text-2xl font-bold text-charcoal sm:text-3xl">Cleaning systems built around your facility</h2>
            <ul className="mt-7 grid gap-6 sm:grid-cols-3">
              {cleaningScope.map((item) => (
                <li key={item.title} className="flex items-start gap-3">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-forest" aria-hidden="true" />
                  <div><h3 className="font-heading text-base font-bold text-charcoal">{item.title}</h3><p className="mt-2 text-sm leading-relaxed text-charcoal-light">{item.detail}</p></div>
                </li>
              ))}
            </ul>
            <div className="mt-10 grid items-center gap-7 border-t border-forest/10 pt-10 sm:grid-cols-[2fr_3fr] sm:gap-10">
              <figure>
                <div className="relative aspect-[5/4] overflow-hidden rounded-xl">
                  <Image src="/images/gallery/our-work/rangel-21-6941b0a10041dc7c1a15ddbd.png" alt="Rangel crew members cleaning a break-room table and countertop" fill sizes="(min-width: 640px) 400px, calc(100vw - 32px)" className="object-cover" />
                </div>
                <figcaption className="mt-2 text-xs text-charcoal-light">A look at our crew’s work.</figcaption>
              </figure>
              <div>
                <h3 className="font-heading text-xl font-bold text-charcoal sm:text-2xl">Your facility. Your priorities. A clear plan.</h3>
                <p className="mt-4 text-base leading-relaxed text-charcoal-light">We provide janitorial cleaning for offices and commercial facilities. Discuss the spaces, tasks and frequency you need with our {region.name} team.</p>
                <p className="mt-3 text-sm leading-relaxed text-charcoal-light">Need daytime upkeep or floor care? Include it in your request so it can be considered in your cleaning scope.</p>
              </div>
            </div>
          </div>
        </section>

        <section aria-labelledby="questions-title" className="border-y border-forest/10 bg-cream">
          <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
            <h2 id="questions-title" className="font-heading text-2xl font-bold text-charcoal sm:text-3xl">Before your walkthrough</h2>
            <div className="mt-6 divide-y divide-forest/15 border-y border-forest/15">
              {faqs.map((faq) => (
                <details key={faq.question} className="group py-1">
                  <summary className={`cursor-pointer rounded py-4 pr-2 text-base leading-relaxed font-semibold text-charcoal ${focusStyle}`}>{faq.question}</summary>
                  <p className="pb-5 text-sm leading-relaxed text-charcoal-light">{faq.answer}</p>
                </details>
              ))}
            </div>
            <QuoteWizardButton className={`mt-7 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-forest px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-forest-dark sm:w-auto ${focusStyle}`}>
              Request my free walkthrough <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
            </QuoteWizardButton>
          </div>
        </section>
      </main>

      <footer className="bg-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-6 text-xs text-charcoal-light sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>© {business.name}</p>
          <nav aria-label="Legal" className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <Link href="/privacy-policy" className={`inline-flex min-h-11 items-center underline underline-offset-4 ${focusStyle}`}>Privacy policy</Link>
            <Link href="/terms-of-service" className={`inline-flex min-h-11 items-center underline underline-offset-4 ${focusStyle}`}>Terms of service</Link>
            <QuotePrivacySettings />
          </nav>
        </div>
      </footer>
    </QuoteWizardProvider>
  );
}
