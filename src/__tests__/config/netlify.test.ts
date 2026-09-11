import { resolve } from 'path';
import { readFileSync } from 'fs';

const netlifyToml = readFileSync(
  resolve(__dirname, '../../../netlify.toml'),
  'utf-8'
);

describe('netlify.toml', () => {
  it('build command is "npm run build"', () => {
    expect(netlifyToml).toContain('command = "npm run build"');
  });

  it('publish directory is "out"', () => {
    expect(netlifyToml).toContain('publish = "out"');
  });

  it('has security headers (X-Frame-Options, X-Content-Type-Options, Referrer-Policy)', () => {
    expect(netlifyToml).toContain('X-Frame-Options');
    expect(netlifyToml).toContain('X-Content-Type-Options');
    expect(netlifyToml).toContain('Referrer-Policy');
  });

  it('has cache headers for static assets', () => {
    expect(netlifyToml).toContain('Cache-Control');
    expect(netlifyToml).toContain('max-age=31536000');
    expect(netlifyToml).toContain('/images/*');
    expect(netlifyToml).toContain('/_next/static/*');
    expect(netlifyToml).toContain('/*.js');
    expect(netlifyToml).toContain('/*.css');
  });

  it('has redirects defined', () => {
    expect(netlifyToml).toContain('[[redirects]]');
    expect(netlifyToml).toContain('from = "/contact"');
    expect(netlifyToml).toContain('to = "/locations"');
    expect(netlifyToml).toContain('status = 301');
  });
});
