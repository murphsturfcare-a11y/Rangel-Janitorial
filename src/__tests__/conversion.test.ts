import { beforeEach, describe, expect, it, vi } from 'vitest';
import { event } from '@/lib/analytics/gtag';
import { isLeadEventDetail, trackLeadConversion, trackQuoteRequest } from '@/lib/analytics/conversion';

vi.mock('@/lib/analytics/gtag', () => ({ event: vi.fn(() => true) }));
const receipt = { region: 'murrieta', form_placement: 'hero' as const, submission_id: '8b75ba63-7b5d-4aa7-8e25-a4b9b3b3ef42' };
beforeEach(() => {
  vi.mocked(event).mockClear();
  window.dataLayer = [];
});
describe('one conversion delivery path', () => {
  it('sends only approved receipt dimensions with no currency/value or GTM copy', () => {
    expect(trackLeadConversion(receipt)).toBe(true);
    expect(event).toHaveBeenCalledExactlyOnceWith('generate_lead', { region: 'murrieta', form_placement: 'hero' });
    expect(window.dataLayer).toEqual([]);
  });

  it('keeps a quote start separate from an accepted lead', () => {
    trackQuoteRequest(receipt);
    expect(event).toHaveBeenCalledExactlyOnceWith('quote_start', { region: 'murrieta', form_placement: 'hero' });
  });

  it.each([null, {}, { ...receipt, region: 'unlisted' }, { ...receipt, submission_id: 'customer@example.test' }, { ...receipt, form_placement: 'customer-name' }])('rejects unbounded or invalid custom-event details: %j', detail => {
    expect(isLeadEventDetail(detail)).toBe(false);
  });
});
