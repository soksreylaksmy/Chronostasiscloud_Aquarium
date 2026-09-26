import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const CartContext = createContext(null)
const STORAGE_KEY = 'chronostasis-cart'

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items])

  function addItem(product, quantity = 1) {
    if (!product?.id || quantity < 1) return
    setItems((current) => {
      const existing = current.find((item) => item.id === product.id)
      if (existing) {
        return current.map((item) =>
          item.id === product.id
            ? { ...item, quantity: Math.min(item.quantity + quantity, product.stock || 99) }
            : item,
        )
      }
      return [...current, { ...product, quantity: Math.min(quantity, product.stock || quantity) }]
    })
  }

  function updateQuantity(id, quantity) {
    setItems((current) =>
      current.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, Math.min(quantity, item.stock || 99)) }
          : item,
      ),
    )
  }

  function removeItem(id) {
    setItems((current) => current.filter((item) => item.id !== id))
  }

  function clearCart() {
    setItems([])
  }

  const count = useMemo(() => items.reduce((sum, item) => sum + item.quantity, 0), [items])
  const total = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items],
  )

  return (
    <CartContext.Provider value={{ items, addItem, updateQuantity, removeItem, clearCart, count, total }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used inside CartProvider')
  return context
}
