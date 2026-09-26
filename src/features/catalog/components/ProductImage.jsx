export default function ProductImage({ product, className = '', eager = false }) {
  if (!product.image) {
    return null
  }

  return (
    <img
      src={product.image}
      alt={product.name}
      className={className}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
    />
  )
}
