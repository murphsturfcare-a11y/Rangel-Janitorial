import type { MetadataRoute } from "next";
import { SITE_URL, SERVICE_SLUGS, LOCATION_SLUGS, BLOG_SLUGS } from "@/lib/seo/constants";

export const dynamic = "force-static";

function toSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[\/]/g, '-')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

const SUBLOCATION_DATA: Record<string, string[]> = {
  sacramento: [
    'Sacramento', 'Elk Grove', 'Roseville', 'Folsom', 'Rancho Cordova',
    'Citrus Heights', 'Natomas', 'West Sacramento', 'Carmichael', 'Fair Oaks',
    'Orangevale', 'Antelope', 'North Highlands', 'Arden-Arcade', 'Rocklin',
    'Lincoln', 'Woodland', 'Davis', 'Loomis', 'Granite Bay',
  ],
  murrieta: [
    'Murrieta', 'Temecula', 'French Valley', 'Menifee', 'Lake Elsinore',
    'Hemet', 'Perris', 'Wildomar', 'Canyon Lake', 'Temescal Valley',
    'Winchester', 'Ontario', 'Fontana', 'Rialto', 'Corona',
    'Riverside', 'Moreno Valley', 'San Jacinto', 'Beaumont', 'Eastvale',
  ],
  'walnut-creek': [
    'Walnut Creek', 'Concord', 'Pleasant Hill', 'Lafayette', 'Danville',
    'Martinez', 'San Ramon', 'Dublin', 'Livermore', 'Pleasanton',
    'Orinda', 'Moraga', 'Alamo', 'Clayton', 'Antioch',
    'Brentwood', 'Oakley', 'Pittsburg', 'Bay Point', 'El Cerrito',
  ],
};

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/services`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/locations`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/terms-of-service`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    },
  ];

  const servicePages: MetadataRoute.Sitemap = SERVICE_SLUGS.map((slug) => ({
    url: `${SITE_URL}/services/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  const locationPages: MetadataRoute.Sitemap = LOCATION_SLUGS.map((slug) => ({
    url: `${SITE_URL}/locations/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  const sublocationPages: MetadataRoute.Sitemap = Object.entries(SUBLOCATION_DATA).flatMap(
    ([regionSlug, cities]) =>
      cities.map((city) => ({
        url: `${SITE_URL}/locations/${regionSlug}/${toSlug(city)}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.7,
      }))
  );

  const blogPages: MetadataRoute.Sitemap = BLOG_SLUGS.map((slug) => ({
    url: `${SITE_URL}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...servicePages, ...locationPages, ...sublocationPages, ...blogPages];
}
