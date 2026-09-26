import { useEffect, useMemo, useState } from 'react'
import { SearchIcon } from '../../components/icons/AppIcons'
import ProductCard from './components/ProductCard'
import brandLogo from '../../asset/logo.png'
import { getProducts, getCategories } from '../../services/strapi'

const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-low', label: 'Price: low to high' },
  { value: 'price-high', label: 'Price: high to low' },
  { value: 'name', label: 'Name: A–Z' },
]

export default function CatalogView() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('featured')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    Promise.all([getProducts(), getCategories()])
      .then(([p, c]) => { setProducts(p); setCategories(c) })
      .catch((e) => { console.error(e); setError('We could not load the aquarium right now.') })
      .finally(() => setLoading(false))
  }, [])

  const categoryFilters = useMemo(() => [{ id: 'all', name: 'All aquatic pets', slug: 'all' }, ...categories], [categories])
  const categoryCounts = useMemo(() => products.reduce((acc, p) => { const s = p?.category?.slug || 'uncategorized'; acc[s] = (acc[s] || 0) + 1; return acc }, { all: products.length }), [products])
  const visibleProducts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase()
    return products.filter((p) => {
      const s = p?.category?.slug || 'uncategorized'
      const text = `${p?.name || ''} ${p?.description || ''} ${p?.category?.name || ''}`.toLowerCase()
      return (activeCategory === 'all' || s === activeCategory) && (!q || text.includes(q))
    }).sort((a, b) => sortBy === 'price-low' ? a.price - b.price : sortBy === 'price-high' ? b.price - a.price : sortBy === 'name' ? a.name.localeCompare(b.name) : 0)
  }, [products, activeCategory, searchQuery, sortBy])

  if (loading) return <div className="aquatic-panel rounded-[30px] p-10 text-center text-white/85">Swimming through the catalog...</div>
  if (error) return <div className="rounded-[30px] border border-[#ffb38d]/50 bg-[#7c3d3d]/35 p-10 text-center text-white">{error}</div>

  return (
    <div className="space-y-8">
      <section className="aquatic-panel relative overflow-hidden rounded-[36px] p-7 sm:p-10">
        <div className="absolute -right-16 -top-20 h-72 w-72 rounded-full bg-white/16 blur-3xl" />
        <div className="relative grid gap-10 lg:grid-cols-[1.2fr_.8fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-[#0a7180]/35 px-4 py-2 backdrop-blur-md"><img src={brandLogo} alt="Chronostasis" className="h-11 w-auto" /><span className="text-xs font-black uppercase tracking-[.24em] text-white">Chronostasis Aquarium</span></div>
            <p className="mt-8 text-xs font-black uppercase tracking-[.28em] text-white">Meet the swimmers</p>
            <h1 className="mt-4 font-display text-4xl font-bold leading-tight sm:text-6xl">Color, calm, and a little <span className="text-white">underwater magic.</span></h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-white/85">Browse aquarium fish and aquatic pets from the live Chronostasis catalog.</p>
          </div>
          <div className="grid grid-cols-2 gap-4"><div className="rounded-3xl border border-white/20 bg-[#0b7180]/38 p-5 backdrop-blur-md"><p className="text-[10px] uppercase tracking-[.2em] text-white/60">Aquatic pets</p><p className="mt-2 font-display text-4xl font-bold">{products.length}</p></div><div className="rounded-3xl border border-white/20 bg-[#0b7180]/38 p-5 backdrop-blur-md"><p className="text-[10px] uppercase tracking-[.2em] text-white/60">Collections</p><p className="mt-2 font-display text-4xl font-bold">{categories.length}</p></div></div>
        </div>
      </section>

      <section className="aquatic-panel rounded-[32px] p-5 sm:p-7">
        <div className="flex gap-2 overflow-x-auto pb-2">{categoryFilters.map((c) => { const active = activeCategory === c.slug; return <button key={c.id} onClick={() => setActiveCategory(c.slug)} className={`shrink-0 rounded-full border px-4 py-2.5 text-sm font-black transition ${active ? 'border-white bg-white text-black shadow-[0_10px_30px_rgba(0,0,0,.18)]' : 'border-white/20 bg-[#0a7180]/35 text-white/85 hover:border-white/60 hover:bg-[#0a7180]/55'}`}>{c.name}<span className="ml-2 rounded-full bg-black/10 px-2 py-0.5 text-xs">{categoryCounts[c.slug] || 0}</span></button> })}</div>
        <div className="mt-6 flex flex-col gap-4 border-t border-white/20 pt-6 lg:flex-row lg:items-center lg:justify-between">
          <label className="relative block w-full lg:max-w-lg"><span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/60"><SearchIcon /></span><input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search fish and aquatic pets..." className="h-12 w-full rounded-2xl border border-white/20 bg-[#075d6c]/42 pr-4 pl-11 text-sm text-white outline-none placeholder:text-white/55 focus:border-white" /></label>
          <div className="flex gap-3"><select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="h-12 rounded-2xl border border-white/20 bg-[#075d6c]/75 px-4 text-sm text-white outline-none focus:border-white">{sortOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}</select>{(activeCategory !== 'all' || searchQuery || sortBy !== 'featured') && <button onClick={() => { setActiveCategory('all'); setSearchQuery(''); setSortBy('featured') }} className="rounded-2xl border border-white/20 px-4 text-sm font-black text-white/85 hover:bg-white/10">Reset</button>}</div>
        </div>
        <p className="mt-5 border-t border-white/20 pt-5 text-sm text-white/70">Showing {visibleProducts.length} of {products.length} aquatic pets</p>
      </section>

      {visibleProducts.length ? <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">{visibleProducts.map((p) => <ProductCard key={p.id} product={p} />)}</div> : <div className="aquatic-panel rounded-[30px] px-6 py-20 text-center"><img src={brandLogo} alt="Chronostasis" className="mx-auto h-16 w-auto" /><h2 className="mt-6 font-display text-3xl font-bold">No swimmers found</h2><p className="mt-2 text-sm text-white/75">Try another search or clear your filters.</p></div>}
    </div>
  )
}
