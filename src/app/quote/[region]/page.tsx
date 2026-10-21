import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, Building2, Check, CheckCheck, ChevronRight, ClipboardCheck, Clock3, MapPin, MessageCircle, Phone, Stethoscope, UsersRound, Warehouse } from 'lucide-react';
import { QuoteWizardButton, QuoteWizardProvider } from '@/components/quote/QuoteWizard';
import QuotePrivacySettings from '@/components/quote/QuotePrivacySettings';
import WebsiteCallLink from '@/components/analytics/WebsiteCallLink';
import business from '@/data/business.json';
import regions from '@/data/regions.json';
import { generatePageMetadata } from '@/lib/seo/metadata';
import styles from './quote.module.css';

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

const facilityStarters = [
  { label: 'Office Building', icon: Building2 },
  { label: 'Medical / Dental', icon: Stethoscope },
  { label: 'Industrial / Warehouse', icon: Warehouse },
];

// Ralph's supplied landing-page copy, with spelling and punctuation corrected.
const reasonsToSwitch = [
  { icon: CheckCheck, copy: 'We are a cleaning company that reduces work, not one that creates more of it.' },
  { icon: ClipboardCheck, copy: 'We accept accountability daily so your facility stays clean without constant follow-up.' },
  { icon: UsersRound, copy: 'Reliable, trained staff.' },
];

const accountability = [
  { problem: 'Inconsistent quality', solution: 'Documented checklists, supervisor inspections and measurable quality scores.' },
  { problem: 'Missed communication', solution: 'A real point of contact, proactive updates and fast response times.' },
  { problem: 'Unreliable staffing', solution: 'Trained primary crews supported by backup coverage.' },
  { problem: 'Problems discovered too late', solution: 'Photo-verified inspections and issues addressed before they reach your desk.' },
];

const cleaningScope = [
  { title: 'Offices & common areas', detail: 'Workspaces, meeting rooms and lobbies.' },
  { title: 'Restrooms & break rooms', detail: 'Cleaning, restocking and trash removal.' },
  { title: 'Floors & ongoing upkeep', detail: 'Floor care and a cleaning schedule suited to your facility.' },
];

function WalkthroughButton() {
  return <QuoteWizardButton className={styles.primaryButton}>Book your free walkthrough today <ArrowRight size={18} aria-hidden="true" /></QuoteWizardButton>;
}

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
      <div className={styles.page}>
        <a href="#quote-form" className={styles.skipLink}>Skip to walkthrough request</a>
        <header className={styles.header}>
          <div className={`${styles.container} ${styles.headerInner}`}>
            <Link href="/" aria-label={`${business.name} home`} className={styles.logo}>
              <Image src="/images/logo-small.webp" alt={business.name} width={480} height={235} priority />
            </Link>
            <div className={styles.headerActions}>
              <WebsiteCallLink regionSlug={region.slug} className={styles.phone} label={`Call our ${region.city} team`} labelClassName={styles.phoneLabel} numberClassName={styles.phoneNumber}>
                <span className={styles.phoneIcon}><Phone size={19} aria-hidden="true" /></span>
              </WebsiteCallLink>
              <QuoteWizardButton className={styles.headerButton}>Free walkthrough <ArrowRight size={16} aria-hidden="true" /></QuoteWizardButton>
            </div>
          </div>
        </header>

        <main id="main-content">
          <section aria-labelledby="quote-title" className={styles.hero}>
            <div className={`${styles.container} ${styles.heroGrid}`}>
              <div className={styles.heroCopy}>
                <p className={styles.region}><MapPin size={15} aria-hidden="true" />Serving {region.city} &amp; surrounding communities</p>
                <p className={styles.eyebrow}>Commercial cleaning for professional facilities</p>
                <h1 id="quote-title">You don’t have a cleaning problem. <span>You have a reliability problem.</span></h1>
                <p className={styles.intro}>Missed details, poor communication and inconsistent crews create more work for your team. Rangel delivers accountable commercial cleaning across Northern &amp; Southern California.</p>
                <WalkthroughButton />
                <ul className={styles.assurance} aria-label="Your walkthrough offer">
                  <li><Clock3 size={15} aria-hidden="true" />Free 20-minute walkthrough</li>
                  <li><Check size={15} aria-hidden="true" />No obligation</li>
                  <li><MessageCircle size={15} aria-hidden="true" />Response same business day</li>
                </ul>
              </div>
              <section id="quote-form" tabIndex={-1} aria-labelledby="quote-form-label" className={styles.entryCard}>
                <div className={styles.entryIntro}><span className={styles.entryStep}>01</span><p>YOUR FREE WALKTHROUGH<span>Facility <ChevronRight size={12} aria-hidden="true" /> Schedule <ChevronRight size={12} aria-hidden="true" /> Contact</span></p></div>
                <div className={styles.entryBody}>
                  <h2 id="quote-form-label">Let’s start with your facility.</h2>
                  <p className={styles.entryHint}>What type of facility needs cleaning?</p>
                  <div className={styles.facilityStarters} role="group" aria-labelledby="quote-form-label">
                    {facilityStarters.map(({ label, icon: Icon }) => <QuoteWizardButton key={label} facilityType={label} className={styles.facilityButton}>
                      <Icon size={25} strokeWidth={1.6} aria-hidden="true" /><span>{label}</span><ChevronRight className={styles.facilityArrow} size={16} aria-hidden="true" />
                    </QuoteWizardButton>)}
                    <QuoteWizardButton showFacilities className={`${styles.facilityButton} ${styles.allFacilities}`}><Building2 size={25} strokeWidth={1.6} aria-hidden="true" /><span>See all facility types</span><ChevronRight className={styles.facilityArrow} size={16} aria-hidden="true" /></QuoteWizardButton>
                  </div>
                  <p className={styles.entryNote}><Check size={15} aria-hidden="true" />Select your facility to continue. No commitment.</p>
                </div>
                <p className={styles.entryFoot}>We’ll contact you to confirm a walkthrough time.</p>
              </section>
            </div>
          </section>

          <section aria-labelledby="reasons-title" className={styles.reasons}>
            <div className={styles.container}>
              <p className={styles.eyebrow}>Why Rangel</p>
              <h2 id="reasons-title" className={styles.sectionTitle}>Top 3 reasons why you should switch to Rangel.</h2>
              <ol className={styles.reasonsGrid}>
                {reasonsToSwitch.map(({ icon: Icon, copy }, index) => <li key={copy}>
                  <div className={styles.reasonIcon}><Icon size={25} strokeWidth={1.6} aria-hidden="true" /><span aria-hidden="true">0{index + 1}</span></div>
                  <h3>{copy}</h3>
                </li>)}
              </ol>
            </div>
          </section>

          <section aria-labelledby="accountability-title" className={styles.accountability}>
            <div className={`${styles.container} ${styles.accountabilityGrid}`}>
              <figure className={styles.crewFigure}>
                <div className={styles.crewImage}><Image src="/images/gallery/our-work/rangel-21-6941b0a10041dc7c1a15ddbd.png" alt="Rangel crew members cleaning a break-room table and countertop" fill sizes="(min-width: 1100px) 450px, (min-width: 760px) 40vw, calc(100vw - 40px)" className={styles.crewPhoto} /></div>
                <figcaption><span className={styles.photoMark} aria-hidden="true"><CheckCheck size={21} /></span><span>We show up. We follow through. We handle it.</span></figcaption>
              </figure>
              <div>
                <p className={styles.eyebrow}>Daily accountability</p>
                <h2 id="accountability-title" className={styles.sectionTitle}>A documented system. Less follow-up.</h2>
                <p className={styles.bodyCopy}>When communication disappears and quality changes from shift to shift, your team becomes the cleaning company’s account manager. Rangel replaces that uncertainty with a documented system.</p>
                <dl className={styles.accountabilityList}>
                  {accountability.map(({ problem, solution }) => <div key={problem}><dt><Check size={17} aria-hidden="true" />{problem}</dt><dd>{solution}</dd></div>)}
                </dl>
              </div>
            </div>
          </section>

          <section aria-labelledby="scope-title" className={styles.scope}>
            <div className={styles.container}>
              <p className={styles.eyebrow}>Your facility. Your priorities.</p>
              <h2 id="scope-title" className={styles.sectionTitle}>Cleaning systems built around your facility.</h2>
              <ul className={styles.scopeGrid}>{cleaningScope.map(item => <li key={item.title}><Check size={21} aria-hidden="true" /><div><h3>{item.title}</h3><p>{item.detail}</p></div></li>)}</ul>
            </div>
          </section>

          <section aria-labelledby="questions-title" className={styles.questions}>
            <div className={`${styles.container} ${styles.questionsGrid}`}>
              <div><p className={styles.eyebrow}>A clear next step</p><h2 id="questions-title" className={styles.sectionTitle}>Before your walkthrough.</h2><p className={styles.bodyCopy}>Tell us about your facility. We’ll discuss the scope, schedule and priorities with you.</p></div>
              <div className={styles.faqs}>{faqs.map(faq => <details key={faq.question}><summary>{faq.question}<span className={styles.faqPlus} aria-hidden="true" /></summary><p>{faq.answer}</p></details>)}</div>
            </div>
          </section>

          <section aria-labelledby="final-title" className={styles.finalCta}>
            <div className={`${styles.container} ${styles.finalInner}`}>
              <div><p className={styles.eyebrow}>Commercial cleaning in {region.city}</p><h2 id="final-title">Book your free walkthrough today.</h2><p>Free 20-minute walkthrough · No obligation · Response same business day</p></div>
              <WalkthroughButton />
            </div>
          </section>
        </main>
        <footer className={styles.footer}>
          <div className={`${styles.container} ${styles.footerInner}`}>
            <p>© {business.name}</p>
            <nav aria-label="Legal"><Link href="/privacy-policy">Privacy policy</Link><Link href="/terms-of-service">Terms of service</Link><QuotePrivacySettings /></nav>
          </div>
        </footer>
        <div className={styles.mobileAction}><QuoteWizardButton className={styles.primaryButton}>Book my free walkthrough <ArrowRight size={17} aria-hidden="true" /></QuoteWizardButton></div>
      </div>
    </QuoteWizardProvider>
  );
}
