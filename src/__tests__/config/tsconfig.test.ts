import { resolve } from 'path';
import { readFileSync } from 'fs';

const tsconfig = JSON.parse(
  readFileSync(resolve(__dirname, '../../../tsconfig.json'), 'utf-8')
);

describe('tsconfig.json', () => {
  it('has path aliases configured (@ -> src/)', () => {
    expect(tsconfig.compilerOptions.paths).toBeDefined();
    expect(tsconfig.compilerOptions.paths['@/*']).toEqual(['./src/*']);
  });

  it('target is "ES2017"', () => {
    expect(tsconfig.compilerOptions.target).toBe('ES2017');
  });

  it('module is "esnext"', () => {
    expect(tsconfig.compilerOptions.module).toBe('esnext');
  });

  it('strict mode is enabled', () => {
    expect(tsconfig.compilerOptions.strict).toBe(true);
  });

  it('has Next.js plugin configured', () => {
    expect(tsconfig.compilerOptions.plugins).toBeDefined();
    expect(tsconfig.compilerOptions.plugins).toEqual(
      expect.arrayContaining([expect.objectContaining({ name: 'next' })])
    );
  });

  it('moduleResolution is "bundler"', () => {
    expect(tsconfig.compilerOptions.moduleResolution).toBe('bundler');
  });
});
