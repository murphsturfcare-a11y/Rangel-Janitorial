import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  parseUTMFromURL,
  storeUTMParams,
  getStoredUTMParams,
  appendUTMToFormData,
} from "@/lib/analytics/utm";
import type { UTMParams } from "@/lib/analytics/utm";

beforeEach(() => {
  sessionStorage.clear();
});

describe("parseUTMFromURL", () => {
  it("returns null when no UTM params are present", () => {
    const params = new URLSearchParams("");
    expect(parseUTMFromURL(params)).toBeNull();
  });

  it("returns UTMParams when utm_source is present", () => {
    const params = new URLSearchParams("utm_source=google");
    const result = parseUTMFromURL(params);
    expect(result).not.toBeNull();
    expect(result!.source).toBe("google");
  });

  it("returns UTMParams when utm_medium is present", () => {
    const params = new URLSearchParams("utm_medium=cpc");
    const result = parseUTMFromURL(params);
    expect(result).not.toBeNull();
    expect(result!.medium).toBe("cpc");
  });

  it("returns UTMParams when utm_campaign is present", () => {
    const params = new URLSearchParams("utm_campaign=spring_sale");
    const result = parseUTMFromURL(params);
    expect(result).not.toBeNull();
    expect(result!.campaign).toBe("spring_sale");
  });

  it("fills missing params with empty strings", () => {
    const params = new URLSearchParams("utm_source=google");
    const result = parseUTMFromURL(params)!;
    expect(result.medium).toBe("");
    expect(result.campaign).toBe("");
    expect(result.term).toBe("");
    expect(result.content).toBe("");
  });

  it("returns null when only utm_term or utm_content are present", () => {
    const termOnly = new URLSearchParams("utm_term=keyword");
    expect(parseUTMFromURL(termOnly)).toBeNull();

    const contentOnly = new URLSearchParams("utm_content=banner");
    expect(parseUTMFromURL(contentOnly)).toBeNull();

    const both = new URLSearchParams("utm_term=keyword&utm_content=banner");
    expect(parseUTMFromURL(both)).toBeNull();
  });
});

describe("storeUTMParams", () => {
  it("stores params in sessionStorage", () => {
    const utm: UTMParams = {
      source: "google",
      medium: "cpc",
      campaign: "spring",
      term: "turf",
      content: "ad1",
    };

    storeUTMParams(utm);

    const stored = sessionStorage.getItem("rangel_janitorial_utm");
    expect(stored).not.toBeNull();
    expect(JSON.parse(stored!)).toEqual(utm);
  });
});

describe("getStoredUTMParams", () => {
  it("returns null when nothing is stored", () => {
    expect(getStoredUTMParams()).toBeNull();
  });

  it("returns parsed params when stored", () => {
    const utm: UTMParams = {
      source: "facebook",
      medium: "social",
      campaign: "summer",
      term: "",
      content: "post",
    };

    sessionStorage.setItem("rangel_janitorial_utm", JSON.stringify(utm));
    expect(getStoredUTMParams()).toEqual(utm);
  });

  it("returns null for invalid JSON", () => {
    sessionStorage.setItem("rangel_janitorial_utm", "not-valid-json{");
    expect(getStoredUTMParams()).toBeNull();
  });
});

describe("appendUTMToFormData", () => {
  it("returns original formData when no UTM is stored", () => {
    const formData = { name: "John", email: "john@example.com" };
    expect(appendUTMToFormData(formData)).toEqual(formData);
  });

  it("appends UTM params to formData when stored", () => {
    const utm: UTMParams = {
      source: "google",
      medium: "cpc",
      campaign: "spring",
      term: "turf",
      content: "ad1",
    };

    sessionStorage.setItem("rangel_janitorial_utm", JSON.stringify(utm));

    const formData = { name: "John", email: "john@example.com" };
    const result = appendUTMToFormData(formData);

    expect(result).toEqual({
      name: "John",
      email: "john@example.com",
      utm_source: "google",
      utm_medium: "cpc",
      utm_campaign: "spring",
      utm_term: "turf",
      utm_content: "ad1",
    });
  });
});


describe('campaign input boundaries', () => {
  it.each([
    'person@example.test', 'https://example.test/private', '<script>', 'x'.repeat(81),
    '9515550100', '951 555 0100', '951-555-0100', 'phone-9515550100', 'line\nbreak',
  ])('rejects unbounded or personal campaign values: %s', value => {
    expect(parseUTMFromURL(new URLSearchParams({ utm_source: value }))).toBeNull();
  });

  it('normalizes stored data instead of trusting its shape or extra keys', () => {
    sessionStorage.setItem('rangel_janitorial_utm', JSON.stringify({
      source: 'google', medium: {}, campaign: 'office-cleaning', email: 'person@example.test', term: '9515550100',
    }));
    expect(getStoredUTMParams()).toEqual({ source: 'google', medium: '', campaign: 'office-cleaning', term: '', content: '' });
    sessionStorage.setItem('rangel_janitorial_utm', '[]');
    expect(getStoredUTMParams()).toBeNull();
  });

  it('does not prevent submitting forms when session storage is blocked', () => {
    const get = vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => { throw new Error('Blocked'); });
    expect(getStoredUTMParams()).toBeNull();
    expect(appendUTMToFormData({ email: 'person@example.test' })).toEqual({ email: 'person@example.test' });
    get.mockRestore();
    const set = vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => { throw new Error('Blocked'); });
    expect(() => storeUTMParams({ source: 'google', medium: '', campaign: '', term: '', content: '' })).not.toThrow();
    set.mockRestore();
  });
});
