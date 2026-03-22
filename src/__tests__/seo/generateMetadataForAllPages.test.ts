import { describe, expect, it } from "vitest";
import {
  homeMetadata,
  aboutMetadata,
  contactMetadata,
  servicesMetadata,
  locationsMetadata,
  serviceMetadata,
  locationMetadata,
  blogIndexMetadata,
  blogMetadata,
} from "@/lib/seo/generateMetadataForAllPages";

const SITE_URL = "https://murphysturf.com";

describe("generateMetadataForAllPages", () => {
  describe("homeMetadata", () => {
    it("has title containing 'Professional Artificial Turf Cleaning'", () => {
      expect(homeMetadata.title).toContain(
        "Professional Artificial Turf Cleaning"
      );
    });

    it(`has canonical equal to ${SITE_URL}/`, () => {
      expect(homeMetadata.alternates?.canonical).toBe(`${SITE_URL}/`);
    });

    it("has title and description properties", () => {
      expect(homeMetadata.title).toBeDefined();
      expect(homeMetadata.description).toBeDefined();
    });
  });

  describe("aboutMetadata", () => {
    it("has title containing 'About Us'", () => {
      expect(aboutMetadata.title).toContain("About Us");
    });

    it("has canonical for /about", () => {
      expect(aboutMetadata.alternates?.canonical).toBe(`${SITE_URL}/about`);
    });

    it("has title and description properties", () => {
      expect(aboutMetadata.title).toBeDefined();
      expect(aboutMetadata.description).toBeDefined();
    });
  });

  describe("contactMetadata", () => {
    it("has canonical for /contact", () => {
      expect(contactMetadata.alternates?.canonical).toBe(
        `${SITE_URL}/contact`
      );
    });

    it("has title and description properties", () => {
      expect(contactMetadata.title).toBeDefined();
      expect(contactMetadata.description).toBeDefined();
    });
  });

  describe("servicesMetadata", () => {
    it("has canonical for /services", () => {
      expect(servicesMetadata.alternates?.canonical).toBe(
        `${SITE_URL}/services`
      );
    });

    it("has title and description properties", () => {
      expect(servicesMetadata.title).toBeDefined();
      expect(servicesMetadata.description).toBeDefined();
    });
  });

  describe("locationsMetadata", () => {
    it("has canonical for /locations", () => {
      expect(locationsMetadata.alternates?.canonical).toBe(
        `${SITE_URL}/locations`
      );
    });

    it("has title and description properties", () => {
      expect(locationsMetadata.title).toBeDefined();
      expect(locationsMetadata.description).toBeDefined();
    });
  });

  describe("serviceMetadata", () => {
    const expectedSlugs = [
      "pet-hair-debris",
      "blooming-decompacting",
      "disinfect-deodorize",
      "poop-scooping",
      "oxyturf",
    ] as const;

    it("has exactly 5 entries keyed by slug", () => {
      expect(Object.keys(serviceMetadata)).toHaveLength(5);
      for (const slug of expectedSlugs) {
        expect(serviceMetadata).toHaveProperty(slug);
      }
    });

    it.each(expectedSlugs)(
      "serviceMetadata[%s] has canonical containing /services/%s",
      (slug) => {
        const meta = serviceMetadata[slug];
        expect(meta.alternates?.canonical).toContain(`/services/${slug}`);
      }
    );

    it.each(expectedSlugs)(
      "serviceMetadata[%s] has title and description",
      (slug) => {
        const meta = serviceMetadata[slug];
        expect(meta.title).toBeDefined();
        expect(meta.description).toBeDefined();
      }
    );
  });

  describe("locationMetadata", () => {
    const expectedSlugs = [
      "huntington-beach",
      "murrieta",
      "martinez",
      "sacramento",
    ] as const;

    it("has exactly 4 entries keyed by slug", () => {
      expect(Object.keys(locationMetadata)).toHaveLength(4);
      for (const slug of expectedSlugs) {
        expect(locationMetadata).toHaveProperty(slug);
      }
    });

    it.each(expectedSlugs)(
      "locationMetadata[%s] has canonical containing /locations/%s",
      (slug) => {
        const meta = locationMetadata[slug];
        expect(meta.alternates?.canonical).toContain(`/locations/${slug}`);
      }
    );

    it.each(expectedSlugs)(
      "locationMetadata[%s] has title and description",
      (slug) => {
        const meta = locationMetadata[slug];
        expect(meta.title).toBeDefined();
        expect(meta.description).toBeDefined();
      }
    );
  });

  describe("blogIndexMetadata", () => {
    it("has canonical for /blog", () => {
      expect(blogIndexMetadata.alternates?.canonical).toBe(`${SITE_URL}/blog`);
    });

    it("has title and description properties", () => {
      expect(blogIndexMetadata.title).toBeDefined();
      expect(blogIndexMetadata.description).toBeDefined();
    });
  });

  describe("blogMetadata", () => {
    const expectedSlugs = [
      "how-to-clean-artificial-turf",
      "professional-turf-cleaning-huntington-beach",
      "removing-pet-odors-murrieta",
      "artificial-turf-maintenance-bay-area",
      "sacramento-turf-cleaning-tips",
      "health-benefits-turf-sanitization",
      "how-often-clean-artificial-turf",
      "what-is-oxyturf-safe-turf-cleaning",
      "diy-vs-professional-turf-cleaning",
      "artificial-turf-pets-clean-safe",
      "why-artificial-turf-smells-fix",
      "signs-turf-needs-professional-cleaning",
    ] as const;

    it("has exactly 12 entries", () => {
      expect(Object.keys(blogMetadata)).toHaveLength(12);
    });

    it.each(expectedSlugs)(
      "blogMetadata[%s] has canonical containing /blog/%s",
      (slug) => {
        const meta = blogMetadata[slug];
        expect(meta).toBeDefined();
        expect(meta.alternates?.canonical).toContain(`/blog/${slug}`);
      }
    );

    it.each(expectedSlugs)(
      "blogMetadata[%s] has title and description",
      (slug) => {
        const meta = blogMetadata[slug];
        expect(meta.title).toBeDefined();
        expect(meta.description).toBeDefined();
      }
    );
  });
});
