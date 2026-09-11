import { mainNav, footerNav, ctaText, ctaHref } from '@/data/navigation';
import { SERVICE_SLUGS, LOCATION_SLUGS } from '@/lib/seo/constants';

describe('navigation data', () => {
  describe('mainNav', () => {
    it('has correct links for all primary pages', () => {
      const expectedHrefs = ['/', '/services', '/locations', '/blog'];
      const hrefs = mainNav.map((item) => item.href);
      for (const expected of expectedHrefs) {
        expect(hrefs).toContain(expected);
      }
    });

    it('all href values start with /', () => {
      for (const item of mainNav) {
        expect(item.href).toMatch(/^\//);
      }
    });
  });

  describe('footerNav', () => {
    it('has exactly 3 groups', () => {
      expect(footerNav).toHaveLength(3);
    });

    it('has groups titled Services, Locations, and Company', () => {
      const titles = footerNav.map((group) => group.title);
      expect(titles).toContain('Services');
      expect(titles).toContain('Locations');
      expect(titles).toContain('Company');
    });

    it('all footer link href values start with /', () => {
      for (const group of footerNav) {
        for (const link of group.links) {
          expect(link.href).toMatch(/^\//);
        }
      }
    });

    it('Services group links match all 5 service slugs', () => {
      const servicesGroup = footerNav.find((g) => g.title === 'Services');
      expect(servicesGroup).toBeDefined();
      const hrefs = servicesGroup!.links.map((l) => l.href);
      for (const slug of SERVICE_SLUGS) {
        expect(hrefs).toContain(`/services/${slug}`);
      }
    });

    it('Locations group links match every regional slug', () => {
      const locationsGroup = footerNav.find((g) => g.title === 'Locations');
      expect(locationsGroup).toBeDefined();
      const hrefs = locationsGroup!.links.map((l) => l.href);
      for (const slug of LOCATION_SLUGS) {
        expect(hrefs).toContain(`/locations/${slug}`);
      }
    });
  });

  describe('CTA exports', () => {
    it('ctaText is "Get a Quote"', () => {
      expect(ctaText).toBe('Get a Quote');
    });

    it('ctaHref is the regional contact selector', () => {
      expect(ctaHref).toBe('/locations');
    });
  });
});
