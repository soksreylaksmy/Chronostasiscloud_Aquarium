function isValidOrderPayload(payload) {
  if (!payload || typeof payload !== 'object') return false;
  if (!payload.data || typeof payload.data !== 'object') return false;

  const data = payload.data;

  if (!data.orderNumber || typeof data.orderNumber !== 'string') return false;
  if (!data.customerName || typeof data.customerName !== 'string') return false;
  if (!data.phone || typeof data.phone !== 'string') return false;
  if (!data.address || typeof data.address !== 'string') return false;
  if (typeof data.totalPrice !== 'number') return false;
  if (data.Orderstatus !== 'Pending') return false;
  if (!Array.isArray(data.orderItems) || data.orderItems.length === 0) return false;

  for (const item of data.orderItems) {
    if (!item.productName || typeof item.productName !== 'string') return false;
    if (!Number.isInteger(item.quantity) || item.quantity < 1) return false;
    if (typeof item.price !== 'number' || item.price < 0) return false;
    if (typeof item.subtotal !== 'number' || item.subtotal < 0) return false;
  }

  return true;
}

export async function onRequestPost(context) {
  const { env, request } = context;

  try {
    const payload = await request.json();

    if (!isValidOrderPayload(payload)) {
      return Response.json(
        { error: 'Invalid order payload.' },
        { status: 400 }
      );
    }

    const response = await fetch(`${env.STRAPI_URL}/api/orders`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.STRAPI_API_TOKEN}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const body = await response.text();

    return new Response(body, {
      status: response.status,
      headers: {
        'Content-Type': response.headers.get('Content-Type') || 'application/json',
        'Cache-Control': 'no-store',
      },
    });
  } catch (error) {
    return Response.json(
      { error: 'Unable to create order.' },
      { status: 500 }
    );
  }
}
