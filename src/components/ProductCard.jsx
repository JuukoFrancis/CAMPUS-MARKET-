import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { BadgeCheck, Heart, MapPin, Star } from 'lucide-react'
import { toast } from 'sonner'
import { useApp } from '../context/AppContext'
import { formatUGX } from '../lib/utils'
import Avatar from './Avatar'

export default function ProductCard({ product, index = 0, compact = false }) {
  const { saved, toggleSaved } = useApp()
  const isSaved = saved.includes(product.id)

  const onSave = (event) => {
    event.preventDefault()
    event.stopPropagation()
    const nowSaved = toggleSaved(product.id)
    toast[nowSaved ? 'success' : 'message'](
      nowSaved ? 'Saved to your favourites' : 'Removed from favourites',
      { description: product.title }
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, delay: Math.min(index * 0.05, 0.3) }}
    >
      <Link to={`/product/${product.id}`} className="group block">
        <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-sand">
          <img
            src={product.images?.[0]}
            alt={product.title}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
            onError={(event) => {
              event.currentTarget.src = '/images/workspace.jpg'
            }}
          />

          <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-2 p-3">
            <span className="rounded-full border border-white/50 bg-white/85 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-forest-900 backdrop-blur-md">
              {product.condition}
            </span>
            <button
              type="button"
              onClick={onSave}
              aria-label={isSaved ? 'Remove from favourites' : 'Save listing'}
              aria-pressed={isSaved}
              className="grid h-9 w-9 place-items-center rounded-full border border-white/50 bg-white/85 text-forest-900 backdrop-blur-md transition hover:scale-105 hover:bg-white active:scale-95"
            >
              <Heart
                className={`h-[17px] w-[17px] transition ${
                  isSaved ? 'fill-coral text-coral' : 'text-forest-900'
                }`}
                strokeWidth={2}
              />
            </button>
          </div>

          {product.featured && (
            <span className="absolute bottom-3 left-3 inline-flex items-center gap-1 rounded-full bg-lime-300 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-forest-950 shadow-soft">
              <span className="h-1.5 w-1.5 rounded-full bg-forest-950" />
              Featured
            </span>
          )}

          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-forest-950/60 via-forest-950/10 to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />
          <span className="pointer-events-none absolute bottom-3 right-3 translate-y-2 rounded-full bg-cream/95 px-3 py-1.5 text-[11px] font-semibold text-forest-900 opacity-0 shadow-soft transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            View listing →
          </span>
        </div>

        <div className="mt-3 px-0.5">
          <div className="flex items-center justify-between gap-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-forest-900/70">
            <span className="truncate">{product.category}</span>
            <span className="shrink-0 normal-case tracking-normal">{product.posted}</span>
          </div>

          <h3 className="mt-1 line-clamp-1 text-[15px] font-semibold text-forest-950">
            {product.title}
          </h3>

          <div className="mt-1 flex items-baseline justify-between gap-2">
            <p className="font-display text-[19px] font-semibold leading-tight text-forest-950">
              {formatUGX(product.price)}
            </p>
            {product.negotiable && (
              <span className="text-[10px] font-semibold uppercase tracking-wider text-forest-900/70">
                Negotiable
              </span>
            )}
          </div>

          {!compact && (
            <div className="mt-2.5 flex items-center gap-1.5 text-xs text-forest-900/75">
              <Avatar name={product.seller.name} size="xs" ring={false} />
              <span className="truncate font-medium text-forest-900/75">
                {product.seller.name.split(' ')[0]}
              </span>
              {product.seller.verified && (
                <BadgeCheck className="h-3.5 w-3.5 shrink-0 text-forest-600" strokeWidth={2.2} />
              )}
              <span className="ml-auto inline-flex shrink-0 items-center gap-1 font-semibold text-forest-900/70">
                <Star className="h-3 w-3 fill-amber text-amber" />
                {product.seller.rating.toFixed(1)}
              </span>
            </div>
          )}

          {!compact && (
            <div className="mt-2 flex items-center gap-1 text-[11px] text-forest-900/70">
              <MapPin className="h-3 w-3" />
              <span className="truncate">{product.location}</span>
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  )
}
