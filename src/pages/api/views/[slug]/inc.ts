export const prerender = false;

import { env } from 'cloudflare:workers';

export async function POST({ params }: { params: { slug: string } }) {
  const { slug } = params;

  const { results } = await env.D1.prepare(
    `INSERT INTO article_views (slug, count)
     VALUES (?, 1)
     ON CONFLICT(slug) DO UPDATE SET count = count + 1, updated_at = CURRENT_TIMESTAMP
     RETURNING count`
  )
    .bind(slug)
    .all();

  const count = (results?.[0] as any)?.count ?? 1;

  return new Response(JSON.stringify({ count }), {
    headers: { 'Content-Type': 'application/json' },
  });
}
