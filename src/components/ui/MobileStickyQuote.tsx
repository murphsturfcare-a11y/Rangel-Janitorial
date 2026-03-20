'use client';

import Link from 'next/link';
import { Phone, ArrowRight } from 'lucide-react';

export default function MobileStickyQuote() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-forest py-2 px-4 shadow-[0_-2px_10px_rgba(0,0,0,0.1)]">
      <div className="flex gap-3">
        <a
          href="tel:9513313300"
          className="flex-1 inline-flex items-center justify-center gap-2 bg-white text-forest py-3 rounded-lg font-semibold font-body text-sm min-h-[44px] transition-colors hover:bg-cream"
        >
          <Phone className="w-4 h-4" />
          Call Now
        </a>
        <Link
          href="/contact"
          className="flex-1 inline-flex items-center justify-center gap-2 bg-sage text-white py-3 rounded-lg font-semibold font-body text-sm min-h-[44px] transition-colors hover:bg-sage-dark"
        >
          Get Free Quote
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
