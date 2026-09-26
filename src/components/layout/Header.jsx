import { Link, NavLink } from 'react-router-dom'
import brandLogo from '../../asset/logo.png'
import { useCart } from '../../context/CartContext'

const navigation = [
  { label: 'Home', to: '/' },
  { label: 'Aquarium Shop', to: '/collection' },
  { label: 'Our Ocean', to: '/about' },
]

function navClass({ isActive }) {
  return `group relative text-sm font-bold transition duration-300 ${
    isActive ? 'text-white' : 'text-white/75 hover:text-white'
  }`
}

export default function Header() {
  const { count } = useCart()

  return (
    <header className="sticky top-0 z-50 border-b border-white/20 bg-black/10 text-white backdrop-blur-sm">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8" aria-label="Primary navigation">
        <Link to="/" className="group flex items-center gap-3" aria-label="Chronostasis home">
          <img src={brandLogo} alt="Chronostasis" className="h-14 w-auto object-contain transition duration-300 group-hover:scale-105" />
          <span className="hidden font-display text-xl font-bold tracking-[0.05em] text-white sm:inline">Chronostasis</span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {navigation.map((item) => (
            <NavLink key={item.to} to={item.to} className={navClass}>
              {({ isActive }) => (
                <>
                  {item.label}
                  <span className={`absolute -bottom-2 left-0 h-[2px] bg-white transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                </>
              )}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Link to="/cart" className="mono-button-dark rounded-full px-4 py-2.5 text-xs font-black">
            Basket
            {count > 0 && <span className="ml-2 rounded-full bg-white px-2 py-0.5 text-[10px] font-black text-black">{count}</span>}
          </Link>
          <Link to="/collection" className="mono-button hidden rounded-full px-5 py-2.5 text-xs font-black sm:inline-flex">Shop fish →</Link>
        </div>
      </nav>
    </header>
  )
}
