import { SITE_URL, COMPANY_NAME, COMPANY_DESCRIPTION } from "./constants";
import business from "@/data/business.json";
import regions from "@/data/regions.json";

export const ORGANIZATION_ID = `${SITE_URL}/#organization`;

export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORGANIZATION_ID,
    name: business.name,
    description: COMPANY_DESCRIPTION,
    url: SITE_URL,
    email: business.email,
    logo: `${SITE_URL}/images/logo-small.webp`,
    location: { "@id": `${SITE_URL}/#headquarters` },
    contactPoint: regions.map((region) => ({
      "@type": "ContactPoint",
      "@id": `${SITE_URL}/#contact-${region.slug}`,
      telephone: region.phoneHref.replace('tel:', ''),
      contactType: "customer service",
      areaServed: region.cities.map((city) => city.name),
      url: `${SITE_URL}/locations/${region.slug}`,
    })),
    sameAs: Object.values(business.socialLinks),
  };
}

export function generateLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE_URL}/#headquarters`,
    name: business.name,
    url: `${SITE_URL}/locations/murrieta`,
    telephone: regions.find((region) => region.slug === 'murrieta')!.phoneHref.replace('tel:', ''),
    email: business.email,
    address: { "@type": "PostalAddress", ...business.headquarters },
    parentOrganization: { "@id": ORGANIZATION_ID },
    image: `${SITE_URL}/images/og-image.png`,
  };
}

export function generateServiceSchema(service: { name: string; slug: string; description: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE_URL}/services/${service.slug}#service`,
    name: service.name,
    serviceType: service.name,
    description: service.description,
    url: `${SITE_URL}/services/${service.slug}`,
    provider: { "@id": ORGANIZATION_ID },
    areaServed: regions.flatMap((region) => region.cities.map((city) => ({ "@type": "City", name: city.name, address: {"@type": "PostalAddress", addressRegion: "CA", addressCountry: "US"} }))),
  };
}

export function generateLocationSchema(location: { name: string; slug: string; description: string; phone?: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE_URL}/locations/${location.slug}#service`,
    name: `Commercial cleaning in ${location.name}`,
    description: location.description,
    url: `${SITE_URL}/locations/${location.slug}`,
    provider: { "@id": ORGANIZATION_ID },
    areaServed: { "@type": "City", name: location.name, containedInPlace: { "@type": "State", name: "California" } },
  };
}

export function generateAggregateRatingSchema(
  ratingValue: number,
  reviewCount: number
) {
  return {
    "@context": "https://schema.org",
    "@type": "AggregateRating",
    ratingValue,
    reviewCount,
    bestRating: 5,
    worstRating: 1,
  };
}

export function generateFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function generateBreadcrumbSchema(
  items: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function generateWebPageSchema(
  title: string,
  description: string,
  url: string
) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description,
    url,
    isPartOf: {
      "@type": "WebSite",
      name: COMPANY_NAME,
      url: SITE_URL,
    },
  };
}

export function generateBlogPostSchema(post: {
  title: string;
  slug: string;
  description: string;
  datePublished: string;
  dateModified?: string;
  author?: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    url: `${SITE_URL}/blog/${post.slug}`,
    datePublished: post.datePublished,
    ...(post.dateModified ? { dateModified: post.dateModified } : {}),
    author: {
      "@id": ORGANIZATION_ID,
      "@type": "Organization",
      name: post.author || COMPANY_NAME,
      url: SITE_URL,
    },
    publisher: {
      "@id": ORGANIZATION_ID,
      "@type": "Organization",
      name: COMPANY_NAME,
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/images/logo.webp`,
      },
    },
    image: post.image
      ? post.image.startsWith("http")
        ? post.image
        : `${SITE_URL}${post.image}`
      : `${SITE_URL}/images/og-image.png`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blog/${post.slug}`,
    },
  };
}

export function generateBlogListSchema(posts: { title: string; slug: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: `${COMPANY_NAME} Blog`,
    description: "Janitorial and commercial cleaning tips, facility maintenance guides, and professional cleaning insights for California businesses and property managers.",
    url: `${SITE_URL}/blog`,
    publisher: {
      "@id": ORGANIZATION_ID,
      "@type": "Organization",
      name: COMPANY_NAME,
      url: SITE_URL,
    },
    blogPost: posts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      url: `${SITE_URL}/blog/${post.slug}`,
    })),
  };
}
