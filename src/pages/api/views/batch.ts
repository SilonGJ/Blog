export const prerender = false;

import { env } from 'cloudflare:workers';

export async function POST({ request }: { request: Request }) {
  const { slugs } = (await request.json()) as { slugs: string[] };

  if (!slugs || slugs.length === 0) {
    return new Response(JSON.stringify({ data: {} }), {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const placeholders = slugs.map(() => '?').join(',');
  const query = `SELECT slug, count FROM article_views WHERE slug IN (${placeholders})`;

  const { results } = await env.D1.prepare(query).bind(...slugs).all();

  const data: Record<string, number> = {};
  for (const slug of slugs) {
    const match = results?.find((r: any) => r.slug === slug);
    data[slug] = match ? match.count : 0;
  }

  return new Response(JSON.stringify({ data }), {
    headers: { 'Content-Type': 'application/json' },
  });
}
