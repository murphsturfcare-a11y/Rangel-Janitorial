import type { Metadata } from "next";
import {
  SITE_URL,
  COMPANY_NAME,
  COMPANY_DESCRIPTION,
  DEFAULT_OG_IMAGE,
} from "./constants";

export function generatePageMetadata(
  title: string,
  description: string,
  path: string,
  image?: string
): Metadata {
  const url = `${SITE_URL}${path}`;
  const ogImage = image || DEFAULT_OG_IMAGE;

  return {
    title: `${title} | ${COMPANY_NAME}`,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${title} | ${COMPANY_NAME}`,
      description,
      url,
      siteName: COMPANY_NAME,
      images: [
        {
          url: ogImage.startsWith("http") ? ogImage : `${SITE_URL}${ogImage}`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${COMPANY_NAME}`,
      description,
      images: [ogImage.startsWith("http") ? ogImage : `${SITE_URL}${ogImage}`],
    },
  };
}

export function generateServiceMetadata(service: {
  name: string;
  slug: string;
  shortDescription: string;
}): Metadata {
  const title = `${service.name} in California`;
  const description = `${service.shortDescription} Professional ${service.name.toLowerCase()} across California by ${COMPANY_NAME}. Get a free quote today!`;

  return generatePageMetadata(title, description, `/services/${service.slug}`);
}

export function generateLocationMetadata(location: {
  name: string;
  slug: string;
  description: string;
}): Metadata {
  const title = `Artificial Turf Cleaning in ${location.name}, CA`;
  const description = `${location.description} ${COMPANY_NAME} provides professional artificial turf cleaning and sanitization in ${location.name}, CA. Call today for a free estimate!`;

  return generatePageMetadata(
    title,
    description,
    `/locations/${location.slug}`
  );
}

export function generateBlogMetadata(post: {
  title: string;
  slug: string;
  description: string;
  image?: string;
}): Metadata {
  const ogImage = post.image || DEFAULT_OG_IMAGE;

  return {
    title: `${post.title} | ${COMPANY_NAME} Blog`,
    description: post.description,
    alternates: {
      canonical: `${SITE_URL}/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `${SITE_URL}/blog/${post.slug}`,
      siteName: COMPANY_NAME,
      type: "article",
      images: [
        {
          url: ogImage.startsWith("http") ? ogImage : `${SITE_URL}${ogImage}`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [ogImage.startsWith("http") ? ogImage : `${SITE_URL}${ogImage}`],
    },
  };
}

export function generateBlogIndexMetadata(): Metadata {
  return generatePageMetadata(
    "Artificial Turf Cleaning Blog — Tips & Guides",
    "Expert artificial turf cleaning tips, synthetic turf maintenance guides, and pet turf care advice from Murphy's Turf Care. Keep your California artificial turf fresh and clean.",
    "/blog"
  );
}

export const DEFAULT_METADATA: Metadata = {
  title: {
    default: COMPANY_NAME,
    template: `%s | ${COMPANY_NAME}`,
  },
  description: COMPANY_DESCRIPTION,
  metadataBase: new URL(SITE_URL),
  keywords: [
    "artificial turf cleaning",
    "synthetic turf cleaning",
    "turf sanitization",
    "pet turf cleaning",
    "turf odor removal",
    "turf deodorizing",
    "artificial grass cleaning",
    "turf maintenance California",
    "commercial turf cleaning",
    "turf repair",
  ],
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: COMPANY_NAME,
    description: COMPANY_DESCRIPTION,
    url: SITE_URL,
    siteName: COMPANY_NAME,
    images: [
      {
        url: `${SITE_URL}${DEFAULT_OG_IMAGE}`,
        width: 1200,
        height: 630,
        alt: COMPANY_NAME,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: COMPANY_NAME,
    description: COMPANY_DESCRIPTION,
    images: [`${SITE_URL}${DEFAULT_OG_IMAGE}`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};
