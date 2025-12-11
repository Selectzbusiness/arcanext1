import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

/**
 * Vitest Configuration
 * 
 * This is separate from next.config.js because:
 * - next.config.js: Configures Next.js for building/running the production app
 * - vitest.config.js: Configures the test runner for unit/integration tests
 * 
 * Both are industry standard for production Next.js applications.
 */
export default defineConfig({
  plugins: [react()],
  
  // Handle JSX in .js files (Next.js convention)
  esbuild: {
    loader: 'jsx',
    include: /.*\.[jt]sx?$/,
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: { '.js': 'jsx' },
    },
  },
  
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './vitest.setup.js',
    css: true,
    
    // Test file patterns
    include: ['**/__tests__/**/*.{test,spec}.{js,jsx,ts,tsx}'],
    exclude: ['node_modules', '.next', 'coverage'],
    
    // Coverage configuration
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        '**/*.config.{js,ts}',
        '**/__tests__/**',
        '.next/',
      ],
    },
  },
  
  // Path aliases matching Next.js conventions
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
      '@/components': path.resolve(__dirname, './components'),
      '@/lib': path.resolve(__dirname, './lib'),
      '@/hooks': path.resolve(__dirname, './hooks'),
      '@/context': path.resolve(__dirname, './context'),
    },
  },
});
