import { describe, it, expect } from "vitest";
import {
  generateOrganizationSchema,
  generateLocalBusinessSchema,
  generateServiceSchema,
  generateLocationSchema,
  generateAggregateRatingSchema,
  generateFAQSchema,
  generateBreadcrumbSchema,
  generateWebPageSchema,
  generateBlogPostSchema,
  generateBlogListSchema,
} from "@/lib/seo/schema";

const SITE_URL = "https://rangeljanitorial.com";
const COMPANY_NAME = "Rangel Janitorial";

describe("generateOrganizationSchema", () => {
  it("returns valid schema.org context and type", () => {
    const schema = generateOrganizationSchema();
    expect(schema["@context"]).toBe("https://schema.org");
    expect(schema["@type"]).toBe("Organization");
  });

  it("includes company name and url", () => {
    const schema = generateOrganizationSchema();
    expect(schema.name).toBe(COMPANY_NAME);
    expect(schema.url).toBe(SITE_URL);
  });

  it("includes logo URL derived from SITE_URL", () => {
    const schema = generateOrganizationSchema();
    expect(schema.logo).toBe(`${SITE_URL}/images/logo.png`);
  });

  it("includes contactPoint with customer service type", () => {
    const schema = generateOrganizationSchema();
    expect(schema.contactPoint).toEqual({
      "@type": "ContactPoint",
      contactType: "customer service",
      areaServed: "US",
      availableLanguage: "English",
    });
  });

  it("includes address with city and state", () => {
    const schema = generateOrganizationSchema();
    expect(schema.address).toEqual({
      "@type": "PostalAddress",
      addressLocality: "Murrieta",
      addressRegion: "CA",
      addressCountry: "US",
    });
  });

  it("includes areaServed as California", () => {
    const schema = generateOrganizationSchema();
    expect(schema.areaServed).toEqual({
      "@type": "State",
      name: "California",
    });
  });

  it("includes 3 social links in sameAs", () => {
    const schema = generateOrganizationSchema();
    expect(schema.sameAs).toHaveLength(3);
    expect(schema.sameAs).toEqual([
      "https://www.facebook.com/profile.php?id=100090088264095",
      "https://www.instagram.com/rangeljanitorial/",
      "https://www.youtube.com/@rangeljanitorial/featured",
    ]);
  });
});

describe("generateLocalBusinessSchema", () => {
  it("returns valid schema.org context and type", () => {
    const schema = generateLocalBusinessSchema();
    expect(schema["@context"]).toBe("https://schema.org");
    expect(schema["@type"]).toBe("LocalBusiness");
  });

  it("includes @id with localbusiness fragment", () => {
    const schema = generateLocalBusinessSchema();
    expect(schema["@id"]).toBe(`${SITE_URL}/#localbusiness`);
  });

  it("includes company name, description, url, and email", () => {
    const schema = generateLocalBusinessSchema();
    expect(schema.name).toBe(COMPANY_NAME);
    expect(schema.description).toBeTruthy();
    expect(schema.url).toBe(SITE_URL);
    expect(schema.email).toBe("ralph@rangeljanitorial.com");
  });

  it("includes additionalType as ProfessionalService", () => {
    const schema = generateLocalBusinessSchema();
    expect(schema.additionalType).toBe(
      "https://schema.org/ProfessionalService"
    );
  });

  it("includes knowsAbout array with turf-related topics", () => {
    const schema = generateLocalBusinessSchema();
    expect(schema.knowsAbout).toEqual([
      "Artificial Turf Cleaning",
      "Synthetic Turf Sanitization",
      "Pet Turf Odor Removal",
      "Turf Deodorizing",
      "Turf Blooming & Decompacting",
      "Professional-Grade Deep Cleaning",
      "Poop Scooping",
    ]);
  });

  it("includes geo coordinates for Murrieta", () => {
    const schema = generateLocalBusinessSchema();
    expect(schema.geo).toEqual({
      "@type": "GeoCoordinates",
      latitude: 33.5539,
      longitude: -117.2139,
    });
  });

  it("includes opening hours for weekdays 7-18 and Saturday 8-16", () => {
    const schema = generateLocalBusinessSchema();
    expect(schema.openingHoursSpecification).toHaveLength(2);
    expect(schema.openingHoursSpecification[0]).toEqual({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "07:00",
      closes: "18:00",
    });
    expect(schema.openingHoursSpecification[1]).toEqual({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "08:00",
      closes: "16:00",
    });
  });

  it("has priceRange set to $$", () => {
    const schema = generateLocalBusinessSchema();
    expect(schema.priceRange).toBe("$$");
  });

  it("includes image URL", () => {
    const schema = generateLocalBusinessSchema();
    expect(schema.image).toBe(`${SITE_URL}/images/og-default.jpg`);
  });

  it("includes 3 social links in sameAs", () => {
    const schema = generateLocalBusinessSchema();
    expect(schema.sameAs).toHaveLength(3);
    expect(schema.sameAs).toEqual([
      "https://www.facebook.com/profile.php?id=100090088264095",
      "https://www.instagram.com/rangeljanitorial/",
      "https://www.youtube.com/@rangeljanitorial/featured",
    ]);
  });
});

describe("generateServiceSchema", () => {
  const service = {
    name: "Pet Hair & Debris Removal",
    slug: "pet-hair-debris",
    description: "Professional pet hair and debris removal from artificial turf.",
  };

  it("returns valid schema.org context and type", () => {
    const schema = generateServiceSchema(service);
    expect(schema["@context"]).toBe("https://schema.org");
    expect(schema["@type"]).toBe("Service");
  });

  it("includes serviceType as Artificial Turf Cleaning Service", () => {
    const schema = generateServiceSchema(service);
    expect(schema.serviceType).toBe("Artificial Turf Cleaning Service");
  });

  it("includes service name and description", () => {
    const schema = generateServiceSchema(service);
    expect(schema.name).toBe(service.name);
    expect(schema.description).toBe(service.description);
  });

  it("builds URL from /services/{slug} pattern", () => {
    const schema = generateServiceSchema(service);
    expect(schema.url).toBe(`${SITE_URL}/services/${service.slug}`);
  });

  it("includes provider as LocalBusiness", () => {
    const schema = generateServiceSchema(service);
    expect(schema.provider).toEqual({
      "@type": "LocalBusiness",
      name: COMPANY_NAME,
      url: SITE_URL,
    });
  });

  it("includes areaServed as California", () => {
    const schema = generateServiceSchema(service);
    expect(schema.areaServed).toEqual({
      "@type": "State",
      name: "California",
    });
  });

  it("includes offers with InStock availability and USD currency", () => {
    const schema = generateServiceSchema(service);
    expect(schema.offers).toEqual({
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceCurrency: "USD",
    });
  });
});

describe("generateLocationSchema", () => {
  const locationWithPhone = {
    name: "Sacramento",
    slug: "sacramento",
    description: "Turf cleaning in Sacramento.",
    phone: "(916) 426-2311",
  };

  const locationWithoutPhone = {
    name: "Walnut Creek",
    slug: "walnut-creek",
    description: "Turf cleaning in Walnut Creek.",
  };

  it("returns valid schema.org context and type", () => {
    const schema = generateLocationSchema(locationWithPhone);
    expect(schema["@context"]).toBe("https://schema.org");
    expect(schema["@type"]).toBe("LocalBusiness");
  });

  it("includes company name combined with location name", () => {
    const schema = generateLocationSchema(locationWithPhone);
    expect(schema.name).toBe(`${COMPANY_NAME} - Sacramento`);
  });

  it("builds URL from /locations/{slug} pattern", () => {
    const schema = generateLocationSchema(locationWithPhone);
    expect(schema.url).toBe(`${SITE_URL}/locations/sacramento`);
  });

  it("includes telephone when phone is provided", () => {
    const schema = generateLocationSchema(locationWithPhone);
    expect(schema.telephone).toBe("(916) 426-2311");
  });

  it("does not include telephone when phone is not provided", () => {
    const schema = generateLocationSchema(locationWithoutPhone);
    expect(schema).not.toHaveProperty("telephone");
  });

  it("includes additionalType as ProfessionalService", () => {
    const schema = generateLocationSchema(locationWithPhone);
    expect(schema.additionalType).toBe(
      "https://schema.org/ProfessionalService"
    );
  });

  it("includes address with location name as addressLocality and CA as region", () => {
    const schema = generateLocationSchema(locationWithPhone);
    expect(schema.address).toEqual({
      "@type": "PostalAddress",
      addressLocality: "Sacramento",
      addressRegion: "CA",
      addressCountry: "US",
    });
  });

  it("includes parentOrganization", () => {
    const schema = generateLocationSchema(locationWithPhone);
    expect(schema.parentOrganization).toEqual({
      "@type": "Organization",
      name: COMPANY_NAME,
      url: SITE_URL,
    });
  });

  it("includes serviceArea with city contained in California", () => {
    const schema = generateLocationSchema(locationWithPhone);
    expect(schema.serviceArea).toEqual({
      "@type": "City",
      name: "Sacramento",
      containedInPlace: {
        "@type": "State",
        name: "California",
      },
    });
  });
});

describe("generateAggregateRatingSchema", () => {
  it("returns valid schema.org context and type", () => {
    const schema = generateAggregateRatingSchema(4.8, 150);
    expect(schema["@context"]).toBe("https://schema.org");
    expect(schema["@type"]).toBe("AggregateRating");
  });

  it("passes through ratingValue and reviewCount", () => {
    const schema = generateAggregateRatingSchema(4.8, 150);
    expect(schema.ratingValue).toBe(4.8);
    expect(schema.reviewCount).toBe(150);
  });

  it("has bestRating of 5 and worstRating of 1", () => {
    const schema = generateAggregateRatingSchema(4.5, 100);
    expect(schema.bestRating).toBe(5);
    expect(schema.worstRating).toBe(1);
  });

  it("handles edge case values", () => {
    const schema = generateAggregateRatingSchema(1, 1);
    expect(schema.ratingValue).toBe(1);
    expect(schema.reviewCount).toBe(1);
  });
});

describe("generateFAQSchema", () => {
  it("returns valid schema.org context and type", () => {
    const schema = generateFAQSchema([]);
    expect(schema["@context"]).toBe("https://schema.org");
    expect(schema["@type"]).toBe("FAQPage");
  });

  it("returns empty mainEntity for empty array", () => {
    const schema = generateFAQSchema([]);
    expect(schema.mainEntity).toEqual([]);
  });

  it("maps a single FAQ to Question/Answer types", () => {
    const faqs = [
      { question: "How often should I clean my turf?", answer: "Every 6 months." },
    ];
    const schema = generateFAQSchema(faqs);
    expect(schema.mainEntity).toHaveLength(1);
    expect(schema.mainEntity[0]).toEqual({
      "@type": "Question",
      name: "How often should I clean my turf?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Every 6 months.",
      },
    });
  });

  it("maps multiple FAQs correctly", () => {
    const faqs = [
      { question: "Q1?", answer: "A1." },
      { question: "Q2?", answer: "A2." },
      { question: "Q3?", answer: "A3." },
    ];
    const schema = generateFAQSchema(faqs);
    expect(schema.mainEntity).toHaveLength(3);
    schema.mainEntity.forEach((entry, index) => {
      expect(entry["@type"]).toBe("Question");
      expect(entry.name).toBe(faqs[index].question);
      expect(entry.acceptedAnswer["@type"]).toBe("Answer");
      expect(entry.acceptedAnswer.text).toBe(faqs[index].answer);
    });
  });
});

describe("generateBreadcrumbSchema", () => {
  it("returns valid schema.org context and type", () => {
    const schema = generateBreadcrumbSchema([]);
    expect(schema["@context"]).toBe("https://schema.org");
    expect(schema["@type"]).toBe("BreadcrumbList");
  });

  it("returns empty itemListElement for empty array", () => {
    const schema = generateBreadcrumbSchema([]);
    expect(schema.itemListElement).toEqual([]);
  });

  it("starts positions at 1", () => {
    const items = [
      { name: "Home", url: `${SITE_URL}` },
      { name: "Services", url: `${SITE_URL}/services` },
    ];
    const schema = generateBreadcrumbSchema(items);
    expect(schema.itemListElement[0].position).toBe(1);
    expect(schema.itemListElement[1].position).toBe(2);
  });

  it("maps multiple items with correct ListItem type, name, and item", () => {
    const items = [
      { name: "Home", url: `${SITE_URL}` },
      { name: "Services", url: `${SITE_URL}/services` },
      { name: "Pet Hair Removal", url: `${SITE_URL}/services/pet-hair-debris` },
    ];
    const schema = generateBreadcrumbSchema(items);
    expect(schema.itemListElement).toHaveLength(3);
    schema.itemListElement.forEach((element, index) => {
      expect(element["@type"]).toBe("ListItem");
      expect(element.position).toBe(index + 1);
      expect(element.name).toBe(items[index].name);
      expect(element.item).toBe(items[index].url);
    });
  });
});

describe("generateWebPageSchema", () => {
  it("returns valid schema.org context and type", () => {
    const schema = generateWebPageSchema(
      "About Us",
      "Learn about our company.",
      `${SITE_URL}/about`
    );
    expect(schema["@context"]).toBe("https://schema.org");
    expect(schema["@type"]).toBe("WebPage");
  });

  it("includes title, description, and url", () => {
    const schema = generateWebPageSchema(
      "About Us",
      "Learn about our company.",
      `${SITE_URL}/about`
    );
    expect(schema.name).toBe("About Us");
    expect(schema.description).toBe("Learn about our company.");
    expect(schema.url).toBe(`${SITE_URL}/about`);
  });

  it("includes isPartOf referencing the WebSite", () => {
    const schema = generateWebPageSchema(
      "Contact",
      "Get in touch.",
      `${SITE_URL}/contact`
    );
    expect(schema.isPartOf).toEqual({
      "@type": "WebSite",
      name: COMPANY_NAME,
      url: SITE_URL,
    });
  });
});

describe("generateBlogPostSchema", () => {
  const basePost = {
    title: "How to Clean Artificial Turf",
    slug: "how-to-clean-artificial-turf",
    description: "A comprehensive guide to cleaning artificial turf.",
    datePublished: "2025-01-15",
  };

  it("returns valid schema.org context and type", () => {
    const schema = generateBlogPostSchema(basePost);
    expect(schema["@context"]).toBe("https://schema.org");
    expect(schema["@type"]).toBe("BlogPosting");
  });

  it("includes headline, description, and url", () => {
    const schema = generateBlogPostSchema(basePost);
    expect(schema.headline).toBe(basePost.title);
    expect(schema.description).toBe(basePost.description);
    expect(schema.url).toBe(`${SITE_URL}/blog/${basePost.slug}`);
  });

  it("falls back dateModified to datePublished when not provided", () => {
    const schema = generateBlogPostSchema(basePost);
    expect(schema.datePublished).toBe("2025-01-15");
    expect(schema.dateModified).toBe("2025-01-15");
  });

  it("uses dateModified when explicitly provided", () => {
    const post = { ...basePost, dateModified: "2025-06-01" };
    const schema = generateBlogPostSchema(post);
    expect(schema.datePublished).toBe("2025-01-15");
    expect(schema.dateModified).toBe("2025-06-01");
  });

  it("uses default author (company name) when author is not provided", () => {
    const schema = generateBlogPostSchema(basePost);
    expect(schema.author).toEqual({
      "@type": "Organization",
      name: COMPANY_NAME,
      url: SITE_URL,
    });
  });

  it("uses custom author when provided", () => {
    const post = { ...basePost, author: "John Rangel" };
    const schema = generateBlogPostSchema(post);
    expect(schema.author).toEqual({
      "@type": "Organization",
      name: "John Rangel",
      url: SITE_URL,
    });
  });

  it("includes publisher with logo", () => {
    const schema = generateBlogPostSchema(basePost);
    expect(schema.publisher).toEqual({
      "@type": "Organization",
      name: COMPANY_NAME,
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/images/logo.png`,
      },
    });
  });

  it("uses default image when no image is provided", () => {
    const schema = generateBlogPostSchema(basePost);
    expect(schema.image).toBe(`${SITE_URL}/images/og-default.jpg`);
  });

  it("prepends SITE_URL to relative image paths", () => {
    const post = { ...basePost, image: "/images/turf-cleaning.jpg" };
    const schema = generateBlogPostSchema(post);
    expect(schema.image).toBe(`${SITE_URL}/images/turf-cleaning.jpg`);
  });

  it("uses absolute image URL as-is", () => {
    const post = {
      ...basePost,
      image: "https://cdn.example.com/photo.jpg",
    };
    const schema = generateBlogPostSchema(post);
    expect(schema.image).toBe("https://cdn.example.com/photo.jpg");
  });

  it("includes mainEntityOfPage with WebPage @id", () => {
    const schema = generateBlogPostSchema(basePost);
    expect(schema.mainEntityOfPage).toEqual({
      "@type": "WebPage",
      "@id": `${SITE_URL}/blog/${basePost.slug}`,
    });
  });
});

describe("generateBlogListSchema", () => {
  it("returns valid schema.org context and type", () => {
    const schema = generateBlogListSchema([]);
    expect(schema["@context"]).toBe("https://schema.org");
    expect(schema["@type"]).toBe("Blog");
  });

  it("includes blog name and description", () => {
    const schema = generateBlogListSchema([]);
    expect(schema.name).toBe(`${COMPANY_NAME} Blog`);
    expect(schema.description).toBe(
      "Artificial turf cleaning tips, deep cleaning guides, pet turf maintenance advice, and synthetic turf care for California homeowners and businesses."
    );
  });

  it("includes blog URL", () => {
    const schema = generateBlogListSchema([]);
    expect(schema.url).toBe(`${SITE_URL}/blog`);
  });

  it("includes publisher organization", () => {
    const schema = generateBlogListSchema([]);
    expect(schema.publisher).toEqual({
      "@type": "Organization",
      name: COMPANY_NAME,
      url: SITE_URL,
    });
  });

  it("returns empty blogPost array for empty posts", () => {
    const schema = generateBlogListSchema([]);
    expect(schema.blogPost).toEqual([]);
  });

  it("maps multiple posts to BlogPosting entries with headline and url", () => {
    const posts = [
      { title: "Post One", slug: "post-one" },
      { title: "Post Two", slug: "post-two" },
      { title: "Post Three", slug: "post-three" },
    ];
    const schema = generateBlogListSchema(posts);
    expect(schema.blogPost).toHaveLength(3);
    schema.blogPost.forEach((entry, index) => {
      expect(entry["@type"]).toBe("BlogPosting");
      expect(entry.headline).toBe(posts[index].title);
      expect(entry.url).toBe(`${SITE_URL}/blog/${posts[index].slug}`);
    });
  });
});
