import type { RateLimitInfo } from '@/types';

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

interface RateLimiterOptions {
  windowMs: number;
  maxRequests: number;
}

class RateLimiter {
  private windowMs: number;
  private maxRequests: number;
  private entries: Map<string, RateLimitEntry>;

  constructor({ windowMs, maxRequests }: RateLimiterOptions) {
    this.windowMs = windowMs;
    this.maxRequests = maxRequests;
    this.entries = new Map();
  }

  check(identifier: string): RateLimitInfo {
    this.cleanup();

    const now = Date.now();
    const entry = this.entries.get(identifier);

    if (!entry || now >= entry.resetAt) {
      this.entries.set(identifier, {
        count: 1,
        resetAt: now + this.windowMs,
      });

      return {
        allowed: true,
        remaining: this.maxRequests - 1,
        resetAt: new Date(now + this.windowMs),
      };
    }

    entry.count += 1;

    const allowed = entry.count <= this.maxRequests;
    const remaining = Math.max(0, this.maxRequests - entry.count);

    return {
      allowed,
      remaining,
      resetAt: new Date(entry.resetAt),
    };
  }

  private cleanup(): void {
    const now = Date.now();

    for (const [key, entry] of this.entries) {
      if (now >= entry.resetAt) {
        this.entries.delete(key);
      }
    }
  }
}

const ONE_HOUR_MS = 60 * 60 * 1000;

export const leadsRateLimiter = new RateLimiter({
  windowMs: ONE_HOUR_MS,
  maxRequests: 5,
});

export const contactRateLimiter = new RateLimiter({
  windowMs: ONE_HOUR_MS,
  maxRequests: 3,
});

export const newsletterRateLimiter = new RateLimiter({
  windowMs: ONE_HOUR_MS,
  maxRequests: 3,
});
