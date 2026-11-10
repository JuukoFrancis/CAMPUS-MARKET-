import { Link } from 'react-router-dom'
import { Heart, Search } from 'lucide-react'
import { useApp } from '../context/AppContext'
import ProductCard from '../components/ProductCard'
import EmptyState from '../components/EmptyState'

export default function Saved() {
  const { savedProducts } = useApp()

  return (
    <div>
      <section className="relative overflow-hidden border-b border-forest-900/10 bg-white/55">
        <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-coral/10 blur-3xl" />
        <div className="container-x relative py-10 sm:py-14">
          <p className="eyebrow">Your favourites</p>
          <div className="mt-2 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="font-display text-[clamp(2.2rem,5vw,3.4rem)] font-semibold leading-[1] tracking-tight text-forest-950">
                Saved for <span className="italic text-forest-600">later.</span>
              </h1>
              <p className="mt-3 max-w-lg text-sm leading-relaxed text-forest-900/70">
                Keep an eye on the things you like. Saved listings stay on this device, so you can
                come back when you are ready to chat.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-forest-900/10 bg-white px-3 py-1.5 text-[11px] font-semibold text-forest-900/70">
                <Heart className="h-3.5 w-3.5 fill-coral text-coral" />
                {savedProducts.length} saved
              </span>
              <Link to="/browse" className="btn btn-ghost h-9 px-4 text-[11px]">
                <Search className="h-3.5 w-3.5" /> Find more
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="container-x py-8 sm:py-10">
        <h2 className="sr-only">Your saved listings</h2>
        {savedProducts.length > 0 ? (
          <>
            <div className="grid grid-cols-2 gap-x-4 gap-y-9 sm:gap-x-6 md:grid-cols-3 xl:grid-cols-4">
              {savedProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>

            <div className="mt-12 flex flex-col items-center gap-3 rounded-3xl border border-forest-900/10 bg-white/60 px-6 py-6 text-center sm:flex-row sm:justify-between sm:text-left">
              <div>
                <p className="text-[13px] font-semibold text-forest-950">
                  Ready to make a move?
                </p>
                <p className="mt-0.5 text-[11px] text-forest-900/70">
                  Open a listing, ask about condition, then confirm your order in the app.
                </p>
              </div>
              <Link to="/messages" className="btn btn-primary h-10 px-4 text-[12px]">
                Go to messages
              </Link>
            </div>
          </>
        ) : (
          <EmptyState
            icon={Heart}
            title="Nothing saved yet"
            description="Tap the heart on any listing to keep it here. Compare a few options before you decide."
            actionLabel="Browse the market"
            actionTo="/browse"
          />
        )}
      </div>
    </div>
  )
}
