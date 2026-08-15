import { fileURLToPath } from 'node:url';
import { defineConfig } from 'astro/config';
import { unified } from '@astrojs/markdown-remark';
import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import swup from '@swup/astro';
import icon from 'astro-icon';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import rehypeImageAttrs from './src/utils/rehype-image-attrs.mjs';

export default defineConfig({
  output: 'static',
  session: false,
  adapter: cloudflare({
    prerenderEnvironment: 'workerd',
    routes: {
      extend: {
        exclude: [{ pattern: '/pagefind/*' }],
      },
    },
  }),

  site: 'https://zcx0217.qzz.io',
  integrations: [
    sitemap(),
    icon({
      include: {
        'simple-icons': ['github', 'twitter', 'qq', 'bilibili'],
        'lucide': [
          'mail', 'pin', 'calendar', 'folder', 'file-text', 'clock',
          'house', 'search', 'menu', 'tag', 'chevron-up', 'chevron-down', 'rss',
          'rotate-cw', 'chevron-left', 'chevron-right', 'eye',
          'external-link', 'link', 'list', 'arrow-left', 'network', 'info', 'square-activity',
          'copyright', 'github',
        ],
      },
    }),
    swup({
      theme: false,
      animationClass: 'transition-swup-',
      containers: ['main'],
      smoothScrolling: false,
      cache: true,
      preload: true,
      accessibility: true,
      updateHead: true,
      updateBodyClass: false,
      globalInstance: true,
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        debug: fileURLToPath(new URL('./src/shims/debug.js', import.meta.url)),
      },
    },
    optimizeDeps: {
      include: [
        '@swup/astro/serialise',
        '@swup/astro/idle',
        '@swup/astro/client/Swup',
        '@swup/astro/client/SwupA11yPlugin',
        '@swup/astro/client/SwupPreloadPlugin',
        '@swup/astro/client/SwupHeadPlugin',
        '@swup/astro/client/SwupScriptsPlugin',
        'photoswipe/lightbox',
      ],
    },
  },
  markdown: {
    processor: unified({
      remarkPlugins: [remarkGfm, remarkBreaks],
      rehypePlugins: [rehypeImageAttrs],
    }),
    shikiConfig: {
      theme: 'github-dark',
      wrap: true,
    },
  },
  image: {
    sharpConfig: {
      gif: { animated: true },
    },
  },
});
