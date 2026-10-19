const adsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || '';
const conversionLabel = process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL || '';
export const GOOGLE_ADS_ID = /^AW-\d{6,20}$/.test(adsId) ? adsId : '';
export const GOOGLE_ADS_CONVERSION_LABEL = /^[A-Za-z0-9_-]{1,100}$/.test(conversionLabel) ? conversionLabel : '';
export const GOOGLE_ADS_CONFIGURED = Boolean(GOOGLE_ADS_ID && GOOGLE_ADS_CONVERSION_LABEL);
