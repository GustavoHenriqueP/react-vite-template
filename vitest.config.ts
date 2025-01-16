import { defineConfig, mergeConfig } from 'vitest/config';

import viteConfig from './vite.config.ts';

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      globals: true,
      setupFiles: './src/testing/setupTests.ts',
      environment: 'jsdom',
      coverage: {
        include: ['src/**/'],
        extension: ['.ts', '.tsx'],
        reportsDirectory: './src/testing/coverage',
      },
    },
  }),
);
