import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { createOrder } from '../services/strapi'

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart()
  const navigate = useNavigate()
  const [form, setForm] = useState({ customerName: '', phone: '', address: '' })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  if (!items.length) return <Navigate to="/cart" replace />

  async function handleSubmit(e) {
    e.preventDefault()
    setSubmitting(true)
    setError('')
    const orderNumber = `ORD-${Date.now()}`
    try {
      const order = await createOrder({
        orderNumber,
        customerName: form.customerName,
        phone: form.phone,
        address: form.address,
        totalPrice: Number(total.toFixed(2)),
        Orderstatus: 'Pending',
        orderItems: items.map((item) => ({ productName: item.name, quantity: item.quantity, price: item.price, subtotal: Number((item.price * item.quantity).toFixed(2)) })),
      })
      clearCart()
      navigate('/order-success', { state: { order, orderNumber } })
    } catch (err) {
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen px-5 py-16 text-white sm:px-8">
      <div className="mx-auto max-w-5xl"><p className="text-xs font-black uppercase tracking-[.24em] text-white">Aquatic checkout</p><h1 className="mt-3 font-display text-5xl font-bold">Send your swimmers home.</h1><div className="mt-10 grid gap-8 lg:grid-cols-[1fr_340px]"><form onSubmit={handleSubmit} className="aquatic-panel rounded-[32px] p-6 sm:p-8"><div className="grid gap-5">{[['customerName','Full name'],['phone','Phone number']].map(([name,label]) => <label key={name}><span className="mb-2 block text-sm font-black">{label}</span><input required value={form[name]} onChange={(e) => setForm({ ...form, [name]: e.target.value })} className="h-12 w-full rounded-2xl border border-white/20 bg-[#075d6c]/45 px-4 text-white outline-none placeholder:text-white/50 focus:border-white"/></label>)}<label><span className="mb-2 block text-sm font-black">Delivery address</span><textarea required rows="4" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} className="w-full rounded-2xl border border-white/20 bg-[#075d6c]/45 p-4 text-white outline-none focus:border-white"/></label>{error && <p className="text-sm font-bold text-white">{error}</p>}<button disabled={submitting} className="mono-button rounded-2xl px-6 py-4 text-sm font-black disabled:opacity-50">{submitting ? 'Creating order...' : 'Confirm aquarium order →'}</button></div></form><aside className="aquatic-panel h-fit rounded-[30px] p-6"><p className="text-sm text-white/70">Total</p><p className="mt-2 font-display text-4xl font-bold text-white">${total.toFixed(2)}</p><p className="mt-4 text-xs leading-5 text-white/65">Your order is sent to Chronostasis Strapi and stored in the existing order system.</p></aside></div></div>
    </main>
  )
}
