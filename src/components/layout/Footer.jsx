import { Link } from 'react-router-dom'
import brandLogo from '../../asset/logo.png'

export default function Footer() {
  return (
    <footer className="relative z-20 border-t border-white/20 bg-black/10 text-white backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
        <div className="grid gap-10 md:grid-cols-[1.4fr_.7fr_.7fr]">
          <div>
            <Link to="/" className="inline-flex items-center gap-3">
              <img src={brandLogo} alt="Chronostasis" className="h-16 w-auto object-contain" />
              <span className="font-display text-2xl font-bold tracking-[0.05em] text-white">Chronostasis</span>
            </Link>
            <p className="mt-5 max-w-md text-sm leading-7 text-white/75">Aquatic pets, peaceful tanks, and underwater companions from our live Strapi catalog.</p>
          </div>

          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-white">Explore</p>
            <div className="mt-5 flex flex-col gap-3 text-sm font-semibold text-white/70">
              <Link className="transition hover:translate-x-1 hover:text-white" to="/collection">Aquarium shop</Link>
              <Link className="transition hover:translate-x-1 hover:text-white" to="/cart">Your basket</Link>
            </div>
          </div>

          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-white">Chronostasis</p>
            <div className="mt-5 flex flex-col gap-3 text-sm font-semibold text-white/70">
              <Link className="transition hover:translate-x-1 hover:text-white" to="/about">Our ocean</Link>
              <Link className="transition hover:translate-x-1 hover:text-white" to="/">Home</Link>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/15 pt-6 text-xs text-white/55 sm:flex-row sm:justify-between">
          <span>© 2026 Chronostasis Aquarium. All rights reserved.</span>
          <span>Live catalog powered by Strapi</span>
        </div>
      </div>
    </footer>
  )
}
