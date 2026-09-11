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
  const brandedTitle = `${title.replace(/\s*\|\s*Rangel Janitorial(?: Blog)?/g, "")} | ${COMPANY_NAME}`;
  const url = `${SITE_URL}${path}`;
  const ogImage = image || DEFAULT_OG_IMAGE;

  return {
    title: { absolute: brandedTitle },
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: brandedTitle,
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
      title: brandedTitle,
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
  const title = `${service.name} | Commercial Cleaning California`;
  const description = `${service.shortDescription} Professional ${service.name.toLowerCase()} by ${COMPANY_NAME} — 30+ years experience. Get a free quote today!`;

  return generatePageMetadata(title, description, `/services/${service.slug}`);
}

export function generateLocationMetadata(location: {
  name: string;
  slug: string;
  description: string;
}): Metadata {
  const title = `Janitorial & Commercial Cleaning in ${location.name}, CA`;
  const description = `${location.description} ${COMPANY_NAME} provides professional janitorial and commercial cleaning services in ${location.name}, CA. Get a free estimate today!`;

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
    title: { absolute: `${post.title} | ${COMPANY_NAME}` },
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
    "Commercial Cleaning Blog — Tips & Guides",
    "Expert janitorial and commercial cleaning tips, facility maintenance guides, and industry insights from Rangel Janitorial. 30+ years of experience keeping California facilities clean and professional.",
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
    "janitorial services",
    "commercial cleaning",
    "office cleaning",
    "janitorial company California",
    "day porter services",
    "electrostatic disinfection",
    "floor care services",
    "office cleaning commercial",
    "janitorial services Sacramento",
    "janitorial services Murrieta",
    "janitorial services Walnut Creek",
    "medical facility cleaning",
    "Rangel Janitorial",
  ],
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
