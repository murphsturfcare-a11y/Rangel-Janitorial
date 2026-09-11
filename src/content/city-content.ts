import { BLOG_SUMMARIES } from './blog-index';

export interface LocalDetail { heading: string; paragraphs: string[]; }
export interface CityContent { name: string; slug: string; localDetails?: LocalDetail[]; }

// Add owner-confirmed local details to the matching city in regions.json.
// Geography alone is not evidence of a completed project or a physical office.
export function getCityGuides(regionSlug: string, cityName: string) {
  const regionCategory = ({sacramento: 'Sacramento Guides', murrieta: 'Murrieta Guides', 'walnut-creek': 'Walnut Creek Guides'} as Record<string, string>)[regionSlug];
  return BLOG_SUMMARIES.filter((post) => post.category === regionCategory)
    .sort((a, b) => Number(b.title.toLowerCase().includes(cityName.toLowerCase())) - Number(a.title.toLowerCase().includes(cityName.toLowerCase())))
    .slice(0, 3);
}
