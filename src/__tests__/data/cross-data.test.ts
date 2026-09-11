import { services } from '@/data/services';
import { locations } from '@/data/locations';
import { faqs } from '@/data/faqs';
import { testimonials } from '@/data/testimonials';
import regions from '@/data/regions.json';
import { footerNav } from '@/data/navigation';

describe('cross-data validation', () => {
  const validServiceSlugs = services.map((s) => s.slug);
  const validLocationSlugs = locations.map((l) => l.slug);
  const validLocationNames = regions.flatMap((region) => region.cities.map((city) => city.name));

  describe('FAQ service slug references', () => {
    it('all serviceSlug values in faqs reference valid service slugs', () => {
      const faqsWithServiceSlug = faqs.filter((f) => f.serviceSlug);
      expect(faqsWithServiceSlug.length).toBeGreaterThan(0);

      for (const faq of faqsWithServiceSlug) {
        expect(
          validServiceSlugs,
          `FAQ "${faq.question}" references unknown serviceSlug "${faq.serviceSlug}"`,
        ).toContain(faq.serviceSlug);
      }
    });
  });

  describe('FAQ location slug references', () => {
    it('all locationSlug values in faqs reference valid location slugs', () => {
      const faqsWithLocationSlug = faqs.filter((f) => f.locationSlug);
      expect(faqsWithLocationSlug.length).toBeGreaterThan(0);

      for (const faq of faqsWithLocationSlug) {
        expect(
          validLocationSlugs,
          `FAQ "${faq.question}" references unknown locationSlug "${faq.locationSlug}"`,
        ).toContain(faq.locationSlug);
      }
    });
  });

  describe('testimonial service type references', () => {
    it('all testimonial serviceTypes reference valid service slugs', () => {
      for (const testimonial of testimonials) {
        expect(
          validServiceSlugs,
          `Testimonial from "${testimonial.customerName}" references unknown serviceType "${testimonial.serviceType}"`,
        ).toContain(testimonial.serviceType);
      }
    });
  });

  describe('testimonial customer location references', () => {
    it('all testimonial customerLocations reference valid location names', () => {
      for (const testimonial of testimonials) {
        const match = validLocationNames.some((name) =>
          name === testimonial.customerLocation,
        );
        expect(
          match,
          `Testimonial from "${testimonial.customerName}" has customerLocation "${testimonial.customerLocation}" which is not a registered service city (${validLocationNames.join(', ')})`,
        ).toBe(true);
      }
    });
  });

  describe('footer navigation service links', () => {
    it('all footer service links match actual service slugs', () => {
      const servicesGroup = footerNav.find((group) => group.title === 'Services');
      expect(servicesGroup).toBeDefined();

      for (const link of servicesGroup!.links) {
        const match = link.href.match(/^\/services\/(.+)$/);
        expect(match, `Service link "${link.href}" does not match /services/[slug] pattern`).not.toBeNull();

        const slug = match![1];
        expect(
          validServiceSlugs,
          `Footer service link "${link.label}" references unknown slug "${slug}"`,
        ).toContain(slug);
      }
    });
  });

  describe('footer navigation location links', () => {
    it('all footer location links match actual location slugs', () => {
      const locationsGroup = footerNav.find((group) => group.title === 'Locations');
      expect(locationsGroup).toBeDefined();

      for (const link of locationsGroup!.links) {
        const match = link.href.match(/^\/locations\/(.+)$/);
        expect(match, `Location link "${link.href}" does not match /locations/[slug] pattern`).not.toBeNull();

        const slug = match![1];
        expect(
          validLocationSlugs,
          `Footer location link "${link.label}" references unknown slug "${slug}"`,
        ).toContain(slug);
      }
    });
  });
});
