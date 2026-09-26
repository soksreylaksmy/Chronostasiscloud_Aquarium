export async function onRequestGet(context) {
  const { env, request } = context;

  const incomingUrl = new URL(request.url);
  const target = new URL(`${env.STRAPI_URL}/api/categories`);

  incomingUrl.searchParams.forEach((value, key) => {
    target.searchParams.append(key, value);
  });

  try {
    const response = await fetch(target.toString(), {
      headers: {
        Authorization: `Bearer ${env.STRAPI_API_TOKEN}`,
        Accept: 'application/json',
      },
    });

    const body = await response.text();

    return new Response(body, {
      status: response.status,
      headers: {
        'Content-Type': response.headers.get('Content-Type') || 'application/json',
        'Cache-Control': 'public, max-age=60, s-maxage=300',
      },
    });
  } catch (error) {
    return Response.json(
      { error: 'Unable to load categories.' },
      { status: 500 }
    );
  }
}
