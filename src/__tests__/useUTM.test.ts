import { act, renderHook, waitFor } from "@testing-library/react";
import { useSearchParams } from "next/navigation";
import { useUTM } from "@/hooks/useUTM";
import {
  parseUTMFromURL,
  storeUTMParams,
  getStoredUTMParams,
} from "@/lib/analytics/utm";

vi.mock("next/navigation", () => ({
  useSearchParams: vi.fn(),
}));

vi.mock("@/lib/analytics/utm", () => ({
  parseUTMFromURL: vi.fn(),
  storeUTMParams: vi.fn(),
  getStoredUTMParams: vi.fn(),
}));

const mockUseSearchParams = vi.mocked(useSearchParams);
const mockParseUTMFromURL = vi.mocked(parseUTMFromURL);
const mockStoreUTMParams = vi.mocked(storeUTMParams);
const mockGetStoredUTMParams = vi.mocked(getStoredUTMParams);

describe("useUTM", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockGetStoredUTMParams.mockReturnValue(null);
  });

  it("parses and stores UTM params when present in the URL", async () => {
    const searchParams = new URLSearchParams(
      "utm_source=google&utm_medium=cpc&utm_campaign=spring"
    );
    mockUseSearchParams.mockReturnValue(searchParams as ReturnType<typeof useSearchParams>);

    const utmData = {
      source: "google",
      medium: "cpc",
      campaign: "spring",
      term: "",
      content: "",
    };
    mockParseUTMFromURL.mockReturnValue(utmData);

    const { result } = renderHook(() => useUTM());

    await waitFor(() => {
      expect(result.current.utmParams).toEqual(utmData);
    });

    expect(mockParseUTMFromURL).toHaveBeenCalledWith(searchParams);
    expect(mockStoreUTMParams).toHaveBeenCalledWith(utmData);
    expect(result.current.hasUTM).toBe(true);
  });

  it("falls back to stored UTM params when URL has none", async () => {
    const searchParams = new URLSearchParams("");
    mockUseSearchParams.mockReturnValue(searchParams as ReturnType<typeof useSearchParams>);
    mockParseUTMFromURL.mockReturnValue(null);

    const storedData = {
      source: "partner",
      medium: "referral",
      campaign: "fall",
      term: "",
      content: "",
    };
    mockGetStoredUTMParams.mockReturnValue(storedData);

    const { result } = renderHook(() => useUTM());

    await waitFor(() => {
      expect(result.current.utmParams).toEqual(storedData);
    });

    expect(mockGetStoredUTMParams).toHaveBeenCalled();
    expect(mockStoreUTMParams).not.toHaveBeenCalled();
    expect(result.current.hasUTM).toBe(true);
  });

  it("returns hasUTM false when no UTM params exist anywhere", async () => {
    const searchParams = new URLSearchParams("");
    mockUseSearchParams.mockReturnValue(searchParams as ReturnType<typeof useSearchParams>);
    mockParseUTMFromURL.mockReturnValue(null);
    mockGetStoredUTMParams.mockReturnValue(null);

    const { result } = renderHook(() => useUTM());

    await waitFor(() => {
      expect(result.current.utmParams).toBeNull();
    });

    expect(result.current.hasUTM).toBe(false);
  });

  it("returns hasUTM true when utmParams is not null", async () => {
    const searchParams = new URLSearchParams("utm_source=facebook");
    mockUseSearchParams.mockReturnValue(searchParams as ReturnType<typeof useSearchParams>);

    const utmData = { source: "facebook", medium: "", campaign: "", term: "", content: "" };
    mockParseUTMFromURL.mockReturnValue(utmData);

    const { result } = renderHook(() => useUTM());

    await waitFor(() => {
      expect(result.current.utmParams).toEqual(utmData);
    });

    expect(result.current.hasUTM).toBe(true);
  });

  it("prefers a URL campaign over previously stored attribution", () => {
    const stored = { source: "partner", medium: "referral", campaign: "fall", term: "", content: "" };
    const incoming = { ...stored, source: "google", medium: "cpc" };
    mockGetStoredUTMParams.mockReturnValue(stored);
    mockUseSearchParams.mockReturnValue(new URLSearchParams("utm_source=google&utm_medium=cpc") as ReturnType<typeof useSearchParams>);
    mockParseUTMFromURL.mockReturnValue(incoming);

    const { result } = renderHook(() => useUTM());

    expect(result.current.utmParams).toEqual(incoming);
    expect(mockStoreUTMParams).toHaveBeenCalledWith(incoming);
  });

  it("keeps the stored campaign after navigating to a URL without UTM params", () => {
    const campaign = { source: "google", medium: "cpc", campaign: "spring", term: "", content: "" };
    mockUseSearchParams.mockReturnValue(new URLSearchParams("utm_source=google") as ReturnType<typeof useSearchParams>);
    mockParseUTMFromURL.mockReturnValue(campaign);
    const { result, rerender } = renderHook(() => useUTM());
    expect(mockStoreUTMParams).toHaveBeenCalledWith(campaign);

    mockGetStoredUTMParams.mockReturnValue(campaign);
    mockUseSearchParams.mockReturnValue(new URLSearchParams("") as ReturnType<typeof useSearchParams>);
    mockParseUTMFromURL.mockReturnValue(null);
    rerender();

    expect(result.current.utmParams).toEqual(campaign);
    expect(result.current.hasUTM).toBe(true);
    expect(mockStoreUTMParams).toHaveBeenCalledTimes(1);
  });

  it.each(["storage", "rangel:utm"])("refreshes stored attribution on a %s event", (eventName) => {
    mockUseSearchParams.mockReturnValue(new URLSearchParams("") as ReturnType<typeof useSearchParams>);
    mockParseUTMFromURL.mockReturnValue(null);
    const { result } = renderHook(() => useUTM());
    expect(result.current.hasUTM).toBe(false);

    const campaign = { source: "partner", medium: "referral", campaign: "fall", term: "", content: "" };
    act(() => {
      mockGetStoredUTMParams.mockReturnValue(campaign);
      window.dispatchEvent(new Event(eventName));
    });

    expect(result.current.utmParams).toEqual(campaign);
    expect(result.current.hasUTM).toBe(true);
    expect(mockStoreUTMParams).not.toHaveBeenCalled();
  });
});
