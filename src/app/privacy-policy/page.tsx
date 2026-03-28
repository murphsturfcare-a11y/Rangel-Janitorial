import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    "Rangel Janitorial privacy policy. Learn how we collect, use, and protect your personal information when you use our janitorial and commercial cleaning services.",
};

const sections = [
  { id: 'information-we-collect', title: '1. Information We Collect' },
  { id: 'how-we-use', title: '2. How We Use Your Information' },
  { id: 'information-sharing', title: '3. Information Sharing' },
  { id: 'data-security', title: '4. Data Security' },
  { id: 'your-rights', title: '5. Your Rights' },
  { id: 'cookies', title: '6. Cookies and Tracking Technologies' },
  { id: 'third-party-links', title: '7. Third-Party Links' },
  { id: 'childrens-privacy', title: "8. Children's Privacy" },
  { id: 'changes', title: '9. Changes to This Policy' },
  { id: 'contact', title: '10. Contact Information' },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-forest text-white py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold font-heading mb-4">
            Privacy Policy
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
              Rangel Janitorial LLC (&quot;Rangel Janitorial,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) is
              committed to protecting your privacy. This Privacy Policy explains how we collect, use,
              disclose, and safeguard your information when you visit our website, use our services, or
              otherwise interact with us. Please read this policy carefully to understand our views and
              practices regarding your personal data.
            </p>
            <p className="text-charcoal font-body text-base leading-relaxed">
              By accessing or using our website and services, you acknowledge that you have read,
              understood, and agree to be bound by this Privacy Policy. If you do not agree with the
              terms of this policy, please do not access our website or use our services.
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

          {/* Policy Sections */}
          <div className="space-y-12">
            {/* Section 1 */}
            <div id="information-we-collect">
              <h2 className="text-2xl font-bold font-heading text-forest mb-4">
                1. Information We Collect
              </h2>
              <p className="text-charcoal font-body text-base leading-relaxed mb-4">
                We collect information from you in several ways when you interact with Rangel Janitorial.
                The types of information we may collect include:
              </p>

              <h3 className="text-lg font-semibold font-heading text-charcoal mb-2">
                Personal Information You Provide
              </h3>
              <p className="text-charcoal font-body text-base leading-relaxed mb-3">
                When you fill out a contact form, request a quote, schedule a service, or otherwise
                communicate with us, you may provide us with:
              </p>
              <ul className="list-disc list-inside text-charcoal font-body text-base leading-relaxed mb-6 space-y-1 pl-4">
                <li>Full name</li>
                <li>Email address</li>
                <li>Phone number</li>
                <li>Mailing address and service property address</li>
                <li>Billing and payment information</li>
                <li>Details about your facility and cleaning needs</li>
                <li>Any other information you choose to provide in correspondence with us</li>
              </ul>

              <h3 className="text-lg font-semibold font-heading text-charcoal mb-2">
                Information Collected Automatically
              </h3>
              <p className="text-charcoal font-body text-base leading-relaxed mb-3">
                When you visit our website, we may automatically collect certain information about your
                device and browsing activity, including:
              </p>
              <ul className="list-disc list-inside text-charcoal font-body text-base leading-relaxed mb-6 space-y-1 pl-4">
                <li>IP address and approximate geographic location</li>
                <li>Browser type and version</li>
                <li>Operating system</li>
                <li>Referring website or URL</li>
                <li>Pages visited and time spent on each page</li>
                <li>Date and time of your visit</li>
                <li>Device type (desktop, mobile, tablet)</li>
              </ul>

              <h3 className="text-lg font-semibold font-heading text-charcoal mb-2">
                Cookies and Similar Technologies
              </h3>
              <p className="text-charcoal font-body text-base leading-relaxed">
                We use cookies, web beacons, and similar tracking technologies to collect information
                about your browsing behavior. For more details, please see Section 6 below.
              </p>
            </div>

            {/* Section 2 */}
            <div id="how-we-use">
              <h2 className="text-2xl font-bold font-heading text-forest mb-4">
                2. How We Use Your Information
              </h2>
              <p className="text-charcoal font-body text-base leading-relaxed mb-4">
                Rangel Janitorial uses the information we collect for the following purposes:
              </p>

              <h3 className="text-lg font-semibold font-heading text-charcoal mb-2">
                Service Delivery
              </h3>
              <ul className="list-disc list-inside text-charcoal font-body text-base leading-relaxed mb-6 space-y-1 pl-4">
                <li>To process and fulfill your service requests, including scheduling appointments</li>
                <li>To provide quotes and estimates for janitorial and commercial cleaning services</li>
                <li>To manage your account and maintain records of services rendered</li>
                <li>To process payments and send invoices</li>
              </ul>

              <h3 className="text-lg font-semibold font-heading text-charcoal mb-2">
                Communication
              </h3>
              <ul className="list-disc list-inside text-charcoal font-body text-base leading-relaxed mb-6 space-y-1 pl-4">
                <li>To respond to your inquiries, questions, and requests</li>
                <li>To send appointment confirmations and service reminders</li>
                <li>To provide you with facility maintenance tips and promotional offers (with your consent)</li>
                <li>To notify you about changes to our services, policies, or terms</li>
              </ul>

              <h3 className="text-lg font-semibold font-heading text-charcoal mb-2">
                Improvement and Analytics
              </h3>
              <ul className="list-disc list-inside text-charcoal font-body text-base leading-relaxed space-y-1 pl-4">
                <li>To analyze website traffic and usage patterns to improve our website&apos;s functionality</li>
                <li>To understand our customer base and tailor our services to meet your needs</li>
                <li>To conduct internal research and development</li>
                <li>To detect, prevent, and address technical issues and security threats</li>
              </ul>
            </div>

            {/* Section 3 */}
            <div id="information-sharing">
              <h2 className="text-2xl font-bold font-heading text-forest mb-4">
                3. Information Sharing
              </h2>
              <p className="text-charcoal font-body text-base leading-relaxed mb-4">
                Rangel Janitorial does not sell, rent, or trade your personal information to third
                parties for their marketing purposes. We may share your information only in the
                following limited circumstances:
              </p>

              <h3 className="text-lg font-semibold font-heading text-charcoal mb-2">
                Service Providers
              </h3>
              <p className="text-charcoal font-body text-base leading-relaxed mb-6">
                We may share your information with trusted third-party service providers who assist us
                in operating our website, conducting our business, or providing services to you. These
                providers include payment processors, email service providers, scheduling software
                vendors, and web hosting providers. These parties are contractually obligated to keep
                your information confidential and use it only for the purposes for which we disclose it
                to them.
              </p>

              <h3 className="text-lg font-semibold font-heading text-charcoal mb-2">
                Legal Requirements
              </h3>
              <p className="text-charcoal font-body text-base leading-relaxed mb-6">
                We may disclose your information if required to do so by law or in response to valid
                requests by public authorities, such as a court order, subpoena, or government
                investigation.
              </p>

              <h3 className="text-lg font-semibold font-heading text-charcoal mb-2">
                Business Transfers
              </h3>
              <p className="text-charcoal font-body text-base leading-relaxed mb-6">
                In the event of a merger, acquisition, reorganization, or sale of all or a portion of
                our assets, your personal information may be transferred as part of that transaction.
                We will notify you via email or a prominent notice on our website of any change in
                ownership or uses of your personal information.
              </p>

              <h3 className="text-lg font-semibold font-heading text-charcoal mb-2">
                With Your Consent
              </h3>
              <p className="text-charcoal font-body text-base leading-relaxed">
                We may share your information for any other purpose with your explicit consent.
              </p>
            </div>

            {/* Section 4 */}
            <div id="data-security">
              <h2 className="text-2xl font-bold font-heading text-forest mb-4">
                4. Data Security
              </h2>
              <p className="text-charcoal font-body text-base leading-relaxed mb-4">
                We take the security of your personal information seriously and implement appropriate
                technical and organizational measures to protect it against unauthorized access,
                alteration, disclosure, or destruction. Our security measures include:
              </p>
              <ul className="list-disc list-inside text-charcoal font-body text-base leading-relaxed mb-4 space-y-1 pl-4">
                <li>Encryption of data in transit using SSL/TLS technology</li>
                <li>Secure storage of personal information on protected servers</li>
                <li>Regular security assessments and vulnerability testing</li>
                <li>Access controls limiting employee access to personal information on a need-to-know basis</li>
                <li>Employee training on data privacy and security best practices</li>
              </ul>
              <p className="text-charcoal font-body text-base leading-relaxed">
                While we strive to protect your personal information, no method of transmission over
                the Internet or method of electronic storage is completely secure. We cannot guarantee
                the absolute security of your data, but we are committed to maintaining industry-standard
                protections and promptly addressing any security incidents.
              </p>
            </div>

            {/* Section 5 */}
            <div id="your-rights">
              <h2 className="text-2xl font-bold font-heading text-forest mb-4">
                5. Your Rights
              </h2>
              <p className="text-charcoal font-body text-base leading-relaxed mb-4">
                Depending on your location, you may have certain rights regarding your personal
                information. These rights may include:
              </p>

              <h3 className="text-lg font-semibold font-heading text-charcoal mb-2">
                Right of Access
              </h3>
              <p className="text-charcoal font-body text-base leading-relaxed mb-6">
                You have the right to request a copy of the personal information we hold about you. We
                will provide this information in a commonly used, machine-readable format within 30 days
                of your request.
              </p>

              <h3 className="text-lg font-semibold font-heading text-charcoal mb-2">
                Right to Correction
              </h3>
              <p className="text-charcoal font-body text-base leading-relaxed mb-6">
                If you believe that any personal information we hold about you is inaccurate or
                incomplete, you have the right to request that we correct or update it. We will make
                reasonable efforts to correct the information promptly.
              </p>

              <h3 className="text-lg font-semibold font-heading text-charcoal mb-2">
                Right to Deletion
              </h3>
              <p className="text-charcoal font-body text-base leading-relaxed mb-6">
                You may request the deletion of your personal information, subject to certain
                exceptions. We may retain certain information as required by law or for legitimate
                business purposes, such as maintaining records of completed services for warranty and
                tax purposes.
              </p>

              <h3 className="text-lg font-semibold font-heading text-charcoal mb-2">
                Right to Opt Out
              </h3>
              <p className="text-charcoal font-body text-base leading-relaxed mb-4">
                You may opt out of receiving promotional emails by following the unsubscribe
                instructions included in each email or by contacting us directly. Please note that even
                if you opt out of marketing communications, we may still send you transactional messages
                related to your services, such as appointment confirmations and invoices.
              </p>
              <p className="text-charcoal font-body text-base leading-relaxed">
                To exercise any of these rights, please contact us using the information provided in
                Section 10 below. We will respond to your request within a reasonable timeframe and in
                accordance with applicable law.
              </p>
            </div>

            {/* Section 6 */}
            <div id="cookies">
              <h2 className="text-2xl font-bold font-heading text-forest mb-4">
                6. Cookies and Tracking Technologies
              </h2>
              <p className="text-charcoal font-body text-base leading-relaxed mb-4">
                Our website uses cookies and similar tracking technologies to enhance your browsing
                experience and gather information about how you use our site. Cookies are small text
                files stored on your device by your web browser.
              </p>

              <h3 className="text-lg font-semibold font-heading text-charcoal mb-2">
                Types of Cookies We Use
              </h3>
              <ul className="list-disc list-inside text-charcoal font-body text-base leading-relaxed mb-6 space-y-2 pl-4">
                <li>
                  <strong>Essential Cookies:</strong> These cookies are necessary for the website to
                  function properly. They enable core functionality such as page navigation and access
                  to secure areas of the website. The website cannot function properly without these
                  cookies.
                </li>
                <li>
                  <strong>Analytics Cookies:</strong> These cookies help us understand how visitors
                  interact with our website by collecting and reporting information anonymously. We use
                  this data to improve website performance and user experience.
                </li>
                <li>
                  <strong>Functional Cookies:</strong> These cookies allow the website to remember
                  choices you make, such as your preferred language or region, and provide enhanced,
                  personalized features.
                </li>
                <li>
                  <strong>Marketing Cookies:</strong> These cookies may be used to track visitors
                  across websites to display relevant advertisements. They are typically placed by
                  third-party advertising networks with our permission.
                </li>
              </ul>

              <h3 className="text-lg font-semibold font-heading text-charcoal mb-2">
                Managing Cookies
              </h3>
              <p className="text-charcoal font-body text-base leading-relaxed">
                Most web browsers allow you to control cookies through their settings. You can choose
                to block or delete cookies, but doing so may affect the functionality of our website.
                To learn more about cookies and how to manage them, visit{' '}
                <a
                  href="https://www.allaboutcookies.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-forest hover:text-sage underline underline-offset-2 transition-colors"
                >
                  www.allaboutcookies.org
                </a>
                .
              </p>
            </div>

            {/* Section 7 */}
            <div id="third-party-links">
              <h2 className="text-2xl font-bold font-heading text-forest mb-4">
                7. Third-Party Links
              </h2>
              <p className="text-charcoal font-body text-base leading-relaxed mb-4">
                Our website may contain links to third-party websites, services, or applications that
                are not owned or controlled by Rangel Janitorial. These may include social media
                platforms, review sites, payment processors, and partner businesses.
              </p>
              <p className="text-charcoal font-body text-base leading-relaxed">
                We have no control over, and assume no responsibility for, the content, privacy
                policies, or practices of any third-party websites or services. We encourage you to
                review the privacy policy of every site you visit. Clicking on a third-party link or
                enabling a third-party connection does not imply our endorsement of that third party or
                their practices.
              </p>
            </div>

            {/* Section 8 */}
            <div id="childrens-privacy">
              <h2 className="text-2xl font-bold font-heading text-forest mb-4">
                8. Children&apos;s Privacy
              </h2>
              <p className="text-charcoal font-body text-base leading-relaxed mb-4">
                Our website and services are not directed to individuals under the age of 13.
                Rangel Janitorial does not knowingly collect personal information from children under
                13 years of age. If we become aware that we have inadvertently collected personal
                information from a child under 13, we will take steps to delete that information as
                soon as possible.
              </p>
              <p className="text-charcoal font-body text-base leading-relaxed">
                If you are a parent or guardian and believe your child has provided us with personal
                information without your consent, please contact us at{' '}
                <a
                  href="mailto:ralph@rangeljanitorial.com"
                  className="text-forest hover:text-sage underline underline-offset-2 transition-colors"
                >
                  ralph@rangeljanitorial.com
                </a>{' '}
                so that we can take appropriate action.
              </p>
            </div>

            {/* Section 9 */}
            <div id="changes">
              <h2 className="text-2xl font-bold font-heading text-forest mb-4">
                9. Changes to This Policy
              </h2>
              <p className="text-charcoal font-body text-base leading-relaxed mb-4">
                Rangel Janitorial reserves the right to update or modify this Privacy Policy at any
                time. When we make changes, we will revise the &quot;Last updated&quot; date at the top
                of this page. If we make material changes to this policy, we may also notify you by
                email or by placing a prominent notice on our website.
              </p>
              <p className="text-charcoal font-body text-base leading-relaxed">
                We encourage you to review this Privacy Policy periodically to stay informed about how
                we are protecting your information. Your continued use of our website and services
                after any changes to this policy constitutes your acceptance of the updated terms.
              </p>
            </div>

            {/* Section 10 */}
            <div id="contact">
              <h2 className="text-2xl font-bold font-heading text-forest mb-4">
                10. Contact Information
              </h2>
              <p className="text-charcoal font-body text-base leading-relaxed mb-4">
                If you have any questions, concerns, or requests regarding this Privacy Policy or our
                data practices, please contact us using any of the methods below:
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
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Navigation */}
          <div className="mt-16 pt-8 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link
              href="/terms-of-service"
              className="text-forest hover:text-sage font-body font-medium transition-colors underline underline-offset-2"
            >
              View Terms of Service
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
