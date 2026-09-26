import { Link } from 'react-router-dom'
import brandLogo from '../asset/logo.png'

export default function AboutPage() {
  return (
    <main className="min-h-screen px-5 py-20 text-white sm:px-8">
      <section className="aquatic-panel mx-auto max-w-6xl rounded-[38px] p-8 sm:p-12">
        <img src={brandLogo} alt="Chronostasis" className="h-20 w-auto" />
        <p className="mt-8 text-xs font-black uppercase tracking-[.25em] text-white">Our ocean</p>
        <h1 className="mt-4 max-w-4xl font-display text-5xl font-bold sm:text-7xl">A calmer little world, one aquarium at a time.</h1>
        <p className="mt-7 max-w-3xl text-lg leading-8 text-white/82">Chronostasis is an aquatic pet storefront for people who love peaceful tanks, colorful fish, and the gentle rhythm of underwater life.</p>
        <div className="mt-12 grid gap-5 md:grid-cols-3">{[['Healthy companions','Browse fish and aquatic pets from the live catalog.'],['Aquarium joy','Build bright, calm and colorful underwater spaces.'],['Simple shopping','Choose your fish, add them to your basket, and place an order online.']].map(([title, desc]) => <div key={title} className="aquatic-card rounded-[28px] p-6 transition hover:-translate-y-2"><p className="text-xs font-black uppercase tracking-[.2em] text-white">Chronostasis</p><h2 className="mt-3 font-display text-2xl font-bold">{title}</h2><p className="mt-3 text-sm leading-6 text-white/75">{desc}</p></div>)}</div>
        <Link to="/collection" className="mono-button mt-10 inline-flex rounded-full px-6 py-3 text-sm font-black">Explore the aquarium →</Link>
      </section>
    </main>
  )
}
