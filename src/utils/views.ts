const CACHE_TTL = 30 * 60 * 1000;

export async function getViewsBatch(slugs: string[]): Promise<Record<string, number>> {
  const res = await fetch('/api/views/batch', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ slugs }),
  });
  const { data } = await res.json();
  return data;
}

export async function incrementView(slug: string): Promise<number> {
  const res = await fetch(`/api/views/${slug}/inc`, { method: 'POST' });
  const { count } = await res.json();
  localStorage.setItem(`vw_${slug}`, String(count));
  localStorage.setItem(`vw_ts_${slug}`, String(Date.now()));
  return count;
}

export function getCachedView(slug: string): number | null {
  const ts = localStorage.getItem(`vw_ts_${slug}`);
  if (!ts) return null;
  if (Date.now() - Number(ts) >= CACHE_TTL) return null;
  return Number(localStorage.getItem(`vw_${slug}`) ?? '0');
}
