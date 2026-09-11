import { resolve } from 'path';
import { readFileSync, existsSync } from 'fs';

const projectRoot = resolve(__dirname, '../../../');
const packageJson = JSON.parse(
  readFileSync(resolve(projectRoot, 'package.json'), 'utf-8')
);

describe('build validation', () => {
  it('package.json has all required scripts (dev, build, start, lint)', () => {
    expect(packageJson.scripts.dev).toBeDefined();
    expect(packageJson.scripts.build).toBeDefined();
    expect(packageJson.scripts.start).toBeDefined();
    expect(packageJson.scripts.lint).toBeDefined();
  });

  it('has test script configured', () => {
    expect(packageJson.scripts.test).toBeDefined();
  });

  it('all key dependencies exist (next, react, react-dom)', () => {
    expect(packageJson.dependencies.next).toBeDefined();
    expect(packageJson.dependencies.react).toBeDefined();
    expect(packageJson.dependencies['react-dom']).toBeDefined();
  });

  it('has TypeScript configured as devDependency', () => {
    expect(packageJson.devDependencies.typescript).toBeDefined();
  });

  it('next-env.d.ts exists', () => {
    expect(existsSync(resolve(projectRoot, 'next-env.d.ts'))).toBe(true);
  });

  it('tsconfig.json exists', () => {
    expect(existsSync(resolve(projectRoot, 'tsconfig.json'))).toBe(true);
  });
});
