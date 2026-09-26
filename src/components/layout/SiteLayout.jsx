import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import Header from './Header'
import LiveBackground from './LiveBackground'

export default function SiteLayout() {
  return (
    <div className="relative isolate flex min-h-screen flex-col bg-transparent">
      <LiveBackground />
      <a
        href="#main-content"
        className="fixed left-3 top-3 z-[100] -translate-y-20 rounded-xl bg-white px-4 py-2 text-sm font-semibold text-black focus:translate-y-0"
      >
        Skip to content
      </a>
      <Header />
      <main id="main-content" className="relative z-10 flex-1 bg-transparent">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
