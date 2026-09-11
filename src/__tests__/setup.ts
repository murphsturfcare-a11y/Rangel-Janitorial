import '@testing-library/jest-dom/vitest';
import React from 'react';

// Mock next/link
vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: { children: React.ReactNode; href: string; [key: string]: unknown }) =>
    React.createElement('a', { href, ...props }, children),
}));

// Mock next/image
vi.mock('next/image', () => ({
  default: (props: { src: string; alt: string; fill?: boolean; priority?: boolean; [key: string]: unknown }) => {
    const domProps = Object.fromEntries(Object.entries(props).filter(([key]) => !['fill', 'priority'].includes(key)));
    return React.createElement('img', domProps);
  },
}));

// Mock framer-motion
vi.mock('framer-motion', () => {
  const animationProps = new Set(['initial', 'animate', 'exit', 'variants', 'transition', 'whileHover', 'whileInView']);
  const createMotionComponent = (tag: string) =>
    React.forwardRef(function MockMotion({ children, ...props }: Record<string, unknown>, ref: React.Ref<HTMLElement>) {
      const domProps = Object.fromEntries(Object.entries(props).filter(([key]) => !animationProps.has(key)));
      return React.createElement(tag, { ...domProps, ref }, children as React.ReactNode);
    });

  return {
    motion: new Proxy({} as Record<string, unknown>, {
      get: (_target: Record<string, unknown>, prop: string) => createMotionComponent(prop),
    }),
    AnimatePresence: ({ children }: { children: React.ReactNode }) => React.createElement(React.Fragment, null, children),
    useScroll: () => ({ scrollYProgress: { get: () => 0 } }),
    useTransform: () => '0%',
    useInView: () => true,
    useReducedMotion: () => false,
  };
});

// Mock IntersectionObserver
class MockIntersectionObserver {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
  root = null;
  rootMargin = '';
  thresholds = [0];
  takeRecords = vi.fn().mockReturnValue([]);
}

Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  value: MockIntersectionObserver,
});

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: vi.fn((key: string) => store[key] ?? null),
    setItem: vi.fn((key: string, value: string) => { store[key] = value; }),
    removeItem: vi.fn((key: string) => { delete store[key]; }),
    clear: vi.fn(() => { store = {}; }),
    get length() { return Object.keys(store).length; },
    key: vi.fn((i: number) => Object.keys(store)[i] ?? null),
  };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });
