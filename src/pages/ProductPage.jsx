import { useEffect, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { getProductBySlug } from '../services/strapi'
import { useCart } from '../context/CartContext'

export default function ProductPage() {
  const { slug } = useParams()
  const { addItem } = useCart()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    getProductBySlug(slug)
      .then(setProduct)
      .catch((e) => { console.error(e); setError('This aquatic pet could not be loaded.') })
      .finally(() => setLoading(false))
  }, [slug])

  if (loading) return <main className="min-h-[70vh] px-5 py-20 text-white"><div className="aquatic-panel mx-auto max-w-6xl rounded-[30px] p-10 text-center">Swimming over to meet your fish...</div></main>
  if (error) return <main className="min-h-[70vh] px-5 py-20 text-white"><div className="aquatic-panel mx-auto max-w-6xl rounded-[30px] p-10 text-center">{error}</div></main>
  if (!product) return <Navigate to="/collection" replace />

  const inStock = Number(product.stock || 0) > 0
  const price = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(product.price || 0)

  return (
    <main className="min-h-screen text-white">
      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-8 lg:grid-cols-2 lg:py-20">
        <div className="aquatic-panel rounded-[36px] p-5"><div className="group aspect-square overflow-hidden rounded-[30px] bg-[#087285]/42">{product.image ? <img src={product.image} alt={product.name} className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.05]" /> : <div className="flex h-full items-center justify-center text-white/75">No fish photo yet</div>}</div></div>

        <div className="aquatic-panel flex flex-col justify-center rounded-[36px] p-7 sm:p-10">
          <Link to="/collection" className="text-sm font-black text-white">← Back to the aquarium</Link>
          <div className="mt-7 flex flex-wrap gap-3"><span className="rounded-full bg-white/90 px-3 py-1.5 text-xs font-black text-black">{product.category?.name || 'Aquatic pet'}</span><span className={`rounded-full px-3 py-1.5 text-xs font-black ${inStock ? 'bg-white text-black' : 'bg-white text-black'}`}>{inStock ? 'Ready to swim home' : 'Currently unavailable'}</span></div>
          <h1 className="mt-6 font-display text-4xl font-bold leading-tight sm:text-6xl">{product.name}</h1>
          <p className="mt-5 text-3xl font-black text-white">{price}</p>
          <p className="mt-6 text-base leading-8 text-white/82">{product.description || 'A beautiful aquatic companion ready to bring movement and color to your aquarium.'}</p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2"><div className="rounded-2xl border border-white/20 bg-[#0b7180]/38 p-4"><p className="text-xs uppercase tracking-[.18em] text-white/55">Availability</p><p className="mt-2 font-black">{inStock ? `${product.stock} available` : 'Out of stock'}</p></div><div className="rounded-2xl border border-white/20 bg-[#0b7180]/38 p-4"><p className="text-xs uppercase tracking-[.18em] text-white/55">Aquatic group</p><p className="mt-2 font-black">{product.category?.name || 'Aquatic pet'}</p></div></div>

          <div className="mt-8"><p className="mb-3 text-sm font-black">Quantity</p><div className="inline-flex items-center rounded-2xl border border-white/20 bg-[#0b7180]/38 p-1"><button onClick={() => setQuantity((q) => Math.max(1, q - 1))} className="h-11 w-11 rounded-xl font-black hover:bg-white/10">−</button><span className="min-w-14 text-center font-black">{quantity}</span><button onClick={() => setQuantity((q) => Math.min(product.stock || 1, q + 1))} className="h-11 w-11 rounded-xl font-black hover:bg-white/10">+</button></div></div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row"><button onClick={() => addItem(product, quantity)} disabled={!inStock} className="mono-button flex-1 rounded-2xl px-6 py-4 text-sm font-black transition hover:-translate-y-1 disabled:opacity-40">Add {quantity} to basket →</button><Link to="/collection" className="flex items-center justify-center rounded-2xl border border-white/20 bg-[#0b7180]/38 px-6 py-4 text-sm font-black hover:bg-[#0b7180]/58">Keep exploring</Link></div>
        </div>
      </section>
    </main>
  )
}
