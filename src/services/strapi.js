const STRAPI_URL =
  import.meta.env.VITE_STRAPI_URL || 'https://strapi.aztrolabe.com'

function richTextToPlainText(blocks) {
  if (!Array.isArray(blocks)) return ''
  return blocks
    .map((block) => {
      if (!Array.isArray(block.children)) return ''
      return block.children.map((child) => child.text || '').join('')
    })
    .join('\n')
}

function normalizeCategory(category) {
  if (!category) {
    return { id: 'uncategorized', name: 'Uncategorized', slug: 'uncategorized' }
  }
  return {
    id: category.documentId || category.id,
    name: category.name || 'Uncategorized',
    slug: category.slug || 'uncategorized',
  }
}

function normalizeProduct(product) {
  const image = Array.isArray(product.Images) ? product.Images[0] : product.Images
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

export async function getProducts() {
  const response = await fetch(`${STRAPI_URL}/api/products?populate=*`)
  if (!response.ok) throw new Error('Failed to load products')
  const result = await response.json()
  return (result.data || []).map(normalizeProduct)
}

export async function getCategories() {
  const response = await fetch(`${STRAPI_URL}/api/categories?populate=*`)
  if (!response.ok) throw new Error('Failed to load categories')
  const result = await response.json()
  return (result.data || []).map((category) => ({
    id: category.documentId || category.id,
    name: category.name || 'Unnamed category',
    slug: category.slug || '',
    description: richTextToPlainText(category.Descriptions),
    image: category.Images?.url || null,
  }))
}

export async function getProductBySlug(slug) {
  const response = await fetch(
    `${STRAPI_URL}/api/products?filters[slug][$eq]=${encodeURIComponent(slug)}&populate=*`,
  )
  if (!response.ok) throw new Error('Failed to load product')
  const result = await response.json()
  if (!result.data?.length) return null
  return normalizeProduct(result.data[0])
}

export async function createOrder(orderData) {
  const response = await fetch(`${STRAPI_URL}/api/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ data: orderData }),
  })
  const result = await response.json()
  if (!response.ok) {
    throw new Error(result?.error?.message || 'Failed to create order')
  }
  return result.data
}
