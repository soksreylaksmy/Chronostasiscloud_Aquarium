import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function CartPage() {
  const { items, updateQuantity, removeItem, total } = useCart()
  return (
    <main className="min-h-screen px-5 py-16 text-white sm:px-8">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs font-black uppercase tracking-[.24em] text-white">Your aquarium basket</p>
        <h1 className="mt-3 font-display text-5xl font-bold">Ready to swim home?</h1>
        {items.length === 0 ? <div className="aquatic-panel mt-10 rounded-[30px] p-12 text-center"><h2 className="font-display text-3xl font-bold">Your basket is still empty.</h2><p className="mt-3 text-white/75">Choose a few aquatic companions from the shop.</p><Link to="/collection" className="mono-button mt-6 inline-flex rounded-full px-6 py-3 text-sm font-black">Browse fish</Link></div> : <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_360px]"><div className="space-y-4">{items.map((item) => <div key={item.id} className="aquatic-card flex gap-4 rounded-[26px] p-4"><img src={item.image} alt={item.name} className="h-28 w-28 rounded-2xl object-cover"/><div className="min-w-0 flex-1"><h2 className="font-display text-xl font-bold">{item.name}</h2><p className="mt-1 text-sm font-black text-white">${item.price.toFixed(2)}</p><div className="mt-3 flex items-center gap-2"><button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="h-8 w-8 rounded-lg border border-white/20 bg-[#0a7180]/38">−</button><span className="w-8 text-center font-black">{item.quantity}</span><button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="h-8 w-8 rounded-lg border border-white/20 bg-[#0a7180]/38">+</button><button onClick={() => removeItem(item.id)} className="ml-auto text-xs font-black text-white">Remove</button></div></div></div>)}</div><aside className="aquatic-panel h-fit rounded-[30px] p-6"><p className="text-sm text-white/70">Aquarium total</p><p className="mt-2 font-display text-4xl font-bold text-white">${total.toFixed(2)}</p><Link to="/checkout" className="mono-button mt-6 flex justify-center rounded-2xl px-5 py-4 text-sm font-black">Continue to checkout →</Link></aside></div>}
      </div>
    </main>
  )
}
