import type { Metadata, Viewport } from 'next';
import { Montserrat, Open_Sans } from 'next/font/google';
import Script from 'next/script';
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
  alternates: {
    canonical: '/',
  },
  title: {
    default: "Rangel Janitorial | Professional Commercial Cleaning Services in California",
    template: "%s | Rangel Janitorial",
  },
  description:
    "Professional janitorial and commercial cleaning services across California. Janitorial cleaning, day porter, electrostatic disinfection, floor care, and carpet cleaning for offices, medical facilities, and more. Serving Sacramento, Murrieta, and Walnut Creek.",
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
        <Script
          src="https://link.msgsndr.com/js/form_embed.js"
          strategy="lazyOnload"
        />
        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "Rangel Janitorial",
              "description": "Professional janitorial and commercial cleaning services across California. Serving offices, medical facilities, industrial parks, and more.",
              "url": "https://rangeljanitorial.com",
              "contactPoint": [
                { "@type": "ContactPoint", "telephone": "+19164262311", "areaServed": ["Sacramento"], "contactType": "customer service" },
                { "@type": "ContactPoint", "telephone": "+19513313300", "areaServed": ["Murrieta", "Inland Empire"], "contactType": "customer service" },
                { "@type": "ContactPoint", "telephone": "+19256559008", "areaServed": ["Walnut Creek", "East Bay"], "contactType": "customer service" }
              ],
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "26323 Jefferson Avenue",
                "addressLocality": "Murrieta",
                "addressRegion": "CA",
                "postalCode": "92562",
                "addressCountry": "US"
              },
              "areaServed": [
                { "@type": "City", "name": "Sacramento" },
                { "@type": "City", "name": "Murrieta" },
                { "@type": "City", "name": "Walnut Creek" }
              ],
              "openingHours": ["Mo-Fr 09:00-17:00"],
              "priceRange": "$$",
              "image": "https://rangeljanitorial.com/images/logo.png",
              "sameAs": [
                "https://www.instagram.com/rangeljanitorial/",
                "https://www.facebook.com/profile.php?id=100090088264095",
                "https://www.youtube.com/@rangeljanitorial/featured",
                "https://www.google.com/maps/place/Rangel+Commercial+Cleaners+of+Murrieta/data=!4m2!3m1!1s0x0:0x846bff7e768aac1a"
              ]
            })
          }}
        />
      </body>
    </html>
  );
}
