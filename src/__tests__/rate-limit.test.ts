// Dynamic imports provide fresh limiter instances after each module reset.

describe('RateLimiter', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.resetModules();
  });

  describe('first request behavior', () => {
    it('allows the first request and returns correct remaining count', async () => {
      const { leadsRateLimiter: limiter } = await import('@/lib/rate-limit');
      const result = limiter.check('user-1');

      expect(result.allowed).toBe(true);
      expect(result.remaining).toBe(4); // maxRequests (5) - 1
      expect(result.resetAt).toBeInstanceOf(Date);
    });

    it('sets resetAt to now + windowMs on first request', async () => {
      const now = Date.now();
      const { leadsRateLimiter: limiter } = await import('@/lib/rate-limit');
      const result = limiter.check('user-reset-check');

      const expectedResetAt = now + 60 * 60 * 1000;
      expect(result.resetAt.getTime()).toBe(expectedResetAt);
    });
  });

  describe('multiple requests decrement remaining correctly', () => {
    it('decrements remaining with each request', async () => {
      const { leadsRateLimiter: limiter } = await import('@/lib/rate-limit');
      const id = 'decrement-test';

      const r1 = limiter.check(id);
      expect(r1.allowed).toBe(true);
      expect(r1.remaining).toBe(4);

      const r2 = limiter.check(id);
      expect(r2.allowed).toBe(true);
      expect(r2.remaining).toBe(3);

      const r3 = limiter.check(id);
      expect(r3.allowed).toBe(true);
      expect(r3.remaining).toBe(2);

      const r4 = limiter.check(id);
      expect(r4.allowed).toBe(true);
      expect(r4.remaining).toBe(1);

      const r5 = limiter.check(id);
      expect(r5.allowed).toBe(true);
      expect(r5.remaining).toBe(0);
    });

    it('remaining never goes below zero', async () => {
      const { contactRateLimiter: limiter } = await import('@/lib/rate-limit');
      const id = 'floor-test';

      // contactRateLimiter has maxRequests: 3
      limiter.check(id); // 1
      limiter.check(id); // 2
      limiter.check(id); // 3 (last allowed)
      const r4 = limiter.check(id); // 4 (denied)
      expect(r4.remaining).toBe(0);

      const r5 = limiter.check(id); // 5 (still denied)
      expect(r5.remaining).toBe(0);
    });
  });

  describe('exceeding maxRequests', () => {
    it('returns allowed: false when maxRequests is exceeded', async () => {
      const { leadsRateLimiter: limiter } = await import('@/lib/rate-limit');
      const id = 'exceed-test';

      // Use all 5 allowed requests
      for (let i = 0; i < 5; i++) {
        const result = limiter.check(id);
        expect(result.allowed).toBe(true);
      }

      // 6th request should be denied
      const denied = limiter.check(id);
      expect(denied.allowed).toBe(false);
      expect(denied.remaining).toBe(0);
    });

    it('continues to deny requests after limit is exceeded', async () => {
      const { contactRateLimiter: limiter } = await import('@/lib/rate-limit');
      const id = 'persist-deny-test';

      // Exhaust the 3-request limit
      for (let i = 0; i < 3; i++) {
        limiter.check(id);
      }

      // Multiple subsequent requests should all be denied
      for (let i = 0; i < 5; i++) {
        const result = limiter.check(id);
        expect(result.allowed).toBe(false);
        expect(result.remaining).toBe(0);
      }
    });

    it('preserves the original resetAt time after exceeding the limit', async () => {
      const { leadsRateLimiter: limiter } = await import('@/lib/rate-limit');
      const id = 'reset-time-test';

      const first = limiter.check(id);
      const originalResetAt = first.resetAt.getTime();

      // Exhaust remaining requests
      for (let i = 0; i < 5; i++) {
        limiter.check(id);
      }

      const denied = limiter.check(id);
      expect(denied.resetAt.getTime()).toBe(originalResetAt);
    });
  });

  describe('window reset after windowMs expires', () => {
    it('resets the counter after the window expires', async () => {
      const ONE_HOUR_MS = 60 * 60 * 1000;
      const { leadsRateLimiter: limiter } = await import('@/lib/rate-limit');
      const id = 'window-reset-test';

      // Exhaust all requests
      for (let i = 0; i < 5; i++) {
        limiter.check(id);
      }
      const denied = limiter.check(id);
      expect(denied.allowed).toBe(false);

      // Advance time past the window
      vi.advanceTimersByTime(ONE_HOUR_MS);

      // Should be allowed again with full quota
      const afterReset = limiter.check(id);
      expect(afterReset.allowed).toBe(true);
      expect(afterReset.remaining).toBe(4); // maxRequests (5) - 1
    });

    it('does not reset the counter before the window expires', async () => {
      const ONE_HOUR_MS = 60 * 60 * 1000;
      const { leadsRateLimiter: limiter } = await import('@/lib/rate-limit');
      const id = 'no-early-reset-test';

      // Exhaust all requests
      for (let i = 0; i < 5; i++) {
        limiter.check(id);
      }

      // Advance time to just before window expiry
      vi.advanceTimersByTime(ONE_HOUR_MS - 1);

      const stillDenied = limiter.check(id);
      expect(stillDenied.allowed).toBe(false);
    });

    it('sets a new resetAt after window expires and new request comes in', async () => {
      const ONE_HOUR_MS = 60 * 60 * 1000;
      const { leadsRateLimiter: limiter } = await import('@/lib/rate-limit');
      const id = 'new-reset-test';

      limiter.check(id);

      // Advance past the window
      vi.advanceTimersByTime(ONE_HOUR_MS);

      const newRequest = limiter.check(id);
      const expectedResetAt = Date.now() + ONE_HOUR_MS;
      expect(newRequest.resetAt.getTime()).toBe(expectedResetAt);
    });
  });

  describe('independent identifier tracking', () => {
    it('tracks different identifiers independently', async () => {
      const { leadsRateLimiter: limiter } = await import('@/lib/rate-limit');

      // Exhaust user-a's requests
      for (let i = 0; i < 5; i++) {
        limiter.check('user-a');
      }
      const userADenied = limiter.check('user-a');
      expect(userADenied.allowed).toBe(false);

      // user-b should still have full quota
      const userBFirst = limiter.check('user-b');
      expect(userBFirst.allowed).toBe(true);
      expect(userBFirst.remaining).toBe(4);
    });

    it('does not share state between identifiers', async () => {
      const { contactRateLimiter: limiter } = await import('@/lib/rate-limit');

      limiter.check('ip-1');
      limiter.check('ip-1');

      limiter.check('ip-2');

      // ip-1 has used 2, ip-2 has used 1
      const ip1Next = limiter.check('ip-1');
      expect(ip1Next.remaining).toBe(0); // 3 - 3 = 0
      expect(ip1Next.allowed).toBe(true);

      const ip2Next = limiter.check('ip-2');
      expect(ip2Next.remaining).toBe(1); // 3 - 2 = 1
      expect(ip2Next.allowed).toBe(true);
    });

    it('allows one identifier to reset without affecting others', async () => {
      const ONE_HOUR_MS = 60 * 60 * 1000;
      const { leadsRateLimiter: limiter } = await import('@/lib/rate-limit');

      // Both users make a request at time 0
      limiter.check('early-user');

      // Advance 30 minutes
      vi.advanceTimersByTime(ONE_HOUR_MS / 2);

      // late-user starts their window here
      limiter.check('late-user');

      // Advance another 31 minutes (past early-user's window, but within late-user's)
      vi.advanceTimersByTime(ONE_HOUR_MS / 2 + 60 * 1000);

      // early-user's window has expired, should get a fresh start
      const earlyResult = limiter.check('early-user');
      expect(earlyResult.allowed).toBe(true);
      expect(earlyResult.remaining).toBe(4);

      // late-user's window is still active, should continue counting
      const lateResult = limiter.check('late-user');
      expect(lateResult.allowed).toBe(true);
      expect(lateResult.remaining).toBe(3); // 5 - 2 = 3
    });
  });

  describe('cleanup removes expired entries', () => {
    it('removes expired entries during check calls', async () => {
      const ONE_HOUR_MS = 60 * 60 * 1000;
      const { leadsRateLimiter: limiter } = await import('@/lib/rate-limit');

      // Create entries for multiple identifiers
      limiter.check('cleanup-a');
      limiter.check('cleanup-b');
      limiter.check('cleanup-c');

      // Advance past the window so all entries expire
      vi.advanceTimersByTime(ONE_HOUR_MS);

      // Making a new check should trigger cleanup of expired entries
      // and the new request should be treated as a fresh first request
      const result = limiter.check('cleanup-new');
      expect(result.allowed).toBe(true);
      expect(result.remaining).toBe(4);
    });

    it('does not remove entries that have not expired', async () => {
      const ONE_HOUR_MS = 60 * 60 * 1000;
      const { leadsRateLimiter: limiter } = await import('@/lib/rate-limit');

      // Use up all requests for an identifier
      for (let i = 0; i < 5; i++) {
        limiter.check('active-user');
      }

      // Advance time but NOT past the window
      vi.advanceTimersByTime(ONE_HOUR_MS / 2);

      // Trigger cleanup via another check
      limiter.check('other-user');

      // The active-user entry should still be present and enforced
      const result = limiter.check('active-user');
      expect(result.allowed).toBe(false);
      expect(result.remaining).toBe(0);
    });

    it('handles cleanup when expired and active entries coexist', async () => {
      const ONE_HOUR_MS = 60 * 60 * 1000;
      const { leadsRateLimiter: limiter } = await import('@/lib/rate-limit');

      // Create an entry at time 0
      limiter.check('old-entry');

      // Advance 30 minutes and create another entry
      vi.advanceTimersByTime(ONE_HOUR_MS / 2);
      for (let i = 0; i < 5; i++) {
        limiter.check('new-entry');
      }

      // Advance another 31 minutes (old-entry expires, new-entry still active)
      vi.advanceTimersByTime(ONE_HOUR_MS / 2 + 60 * 1000);

      // Trigger cleanup via check on old-entry (should be treated as new)
      const oldResult = limiter.check('old-entry');
      expect(oldResult.allowed).toBe(true);
      expect(oldResult.remaining).toBe(4);

      // new-entry should still be rate limited
      const newResult = limiter.check('new-entry');
      expect(newResult.allowed).toBe(false);
    });
  });

  describe('exported rate limiter configurations', () => {
    it('leadsRateLimiter allows 5 requests per hour', async () => {
      const { leadsRateLimiter: limiter } = await import('@/lib/rate-limit');
      const id = 'leads-config-test';

      for (let i = 0; i < 5; i++) {
        const result = limiter.check(id);
        expect(result.allowed).toBe(true);
        expect(result.remaining).toBe(4 - i);
      }

      const denied = limiter.check(id);
      expect(denied.allowed).toBe(false);
    });

    it('leadsRateLimiter uses a 1-hour window', async () => {
      const ONE_HOUR_MS = 60 * 60 * 1000;
      const { leadsRateLimiter: limiter } = await import('@/lib/rate-limit');
      const id = 'leads-window-test';

      const first = limiter.check(id);
      expect(first.resetAt.getTime()).toBe(Date.now() + ONE_HOUR_MS);
    });

    it('contactRateLimiter allows 3 requests per hour', async () => {
      const { contactRateLimiter: limiter } = await import('@/lib/rate-limit');
      const id = 'contact-config-test';

      for (let i = 0; i < 3; i++) {
        const result = limiter.check(id);
        expect(result.allowed).toBe(true);
        expect(result.remaining).toBe(2 - i);
      }

      const denied = limiter.check(id);
      expect(denied.allowed).toBe(false);
    });

    it('contactRateLimiter uses a 1-hour window', async () => {
      const ONE_HOUR_MS = 60 * 60 * 1000;
      const { contactRateLimiter: limiter } = await import('@/lib/rate-limit');
      const id = 'contact-window-test';

      const first = limiter.check(id);
      expect(first.resetAt.getTime()).toBe(Date.now() + ONE_HOUR_MS);
    });

    it('newsletterRateLimiter allows 3 requests per hour', async () => {
      const { newsletterRateLimiter: limiter } = await import('@/lib/rate-limit');
      const id = 'newsletter-config-test';

      for (let i = 0; i < 3; i++) {
        const result = limiter.check(id);
        expect(result.allowed).toBe(true);
        expect(result.remaining).toBe(2 - i);
      }

      const denied = limiter.check(id);
      expect(denied.allowed).toBe(false);
    });

    it('newsletterRateLimiter uses a 1-hour window', async () => {
      const ONE_HOUR_MS = 60 * 60 * 1000;
      const { newsletterRateLimiter: limiter } = await import('@/lib/rate-limit');
      const id = 'newsletter-window-test';

      const first = limiter.check(id);
      expect(first.resetAt.getTime()).toBe(Date.now() + ONE_HOUR_MS);
    });
  });
});
