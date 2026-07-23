const MAX_URLS = 5;
const RATE_LIMIT = 8; // requests
const RATE_WINDOW_MS = 10 * 60 * 1000; // per 10 minutes, per IP

// In-memory per-instance counter. Resets on cold start and isn't shared across
// concurrent instances — it's a deterrent against casual/scripted abuse of a
// paid API, not a hard security boundary.
const hits = new Map();

function isRateLimited(ip) {
  const now = Date.now();
  const entry = hits.get(ip);

  if (!entry || now - entry.windowStart > RATE_WINDOW_MS) {
    hits.set(ip, { windowStart: now, count: 1 });
    return false;
  }

  entry.count += 1;
  return entry.count > RATE_LIMIT;
}

const SCHEMA = {
  type: 'object',
  properties: {
    services: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          price: { type: 'string' },
        },
        required: ['name', 'price'],
      },
    },
  },
  required: ['services'],
};

async function scrapeOne(url, apiKey) {
  const res = await fetch('https://api.firecrawl.dev/v1/scrape', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      url,
      formats: ['json'],
      jsonOptions: {
        prompt: 'Extract every treatment, service, or membership tier mentioned on this page along with its price or price range.',
        schema: SCHEMA,
      },
    }),
  });

  if (!res.ok) {
    return { url, error: `Firecrawl request failed (${res.status})` };
  }

  const data = await res.json();
  return { url, services: data?.data?.json?.services ?? [] };
}

export default async (req, context) => {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 });
  }

  // Only accept calls made from this site itself, not an arbitrary page or script
  // that found the endpoint. Client-supplied headers can be spoofed by a determined
  // caller, but this blocks casual/browser-driven cross-site abuse.
  const origin = req.headers.get('origin');
  if (origin) {
    let originHost;
    try { originHost = new URL(origin).host; } catch { originHost = null; }
    if (originHost !== req.headers.get('host')) {
      return new Response(JSON.stringify({ error: 'Forbidden' }), { status: 403 });
    }
  }

  const ip = context?.ip || req.headers.get('x-nf-client-connection-ip') || 'unknown';
  if (isRateLimited(ip)) {
    return new Response(JSON.stringify({ error: 'Too many requests — try again in a few minutes' }), { status: 429 });
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid request body' }), { status: 400 });
  }

  // Accept either a single `url` or a batch `urls` array (up to MAX_URLS).
  const rawUrls = Array.isArray(body.urls) ? body.urls : [body.url];
  const urls = [...new Set(rawUrls.filter(Boolean))].slice(0, MAX_URLS);

  if (urls.length === 0 || urls.some(u => typeof u !== 'string' || !/^https?:\/\//.test(u))) {
    return new Response(JSON.stringify({ error: `Provide 1–${MAX_URLS} valid http(s) URLs` }), { status: 400 });
  }

  const apiKey = process.env.FIRECRAWL_API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'Firecrawl is not configured' }), { status: 500 });
  }

  const results = await Promise.all(urls.map(u => scrapeOne(u, apiKey)));

  return new Response(JSON.stringify({ results }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
