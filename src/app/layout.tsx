import type { Metadata, Viewport } from 'next';
import { Montserrat, Open_Sans } from 'next/font/google';
import { JsonLd } from '@/components/seo/JsonLd';
import { generateOrganizationSchema, generateLocalBusinessSchema } from '@/lib/seo/schema';
import { GoogleAnalytics } from '@/components/analytics/GoogleAnalytics';
import { CookieConsent } from '@/components/analytics/CookieConsent';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ExitIntentPopup from '@/components/ExitIntentPopup';
import MobileStickyQuote from '@/components/ui/MobileStickyQuote';

const montserrat = Montserrat({
  variable: '--font-heading',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700', '800', '900'],
});

const openSans = Open_Sans({
  variable: '--font-body',
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#2D5016',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://rangeljanitorial.com'),
  // NOTE: Do NOT set alternates.canonical here. A canonical in the root layout
  // is inherited by every child route that doesn't override it, which causes
  // Google to treat every location/service/blog page as an "Alternate page
  // with proper canonical tag" pointing to the homepage — and refuse to index
  // them. Each page declares its own canonical in its own generateMetadata.
  title: {
    default: "Rangel Janitorial | Professional Commercial Cleaning Services in California",
    template: "%s | Rangel Janitorial",
  },
  description:
    "Professional janitorial and commercial cleaning services across California. Janitorial cleaning, day porter, electrostatic disinfection, floor care, and office cleaning for offices, medical facilities, and more. Serving Sacramento, Murrieta, and Walnut Creek.",
  keywords: [
    'commercial cleaning services California',
    'janitorial services Murrieta',
    'office cleaning Sacramento',
    'janitorial company Walnut Creek',
    'commercial janitorial California',
    'day porter services',
    'electrostatic disinfection',
  ],
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
  openGraph: {
    title: "Rangel Janitorial | Professional Commercial Cleaning Services in California",
    description:
      "Professional janitorial and commercial cleaning services across California. Serving Sacramento, Murrieta, and Walnut Creek.",
    type: 'website',
    locale: 'en_US',
    siteName: "Rangel Janitorial",
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: "Rangel Janitorial - Professional Commercial Cleaning Services",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${openSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-body">
        <Header />
        <main className="flex-1 pt-24 lg:pt-28 pb-16 lg:pb-0">{children}</main>
        <Footer />
        <ExitIntentPopup />
        <MobileStickyQuote />
        <JsonLd schema={generateOrganizationSchema()} />
        <JsonLd schema={generateLocalBusinessSchema()} />
        <GoogleAnalytics />
        <CookieConsent />
      </body>
    </html>
  );
}
