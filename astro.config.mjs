// @ts-nocheck
import { defineConfig, fontProviders } from "astro/config";
import mdx from '@astrojs/mdx';
import icon from "astro-icon";
import tailwindcss from '@tailwindcss/vite';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://alojamientostossademar.com',
  base: '/',
  output: 'static',

  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'ca', 'en', 'fr'],
    routing: {
      prefixDefaultLocale: false
    }
  },

  fonts: [
    {
      name: 'Roboto',
      cssVariable: '--font-roboto',
      provider: fontProviders.google(),
      weights: ['300', '400', '500', '700'],
    },
    {
      name: 'Gilda Display',
      cssVariable: '--font-gilda-display',
      provider: fontProviders.google(),
      weights: ['400'],
    },
  ],

  integrations: [icon(), mdx(), sitemap({
    lastmod: new Date(),
    changefreq: 'weekly',
    priority: 0.7,
    filter: (page) => !page.includes('/debug/'),
  })],

  vite: {
    resolve: {
      alias: {
        '@img': '/src/img',
      },
    },
    plugins: [tailwindcss()]
  }
});