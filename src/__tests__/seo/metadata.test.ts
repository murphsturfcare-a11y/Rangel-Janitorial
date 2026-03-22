import { describe, it, expect } from "vitest";
import {
  generatePageMetadata,
  generateServiceMetadata,
  generateLocationMetadata,
  generateBlogMetadata,
  generateBlogIndexMetadata,
  DEFAULT_METADATA,
} from "@/lib/seo/metadata";

const SITE_URL = "https://murphysturf.com";
const COMPANY_NAME = "Murphy's Turf";
const DEFAULT_OG_IMAGE = "/images/og-default.jpg";

describe("generatePageMetadata", () => {
  it("formats the title as '{title} | Murphy's Turf'", () => {
    const meta = generatePageMetadata("About Us", "Our story", "/about");
    expect(meta.title).toBe("About Us | Murphy's Turf");
  });

  it("sets the canonical URL from SITE_URL + path", () => {
    const meta = generatePageMetadata("About Us", "Our story", "/about");
    expect(meta.alternates?.canonical).toBe(`${SITE_URL}/about`);
  });

  it("uses DEFAULT_OG_IMAGE when no image is provided", () => {
    const meta = generatePageMetadata("About Us", "Our story", "/about");
    const ogImages = (meta.openGraph as any)?.images;
    expect(ogImages).toHaveLength(1);
    expect(ogImages[0].url).toBe(`${SITE_URL}${DEFAULT_OG_IMAGE}`);
    expect(ogImages[0].width).toBe(1200);
    expect(ogImages[0].height).toBe(630);
    expect(ogImages[0].alt).toBe("About Us");
  });

  it("prepends SITE_URL to a relative custom image", () => {
    const meta = generatePageMetadata(
      "About Us",
      "Our story",
      "/about",
      "/images/custom.jpg"
    );
    const ogImages = (meta.openGraph as any)?.images;
    expect(ogImages[0].url).toBe(`${SITE_URL}/images/custom.jpg`);
  });

  it("keeps an absolute custom image URL as-is", () => {
    const absUrl = "https://cdn.example.com/photo.jpg";
    const meta = generatePageMetadata("About Us", "Our story", "/about", absUrl);
    const ogImages = (meta.openGraph as any)?.images;
    expect(ogImages[0].url).toBe(absUrl);
  });

  it("sets OpenGraph fields correctly", () => {
    const meta = generatePageMetadata("Contact", "Get in touch", "/contact");
    const og = meta.openGraph as any;
    expect(og.title).toBe("Contact | Murphy's Turf");
    expect(og.description).toBe("Get in touch");
    expect(og.url).toBe(`${SITE_URL}/contact`);
    expect(og.siteName).toBe(COMPANY_NAME);
    expect(og.locale).toBe("en_US");
    expect(og.type).toBe("website");
  });

  it("sets twitter card to summary_large_image with correct fields", () => {
    const meta = generatePageMetadata("Contact", "Get in touch", "/contact");
    const twitter = meta.twitter as any;
    expect(twitter.card).toBe("summary_large_image");
    expect(twitter.title).toBe("Contact | Murphy's Turf");
    expect(twitter.description).toBe("Get in touch");
  });

  it("uses the default OG image for twitter when no image provided", () => {
    const meta = generatePageMetadata("Contact", "Get in touch", "/contact");
    const twitter = meta.twitter as any;
    expect(twitter.images).toEqual([`${SITE_URL}${DEFAULT_OG_IMAGE}`]);
  });

  it("uses an absolute image for twitter as-is", () => {
    const absUrl = "https://cdn.example.com/tw.jpg";
    const meta = generatePageMetadata("X", "Y", "/x", absUrl);
    const twitter = meta.twitter as any;
    expect(twitter.images).toEqual([absUrl]);
  });

  it("prepends SITE_URL to a relative image for twitter", () => {
    const meta = generatePageMetadata("X", "Y", "/x", "/img/rel.jpg");
    const twitter = meta.twitter as any;
    expect(twitter.images).toEqual([`${SITE_URL}/img/rel.jpg`]);
  });
});

describe("generateServiceMetadata", () => {
  const service = {
    name: "Deep Cleaning",
    slug: "deep-cleaning",
    shortDescription: "Our deep cleaning service restores your turf.",
  };

  it("includes the service name and 'Artificial Turf Cleaning California' in the title", () => {
    const meta = generateServiceMetadata(service);
    const title = meta.title as string;
    expect(title).toContain("Deep Cleaning");
    expect(title).toContain("Artificial Turf Cleaning California");
  });

  it("includes the shortDescription in the metadata description", () => {
    const meta = generateServiceMetadata(service);
    expect(meta.description).toContain(service.shortDescription);
  });

  it("includes the company name in the description", () => {
    const meta = generateServiceMetadata(service);
    expect(meta.description).toContain(COMPANY_NAME);
  });

  it("sets the canonical path to /services/{slug}", () => {
    const meta = generateServiceMetadata(service);
    expect(meta.alternates?.canonical).toBe(
      `${SITE_URL}/services/${service.slug}`
    );
  });

  it("uses the lowercased service name in the description", () => {
    const meta = generateServiceMetadata(service);
    expect(meta.description).toContain("deep cleaning");
  });
});

describe("generateLocationMetadata", () => {
  const location = {
    name: "Huntington Beach",
    slug: "huntington-beach",
    description: "Serving the Huntington Beach area.",
  };

  it("formats the title as 'Artificial Turf Cleaning in {name}, CA'", () => {
    const meta = generateLocationMetadata(location);
    const title = meta.title as string;
    expect(title).toContain("Artificial Turf Cleaning in Huntington Beach, CA");
  });

  it("sets the canonical path to /locations/{slug}", () => {
    const meta = generateLocationMetadata(location);
    expect(meta.alternates?.canonical).toBe(
      `${SITE_URL}/locations/${location.slug}`
    );
  });

  it("includes the location description and company name in metadata description", () => {
    const meta = generateLocationMetadata(location);
    expect(meta.description).toContain(location.description);
    expect(meta.description).toContain(COMPANY_NAME);
    expect(meta.description).toContain("Huntington Beach, CA");
  });
});

describe("generateBlogMetadata", () => {
  const post = {
    title: "How to Clean Turf",
    slug: "how-to-clean-turf",
    description: "A guide to cleaning turf properly.",
  };

  it("formats the title as '{title} | Murphy's Turf Blog'", () => {
    const meta = generateBlogMetadata(post);
    expect(meta.title).toBe("How to Clean Turf | Murphy's Turf Blog");
  });

  it("sets the canonical URL to /blog/{slug}", () => {
    const meta = generateBlogMetadata(post);
    expect(meta.alternates?.canonical).toBe(
      `${SITE_URL}/blog/${post.slug}`
    );
  });

  it("sets OpenGraph type to 'article'", () => {
    const meta = generateBlogMetadata(post);
    const og = meta.openGraph as any;
    expect(og.type).toBe("article");
  });

  it("uses the post title (without blog suffix) in OpenGraph title", () => {
    const meta = generateBlogMetadata(post);
    const og = meta.openGraph as any;
    expect(og.title).toBe("How to Clean Turf");
  });

  it("uses DEFAULT_OG_IMAGE when no post image is provided", () => {
    const meta = generateBlogMetadata(post);
    const og = meta.openGraph as any;
    expect(og.images[0].url).toBe(`${SITE_URL}${DEFAULT_OG_IMAGE}`);
  });

  it("uses a provided absolute image as-is", () => {
    const absUrl = "https://cdn.example.com/blog.jpg";
    const meta = generateBlogMetadata({ ...post, image: absUrl });
    const og = meta.openGraph as any;
    expect(og.images[0].url).toBe(absUrl);
  });

  it("prepends SITE_URL to a relative post image", () => {
    const meta = generateBlogMetadata({ ...post, image: "/img/blog.jpg" });
    const og = meta.openGraph as any;
    expect(og.images[0].url).toBe(`${SITE_URL}/img/blog.jpg`);
  });

  it("sets twitter card fields using the post title", () => {
    const meta = generateBlogMetadata(post);
    const twitter = meta.twitter as any;
    expect(twitter.card).toBe("summary_large_image");
    expect(twitter.title).toBe("How to Clean Turf");
    expect(twitter.description).toBe(post.description);
  });

  it("handles twitter image the same as OG image", () => {
    const absUrl = "https://cdn.example.com/blog.jpg";
    const meta = generateBlogMetadata({ ...post, image: absUrl });
    const twitter = meta.twitter as any;
    expect(twitter.images).toEqual([absUrl]);
  });
});

describe("generateBlogIndexMetadata", () => {
  it("returns metadata for the /blog path", () => {
    const meta = generateBlogIndexMetadata();
    expect(meta.alternates?.canonical).toBe(`${SITE_URL}/blog`);
  });

  it("includes a title about artificial turf cleaning blog", () => {
    const meta = generateBlogIndexMetadata();
    const title = meta.title as string;
    expect(title).toContain("Artificial Turf Cleaning Blog");
  });

  it("includes a description with tips and experience", () => {
    const meta = generateBlogIndexMetadata();
    expect(meta.description).toContain("turf cleaning tips");
    expect(meta.description).toContain("30+ years");
  });
});

describe("DEFAULT_METADATA", () => {
  it("has a title template with the company name", () => {
    const titleObj = DEFAULT_METADATA.title as {
      default: string;
      template: string;
    };
    expect(titleObj.default).toBe(COMPANY_NAME);
    expect(titleObj.template).toBe(`%s | ${COMPANY_NAME}`);
  });

  it("contains exactly 13 keywords", () => {
    expect(DEFAULT_METADATA.keywords).toHaveLength(13);
  });

  it("includes key SEO keywords", () => {
    const keywords = DEFAULT_METADATA.keywords as string[];
    expect(keywords).toContain("artificial turf cleaning");
    expect(keywords).toContain("OxyTurf");
    expect(keywords).toContain("Murphy's Turf");
    expect(keywords).toContain("turf sanitization");
  });

  it("has metadataBase set to the site URL", () => {
    expect((DEFAULT_METADATA.metadataBase as URL).toString()).toBe(
      `${SITE_URL}/`
    );
  });

  it("sets the canonical alternate to SITE_URL", () => {
    expect(DEFAULT_METADATA.alternates?.canonical).toBe(SITE_URL);
  });

  it("configures OpenGraph with company details", () => {
    const og = DEFAULT_METADATA.openGraph as any;
    expect(og.title).toBe(COMPANY_NAME);
    expect(og.url).toBe(SITE_URL);
    expect(og.siteName).toBe(COMPANY_NAME);
    expect(og.locale).toBe("en_US");
    expect(og.type).toBe("website");
    expect(og.images[0].url).toBe(`${SITE_URL}${DEFAULT_OG_IMAGE}`);
    expect(og.images[0].width).toBe(1200);
    expect(og.images[0].height).toBe(630);
  });

  it("configures twitter card with company details", () => {
    const twitter = DEFAULT_METADATA.twitter as any;
    expect(twitter.card).toBe("summary_large_image");
    expect(twitter.title).toBe(COMPANY_NAME);
    expect(twitter.images).toEqual([`${SITE_URL}${DEFAULT_OG_IMAGE}`]);
  });

  it("enables robots indexing and following", () => {
    const robots = DEFAULT_METADATA.robots as any;
    expect(robots.index).toBe(true);
    expect(robots.follow).toBe(true);
  });

  it("configures googleBot with correct directives", () => {
    const googleBot = (DEFAULT_METADATA.robots as any).googleBot;
    expect(googleBot.index).toBe(true);
    expect(googleBot.follow).toBe(true);
    expect(googleBot["max-video-preview"]).toBe(-1);
    expect(googleBot["max-image-preview"]).toBe("large");
    expect(googleBot["max-snippet"]).toBe(-1);
  });
});
