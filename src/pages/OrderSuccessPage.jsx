import { Link, useLocation } from 'react-router-dom'
export default function OrderSuccessPage() {
  const { state } = useLocation()
  return <main className="min-h-[70vh] px-5 py-20 text-white sm:px-8"><div className="aquatic-panel mx-auto max-w-3xl rounded-[36px] p-10 text-center"><p className="text-xs font-black uppercase tracking-[.25em] text-white">Order received</p><h1 className="mt-4 font-display text-5xl font-bold">Your new swimmers are on the list.</h1><p className="mt-5 text-white/80">Thanks for shopping with Chronostasis Aquarium.</p>{state?.orderNumber && <p className="mt-5 rounded-full border border-white/20 bg-[#0a7180]/38 px-4 py-2 text-sm font-black">Order {state.orderNumber}</p>}<Link to="/collection" className="mono-button mt-8 inline-flex rounded-full px-6 py-3 text-sm font-black">Keep exploring →</Link></div></main>
}
