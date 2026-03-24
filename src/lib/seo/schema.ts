import {
  SITE_URL,
  COMPANY_NAME,
  COMPANY_DESCRIPTION,
  COMPANY_EMAIL,
  COMPANY_ADDRESS,
  SOCIAL_LINKS,
} from "./constants";

export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: COMPANY_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/images/logo.png`,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      areaServed: "US",
      availableLanguage: "English",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: COMPANY_ADDRESS.city,
      addressRegion: COMPANY_ADDRESS.state,
      addressCountry: "US",
    },
    areaServed: {
      "@type": "State",
      name: "California",
    },
    sameAs: [
      SOCIAL_LINKS.facebook,
      SOCIAL_LINKS.instagram,
      SOCIAL_LINKS.youtube,
    ],
  };
}

export function generateLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE_URL}/#localbusiness`,
    name: COMPANY_NAME,
    description: COMPANY_DESCRIPTION,
    url: SITE_URL,
    email: COMPANY_EMAIL,
    additionalType: "https://schema.org/ProfessionalService",
    knowsAbout: [
      "Artificial Turf Cleaning",
      "Synthetic Turf Sanitization",
      "Pet Turf Odor Removal",
      "Turf Deodorizing",
      "Turf Blooming & Decompacting",
      "Professional-Grade Deep Cleaning",
      "Poop Scooping",
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: COMPANY_ADDRESS.city,
      addressRegion: COMPANY_ADDRESS.state,
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 33.5539,
      longitude: -117.2139,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "07:00",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "08:00",
        closes: "16:00",
      },
    ],
    priceRange: "$$",
    image: `${SITE_URL}/images/og-image.png`,
    sameAs: [
      SOCIAL_LINKS.facebook,
      SOCIAL_LINKS.instagram,
      SOCIAL_LINKS.youtube,
    ],
  };
}

export function generateServiceSchema(service: {
  name: string;
  slug: string;
  description: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Artificial Turf Cleaning Service",
    name: service.name,
    description: service.description,
    url: `${SITE_URL}/services/${service.slug}`,
    provider: {
      "@type": "LocalBusiness",
      name: COMPANY_NAME,
      url: SITE_URL,
    },
    areaServed: {
      "@type": "State",
      name: "California",
    },
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceCurrency: "USD",
    },
  };
}

export function generateLocationSchema(location: {
  name: string;
  slug: string;
  description: string;
  phone?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: `${COMPANY_NAME} - ${location.name}`,
    description: location.description,
    url: `${SITE_URL}/locations/${location.slug}`,
    ...(location.phone ? { telephone: location.phone } : {}),
    additionalType: "https://schema.org/ProfessionalService",
    address: {
      "@type": "PostalAddress",
      addressLocality: location.name,
      addressRegion: "CA",
      addressCountry: "US",
    },
    parentOrganization: {
      "@type": "Organization",
      name: COMPANY_NAME,
      url: SITE_URL,
    },
    serviceArea: {
      "@type": "City",
      name: location.name,
      containedInPlace: {
        "@type": "State",
        name: "California",
      },
    },
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
    dateModified: post.dateModified || post.datePublished,
    author: {
      "@type": "Organization",
      name: post.author || COMPANY_NAME,
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: COMPANY_NAME,
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/images/logo.png`,
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
    description: "Artificial turf cleaning tips, deep cleaning guides, pet turf maintenance advice, and synthetic turf care for California homeowners and businesses.",
    url: `${SITE_URL}/blog`,
    publisher: {
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
