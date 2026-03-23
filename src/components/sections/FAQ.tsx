'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const defaultItems: FAQItem[] = [
  {
    question: 'How much does artificial turf cleaning cost?',
    answer:
      'Our services start at $49 for basic turf cleaning. We offer free estimates tailored to your turf size and specific needs. Contact us for a personalized quote.',
  },
  {
    question: 'How often should I have my turf cleaned?',
    answer:
      "We recommend monthly cleaning for most residential turf, or bi-weekly if you have pets. We'll create a custom schedule based on your turf's needs and usage.",
  },
  {
    question: 'Do you offer free estimates?',
    answer:
      "Yes! We provide free, no-obligation estimates for all our services. Simply fill out our quote form or give us a call, and we'll schedule a convenient time to assess your turf.",
  },
  {
    question: 'Are your cleaning products safe for pets and children?',
    answer:
      "Absolutely. Our professional-grade cleaning products are eco-friendly, pet-safe, and child-safe. Your family and pets can safely use the turf immediately after our cleaning service.",
  },
  {
    question: 'What areas do you serve?',
    answer:
      'We proudly serve communities across California, including Huntington Beach, Murrieta, Martinez, Sacramento, and surrounding areas.',
  },
  {
    question: 'What if I\'m not satisfied with the service?',
    answer:
      "Your satisfaction is our top priority. If you're not happy with any service, contact us within 48 hours and we'll return to address your concerns at no additional charge.",
  },
];

interface FAQProps {
  items?: FAQItem[];
}

export default function FAQ({ items = defaultItems }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-charcoal text-center">
          Frequently Asked Questions
        </h2>

        <div className="mt-12">
          {items.map((item, index) => {
            const isOpen = openIndex === index;
            const headingId = `faq-heading-${index}`;
            const regionId = `faq-region-${index}`;

            return (
              <div key={index} className="border-b border-gray-200">
                <button
                  id={headingId}
                  type="button"
                  className="w-full flex justify-between items-center py-5 text-left cursor-pointer"
                  aria-expanded={isOpen}
                  aria-controls={regionId}
                  onClick={() => toggleItem(index)}
                >
                  <span className="font-medium text-charcoal font-body pr-4">
                    {item.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-charcoal-light shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <div
                  id={regionId}
                  role="region"
                  aria-labelledby={headingId}
                  className={`overflow-hidden transition-[max-height] duration-300 ease-in-out ${
                    isOpen ? 'max-h-[500px]' : 'max-h-0'
                  }`}
                >
                  <p className="pb-5 text-charcoal-light font-body">
                    {item.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
