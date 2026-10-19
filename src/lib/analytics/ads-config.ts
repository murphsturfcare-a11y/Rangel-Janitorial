const adsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || '';
const conversionLabel = process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL || '';
export const GOOGLE_ADS_ID = /^AW-\d{6,20}$/.test(adsId) ? adsId : '';
export const GOOGLE_ADS_CONVERSION_LABEL = /^[A-Za-z0-9_-]{1,100}$/.test(conversionLabel) ? conversionLabel : '';
export const GOOGLE_ADS_CONFIGURED = Boolean(GOOGLE_ADS_ID && GOOGLE_ADS_CONVERSION_LABEL);

// Separate, verified calls-from-website actions. Never reuse the quote receipt label.
const websiteCallLabels: Record<string, string | undefined> = {
  sacramento: process.env.NEXT_PUBLIC_GOOGLE_ADS_WEBSITE_CALL_LABEL_SACRAMENTO,
  'walnut-creek': process.env.NEXT_PUBLIC_GOOGLE_ADS_WEBSITE_CALL_LABEL_WALNUT_CREEK,
};
export function websiteCallLabel(region: string): string {
  const label = websiteCallLabels[region] || '';
  return /^[A-Za-z0-9_-]{1,100}$/.test(label) && label !== GOOGLE_ADS_CONVERSION_LABEL ? label : '';
}

const containerId = process.env.NEXT_PUBLIC_GTM_ID || '';
// This published container was verified to contain only this Ads base tag and
// its conversion linker. Other containers need review before they can execute.
export const GOOGLE_TAG_MANAGER_ID = GOOGLE_ADS_CONFIGURED
  && /^GTM-[A-Z0-9]{4,20}$/.test(containerId)
  && containerId === 'GTM-MB764DLF'
  && GOOGLE_ADS_ID === 'AW-11465582021' ? containerId : '';
export const GTM_ADS_CONFIGURED = Boolean(GOOGLE_TAG_MANAGER_ID);
