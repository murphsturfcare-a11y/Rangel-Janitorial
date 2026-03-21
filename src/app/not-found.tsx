import type { Metadata } from 'next';
import Link from 'next/link';
import { Scissors, Home, Mail } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Page Not Found',
};

export default function NotFound() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-[calc(100vh-12rem)] px-4 py-16 overflow-hidden">
      {/* Grass decoration along the bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-24 overflow-hidden pointer-events-none">
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-forest/10 rounded-t-[50%_100%]" />
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-sage/15 rounded-t-[50%_100%]" />
        {/* Grass blades */}
        <svg
          className="absolute bottom-6 left-0 w-full h-20 text-sage/20"
          viewBox="0 0 1200 80"
          preserveAspectRatio="none"
          fill="currentColor"
        >
          <path d="M0,80 Q15,30 20,0 Q25,30 30,80 Z" />
          <path d="M40,80 Q55,20 60,5 Q65,35 70,80 Z" />
          <path d="M90,80 Q100,25 105,0 Q110,30 120,80 Z" />
          <path d="M150,80 Q165,35 170,10 Q175,40 180,80 Z" />
          <path d="M210,80 Q220,20 225,0 Q230,25 240,80 Z" />
          <path d="M270,80 Q285,30 290,5 Q295,35 300,80 Z" />
          <path d="M330,80 Q340,25 345,0 Q350,30 360,80 Z" />
          <path d="M390,80 Q405,35 410,10 Q415,40 420,80 Z" />
          <path d="M450,80 Q460,20 465,0 Q470,25 480,80 Z" />
          <path d="M510,80 Q525,30 530,5 Q535,35 540,80 Z" />
          <path d="M570,80 Q580,25 585,0 Q590,30 600,80 Z" />
          <path d="M630,80 Q645,35 650,10 Q655,40 660,80 Z" />
          <path d="M690,80 Q700,20 705,0 Q710,25 720,80 Z" />
          <path d="M750,80 Q765,30 770,5 Q775,35 780,80 Z" />
          <path d="M810,80 Q820,25 825,0 Q830,30 840,80 Z" />
          <path d="M870,80 Q885,35 890,10 Q895,40 900,80 Z" />
          <path d="M930,80 Q940,20 945,0 Q950,25 960,80 Z" />
          <path d="M990,80 Q1005,30 1010,5 Q1015,35 1020,80 Z" />
          <path d="M1050,80 Q1060,25 1065,0 Q1070,30 1080,80 Z" />
          <path d="M1110,80 Q1125,35 1130,10 Q1135,40 1140,80 Z" />
          <path d="M1170,80 Q1180,20 1185,0 Q1190,25 1200,80 Z" />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-lg">
        {/* Scissors icon with dotted cut line */}
        <div className="relative mb-6">
          <div className="absolute -left-16 top-1/2 w-12 border-t-2 border-dashed border-sage/40" />
          <div className="absolute -right-16 top-1/2 w-12 border-t-2 border-dashed border-sage/40" />
          <div className="w-20 h-20 rounded-full bg-forest/10 flex items-center justify-center">
            <Scissors className="w-10 h-10 text-forest rotate-[-45deg]" />
          </div>
        </div>

        {/* 404 number */}
        <h1 className="font-heading text-[8rem] sm:text-[10rem] font-black leading-none text-forest tracking-tighter select-none">
          404
        </h1>

        {/* Heading */}
        <h2 className="mt-2 font-heading text-2xl sm:text-3xl font-bold text-charcoal">
          Looks Like This Page Got Swept Away
        </h2>

        {/* Subtext */}
        <p className="mt-4 font-body text-lg text-charcoal-light leading-relaxed">
          The page you&apos;re looking for seems to have disappeared.
          Let&apos;s get you back to fresh turf.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-3 bg-sage hover:bg-sage-dark text-white font-heading font-semibold rounded-full transition-colors shadow-md hover:shadow-lg"
          >
            <Home className="w-5 h-5" />
            Back to Home
          </Link>
          <Link
            href="/locations"
            className="inline-flex items-center gap-2 px-8 py-3 border-2 border-forest text-forest hover:bg-forest hover:text-white font-heading font-semibold rounded-full transition-colors"
          >
            <Mail className="w-5 h-5" />
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
