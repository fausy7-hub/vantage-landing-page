export default async (req) => {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 });
  }

  let url;
  try {
    ({ url } = await req.json());
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid request body' }), { status: 400 });
  }

  if (!url || typeof url !== 'string' || !/^https?:\/\//.test(url)) {
    return new Response(JSON.stringify({ error: 'A valid http(s) URL is required' }), { status: 400 });
  }

  const apiKey = process.env.FIRECRAWL_API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'Firecrawl is not configured' }), { status: 500 });
  }

  const firecrawlRes = await fetch('https://api.firecrawl.dev/v1/scrape', {
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
        schema: {
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
        },
      },
    }),
  });

  if (!firecrawlRes.ok) {
    const detail = await firecrawlRes.text();
    return new Response(JSON.stringify({ error: 'Firecrawl request failed', detail }), { status: 502 });
  }

  const data = await firecrawlRes.json();
  const services = data?.data?.json?.services ?? [];

  return new Response(JSON.stringify({ url, services }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
