import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://grimael.dev',
  build: {
    // Always emit CSS as files: the CSP forbids inline <style> in production.
    inlineStylesheets: 'never',
  },
});
