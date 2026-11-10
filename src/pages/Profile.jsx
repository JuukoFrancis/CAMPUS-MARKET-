import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  BadgeCheck,
  Bookmark,
  CalendarDays,
  Copy,
  Eye,
  Heart,
  MapPin,
  MessageCircle,
  Pencil,
  Share2,
  ShieldCheck,
  ShoppingBag,
  Star,
  Store,
  Trash2,
} from 'lucide-react'
import { toast } from 'sonner'
import { useApp } from '../context/AppContext'
import { reviews } from '../data/market'
import { formatUGX } from '../lib/utils'
import Avatar from '../components/Avatar'
import ProductCard from '../components/ProductCard'
import EmptyState from '../components/EmptyState'

const tabs = [
  { id: 'listings', label: 'My listings' },
  { id: 'saved', label: 'Saved' },
  { id: 'reviews', label: 'Reviews' },
]

export default function Profile() {
  const { user, userListings, savedProducts, removeListing } = useApp()
  const [tab, setTab] = useState('listings')

  const copyProfile = async () => {
    try {
      await navigator.clipboard.writeText(`${window.location.origin}/profile`)
      toast.success('Profile link copied')
    } catch {
      toast.error('Could not copy the link')
    }
  }

  const remove = (id) => {
    removeListing(id)
    toast.success('Listing removed', {
      description: 'It no longer appears on the marketplace.',
    })
  }

  const stats = [
    { label: 'Live listings', value: userListings.length, icon: Store },
    { label: 'Saved items', value: savedProducts.length, icon: Heart },
    { label: 'Seller rating', value: user.rating.toFixed(1), icon: Star },
    { label: 'Completed sales', value: user.sales, icon: ShoppingBag },
  ]

  return (
    <div>
      <div className="container-x pt-7">
        <div className="overflow-hidden rounded-[2.25rem] border border-forest-900/10 bg-white shadow-soft">
          <div className="relative h-36 overflow-hidden bg-forest-950 sm:h-44">
            <div className="absolute inset-0 bg-grid opacity-50" />
            <div className="absolute -right-10 -top-16 h-56 w-56 rounded-full bg-lime-300/20 blur-3xl" />
            <div className="absolute -bottom-20 left-1/4 h-48 w-48 rounded-full bg-forest-500/30 blur-3xl" />
            <div className="absolute left-5 top-5 flex items-center gap-2 sm:left-8 sm:top-6">
              <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.16em] text-lime-300 backdrop-blur">
                Student profile
              </span>
              <span className="hidden rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-[9px] font-semibold text-cream/75 backdrop-blur sm:inline-flex">
                {user.joined}
              </span>
            </div>
            <p className="absolute bottom-4 right-6 hidden font-display text-2xl font-semibold italic text-cream/45 sm:block">
              Your campus. Your marketplace.
            </p>
          </div>

          <div className="px-5 pb-6 sm:px-8">
            <div className="-mt-12 flex flex-wrap items-end gap-4">
              <Avatar name={user.name} size="2xl" className="ring-4 ring-white" />
              <div className="min-w-0 flex-1 pt-2">
                <h1 className="flex flex-wrap items-center gap-2 font-display text-2xl font-semibold tracking-tight text-forest-950 sm:text-3xl">
                  {user.name}
                  {user.verified && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-forest-50 px-2 py-1 text-[9px] font-bold uppercase tracking-wider text-forest-700">
                      <BadgeCheck className="h-3 w-3" /> Verified
                    </span>
                  )}
                </h1>
                <p className="mt-1 text-[12px] text-forest-900/70">
                  {user.program} · {user.year}
                </p>
                <p className="mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] text-forest-900/70">
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="h-3 w-3" /> {user.campus}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <CalendarDays className="h-3 w-3" /> Joined {user.joined}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <MessageCircle className="h-3 w-3" /> Replies {user.responseTime}
                  </span>
                </p>
              </div>

              <div className="flex items-center gap-2 pb-1">
                <button
                  type="button"
                  onClick={() =>
                    toast.info('Profile editing is coming next', {
                      description: 'For now, your student details are locked to keep accounts verified.',
                    })
                  }
                  className="btn btn-ghost h-10 px-4 text-[12px]"
                >
                  <Pencil className="h-3.5 w-3.5" /> Edit profile
                </button>
                <button
                  type="button"
                  onClick={copyProfile}
                  aria-label="Copy profile link"
                  className="grid h-10 w-10 place-items-center rounded-full border border-forest-900/15 bg-white text-forest-900/70 transition hover:text-forest-950"
                >
                  <Share2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-forest-900/10 bg-cream/60 px-3 py-3"
                >
                  <p className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-wider text-forest-900/70">
                    <stat.icon className="h-3 w-3" /> {stat.label}
                  </p>
                  <p className="mt-1 font-display text-2xl font-semibold text-forest-950">
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-3 rounded-2xl border border-forest-900/10 bg-forest-50 px-4 py-3">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-white text-forest-700 shadow-sm">
                <ShieldCheck className="h-4 w-4" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[12px] font-bold text-forest-950">Student verification active</p>
                <p className="text-[10px] text-forest-900/70">
                  Reg no {user.regNo} · checked by a campus moderator · your contact stays private
                  until an order is confirmed
                </p>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-white px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-forest-700 shadow-sm">
                <BadgeCheck className="h-3 w-3" /> Verified
              </span>
            </div>
          </div>
        </div>

        <div className="mt-7 flex items-center gap-1 overflow-x-auto border-b border-forest-900/10">
          {tabs.map((item) => {
            const count =
              item.id === 'listings'
                ? userListings.length
                : item.id === 'saved'
                  ? savedProducts.length
                  : reviews.length
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setTab(item.id)}
                className={`relative shrink-0 px-4 py-3 text-[12px] font-semibold transition ${
                  tab === item.id ? 'text-forest-950' : 'text-forest-900/70 hover:text-forest-900'
                }`}
              >
                <span className="flex items-center gap-1.5">
                  {item.label}
                  <span
                    className={`rounded-full px-1.5 py-0.5 text-[9px] font-bold ${
                      tab === item.id ? 'bg-forest-900 text-cream' : 'bg-forest-900/5'
                    }`}
                  >
                    {count}
                  </span>
                </span>
                {tab === item.id && (
                  <span className="absolute inset-x-2 bottom-0 h-0.5 rounded-full bg-forest-900" />
                )}
              </button>
            )
          })}
        </div>

        <div className="py-6">
          {tab === 'listings' && (
            <>
              {userListings.length > 0 ? (
                <div className="space-y-4">
                  <div className="overflow-hidden rounded-3xl border border-forest-900/10 bg-white shadow-soft">
                    {userListings.map((listing) => (
                      <div
                        key={listing.id}
                        className="flex items-center gap-3 border-b border-forest-900/10 p-3 last:border-0 sm:p-4"
                      >
                        <Link
                          to={`/product/${listing.id}`}
                          className="shrink-0 overflow-hidden rounded-xl"
                        >
                          <img
                            src={listing.images?.[0]}
                            alt={listing.title}
                            className="h-16 w-16 object-cover sm:h-20 sm:w-20"
                            onError={(event) => {
                              event.currentTarget.src = '/images/workspace.jpg'
                            }}
                          />
                        </Link>
                        <div className="min-w-0 flex-1">
                          <Link
                            to={`/product/${listing.id}`}
                            className="line-clamp-1 text-[12.5px] font-semibold text-forest-950 transition hover:text-forest-700"
                          >
                            {listing.title}
                          </Link>
                          <p className="mt-0.5 text-[10px] text-forest-900/70">
                            {listing.category} · {listing.condition} · {listing.posted}
                          </p>
                          <div className="mt-1 flex flex-wrap items-center gap-2">
                            <p className="font-display text-[15px] font-semibold text-forest-950">
                              {formatUGX(listing.price)}
                            </p>
                            <span className="inline-flex items-center gap-0.5 text-[9px] text-forest-900/70">
                              <Eye className="h-2.5 w-2.5" /> {listing.views}
                            </span>
                            <span className="inline-flex items-center gap-0.5 text-[9px] text-forest-900/70">
                              <Heart className="h-2.5 w-2.5" /> {listing.saves}
                            </span>
                          </div>
                        </div>
                        <div className="flex shrink-0 items-center gap-1">
                          <Link
                            to={`/product/${listing.id}`}
                            className="btn btn-ghost h-9 px-3 text-[11px]"
                          >
                            View
                          </Link>
                          <button
                            type="button"
                            onClick={() => remove(listing.id)}
                            aria-label={`Remove ${listing.title}`}
                            className="grid h-9 w-9 place-items-center rounded-full text-forest-900/75 transition hover:bg-coral/10 hover:text-coral"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col items-center justify-between gap-3 rounded-3xl bg-lime-300 px-5 py-5 sm:flex-row">
                    <div>
                      <p className="font-display text-lg font-semibold text-forest-950">
                        Got more to sell?
                      </p>
                      <p className="text-[11px] text-forest-900/75">
                        Listing is free. The first 30 sellers get a free 3-day boost.
                      </p>
                    </div>
                    <Link to="/sell" className="btn btn-primary h-10 shrink-0 px-4 text-[12px]">
                      <Store className="h-3.5 w-3.5" /> Create a listing
                    </Link>
                  </div>
                </div>
              ) : (
                <EmptyState
                  icon={Store}
                  title="You have no live listings"
                  description="Clear out your room and earn something back. It takes two minutes to list an item."
                  actionLabel="Sell an item"
                  actionTo="/sell"
                />
              )}
            </>
          )}

          {tab === 'saved' &&
            (savedProducts.length > 0 ? (
              <div className="grid grid-cols-2 gap-x-4 gap-y-9 sm:gap-x-6 md:grid-cols-3 xl:grid-cols-4">
                {savedProducts.map((product, index) => (
                  <ProductCard key={product.id} product={product} index={index} />
                ))}
              </div>
            ) : (
              <EmptyState
                icon={Bookmark}
                title="No saved listings yet"
                description="Tap the heart on a listing to keep it here while you compare prices."
                actionLabel="Browse listings"
                actionTo="/browse"
              />
            ))}

          {tab === 'reviews' && (
            <div className="grid gap-5 lg:grid-cols-[280px_1fr]">
              <div className="h-fit rounded-3xl border border-forest-900/10 bg-white p-5 shadow-soft">
                <p className="eyebrow">Seller rating</p>
                <div className="mt-3 flex items-end gap-2">
                  <p className="font-display text-5xl font-semibold leading-none text-forest-950">
                    {user.rating.toFixed(1)}
                  </p>
                  <p className="mb-1 text-[11px] text-forest-900/70">/ 5</p>
                </div>
                <div className="mt-2 flex items-center gap-0.5">
                  {[0, 1, 2, 3, 4].map((star) => (
                    <Star key={star} className="h-4 w-4 fill-amber text-amber" />
                  ))}
                </div>
                <p className="mt-2 text-[11px] text-forest-900/70">
                  Based on {user.reviews} verified trades
                </p>
                <div className="mt-4 space-y-2 border-t border-forest-900/10 pt-4 text-[11px]">
                  {[
                    ['Item as described', '98%'],
                    ['On-time pickup', '96%'],
                    ['Would trade again', '100%'],
                  ].map(([label, value]) => (
                    <div key={label} className="flex items-center justify-between">
                      <span className="text-forest-900/70">{label}</span>
                      <span className="font-bold text-forest-950">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                {reviews.map((review) => (
                  <div
                    key={review.id}
                    className="rounded-3xl border border-forest-900/10 bg-white p-4 shadow-soft sm:p-5"
                  >
                    <div className="flex items-start gap-3">
                      <Avatar name={review.author} size="md" />
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
                          <p className="text-[12px] font-bold text-forest-950">{review.author}</p>
                          <span className="text-[9px] text-forest-900/70">· {review.role}</span>
                          <span className="ml-auto text-[9px] text-forest-900/75">
                            {review.date}
                          </span>
                        </div>
                        <div className="mt-0.5 flex items-center gap-0.5">
                          {[0, 1, 2, 3, 4].map((star) => (
                            <Star
                              key={star}
                              className={`h-2.5 w-2.5 ${
                                star < review.rating
                                  ? 'fill-amber text-amber'
                                  : 'fill-forest-900/10 text-forest-900/10'
                              }`}
                            />
                          ))}
                        </div>
                        <p className="mt-2 text-[12px] leading-relaxed text-forest-900/75">
                          {review.text}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-forest-900/10 bg-white/60 px-4 py-3 text-[10px] text-forest-900/70">
          <span className="inline-flex items-center gap-1.5">
            <Copy className="h-3 w-3" /> Demo profile — data is stored on this device only.
          </span>
          <Link to="/browse" className="font-semibold text-forest-700 transition hover:text-forest-950">
            Back to the market →
          </Link>
        </div>
      </div>
    </div>
  )
}
