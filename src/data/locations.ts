import regions from './regions.json';
import type { Location } from '../types';

export const locations: Location[] = [
  {
    slug: 'sacramento',
    name: 'Greater Sacramento',
    state: 'CA',
    description: `Rangel Janitorial provides professional janitorial and commercial cleaning services across the Greater Sacramento region. From office buildings and medical facilities to retail spaces and warehouses, our trained crews deliver consistent, reliable results. We serve Downtown Sacramento, Midtown Sacramento, Roseville, Folsom, Rancho Cordova, and surrounding communities with customized cleaning programs tailored to each facility's needs.`,
    serviceAreaDescription:
      "Rangel Janitorial serves the entire Sacramento metropolitan area, including Downtown Sacramento, Midtown Sacramento, Roseville, Folsom, Rancho Cordova, Citrus Heights, and surrounding communities.",
    neighborhoods: regions.find((region) => region.slug === 'sacramento')!.cities.map((city) => city.name),
    phone: regions.find((region) => region.slug === 'sacramento')!.phone.replace(/[()]/g, '').replace(/ /g, '-'),
    address: 'Sacramento, CA',
    metaTitle:
      "Professional Janitorial Services in Sacramento, CA | Rangel Janitorial",
    metaDescription:
      "Professional janitorial and commercial cleaning services in Sacramento, Downtown, Midtown, Roseville & Folsom. Licensed & insured. Call Rangel Janitorial: 916-426-2311.",
  },
  {
    slug: 'murrieta',
    name: 'Murrieta / Inland Empire',
    state: 'CA',
    description: `Rangel Janitorial is proud to serve the Murrieta and greater Inland Empire area with professional janitorial services. Our experienced crews handle everything from nightly office cleaning and floor care to specialized deep cleaning for medical offices, gyms, and retail locations. We serve Murrieta, Temecula, Menifee, Lake Elsinore, and communities throughout the Inland Empire.`,
    serviceAreaDescription:
      "Rangel Janitorial serves the entire Inland Empire — from Murrieta, Temecula, and French Valley to Menifee, Lake Elsinore, Hemet, Perris, Wildomar, Canyon Lake, Temescal Valley, and Winchester.",
    neighborhoods: regions.find((region) => region.slug === 'murrieta')!.cities.map((city) => city.name),
    phone: regions.find((region) => region.slug === 'murrieta')!.phone.replace(/[()]/g, '').replace(/ /g, '-'),
    address: 'Murrieta, CA 92562',
    metaTitle:
      "Professional Janitorial Services in Murrieta & Inland Empire | Rangel Janitorial",
    metaDescription:
      "Rangel Janitorial serves the Inland Empire with professional janitorial and commercial cleaning services. Licensed & insured. Call 951-894-4222.",
  },
  {
    slug: 'walnut-creek',
    name: 'Walnut Creek / East Bay',
    state: 'CA',
    description: `Rangel Janitorial brings professional janitorial and commercial cleaning services to Walnut Creek and the greater East Bay area. Our crews are experienced with the unique needs of Bay Area businesses — from high-rise office suites and co-working spaces to medical facilities and retail storefronts. We serve Walnut Creek, Concord, Pleasant Hill, Lafayette, Danville, and surrounding communities.`,
    serviceAreaDescription:
      "Rangel Janitorial serves Walnut Creek and the greater Contra Costa County area, including Concord, Pleasant Hill, Lafayette, Danville, Martinez, and surrounding East Bay communities.",
    neighborhoods: regions.find((region) => region.slug === 'walnut-creek')!.cities.map((city) => city.name),
    phone: regions.find((region) => region.slug === 'walnut-creek')!.phone.replace(/[()]/g, '').replace(/ /g, '-'),
    address: 'Walnut Creek, CA',
    metaTitle:
      "Professional Janitorial Services in Walnut Creek & East Bay | Rangel Janitorial",
    metaDescription:
      "Professional janitorial and commercial cleaning in Walnut Creek, Concord, Pleasant Hill & East Bay. Licensed & insured. Call Rangel Janitorial: 925-655-9008.",
  },
];
