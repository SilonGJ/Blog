import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import swup from '@swup/astro';
import icon from 'astro-icon';

export default defineConfig({
  site: 'https://example.com',
  integrations: [
    react(),
    sitemap(),
    icon({
      include: {
        'simple-icons': ['github', 'twitter', 'qq', 'bilibili'],
        'lucide': ['mail'],
      },
    }),
    swup({
      theme: false,
      animationClass: 'transition-swup-',
      containers: ['main'],
      smoothScrolling: true,
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
    shikiConfig: {
      theme: 'github-dark',
      wrap: true,
    },
  },
});
