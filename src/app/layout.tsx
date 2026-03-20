import type { Metadata } from "next";
import { Montserrat, Open_Sans } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
});

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Murphy's Turf | Professional Turf Cleaning & Lawn Care | Colorado Front Range",
    template: "%s | Murphy's Turf",
  },
  description:
    "Professional turf cleaning and lawn care services for the Colorado Front Range. Residential and commercial artificial turf maintenance, cleaning, and repair.",
  keywords: [
    "turf cleaning",
    "lawn care",
    "artificial turf maintenance",
    "Colorado Front Range",
    "turf repair",
    "commercial turf cleaning",
    "residential lawn care",
  ],
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://murphysturf.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Murphy's Turf",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${montserrat.variable} ${openSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
