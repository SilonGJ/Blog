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

function isCacheValid(slug: string): boolean {
  const ts = localStorage.getItem(`vw_ts_${slug}`);
  if (!ts) return false;
  return Date.now() - Number(ts) < CACHE_TTL;
}

function cacheViews(data: Record<string, number>): void {
  const now = String(Date.now());
  for (const [slug, count] of Object.entries(data)) {
    localStorage.setItem(`vw_${slug}`, String(count));
    localStorage.setItem(`vw_ts_${slug}`, now);
  }
}

export async function getViewsBatchCached(slugs: string[]): Promise<Record<string, number>> {
  const result: Record<string, number> = {};
  const uncached: string[] = [];

  for (const slug of slugs) {
    if (isCacheValid(slug)) {
      result[slug] = Number(localStorage.getItem(`vw_${slug}`) ?? '0');
    } else {
      uncached.push(slug);
    }
  }

  if (uncached.length > 0) {
    const fetched = await getViewsBatch(uncached);
    cacheViews(fetched);
    Object.assign(result, fetched);
  }

  return result;
}
