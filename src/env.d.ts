/// <reference types="astro/client" />
/// <reference path="../.astro/types.d.ts" />

interface Env {
  D1: D1Database;
}

declare module "cloudflare:workers" {
  const env: Env;
}
