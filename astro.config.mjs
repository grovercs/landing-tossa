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
  trailingSlash: 'always',

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
    filter: (page) => {
      // Exclude internal/dev pages
      if (page.includes('/debug/')) return false;
      if (page.includes('/documentation/')) return false;

      // Exclude about page (deleted)
      if (page.includes('/about/')) return false;

      // Exclude pagination duplicates
      if (page.includes('/rooms/page/1/')) return false;

      // Exclude transactional/confirmation pages
      const noindexPages = [
        '/error-reserva/',
        '/gracias-reserva/',
        '/guia-enviada/',
        '/reserva-enviada/',
        '/ca/error-reserva/',
        '/ca/gracies-reserva/',
        '/ca/guia-enviada/',
        '/ca/reserva-enviada/',
        '/en/booking-error/',
        '/en/booking-sent/',
        '/en/guide-sent/',
        '/en/thank-you-booking/',
        '/fr/erreur-reservation/',
        '/fr/guide-envoyee/',
        '/fr/merci-reservation/',
        '/fr/reservation-envoyee/',
      ];
      if (noindexPages.some(p => page.includes(p))) return false;

      return true;
    },
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