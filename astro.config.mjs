import { defineConfig } from 'astro/config';
import { unified } from '@astrojs/markdown-remark';
import react from '@astrojs/react';
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
    prerenderEnvironment: 'node',
    routes: {
      extend: {
        exclude: [{ pattern: '/pagefind/*' }],
      },
    },
  }),

  site: 'https://zcx0217.qzz.io',
  integrations: [
    react(),
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
      smoothScrolling: false,   /* 禁用 ScrollPlugin（"切完后再滚"）。滚动完全交给自定义 scrollToTopBlocking（先滚顶再切） */
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
    ssr: {
      noExternal: ['@heroui/react', '@heroui/styles'],
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
