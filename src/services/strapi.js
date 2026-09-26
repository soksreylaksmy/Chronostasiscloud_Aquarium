function richTextToPlainText(blocks) {
  if (!Array.isArray(blocks)) return ''

  return blocks
    .map((block) => {
      if (!Array.isArray(block.children)) return ''

      return block.children
        .map((child) => child.text || '')
        .join('')
    })
    .join('\n')
}

function normalizeCategory(category) {
  if (!category) {
    return {
      id: 'uncategorized',
      name: 'Uncategorized',
      slug: 'uncategorized',
    }
  }

  return {
    id: category.documentId || category.id,
    name: category.name || 'Uncategorized',
    slug: category.slug || 'uncategorized',
  }
}

function normalizeProduct(product) {
  const image = Array.isArray(product.Images)
    ? product.Images[0]
    : product.Images

  return {
    id: product.documentId || product.id,
    name: product.Name || 'Unnamed product',
    slug: product.slug || '',
    description: richTextToPlainText(product.Description),
    price: Number(product.Price || 0),
    currency: 'USD',
    stock: Number(product.Stock || 0),
    inStock: Number(product.Stock || 0) > 0,
    featured: false,
    image: image?.url || null,
    category: normalizeCategory(product.category),
  }
}

async function parseResponse(response) {
  let result = null

  try {
    result = await response.json()
  } catch {
    result = null
  }

  if (!response.ok) {
    const message =
      result?.error?.message ||
      result?.message ||
      `Request failed with status ${response.status}`

    throw new Error(message)
  }

  return result
}

export async function getProducts() {
  const response = await fetch('/api/products')

  const result = await parseResponse(response)

  return (result?.data || []).map(normalizeProduct)
}

export async function getCategories() {
  const response = await fetch('/api/categories')

  const result = await parseResponse(response)

  return (result?.data || []).map((category) => {
    const image = Array.isArray(category.Images)
      ? category.Images[0]
      : category.Images

    return {
      id: category.documentId || category.id,
      name: category.name || 'Unnamed category',
      slug: category.slug || '',
      description: richTextToPlainText(category.Descriptions),
      image: image?.url || null,
    }
  })
}

export async function getProductBySlug(slug) {
  const response = await fetch(
    `/api/products?slug=${encodeURIComponent(slug)}`
  )

  const result = await parseResponse(response)

  if (!result?.data?.length) {
    return null
  }

  return normalizeProduct(result.data[0])
}

export async function createOrder(orderData) {
  const response = await fetch('/api/orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      data: orderData,
    }),
  })

  const result = await parseResponse(response)

  return result?.data
}