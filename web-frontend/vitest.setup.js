/**
 * Vitest Test Setup
 * 
 * This file runs before each test file and sets up:
 * - DOM cleanup between tests
 * - Browser API mocks (matchMedia, IntersectionObserver)
 * - Jest-DOM matchers for better assertions
 */
import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';

// Cleanup DOM after each test to prevent test pollution
afterEach(() => {
  cleanup();
});

// Mock matchMedia for responsive/animation tests
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => {},
  }),
});

// Mock IntersectionObserver for lazy-loading/scroll tests
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  takeRecords() { return []; }
  unobserve() {}
};

// Mock ResizeObserver for responsive component tests
global.ResizeObserver = class ResizeObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
};
