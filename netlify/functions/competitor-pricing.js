const MAX_URLS = 5;

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

export default async (req) => {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 });
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
