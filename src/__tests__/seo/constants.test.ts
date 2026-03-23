import { describe, expect, it } from "vitest";
import {
  SITE_URL,
  COMPANY_NAME,
  COMPANY_TAGLINE,
  COMPANY_DESCRIPTION,
  COMPANY_EMAIL,
  COMPANY_ADDRESS,
  DEFAULT_OG_IMAGE,
  SOCIAL_LINKS,
  SERVICE_SLUGS,
  LOCATION_SLUGS,
  BLOG_SLUGS,
} from "@/lib/seo/constants";

describe("SEO constants", () => {
  it("SITE_URL is the production URL with no trailing slash", () => {
    expect(SITE_URL).toBe("https://murphysturf.com");
    expect(SITE_URL.endsWith("/")).toBe(false);
  });

  it("COMPANY_NAME is Murphy's Turf", () => {
    expect(COMPANY_NAME).toBe("Murphy's Turf");
  });

  it("COMPANY_TAGLINE is a non-empty string", () => {
    expect(typeof COMPANY_TAGLINE).toBe("string");
    expect(COMPANY_TAGLINE.length).toBeGreaterThan(0);
  });

  it("COMPANY_DESCRIPTION contains key terms", () => {
    expect(COMPANY_DESCRIPTION).toContain("professional-grade");
    expect(COMPANY_DESCRIPTION).toContain("California");
    expect(COMPANY_DESCRIPTION).toContain("artificial turf");
  });

  it("COMPANY_EMAIL is info@murphysturf.com", () => {
    expect(COMPANY_EMAIL).toBe("info@murphysturf.com");
  });

  it("COMPANY_ADDRESS has correct city, state, and full fields", () => {
    expect(COMPANY_ADDRESS.city).toBe("Murrieta");
    expect(COMPANY_ADDRESS.state).toBe("CA");
    expect(COMPANY_ADDRESS.full).toBe("Murrieta, CA");
  });

  it("DEFAULT_OG_IMAGE starts with /", () => {
    expect(DEFAULT_OG_IMAGE.startsWith("/")).toBe(true);
  });

  it("SOCIAL_LINKS has facebook, instagram, and youtube as valid URLs", () => {
    expect(SOCIAL_LINKS).toHaveProperty("facebook");
    expect(SOCIAL_LINKS).toHaveProperty("instagram");
    expect(SOCIAL_LINKS).toHaveProperty("youtube");

    for (const [, url] of Object.entries(SOCIAL_LINKS)) {
      expect(typeof url).toBe("string");
      expect(url).toMatch(/^https?:\/\//);
    }
  });

  it("SERVICE_SLUGS has exactly 4 entries with expected slugs", () => {
    expect(SERVICE_SLUGS).toHaveLength(4);
    expect(SERVICE_SLUGS).toContain("pet-hair-debris");
    expect(SERVICE_SLUGS).toContain("blooming-decompacting");
    expect(SERVICE_SLUGS).toContain("disinfect-deodorize");
    expect(SERVICE_SLUGS).toContain("poop-scooping");
  });

  it("LOCATION_SLUGS has exactly 4 entries with expected slugs", () => {
    expect(LOCATION_SLUGS).toHaveLength(4);
    expect(LOCATION_SLUGS).toContain("huntington-beach");
    expect(LOCATION_SLUGS).toContain("murrieta");
    expect(LOCATION_SLUGS).toContain("martinez");
    expect(LOCATION_SLUGS).toContain("sacramento");
  });

  it("BLOG_SLUGS has exactly 12 entries", () => {
    expect(BLOG_SLUGS).toHaveLength(12);
  });
});
