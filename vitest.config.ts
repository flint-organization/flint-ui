import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './tests/setup.ts',
    include: ['tests/**/*.{test,spec}.{ts,tsx}'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        'src/**/*.stories.tsx',
        'src/**/index.ts',
        'src/styles/**',
        'src/tailwind-preset.ts',
      ],
      // Start with achievable thresholds based on current test coverage (~8%)
      // These will increase as more component tests are added (3 of 59 components tested so far)
      // Target: Increase by 5-10% with each release as more tests are added
      thresholds: {
        lines: 7.5,
        functions: 20,
        branches: 40,
        statements: 7.5,
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
