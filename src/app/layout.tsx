import type { Metadata } from 'next';
import { Montserrat, Open_Sans } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ExitIntentPopup from '@/components/ExitIntentPopup';

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

export const metadata: Metadata = {
  title: {
    default: "Murphy's Turf | Professional Artificial Turf Cleaning in California",
    template: "%s | Murphy's Turf",
  },
  description:
    "California's premier artificial turf cleaning company. Powered by OxyTurf, we provide pet-safe turf cleaning, disinfecting, deodorizing, and maintenance services. Serving Murrieta, Huntington Beach, Martinez, and Sacramento. Get a free quote today!",
  keywords: [
    'artificial turf cleaning California',
    'turf cleaning Murrieta',
    'OxyTurf turf cleaning',
    'pet turf cleaning Huntington Beach',
    'turf disinfect deodorize Martinez',
    'turf maintenance Sacramento',
    'pet-safe turf cleaning Southern California',
  ],
  openGraph: {
    title: "Murphy's Turf | Professional Artificial Turf Cleaning in California",
    description:
      "California's premier artificial turf cleaning company. Powered by OxyTurf, serving communities statewide.",
    type: 'website',
    locale: 'en_US',
    siteName: "Murphy's Turf",
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
        <main className="flex-1">{children}</main>
        <Footer />
        <ExitIntentPopup />
        <Script
          src="https://link.msgsndr.com/js/form_embed.js"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
