import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import brandLogo from '../asset/logo.png'
import { getCategories, getProducts } from '../services/strapi'

export default function HomePage() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])

  useEffect(() => {
    Promise.all([getProducts(), getCategories()])
      .then(([productData, categoryData]) => {
        setProducts(productData)
        setCategories(categoryData)
      })
      .catch(console.error)
  }, [])

  const featured = products.slice(0, 4)

  return (
    <main className="overflow-hidden text-white">
      <section className="relative min-h-[720px] border-b border-white/15">
        <div className="mx-auto grid min-h-[720px] max-w-7xl items-center gap-14 px-5 py-20 sm:px-8 lg:grid-cols-2">
          <div>
            <div className="inline-flex items-center gap-3 rounded-full border border-white/25 bg-[#0a6f7a]/35 px-4 py-2 backdrop-blur-xl">
              <img src={brandLogo} alt="Chronostasis" className="h-12 w-auto object-contain" />
              <span className="text-xs font-black uppercase tracking-[.22em] text-white">Aquatic sunshine</span>
            </div>

            <p className="mt-8 text-xs font-black uppercase tracking-[.28em] text-white">Fish • aquatic pets • peaceful tanks</p>
            <h1 className="mt-5 font-display text-5xl font-bold leading-[1.04] tracking-[-.03em] sm:text-7xl">
              Bring a little ocean
              <span className="block text-white ">into your home.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-white/85">
              Discover aquarium fish and aquatic companions selected for colorful, calming, happy underwater spaces.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <Link to="/collection" className="mono-button rounded-full px-7 py-3.5 text-sm font-black transition hover:-translate-y-1">Explore fish →</Link>
              <Link to="/about" className="rounded-full border border-white/25 bg-[#0a6f7a]/32 px-7 py-3.5 text-sm font-bold text-white backdrop-blur-md transition hover:-translate-y-1 hover:bg-[#0a6f7a]/48">Meet Chronostasis</Link>
            </div>

            <div className="mt-12 flex gap-10 border-t border-white/20 pt-6">
              <div><p className="font-display text-3xl font-bold">{products.length || '—'}</p><p className="mt-1 text-[10px] uppercase tracking-[.2em] text-white/65">Aquatic pets</p></div>
              <div><p className="font-display text-3xl font-bold">{categories.length || '—'}</p><p className="mt-1 text-[10px] uppercase tracking-[.2em] text-white/65">Collections</p></div>
            </div>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="sun-orb" />
            <div className="aquatic-panel float-slow relative w-full max-w-lg overflow-hidden rounded-[38px] p-5">
              {featured[0]?.image ? (
                <img src={featured[0].image} alt={featured[0].name} className="aspect-square w-full rounded-[30px] object-cover" />
              ) : (
                <div className="flex aspect-square items-center justify-center rounded-[30px] bg-[#087283]/45 text-white/75">Your featured fish will appear here</div>
              )}
              <div className="mt-5 flex items-end justify-between gap-4">
                <div><p className="text-xs font-black uppercase tracking-[.2em] text-white">Featured swimmer</p><h2 className="mt-2 font-display text-2xl font-bold">{featured[0]?.name || 'Aquatic companion'}</h2></div>
                {featured[0] && <p className="text-lg font-black text-white">${featured[0].price}</p>}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
        <div className="aquatic-panel rounded-[34px] p-7 sm:p-10">
          <p className="text-xs font-black uppercase tracking-[.24em] text-white">Aquarium collections</p>
          <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="font-display text-4xl font-bold sm:text-5xl">Find your next finned friend.</h2>
            <Link to="/collection" className="text-sm font-black text-white">See all fish →</Link>
          </div>

          <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {categories.length ? categories.map((category) => (
              <Link key={category.id} to="/collection" className="group relative min-h-[230px] overflow-hidden rounded-[28px] border border-white/20 bg-[#0a7180]/40 p-6 backdrop-blur-md transition duration-500 hover:-translate-y-2 hover:bg-[#08768a]/58 hover:shadow-[0_18px_50px_rgba(255,214,102,.18)]">
                {category.image && <img src={category.image} alt={category.name} className="absolute inset-0 h-full w-full object-cover opacity-25 transition duration-700 group-hover:scale-110 group-hover:opacity-35" />}
                <div className="relative z-10 flex h-full flex-col justify-between">
                  <span className="w-fit rounded-full bg-white px-3 py-1 text-xs font-black text-black">Collection</span>
                  <div><h3 className="font-display text-3xl font-bold">{category.name}</h3><p className="mt-2 text-sm text-white/80">Explore colorful aquatic pets in this collection.</p></div>
                </div>
              </Link>
            )) : (
              <div className="rounded-[28px] border border-white/20 bg-[#0a7180]/40 p-8 text-white/80">Your Strapi categories will appear here.</div>
            )}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-20 sm:px-8">
        <div className="aquatic-panel rounded-[34px] p-7 sm:p-10">
          <p className="text-xs font-black uppercase tracking-[.24em] text-white">Fresh from the reef</p>
          <h2 className="mt-3 font-display text-4xl font-bold sm:text-5xl">Featured aquatic pets</h2>
          <div className="mt-9 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((product) => (
              <Link key={product.id} to={`/products/${product.slug}`} className="group overflow-hidden rounded-[26px] border border-white/20 bg-[#0b7382]/42 backdrop-blur-md transition duration-500 hover:-translate-y-2 hover:shadow-[0_16px_48px_rgba(255,214,102,.20)]">
                <div className="aspect-square overflow-hidden bg-[#086878]/45">{product.image ? <img src={product.image} alt={product.name} className="h-full w-full object-cover transition duration-700 group-hover:scale-110" /> : <div className="flex h-full items-center justify-center text-white/70">No image</div>}</div>
                <div className="p-5"><p className="text-xs font-black uppercase tracking-[.16em] text-white">{product.category?.name || 'Aquatic pet'}</p><h3 className="mt-2 font-display text-xl font-bold">{product.name}</h3><p className="mt-4 font-black text-white">${product.price}</p></div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
