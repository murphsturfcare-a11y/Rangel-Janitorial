'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const defaultItems: FAQItem[] = [
  {
    question: 'How much does lawn care cost?',
    answer:
      'Our services start at $49 for basic lawn cleaning. We offer free estimates tailored to your property size and specific needs. Contact us for a personalized quote.',
  },
  {
    question: 'How often should I have my lawn serviced?',
    answer:
      "We recommend weekly or bi-weekly maintenance during the growing season (April-October) and monthly service during the off-season. We'll create a custom schedule based on your lawn's needs.",
  },
  {
    question: 'Do you offer free estimates?',
    answer:
      "Yes! We provide free, no-obligation estimates for all our services. Simply fill out our quote form or give us a call, and we'll schedule a convenient time to assess your property.",
  },
  {
    question: 'Are your products safe for pets and children?',
    answer:
      "Absolutely. We use eco-friendly, pet-safe, and child-safe products whenever possible. We'll always inform you of any precautions needed after treatment.",
  },
  {
    question: 'What areas do you serve?',
    answer:
      'We proudly serve the Colorado Front Range, including Denver, Aurora, Lakewood, Arvada, Westminster, Boulder, and surrounding communities.',
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
