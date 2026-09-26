import { useEffect } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import SiteLayout from '../components/layout/SiteLayout'
import AboutPage from '../pages/AboutPage'
import CartPage from '../pages/CartPage'
import CheckoutPage from '../pages/CheckoutPage'
import CollectionPage from '../pages/CollectionPage'
import HomePage from '../pages/HomePage'
import OrderSuccessPage from '../pages/OrderSuccessPage'
import ProductPage from '../pages/ProductPage'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

export default function AppRouter() {
  return <><ScrollToTop /><Routes><Route element={<SiteLayout />}><Route index element={<HomePage />} /><Route path="collection" element={<CollectionPage />} /><Route path="products/:slug" element={<ProductPage />} /><Route path="cart" element={<CartPage />} /><Route path="checkout" element={<CheckoutPage />} /><Route path="order-success" element={<OrderSuccessPage />} /><Route path="about" element={<AboutPage />} /><Route path="*" element={<Navigate to="/" replace />} /></Route></Routes></>
}
