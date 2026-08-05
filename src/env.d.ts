/// <reference types="astro/client" />

interface Env {
  D1: D1Database;
}

declare module 'cloudflare:workers' {
  const env: Env;
}
