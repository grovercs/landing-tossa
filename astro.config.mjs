// @ts-nocheck
import { defineConfig, fontProviders } from "astro/config";
import mdx from '@astrojs/mdx';
import icon from "astro-icon";
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://landing-tossa.netlify.app',
  base: '/',
  output: 'static',

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

  integrations: [
    icon(),
    mdx(),
  ],

  vite: {
    resolve: {
      alias: {
        '@img': '/src/img',
      },
    },
    plugins: [tailwindcss()]
  }
});