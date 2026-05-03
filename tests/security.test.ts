import { describe, it, expect } from 'vitest';
import nextConfig from '../next.config';

describe('Security Headers', () => {
  it('defines a headers() function', () => {
    expect(typeof nextConfig.headers).toBe('function');
  });

  it('applies headers to all routes', async () => {
    const groups = await nextConfig.headers!();
    expect(groups.length).toBeGreaterThan(0);
    expect(groups[0].source).toBe('/(.*)')
  });

  it('sets X-Frame-Options to DENY', async () => {
    const groups = await nextConfig.headers!();
    const headers = groups.flatMap((g) => g.headers);
    const xfo = headers.find((h) => h.key === 'X-Frame-Options');
    expect(xfo?.value).toBe('DENY');
  });

  it('sets X-Content-Type-Options to nosniff', async () => {
    const groups = await nextConfig.headers!();
    const headers = groups.flatMap((g) => g.headers);
    const xcto = headers.find((h) => h.key === 'X-Content-Type-Options');
    expect(xcto?.value).toBe('nosniff');
  });

  it('sets Referrer-Policy to strict-origin-when-cross-origin', async () => {
    const groups = await nextConfig.headers!();
    const headers = groups.flatMap((g) => g.headers);
    const rp = headers.find((h) => h.key === 'Referrer-Policy');
    expect(rp?.value).toBe('strict-origin-when-cross-origin');
  });

  it('defines a Content-Security-Policy header', async () => {
    const groups = await nextConfig.headers!();
    const headers = groups.flatMap((g) => g.headers);
    const csp = headers.find((h) => h.key === 'Content-Security-Policy');
    expect(csp).toBeDefined();
    expect(csp!.value).toContain("default-src 'self'");
  });

  it('includes X-DNS-Prefetch-Control header', async () => {
    const groups = await nextConfig.headers!();
    const headers = groups.flatMap((g) => g.headers);
    const dns = headers.find((h) => h.key === 'X-DNS-Prefetch-Control');
    expect(dns?.value).toBe('on');
  });

  it('disables the X-Powered-By header', () => {
    expect(nextConfig.poweredByHeader).toBe(false);
  });
});
