import HomeContent from './HomeContent';
import { generatePageMetadata } from '@/lib/seo/metadata';

export const metadata = generatePageMetadata(
  'Commercial Cleaning Services in California',
  'Janitorial cleaning, day porter, disinfection, floor care, and office cleaning for California businesses. Contact our Sacramento, Murrieta, or Walnut Creek team.',
  '/',
);

export default function Home() {
  return <HomeContent />;
}
