import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  BadgeCheck,
  ChevronRight,
  Clock,
  Eye,
  Flag,
  Heart,
  MapPin,
  MessageCircle,
  Package,
  Share2,
  ShieldCheck,
  ShoppingBag,
  Star,
  Store,
  Tag,
} from 'lucide-react'
import { toast } from 'sonner'
import { useApp } from '../context/AppContext'
import { commission, formatUGX } from '../lib/utils'
import ProductCard from '../components/ProductCard'
import Avatar from '../components/Avatar'
import ChatDrawer from '../components/ChatDrawer'
import OrderModal from '../components/OrderModal'
import ReportModal from '../components/ReportModal'
import EmptyState from '../components/EmptyState'

const conditionStyles = {
  New: 'bg-lime-200 text-forest-900',
  Fresh: 'bg-lime-200 text-forest-900',
  'Like new': 'bg-forest-100 text-forest-800',
  Good: 'bg-amber/20 text-forest-900',
  Fair: 'bg-coral/15 text-coral',
}

export default function ProductDetail() {
  const { id } = useParams()
  const { allProducts, saved, toggleSaved } = useApp()
  const product = allProducts.find((item) => item.id === id)

  const [activeImage, setActiveImage] = useState(0)
  const [chatOpen, setChatOpen] = useState(false)
  const [orderOpen, setOrderOpen] = useState(false)
  const [reportOpen, setReportOpen] = useState(false)

  useEffect(() => {
    setActiveImage(0)
  }, [id])

  if (!product) {
    return (
      <div className="container-x py-20">
        <EmptyState
          icon={Package}
          title="This listing has gone"
          description="It may have been sold or removed by the seller. Browse the latest listings on campus instead."
          actionLabel="Back to the market"
          actionTo="/browse"
        />
      </div>
    )
  }

  const isSaved = saved.includes(product.id)
  const similar = allProducts
    .filter((item) => item.category === product.category && item.id !== product.id)
    .slice(0, 4)

  const share = async () => {
    const url = window.location.href
    if (navigator.share) {
      try {
        await navigator.share({ title: product.title, text: 'Found this on Campus Market', url })
        return
      } catch {
        /* user cancelled */
      }
    }
    try {
      await navigator.clipboard.writeText(url)
      toast.success('Listing link copied')
    } catch {
      toast.error('Could not copy the link')
    }
  }

  const onSave = () => {
    const nowSaved = toggleSaved(product.id)
    toast[nowSaved ? 'success' : 'message'](
      nowSaved ? 'Saved to your favourites' : 'Removed from favourites',
      { description: product.title }
    )
  }

  return (
    <div>
      <div className="container-x pt-6">
        <nav className="flex flex-wrap items-center gap-1.5 text-[11px] font-medium text-forest-900/70">
          <Link to="/" className="transition hover:text-forest-900">
            Home
          </Link>
          <ChevronRight className="h-3 w-3" />
          <Link to="/browse" className="transition hover:text-forest-900">
            Browse
          </Link>
          <ChevronRight className="h-3 w-3" />
          <Link
            to={`/browse?cat=${encodeURIComponent(product.category)}`}
            className="transition hover:text-forest-900"
          >
            {product.category}
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="max-w-[200px] truncate text-forest-900/70">{product.title}</span>
        </nav>
      </div>

      <div className="container-x grid gap-8 py-6 lg:grid-cols-[1.04fr_0.96fr] lg:gap-12 lg:py-10">
        {/* GALLERY */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="relative overflow-hidden rounded-[2rem] border border-forest-900/10 bg-sand"
          >
            <img
              src={product.images?.[activeImage] || product.images?.[0]}
              alt={product.title}
              className="aspect-[4/3] w-full object-cover"
              onError={(event) => {
                event.currentTarget.src = '/images/workspace.jpg'
              }}
            />

            <div className="absolute left-4 top-4 flex flex-wrap gap-2">
              <span
                className={`rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider shadow-soft ${
                  conditionStyles[product.condition] || 'bg-white text-forest-900'
                }`}
              >
                {product.condition}
              </span>
              {product.featured && (
                <span className="rounded-full bg-forest-950/80 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-lime-300 backdrop-blur">
                  Featured
                </span>
              )}
            </div>

            <div className="absolute right-4 top-4 flex gap-2">
              <button
                type="button"
                onClick={onSave}
                aria-label={isSaved ? 'Remove from favourites' : 'Save listing'}
                className="grid h-10 w-10 place-items-center rounded-full bg-white/90 text-forest-900 shadow-soft backdrop-blur transition hover:scale-105"
              >
                <Heart
                  className={`h-[18px] w-[18px] ${isSaved ? 'fill-coral text-coral' : ''}`}
                />
              </button>
              <button
                type="button"
                onClick={share}
                aria-label="Share listing"
                className="grid h-10 w-10 place-items-center rounded-full bg-white/90 text-forest-900 shadow-soft backdrop-blur transition hover:scale-105"
              >
                <Share2 className="h-[18px] w-[18px]" />
              </button>
            </div>

            <span className="absolute bottom-4 right-4 rounded-full bg-forest-950/60 px-2.5 py-1 text-[10px] font-semibold text-cream backdrop-blur">
              {activeImage + 1} / {product.images?.length || 1}
            </span>
          </motion.div>

          {product.images?.length > 1 && (
            <div className="mt-3 grid grid-cols-4 gap-2 sm:gap-3">
              {product.images.map((image, index) => (
                <button
                  key={image}
                  type="button"
                  onClick={() => setActiveImage(index)}
                  className={`overflow-hidden rounded-2xl border-2 transition ${
                    activeImage === index
                      ? 'border-forest-700 shadow-soft'
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                  aria-label={`View image ${index + 1}`}
                >
                  <img
                    src={image}
                    alt=""
                    className="aspect-square w-full object-cover"
                    onError={(event) => {
                      event.currentTarget.src = '/images/workspace.jpg'
                    }}
                  />
                </button>
              ))}
            </div>
          )}

          <div className="mt-4 flex flex-wrap items-center gap-3 rounded-2xl border border-forest-900/10 bg-white/60 px-4 py-3 text-[11px] text-forest-900/70">
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-forest-600" /> Verified seller
            </span>
            <span className="h-3 w-px bg-forest-900/10" />
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-forest-600" /> {product.campus}
            </span>
            <span className="h-3 w-px bg-forest-900/10" />
            <span className="inline-flex items-center gap-1.5">
              <Eye className="h-3.5 w-3.5 text-forest-600" /> {product.views} views
            </span>
          </div>
        </div>

        {/* INFO */}
        <div>
          <div className="flex flex-wrap items-center gap-2 text-[10px] font-bold uppercase tracking-[0.14em] text-forest-900/70">
            <span className="rounded-full bg-white px-2.5 py-1 text-forest-700 shadow-sm">
              {product.category}
            </span>
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3 w-3" /> {product.posted}
            </span>
            {product.negotiable && (
              <span className="inline-flex items-center gap-1 text-forest-900/70">
                <Tag className="h-3 w-3" /> Negotiable
              </span>
            )}
          </div>

          <h1 className="mt-3 font-display text-[clamp(1.9rem,3.6vw,2.7rem)] font-semibold leading-[1.03] tracking-tight text-forest-950">
            {product.title}
          </h1>

          <div className="mt-3 flex flex-wrap items-end gap-3">
            <p className="font-display text-[2.1rem] font-semibold leading-none text-forest-950">
              {formatUGX(product.price)}
            </p>
            <span
              className={`mb-1 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${
                conditionStyles[product.condition] || 'bg-white text-forest-900'
              }`}
            >
              {product.condition}
            </span>
          </div>

          <div className="mt-2 flex items-center gap-2 text-[11px] text-forest-900/70">
            <MapPin className="h-3.5 w-3.5" />
            <span>{product.location}</span>
            <span className="h-1 w-1 rounded-full bg-forest-900/20" />
            <span>{product.campus}</span>
          </div>

          <div className="mt-5 flex gap-2">
            <button
              type="button"
              onClick={() => setChatOpen(true)}
              className="btn btn-primary h-12 flex-1 px-4"
            >
              <MessageCircle className="h-[18px] w-[18px]" /> Chat with seller
            </button>
            <button
              type="button"
              onClick={() => setOrderOpen(true)}
              className="btn btn-accent h-12 flex-1 px-4"
            >
              <ShoppingBag className="h-[18px] w-[18px]" /> Confirm order
            </button>
            <button
              type="button"
              onClick={() => setReportOpen(true)}
              aria-label="Report this listing"
              className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-forest-900/15 bg-white text-forest-900/70 transition hover:border-coral/40 hover:text-coral"
            >
              <Flag className="h-[18px] w-[18px]" />
            </button>
          </div>

          <p className="mt-2.5 flex items-center gap-1.5 text-[10px] text-forest-900/70">
            <ShieldCheck className="h-3 w-3" />
            Basic listing is free. Campus Market takes 5% ({formatUGX(commission(product.price))})
            from the seller only when the sale completes.
          </p>

          <div className="mt-5 rounded-3xl border border-forest-900/10 bg-white p-4 shadow-soft">
            <div className="flex items-center gap-3">
              <Avatar name={product.seller.name} size="lg" />
              <div className="min-w-0 flex-1">
                <p className="flex items-center gap-1 text-[14px] font-bold text-forest-950">
                  {product.seller.name}
                  {product.seller.verified && (
                    <BadgeCheck className="h-4 w-4 text-forest-600" />
                  )}
                </p>
                <p className="text-[11px] text-forest-900/70">
                  {product.seller.program} · {product.seller.year}
                </p>
                <div className="mt-1 flex items-center gap-1 text-[11px]">
                  <Star className="h-3 w-3 fill-amber text-amber" />
                  <span className="font-bold text-forest-950">
                    {product.seller.rating.toFixed(1)}
                  </span>
                  <span className="text-forest-900/70">
                    ({product.seller.reviews} reviews)
                  </span>
                </div>
              </div>
              <span className="hidden shrink-0 rounded-full bg-forest-50 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wide text-forest-700 sm:block">
                Verified
              </span>
            </div>

            <div className="mt-4 grid grid-cols-3 divide-x divide-forest-900/10 border-t border-forest-900/10 pt-3 text-center">
              <div>
                <p className="font-display text-base font-semibold text-forest-950">
                  {product.seller.sales}
                </p>
                <p className="text-[9px] uppercase tracking-wider text-forest-900/70">Sales</p>
              </div>
              <div>
                <p className="font-display text-base font-semibold text-forest-950">
                  {product.seller.responseTime}
                </p>
                <p className="text-[9px] uppercase tracking-wider text-forest-900/70">Replies</p>
              </div>
              <div>
                <p className="font-display text-base font-semibold text-forest-950">
                  {product.seller.joined}
                </p>
                <p className="text-[9px] uppercase tracking-wider text-forest-900/70">Joined</p>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <h2 className="font-display text-lg font-semibold text-forest-950">About this item</h2>
            <p className="mt-2 text-[13.5px] leading-relaxed text-forest-900/70">
              {product.description}
            </p>
          </div>

          {product.tags?.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-1.5">
              {product.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-forest-900/10 bg-white px-2.5 py-1 text-[10px] font-semibold text-forest-900/70"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          <div className="mt-6 grid grid-cols-2 gap-2">
            {[
              { icon: Package, label: 'Condition', value: product.condition },
              { icon: Store, label: 'Pickup', value: product.location },
              { icon: MapPin, label: 'Campus', value: product.campus },
              { icon: Tag, label: 'Category', value: product.category },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-forest-900/10 bg-white/70 p-3"
              >
                <p className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-wider text-forest-900/70">
                  <item.icon className="h-3 w-3" /> {item.label}
                </p>
                <p className="mt-1 text-[12px] font-semibold text-forest-950">{item.value}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-3xl bg-forest-50 p-4">
            <p className="flex items-center gap-2 text-[12px] font-bold text-forest-900">
              <ShieldCheck className="h-4 w-4 text-forest-600" /> Trade safely on campus
            </p>
            <ul className="mt-2.5 space-y-1.5 text-[11px] leading-relaxed text-forest-900/75">
              <li className="flex gap-2">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-forest-500" />
                Meet at the library steps, main gate or another public campus point.
              </li>
              <li className="flex gap-2">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-forest-500" />
                Inspect the item before you pay. Check the condition against the photos.
              </li>
              <li className="flex gap-2">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-forest-500" />
                Keep your chat in Campus Market until the order is confirmed.
              </li>
            </ul>
          </div>
        </div>
      </div>

      {similar.length > 0 && (
        <section className="container-x border-t border-forest-900/10 py-14">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Keep looking</p>
              <h2 className="mt-1 font-display text-2xl font-semibold tracking-tight text-forest-950 sm:text-3xl">
                More in {product.category}
              </h2>
            </div>
            <Link
              to={`/browse?cat=${encodeURIComponent(product.category)}`}
              className="shrink-0 text-[12px] font-semibold text-forest-800 transition hover:text-forest-950"
            >
              See all →
            </Link>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-9 sm:gap-x-6 md:grid-cols-4">
            {similar.map((item, index) => (
              <ProductCard key={item.id} product={item} index={index} />
            ))}
          </div>
        </section>
      )}

      <ChatDrawer open={chatOpen} onClose={() => setChatOpen(false)} product={product} />
      <OrderModal open={orderOpen} onClose={() => setOrderOpen(false)} product={product} />
      <ReportModal open={reportOpen} onClose={() => setReportOpen(false)} product={product} />
    </div>
  )
}
