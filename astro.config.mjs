import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  redirects: {
    '/': 'https://sw-lightsabers.netlify.app/'
  }
});
