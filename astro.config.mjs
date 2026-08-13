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
      smoothScrolling: true,
      scrollToTop: false,       /* 用户要求自己控制"先滚顶再切"，禁用 swup 默认的"切完后滚顶"，避免重复冲突 */
      cache: false,
      preload: true,
      accessibility: true,
      updateHead: true,
      updateBodyClass: false,
      globalInstance: true,
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
    ssr: {
      noExternal: ['@heroui/react', '@heroui/styles'],
    },
  },
  markdown: {
    processor: unified({
      remarkPlugins: [remarkGfm, remarkBreaks],
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
