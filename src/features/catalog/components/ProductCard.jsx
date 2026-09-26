import { Link } from 'react-router-dom'
import { useCart } from '../../../context/CartContext'

const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 })

export default function ProductCard({ product }) {
  const { addItem } = useCart()
  const inStock = Number(product?.stock || 0) > 0

  return (
    <article className="group aquatic-card flex h-full flex-col overflow-hidden rounded-[30px] transition duration-500 hover:-translate-y-2">
      <Link to={`/products/${product.slug}`} className="relative block aspect-square overflow-hidden bg-[#0a7080]/42">
        {product?.image ? <img src={product.image} alt={product.name} className="h-full w-full object-cover transition duration-700 group-hover:scale-110" /> : <div className="flex h-full items-center justify-center text-sm text-white/75">No fish photo yet</div>}
        <div className="absolute inset-0 bg-gradient-to-t from-[#034d5b]/75 via-transparent to-transparent" />
        <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-white/90 px-3 py-1 text-xs font-black text-black backdrop-blur">{product?.category?.name || 'Aquatic pet'}</span>
        <span className={`absolute right-4 top-4 rounded-full px-3 py-1 text-xs font-black ${inStock ? 'bg-white text-black' : 'bg-white text-black'}`}>{inStock ? 'Ready to swim' : 'Unavailable'}</span>
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <Link to={`/products/${product.slug}`}><h3 className="line-clamp-2 font-display text-2xl font-bold text-white transition group-hover:text-white">{product?.name}</h3></Link>
        <p className="mt-3 line-clamp-2 text-sm leading-6 text-white/75">{product?.description || 'A lovely aquatic companion for your aquarium.'}</p>
        <div className="mt-5 flex items-end justify-between border-t border-white/20 pt-4"><div><p className="text-[10px] uppercase tracking-[.2em] text-white/55">Adoption price</p><p className="mt-1 text-xl font-black text-white">{currency.format(product?.price || 0)}</p></div><div className="text-right"><p className="text-[10px] uppercase tracking-[.2em] text-white/55">Available</p><p className="mt-1 text-sm font-bold text-white/85">{product?.stock ?? 0}</p></div></div>
        <div className="mt-5 grid grid-cols-2 gap-3"><Link to={`/products/${product.slug}`} className="flex items-center justify-center rounded-2xl border border-white/20 bg-[#0a7180]/38 px-4 py-3 text-sm font-black text-white transition hover:bg-[#0a7180]/58">Meet this fish</Link><button onClick={() => addItem(product, 1)} disabled={!inStock} className="mono-button rounded-2xl px-4 py-3 text-sm font-black transition hover:-translate-y-.5 disabled:opacity-40">Add to basket</button></div>
      </div>
    </article>
  )
}
