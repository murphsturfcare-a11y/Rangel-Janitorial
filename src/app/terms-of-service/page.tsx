import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description:
    "Rangel Janitorial terms of service. Review the terms and conditions governing your use of our janitorial and commercial cleaning services in California.",
};

const sections = [
  { id: 'acceptance', title: '1. Acceptance of Terms' },
  { id: 'services-description', title: '2. Services Description' },
  { id: 'service-agreements', title: '3. Service Agreements and Scheduling' },
  { id: 'pricing-payment', title: '4. Pricing and Payment' },
  { id: 'cancellation', title: '5. Cancellation Policy' },
  { id: 'property-access', title: '6. Property Access and Liability' },
  { id: 'warranties', title: '7. Warranties and Guarantees' },
  { id: 'limitation-liability', title: '8. Limitation of Liability' },
  { id: 'indemnification', title: '9. Indemnification' },
  { id: 'force-majeure', title: '10. Force Majeure' },
  { id: 'governing-law', title: '11. Governing Law' },
  { id: 'dispute-resolution', title: '12. Dispute Resolution' },
  { id: 'changes', title: '13. Changes to Terms' },
  { id: 'contact', title: '14. Contact Information' },
];

export default function TermsOfServicePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-forest text-white py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold font-heading mb-4">
            Terms of Service
          </h1>
          <p className="text-sage-light font-body text-lg">
            Last updated: January 1, 2026
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Introduction */}
          <div className="mb-10">
            <p className="text-charcoal font-body text-base leading-relaxed mb-4">
              Welcome to Rangel Janitorial LLC (&quot;Rangel Janitorial,&quot; &quot;Company,&quot;
              &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;). These Terms of Service
              (&quot;Terms&quot;) govern your access to and use of our website, janitorial and commercial
              cleaning services, and any related offerings provided by Rangel Janitorial LLC, a
              California limited liability company. Please read these Terms carefully before using
              our services or accessing our website.
            </p>
            <p className="text-charcoal font-body text-base leading-relaxed">
              By accessing our website, requesting a quote, scheduling a service, or otherwise
              engaging with Rangel Janitorial LLC, you acknowledge that you have read, understood,
              and agree to be bound by these Terms. If you are entering into these Terms on behalf of
              a business or other legal entity, you represent that you have the authority to bind such
              entity to these Terms. If you do not agree to these Terms, you may not use our services.
            </p>
          </div>

          {/* Table of Contents */}
          <div className="bg-cream rounded-xl p-6 sm:p-8 mb-12 border border-cream-dark">
            <h2 className="text-xl font-bold font-heading text-forest mb-4">
              Table of Contents
            </h2>
            <nav>
              <ol className="space-y-2">
                {sections.map((section) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className="text-forest hover:text-sage font-body text-sm sm:text-base transition-colors underline underline-offset-2"
                    >
                      {section.title}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </div>

          {/* Terms Sections */}
          <div className="space-y-12">
            {/* Section 1 */}
            <div id="acceptance">
              <h2 className="text-2xl font-bold font-heading text-forest mb-4">
                1. Acceptance of Terms
              </h2>
              <p className="text-charcoal font-body text-base leading-relaxed mb-4">
                By using the Rangel Janitorial LLC website or engaging our services in any capacity,
                you agree to comply with and be bound by these Terms of Service, our{' '}
                <Link
                  href="/privacy-policy"
                  className="text-forest hover:text-sage underline underline-offset-2 transition-colors"
                >
                  Privacy Policy
                </Link>
                , and any additional terms and conditions that may apply to specific services or
                features offered by Rangel Janitorial LLC.
              </p>
              <p className="text-charcoal font-body text-base leading-relaxed mb-4">
                These Terms constitute a legally binding agreement between you and Rangel Janitorial
                LLC. You must be at least 18 years of age or the age of legal majority in your
                jurisdiction to enter into this agreement. By using our services, you represent and
                warrant that you meet this age requirement and have the legal capacity to enter into a
                binding contract.
              </p>
              <p className="text-charcoal font-body text-base leading-relaxed">
                If you do not agree to any provision of these Terms, you must immediately discontinue
                use of our website and services. Your continued use of our website or services
                following the posting of any changes to these Terms constitutes acceptance of those
                changes.
              </p>
            </div>

            {/* Section 2 */}
            <div id="services-description">
              <h2 className="text-2xl font-bold font-heading text-forest mb-4">
                2. Services Description
              </h2>
              <p className="text-charcoal font-body text-base leading-relaxed mb-4">
                Rangel Janitorial LLC provides professional janitorial and commercial cleaning services
                throughout the State of California. Our
                services include, but are not limited to:
              </p>
              <ul className="list-disc list-inside text-charcoal font-body text-base leading-relaxed mb-6 space-y-1 pl-4">
                <li>Daily and nightly janitorial cleaning</li>
                <li>Day porter services</li>
                <li>Electrostatic disinfection</li>
                <li>Floor care (VCT strip and wax, polishing)</li>
                <li>Commercial carpet cleaning</li>
                <li>Restroom sanitation and restocking</li>
                <li>Break room and common area cleaning</li>
                <li>Custom facility maintenance programs tailored to your building</li>
              </ul>
              <p className="text-charcoal font-body text-base leading-relaxed mb-4">
                The specific services to be provided will be outlined in a written quote or service
                agreement. Rangel Janitorial LLC reserves the right to modify, expand, or discontinue
                any of its service offerings at any time and at its sole discretion.
              </p>
              <p className="text-charcoal font-body text-base leading-relaxed">
                Service availability may vary based on geographic location, seasonal conditions, and
                demand. Rangel Janitorial LLC does not guarantee the availability of any particular
                service at any given time. We will make reasonable efforts to inform you in advance if
                a requested service is unavailable.
              </p>
            </div>

            {/* Section 3 */}
            <div id="service-agreements">
              <h2 className="text-2xl font-bold font-heading text-forest mb-4">
                3. Service Agreements and Scheduling
              </h2>
              <p className="text-charcoal font-body text-base leading-relaxed mb-4">
                All services provided by Rangel Janitorial LLC are subject to a service agreement or
                written quote accepted by the customer. Service agreements may cover one-time services
                or recurring maintenance programs.
              </p>

              <h3 className="text-lg font-semibold font-heading text-charcoal mb-2">
                Scheduling
              </h3>
              <p className="text-charcoal font-body text-base leading-relaxed mb-6">
                Rangel Janitorial LLC will work with you to schedule services at mutually convenient
                times. While we make every reasonable effort to adhere to agreed-upon schedules,
                service times may be adjusted due to weather conditions, equipment availability, crew
                scheduling, or other factors beyond our control. We will notify you as soon as
                practicable if a schedule change is necessary and will make reasonable efforts to
                reschedule at your earliest convenience.
              </p>

              <h3 className="text-lg font-semibold font-heading text-charcoal mb-2">
                Recurring Services
              </h3>
              <p className="text-charcoal font-body text-base leading-relaxed mb-6">
                Customers who enroll in recurring service programs agree to the frequency and scope of
                services outlined in their service agreement. Recurring service agreements will
                automatically continue until cancelled by either party in accordance with the
                cancellation provisions set forth in Section 5. Rangel Janitorial LLC reserves the
                right to adjust pricing for recurring services with 30 days&apos; written notice.
              </p>

              <h3 className="text-lg font-semibold font-heading text-charcoal mb-2">
                Customer Responsibilities
              </h3>
              <p className="text-charcoal font-body text-base leading-relaxed">
                You agree to ensure that our crew has safe and reasonable access to the service
                property on the scheduled date. This includes securing pets, removing obstacles from
                the work area, and notifying us of any hazardous conditions, underground utilities,
                sprinkler systems, or special considerations that may affect the delivery of services.
              </p>
            </div>

            {/* Section 4 */}
            <div id="pricing-payment">
              <h2 className="text-2xl font-bold font-heading text-forest mb-4">
                4. Pricing and Payment
              </h2>

              <h3 className="text-lg font-semibold font-heading text-charcoal mb-2">
                Quotes and Estimates
              </h3>
              <p className="text-charcoal font-body text-base leading-relaxed mb-6">
                All quotes and estimates provided by Rangel Janitorial LLC are valid for a period of
                thirty (30) days from the date of issuance, unless otherwise specified in writing.
                Quotes are based on the information provided by the customer and a visual assessment of
                the property. The final price may differ from the original quote if actual conditions
                differ materially from those described or observed at the time of the estimate.
                Rangel Janitorial LLC will communicate any price adjustments to you before proceeding
                with the service.
              </p>

              <h3 className="text-lg font-semibold font-heading text-charcoal mb-2">
                Payment Terms
              </h3>
              <p className="text-charcoal font-body text-base leading-relaxed mb-6">
                Payment is due upon completion of services unless alternative arrangements have been
                agreed upon in writing. For recurring service programs, invoices are issued on a
                monthly basis and are due within fifteen (15) days of the invoice date. Rangel
                Janitorial LLC accepts payment via credit card, debit card, ACH bank transfer, check, and
                cash.
              </p>

              <h3 className="text-lg font-semibold font-heading text-charcoal mb-2">
                Late Payments
              </h3>
              <p className="text-charcoal font-body text-base leading-relaxed mb-6">
                Invoices not paid within the specified payment period may be subject to a late fee of
                1.5% per month (18% annually) on the outstanding balance, or the maximum rate
                permitted by California law, whichever is less. Rangel Janitorial LLC reserves the
                right to suspend or terminate services for accounts with outstanding balances exceeding
                30 days past due.
              </p>

              <h3 className="text-lg font-semibold font-heading text-charcoal mb-2">
                Price Changes
              </h3>
              <p className="text-charcoal font-body text-base leading-relaxed">
                Rangel Janitorial LLC reserves the right to adjust its pricing at any time. For
                customers on recurring service agreements, we will provide at least 30 days&apos;
                written notice before any price increase takes effect. You may cancel your recurring
                service agreement without penalty if you do not agree to a price increase, provided
                you notify us in writing before the new pricing takes effect.
              </p>
            </div>

            {/* Section 5 */}
            <div id="cancellation">
              <h2 className="text-2xl font-bold font-heading text-forest mb-4">
                5. Cancellation Policy
              </h2>

              <h3 className="text-lg font-semibold font-heading text-charcoal mb-2">
                Cancellation by Customer
              </h3>
              <p className="text-charcoal font-body text-base leading-relaxed mb-6">
                You may cancel a scheduled service appointment at no charge by providing Rangel
                Janitorial LLC with at least twenty-four (24) hours&apos; advance notice before the
                scheduled service time. Cancellations made with less than 24 hours&apos; notice may be
                subject to a cancellation fee equal to 50% of the quoted service price, at Rangel
                Janitorial LLC&apos;s discretion, to cover crew scheduling and preparation costs.
              </p>

              <h3 className="text-lg font-semibold font-heading text-charcoal mb-2">
                Cancellation of Recurring Services
              </h3>
              <p className="text-charcoal font-body text-base leading-relaxed mb-6">
                Recurring service agreements may be cancelled by either party with 30 days&apos;
                written notice. Upon cancellation, you are responsible for payment of all services
                rendered prior to the effective cancellation date. No refunds will be issued for
                services already completed.
              </p>

              <h3 className="text-lg font-semibold font-heading text-charcoal mb-2">
                Cancellation by Rangel Janitorial LLC
              </h3>
              <p className="text-charcoal font-body text-base leading-relaxed mb-6">
                Rangel Janitorial LLC reserves the right to cancel or refuse service at its
                discretion for any reason, including but not limited to unsafe working conditions,
                hostile or abusive behavior toward our staff, fraudulent activity, or failure to comply
                with these Terms. In the event Rangel Janitorial LLC cancels a service, you will not
                be charged for the cancelled appointment, and any prepaid amounts for unperformed
                services will be refunded.
              </p>

              <h3 className="text-lg font-semibold font-heading text-charcoal mb-2">
                No-Show Policy
              </h3>
              <p className="text-charcoal font-body text-base leading-relaxed">
                If our crew arrives at the scheduled service location and is unable to perform the
                service due to locked gates, unleashed animals, or other access issues not
                communicated in advance, a service trip fee may apply. Rangel Janitorial LLC will
                make reasonable attempts to contact you before leaving the property.
              </p>
            </div>

            {/* Section 6 */}
            <div id="property-access">
              <h2 className="text-2xl font-bold font-heading text-forest mb-4">
                6. Property Access and Liability
              </h2>

              <h3 className="text-lg font-semibold font-heading text-charcoal mb-2">
                Property Access
              </h3>
              <p className="text-charcoal font-body text-base leading-relaxed mb-6">
                By scheduling services with Rangel Janitorial LLC, you grant us permission to access
                your property for the purpose of performing the agreed-upon services. This includes
                access to front and back yards, side yards, and any other areas specified in the
                service agreement. If a gate code, key, or other access method is required, you are
                responsible for providing this information in advance.
              </p>

              <h3 className="text-lg font-semibold font-heading text-charcoal mb-2">
                Pre-Existing Conditions
              </h3>
              <p className="text-charcoal font-body text-base leading-relaxed mb-6">
                You are responsible for notifying Rangel Janitorial LLC of any pre-existing
                conditions on the property that may affect our ability to perform services or that
                could pose a risk to our crew. This includes, but is not limited to, underground
                irrigation systems, invisible fences, utility lines, septic systems, sinkholes,
                uneven terrain, or areas prone to flooding. Rangel Janitorial LLC shall not be held
                liable for damage to undisclosed underground systems, structures, or features.
              </p>

              <h3 className="text-lg font-semibold font-heading text-charcoal mb-2">
                Property Damage
              </h3>
              <p className="text-charcoal font-body text-base leading-relaxed mb-6">
                Rangel Janitorial LLC carries comprehensive general liability insurance. If our crew
                causes damage to your property during the course of providing services, we will work
                with you to address the issue promptly and fairly. Claims for property damage must be
                reported to Rangel Janitorial LLC in writing within seven (7) business days of the
                service date. We will investigate all claims thoroughly and, where our liability is
                confirmed, arrange for appropriate repair or compensation.
              </p>

              <h3 className="text-lg font-semibold font-heading text-charcoal mb-2">
                Personal Injury
              </h3>
              <p className="text-charcoal font-body text-base leading-relaxed">
                Rangel Janitorial LLC maintains workers&apos; compensation insurance for all
                employees. You agree not to hold Rangel Janitorial LLC liable for any personal
                injuries sustained by you, your family members, guests, or pets as a result of being
                present in the work area during service delivery. We recommend that all persons and
                animals remain at a safe distance from active work zones.
              </p>
            </div>

            {/* Section 7 */}
            <div id="warranties">
              <h2 className="text-2xl font-bold font-heading text-forest mb-4">
                7. Warranties and Guarantees
              </h2>

              <h3 className="text-lg font-semibold font-heading text-charcoal mb-2">
                Satisfaction Guarantee
              </h3>
              <p className="text-charcoal font-body text-base leading-relaxed mb-6">
                Rangel Janitorial LLC stands behind the quality of our work. If you are not satisfied
                with the results of a service, please contact us within 48 hours of service
                completion. We will return to your property at no additional charge to re-perform the
                service or address your specific concerns. This satisfaction guarantee applies to the
                quality of workmanship and does not cover results affected by weather events, pest
                activity, disease, improper watering, or other factors outside our control following
                service delivery.
              </p>

              <h3 className="text-lg font-semibold font-heading text-charcoal mb-2">
                Service Warranty
              </h3>
              <p className="text-charcoal font-body text-base leading-relaxed mb-6">
                Specific services may carry additional warranties as outlined in your service
                agreement. For example, floor care services may include a finish durability guarantee
                subject to proper maintenance by the property owner or manager. The terms and duration
                of any service-specific warranties will be clearly communicated at the time of service.
              </p>

              <h3 className="text-lg font-semibold font-heading text-charcoal mb-2">
                Disclaimer
              </h3>
              <p className="text-charcoal font-body text-base leading-relaxed">
                Except as expressly stated in this section, all services are provided &quot;as is&quot;
                and Rangel Janitorial LLC makes no warranties, express or implied, including but not
                limited to implied warranties of merchantability and fitness for a particular purpose.
                Cleaning and janitorial outcomes may be influenced by factors beyond our control,
                including but not limited to facility condition, age of surfaces, tenant behavior,
                and pre-existing damage. Rangel Janitorial LLC does not guarantee specific aesthetic
                outcomes beyond the scope of the agreed-upon services.
              </p>
            </div>

            {/* Section 8 */}
            <div id="limitation-liability">
              <h2 className="text-2xl font-bold font-heading text-forest mb-4">
                8. Limitation of Liability
              </h2>
              <p className="text-charcoal font-body text-base leading-relaxed mb-4">
                To the maximum extent permitted by applicable law, Rangel Janitorial LLC, including
                its owners, officers, employees, agents, and affiliates, shall not be liable for any
                indirect, incidental, special, consequential, or punitive damages arising out of or
                related to your use of our services or this agreement, regardless of the cause of
                action or the theory of liability.
              </p>
              <p className="text-charcoal font-body text-base leading-relaxed mb-4">
                In no event shall the total aggregate liability of Rangel Janitorial LLC for all
                claims arising out of or related to a specific service exceed the total amount paid by
                you to Rangel Janitorial LLC for that particular service. This limitation applies to
                all causes of action in the aggregate, including but not limited to breach of
                contract, breach of warranty, negligence, strict liability, and other torts.
              </p>
              <p className="text-charcoal font-body text-base leading-relaxed">
                Some jurisdictions do not allow the exclusion or limitation of certain damages. If
                these laws apply to you, some or all of the above limitations may not apply, and you
                may have additional rights. Nothing in these Terms shall exclude or limit liability
                that cannot be lawfully excluded or limited under applicable California or federal law.
              </p>
            </div>

            {/* Section 9 */}
            <div id="indemnification">
              <h2 className="text-2xl font-bold font-heading text-forest mb-4">
                9. Indemnification
              </h2>
              <p className="text-charcoal font-body text-base leading-relaxed mb-4">
                You agree to indemnify, defend, and hold harmless Rangel Janitorial LLC and its
                owners, officers, directors, employees, contractors, agents, and affiliates from and
                against any and all claims, damages, losses, liabilities, costs, and expenses
                (including reasonable attorneys&apos; fees) arising out of or related to:
              </p>
              <ul className="list-disc list-inside text-charcoal font-body text-base leading-relaxed mb-4 space-y-1 pl-4">
                <li>Your breach of these Terms of Service</li>
                <li>Your violation of any applicable law or regulation</li>
                <li>
                  Your failure to disclose material property conditions, hazards, or access
                  restrictions that affect service delivery or crew safety
                </li>
                <li>
                  Any claims by third parties arising from services performed on your property at your
                  request
                </li>
                <li>
                  Any misrepresentation you make regarding your authority to authorize services on the
                  property
                </li>
              </ul>
              <p className="text-charcoal font-body text-base leading-relaxed">
                This indemnification obligation shall survive the termination of your service agreement
                and these Terms.
              </p>
            </div>

            {/* Section 10 */}
            <div id="force-majeure">
              <h2 className="text-2xl font-bold font-heading text-forest mb-4">
                10. Force Majeure
              </h2>
              <p className="text-charcoal font-body text-base leading-relaxed mb-4">
                Rangel Janitorial LLC shall not be liable for any failure or delay in performing its
                obligations under these Terms or any service agreement where such failure or delay
                results from circumstances beyond our reasonable control. Force majeure events include,
                but are not limited to:
              </p>
              <ul className="list-disc list-inside text-charcoal font-body text-base leading-relaxed mb-4 space-y-1 pl-4">
                <li>
                  Severe weather conditions, including but not limited to thunderstorms, hail,
                  tornadoes, blizzards, extreme heat, high winds, or flooding
                </li>
                <li>Natural disasters such as earthquakes, wildfires, or drought</li>
                <li>Pandemics, epidemics, or public health emergencies</li>
                <li>Government orders, regulations, or restrictions</li>
                <li>Civil unrest, labor disputes, or strikes</li>
                <li>Utility failures or interruptions</li>
                <li>Equipment failures caused by events outside our control</li>
                <li>Supply chain disruptions affecting materials necessary for service delivery</li>
              </ul>
              <p className="text-charcoal font-body text-base leading-relaxed">
                In the event of a force majeure occurrence, Rangel Janitorial LLC will make
                reasonable efforts to notify you promptly and to reschedule affected services at the
                earliest available opportunity. No cancellation fees or penalties shall apply to
                services postponed due to force majeure events.
              </p>
            </div>

            {/* Section 11 */}
            <div id="governing-law">
              <h2 className="text-2xl font-bold font-heading text-forest mb-4">
                11. Governing Law
              </h2>
              <p className="text-charcoal font-body text-base leading-relaxed mb-4">
                These Terms of Service and any dispute arising out of or related to them or the
                services provided by Rangel Janitorial LLC shall be governed by and construed in
                accordance with the laws of the State of California, without regard to its conflict of
                law provisions.
              </p>
              <p className="text-charcoal font-body text-base leading-relaxed">
                Any legal action or proceeding arising under these Terms shall be brought exclusively
                in the state or federal courts located in Riverside County, California, and you hereby
                consent to the personal jurisdiction and venue of such courts. You waive any objection
                to the laying of venue of any litigation arising out of these Terms in such courts and
                agree not to plead or claim that such litigation brought in any such court has been
                brought in an inconvenient forum.
              </p>
            </div>

            {/* Section 12 */}
            <div id="dispute-resolution">
              <h2 className="text-2xl font-bold font-heading text-forest mb-4">
                12. Dispute Resolution
              </h2>
              <p className="text-charcoal font-body text-base leading-relaxed mb-4">
                Rangel Janitorial LLC values its customers and is committed to resolving disputes
                promptly and fairly. In the event of a disagreement or dispute regarding our services,
                we encourage you to follow these steps:
              </p>

              <h3 className="text-lg font-semibold font-heading text-charcoal mb-2">
                Step 1: Direct Communication
              </h3>
              <p className="text-charcoal font-body text-base leading-relaxed mb-6">
                Please contact us directly by phone (find your{' '}
                <a
                  href="/locations"
                  className="text-forest hover:text-sage underline underline-offset-2 transition-colors"
                >
                  local office number
                </a>) or by email at{' '}
                <a
                  href="mailto:ralph@rangeljanitorial.com"
                  className="text-forest hover:text-sage underline underline-offset-2 transition-colors"
                >
                  ralph@rangeljanitorial.com
                </a>{' '}
                to discuss your concern. Many issues can be resolved quickly through open and honest
                communication. We aim to respond to all complaints within two (2) business days.
              </p>

              <h3 className="text-lg font-semibold font-heading text-charcoal mb-2">
                Step 2: Mediation
              </h3>
              <p className="text-charcoal font-body text-base leading-relaxed mb-6">
                If we are unable to resolve the dispute through direct communication within 30 days,
                either party may request non-binding mediation. Mediation shall be conducted by a
                mutually agreed-upon mediator in Murrieta, California. The costs of mediation shall be
                shared equally between the parties unless the mediator determines otherwise.
              </p>

              <h3 className="text-lg font-semibold font-heading text-charcoal mb-2">
                Step 3: Binding Arbitration
              </h3>
              <p className="text-charcoal font-body text-base leading-relaxed">
                If mediation does not resolve the dispute, either party may submit the matter to
                binding arbitration in accordance with the rules of the American Arbitration
                Association. Arbitration shall take place in Murrieta, California, and shall be conducted
                by a single arbitrator. The arbitrator&apos;s decision shall be final and binding on
                both parties and may be entered as a judgment in any court of competent jurisdiction.
                Each party shall bear its own costs and attorneys&apos; fees in connection with the
                arbitration, unless the arbitrator determines that an award of costs and fees is
                appropriate.
              </p>
            </div>

            {/* Section 13 */}
            <div id="changes">
              <h2 className="text-2xl font-bold font-heading text-forest mb-4">
                13. Changes to Terms
              </h2>
              <p className="text-charcoal font-body text-base leading-relaxed mb-4">
                Rangel Janitorial LLC reserves the right to update, modify, or replace these Terms of
                Service at any time at our sole discretion. When we make changes, we will revise the
                &quot;Last updated&quot; date at the top of this page. If we make material changes, we
                may provide additional notice, such as sending an email notification or posting a
                prominent announcement on our website.
              </p>
              <p className="text-charcoal font-body text-base leading-relaxed mb-4">
                For customers with active service agreements, material changes to these Terms will be
                communicated at least 30 days before taking effect. You will have the opportunity to
                review the updated Terms and cancel your service agreement without penalty if you do
                not agree to the changes.
              </p>
              <p className="text-charcoal font-body text-base leading-relaxed">
                Your continued use of our website or services after any modifications to these Terms
                constitutes your acceptance of the revised Terms. We encourage you to review these
                Terms periodically to stay informed about your rights and obligations.
              </p>
            </div>

            {/* Section 14 */}
            <div id="contact">
              <h2 className="text-2xl font-bold font-heading text-forest mb-4">
                14. Contact Information
              </h2>
              <p className="text-charcoal font-body text-base leading-relaxed mb-4">
                If you have any questions, concerns, or feedback regarding these Terms of Service or
                the services provided by Rangel Janitorial LLC, please do not hesitate to contact
                us:
              </p>
              <div className="bg-cream rounded-xl p-6 sm:p-8 border border-cream-dark">
                <p className="font-heading font-bold text-forest text-lg mb-3">
                  Rangel Janitorial LLC
                </p>
                <div className="text-charcoal font-body text-base leading-relaxed space-y-2">
                  <p>
                    <strong>Address:</strong> 26323 Jefferson Avenue, Murrieta, CA 92562
                  </p>
                  <p>
                    <strong>Email:</strong>{' '}
                    <a
                      href="mailto:ralph@rangeljanitorial.com"
                      className="text-forest hover:text-sage underline underline-offset-2 transition-colors"
                    >
                      ralph@rangeljanitorial.com
                    </a>
                  </p>
                  <p>
                    <strong>Phone:</strong>{' '}
                    <a
                      href="/locations"
                      className="text-forest hover:text-sage underline underline-offset-2 transition-colors"
                    >
                      Find your local office number
                    </a>
                  </p>
                  <p>
                    <strong>Business Hours:</strong> Monday through Friday, 7:00 AM to 6:00 PM PST;
                    Saturday, 8:00 AM to 4:00 PM PST
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Navigation */}
          <div className="mt-16 pt-8 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link
              href="/privacy-policy"
              className="text-forest hover:text-sage font-body font-medium transition-colors underline underline-offset-2"
            >
              View Privacy Policy
            </Link>
            <Link
              href="/locations"
              className="bg-sage hover:bg-sage-dark text-white font-semibold px-6 py-2.5 rounded-lg transition-colors font-body shadow-sm hover:shadow-md"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
