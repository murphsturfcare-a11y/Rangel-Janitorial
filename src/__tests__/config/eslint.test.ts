import { resolve } from 'path';
import { readFileSync } from 'fs';

const eslintConfig = readFileSync(
  resolve(__dirname, '../../../eslint.config.mjs'),
  'utf-8'
);

describe('eslint.config.mjs', () => {
  it('imports/extends next/core-web-vitals config', () => {
    expect(eslintConfig).toContain('eslint-config-next/core-web-vitals');
  });

  it('imports/extends next/typescript config', () => {
    expect(eslintConfig).toContain('eslint-config-next/typescript');
  });

  it('has globalIgnores configured', () => {
    expect(eslintConfig).toContain('globalIgnores');
  });

  it('ignores .next directory', () => {
    expect(eslintConfig).toContain('.next');
  });
});
