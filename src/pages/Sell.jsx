import { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  BadgeCheck,
  Camera,
  Check,
  ImagePlus,
  Info,
  MapPin,
  Package,
  Plus,
  ShieldCheck,
  Sparkles,
  Tag,
  Trash2,
  Upload,
  Wallet,
  X,
} from 'lucide-react'
import { toast } from 'sonner'
import {
  campusOptions,
  categories,
  conditionOptions,
} from '../data/market'
import { useApp } from '../context/AppContext'
import { cn, formatUGX } from '../lib/utils'
import { fileToOptimizedDataUrl } from '../lib/image'
import Avatar from '../components/Avatar'

const samplePhotos = [
  '/images/iphone-1.jpg',
  '/images/sneakers-1.jpg',
  '/images/books-1.jpg',
  '/images/skincare-1.jpg',
]

export default function Sell() {
  const navigate = useNavigate()
  const { user, addListing } = useApp()
  const inputRef = useRef(null)

  const [images, setImages] = useState([])
  const [uploading, setUploading] = useState(false)
  const [dragging, setDragging] = useState(false)
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('Electronics')
  const [condition, setCondition] = useState('Good')
  const [price, setPrice] = useState('')
  const [negotiable, setNegotiable] = useState(true)
  const [boost, setBoost] = useState(false)
  const [description, setDescription] = useState('')
  const [campus, setCampus] = useState('Campus A')
  const [location, setLocation] = useState('')
  const [agreed, setAgreed] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const addFiles = async (fileList) => {
    const files = Array.from(fileList || []).filter((file) =>
      file.type.startsWith('image/')
    )
    if (!files.length) return
    if (images.length >= 4) {
      toast.error('You can add up to 4 photos')
      return
    }

    setUploading(true)
    try {
      const converted = await Promise.all(
        files.slice(0, 4 - images.length).map(async (file) => ({
          url: await fileToOptimizedDataUrl(file),
          name: file.name,
        }))
      )
      setImages((prev) => [...prev, ...converted].slice(0, 4))
      toast.success(`${converted.length} photo${converted.length > 1 ? 's' : ''} added`)
    } catch {
      toast.error('Could not process that image. Try a JPG or PNG.')
    } finally {
      setUploading(false)
    }
  }

  const addSample = () => {
    if (images.length >= 4) {
      toast.error('You can add up to 4 photos')
      return
    }
    const available = samplePhotos.filter(
      (photo) => !images.some((image) => image.url === photo)
    )
    const url = available[0] || samplePhotos[0]
    setImages((prev) => [...prev, { url, name: 'Sample photo' }].slice(0, 4))
    toast.success('Sample photo added')
  }

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, itemIndex) => itemIndex !== index))
  }

  const submit = (event) => {
    event.preventDefault()

    if (images.length === 0) {
      toast.error('Add at least one real photo', {
        description: 'Every Campus Market listing needs a photo of the actual item.',
      })
      return
    }
    if (title.trim().length < 6) {
      toast.error('Give your listing a clearer title', {
        description: 'At least 6 characters, e.g. “iPhone 11 · 64GB · Black”.',
      })
      return
    }
    if (!price || Number(price) <= 0) {
      toast.error('Add a price in UGX')
      return
    }
    if (description.trim().length < 20) {
      toast.error('Describe the item honestly', {
        description: 'At least 20 characters — mention condition, what is included and pickup.',
      })
      return
    }
    if (!location.trim()) {
      toast.error('Add a pickup point')
      return
    }
    if (!agreed) {
      toast.error('Agree to the marketplace rules to publish')
      return
    }

    setSubmitting(true)
    const listing = {
      id: `u-${Date.now()}`,
      title: title.trim(),
      price: Number(price),
      category,
      condition,
      campus,
      location: `${campus} · ${location.trim()}`,
      images: images.map((image) => image.url),
      description: description.trim(),
      seller: user,
      posted: 'Just now',
      featured: boost,
      negotiable,
      views: 0,
      saves: 0,
      tags: [],
    }

    setTimeout(() => {
      addListing(listing)
      toast.success('Your listing is live 🎉', {
        description: 'Verified students can now find it on the marketplace.',
      })
      navigate(`/product/${listing.id}`)
    }, 450)
  }

  const previewPrice = price ? formatUGX(Number(price)) : 'UGX 0'

  return (
    <div>
      <section className="relative overflow-hidden border-b border-forest-900/10 bg-white/55">
        <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-lime-300/35 blur-3xl" />
        <div className="container-x relative py-10 sm:py-14">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="eyebrow">Sell on campus</p>
              <h1 className="mt-2 max-w-2xl font-display text-[clamp(2.2rem,5vw,3.6rem)] font-semibold leading-[0.98] tracking-tight text-forest-950">
                Turn your extras into <span className="italic text-forest-600">income.</span>
              </h1>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-forest-900/70">
                Free to list, verified buyers, campus pickup. We only earn 5% when your item
                actually sells — and the first 30 sellers get a free boost.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-forest-900/10 bg-white px-3 py-1.5 text-[11px] font-semibold text-forest-900/75">
                <Camera className="h-3.5 w-3.5 text-forest-600" /> Photo required
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-forest-900/10 bg-white px-3 py-1.5 text-[11px] font-semibold text-forest-900/75">
                <Wallet className="h-3.5 w-3.5 text-forest-600" /> Pay only on success
              </span>
            </div>
          </div>
        </div>
      </section>

      <div className="container-x py-8 sm:py-10">
        <form onSubmit={submit} className="grid gap-6 lg:grid-cols-[1fr_360px] lg:gap-8">
          <div className="space-y-4">
            {/* PHOTOS */}
            <section className="card p-5 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="flex items-center gap-2 text-[15px] font-bold text-forest-950">
                    <Camera className="h-4 w-4 text-forest-600" /> Photos
                  </h2>
                  <p className="mt-1 text-[11px] text-forest-900/70">
                    Real photos of the actual item. Up to 4.
                  </p>
                </div>
                <span className="rounded-full bg-coral/10 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-[#B23A1F]">
                  Required
                </span>
              </div>

              <div
                onDragOver={(event) => {
                  event.preventDefault()
                  setDragging(true)
                }}
                onDragLeave={() => setDragging(false)}
                onDrop={(event) => {
                  event.preventDefault()
                  setDragging(false)
                  addFiles(event.dataTransfer.files)
                }}
                className={cn(
                  'mt-4 rounded-2xl border-2 border-dashed p-6 text-center transition',
                  dragging
                    ? 'border-forest-600 bg-forest-50'
                    : 'border-forest-900/15 bg-cream/50 hover:border-forest-900/30'
                )}
              >
                <input
                  ref={inputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={(event) => {
                    addFiles(event.target.files)
                    event.target.value = ''
                  }}
                />
                <span className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-white text-forest-700 shadow-soft">
                  {uploading ? (
                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-forest-700/20 border-t-forest-700" />
                  ) : (
                    <Upload className="h-5 w-5" />
                  )}
                </span>
                <p className="mt-3 text-[13px] font-semibold text-forest-950">
                  {uploading ? 'Optimising your photos…' : 'Drop photos here, or browse'}
                </p>
                <p className="mt-1 text-[10px] text-forest-900/70">
                  JPG or PNG · we resize them automatically · 4 max
                </p>
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  <button
                    type="button"
                    onClick={() => inputRef.current?.click()}
                    className="btn btn-primary h-9 px-4 text-[11px]"
                    disabled={uploading}
                  >
                    <ImagePlus className="h-3.5 w-3.5" /> Choose photos
                  </button>
                  <button
                    type="button"
                    onClick={addSample}
                    className="btn btn-ghost h-9 px-4 text-[11px]"
                  >
                    Use a sample photo
                  </button>
                </div>
              </div>

              {images.length > 0 && (
                <div className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                  {images.map((image, index) => (
                    <motion.div
                      key={`${image.name}-${index}`}
                      initial={{ opacity: 0, scale: 0.94 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="group relative overflow-hidden rounded-2xl border border-forest-900/10"
                    >
                      <img
                        src={image.url}
                        alt={`Listing photo ${index + 1}`}
                        className="aspect-square w-full object-cover"
                      />
                      {index === 0 && (
                        <span className="absolute left-1.5 top-1.5 rounded-full bg-forest-950/75 px-2 py-0.5 text-[8px] font-bold uppercase tracking-wide text-lime-300 backdrop-blur">
                          Cover
                        </span>
                      )}
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        aria-label="Remove photo"
                        className="absolute right-1.5 top-1.5 grid h-6 w-6 place-items-center rounded-full bg-white/90 text-coral opacity-0 shadow-sm transition group-hover:opacity-100"
                      >
                        <X className="h-3 w-3" strokeWidth={3} />
                      </button>
                    </motion.div>
                  ))}
                  {images.length < 4 && (
                    <button
                      type="button"
                      onClick={() => inputRef.current?.click()}
                      className="grid aspect-square place-items-center rounded-2xl border-2 border-dashed border-forest-900/15 text-forest-900/75 transition hover:border-forest-900/30 hover:text-forest-700"
                      aria-label="Add another photo"
                    >
                      <Plus className="h-6 w-6" />
                    </button>
                  )}
                </div>
              )}
            </section>

            {/* DETAILS */}
            <section className="card p-5 sm:p-6">
              <h2 className="flex items-center gap-2 text-[15px] font-bold text-forest-950">
                <Package className="h-4 w-4 text-forest-600" /> Item details
              </h2>

              <div className="mt-4">
                <label htmlFor="title" className="label">
                  Listing title
                </label>
                <input
                  id="title"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  maxLength={70}
                  placeholder="e.g. iPhone 11 · 64GB · Black"
                  className="input"
                />
                <p className="mt-1 text-right text-[10px] text-forest-900/75">
                  {title.length}/70
                </p>
              </div>

              <div className="mt-2 grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="category" className="label">
                    Category
                  </label>
                  <select
                    id="category"
                    value={category}
                    onChange={(event) => setCategory(event.target.value)}
                    className="input appearance-none"
                  >
                    {categories.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <span className="label">
                    Condition <span className="text-coral">*</span>
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {conditionOptions.map((item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => setCondition(item)}
                        className={cn(
                          'rounded-full border px-3 py-2 text-[11px] font-semibold transition',
                          condition === item
                            ? 'border-forest-900 bg-forest-900 text-cream'
                            : 'border-forest-900/15 bg-white text-forest-900/70 hover:border-forest-900/30'
                        )}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <label htmlFor="description" className="label">
                  Description <span className="text-coral">*</span>
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  rows={4}
                  maxLength={500}
                  placeholder="Be honest about condition, what is included, why you are selling, and where to meet…"
                  className="input resize-none"
                />
                <p className="mt-1 flex justify-between text-[10px] text-forest-900/75">
                  <span>Honest condition notes build trust.</span>
                  <span>{description.length}/500</span>
                </p>
              </div>
            </section>

            {/* PRICE */}
            <section className="card p-5 sm:p-6">
              <h2 className="flex items-center gap-2 text-[15px] font-bold text-forest-950">
                <Tag className="h-4 w-4 text-forest-600" /> Price & visibility
              </h2>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="price" className="label">
                    Your price (UGX) <span className="text-coral">*</span>
                  </label>
                  <div className="flex items-center rounded-2xl border border-forest-900/15 bg-white pl-4 transition focus-within:border-forest-500 focus-within:ring-4 focus-within:ring-forest-500/10">
                    <span className="text-[11px] font-bold text-forest-900/70">UGX</span>
                    <input
                      id="price"
                      value={price}
                      onChange={(event) =>
                        setPrice(event.target.value.replace(/[^0-9]/g, '').slice(0, 9))
                      }
                      inputMode="numeric"
                      placeholder="950000"
                      className="h-12 w-full bg-transparent px-3 text-sm font-semibold text-forest-950 placeholder:font-normal placeholder:text-forest-900/75 focus:outline-none"
                    />
                  </div>
                  <p className="mt-1.5 text-[11px] font-semibold text-forest-700">{previewPrice}</p>
                </div>

                <div className="flex items-center justify-between gap-3 rounded-2xl border border-forest-900/10 bg-cream/60 p-4">
                  <div>
                    <p className="text-[12px] font-semibold text-forest-950">Open to offers</p>
                    <p className="mt-0.5 text-[10px] text-forest-900/70">
                      Show buyers the price is negotiable
                    </p>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-label="Open to offers"
                    aria-checked={negotiable}
                    onClick={() => setNegotiable(!negotiable)}
                    className={cn(
                      'flex h-6 w-11 shrink-0 items-center rounded-full p-0.5 transition',
                      negotiable ? 'bg-forest-700' : 'bg-forest-900/15'
                    )}
                  >
                    <span
                      className={cn(
                        'h-5 w-5 rounded-full bg-white shadow transition',
                        negotiable && 'translate-x-5'
                      )}
                    />
                  </button>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setBoost(!boost)}
                className={cn(
                  'mt-4 flex w-full items-start gap-3 rounded-2xl border p-4 text-left transition',
                  boost
                    ? 'border-forest-700 bg-forest-50 ring-1 ring-forest-700'
                    : 'border-forest-900/10 bg-white hover:border-forest-900/25'
                )}
              >
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-lime-300 text-forest-950">
                  <Sparkles className="h-4 w-4" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex flex-wrap items-center gap-2 text-[12px] font-bold text-forest-950">
                    Feature this listing for 3 days
                    <span className="rounded-full bg-lime-200 px-2 py-0.5 text-[8px] font-bold uppercase tracking-wide text-forest-800">
                      First 30 free
                    </span>
                  </span>
                  <span className="mt-0.5 block text-[10px] leading-relaxed text-forest-900/70">
                    UGX 2,000 after the launch offer. Featured listings appear at the top of the
                    market and on the home page.
                  </span>
                </span>
                <span
                  className={cn(
                    'mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full border',
                    boost
                      ? 'border-forest-700 bg-forest-700 text-white'
                      : 'border-forest-900/20'
                  )}
                >
                  {boost && <Check className="h-3 w-3" strokeWidth={3} />}
                </span>
              </button>

              <div className="mt-4 flex items-start gap-2 rounded-xl bg-forest-50 p-3 text-[10px] leading-relaxed text-forest-800">
                <Wallet className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                Basic listing is free. If it sells, Campus Market takes a 5% commission (
                {formatUGX(Math.round((Number(price) || 0) * 0.05))} on this item). You keep the
                rest.
              </div>
            </section>

            {/* PICKUP */}
            <section className="card p-5 sm:p-6">
              <h2 className="flex items-center gap-2 text-[15px] font-bold text-forest-950">
                <MapPin className="h-4 w-4 text-forest-600" /> Pickup & meeting
              </h2>

              <div className="mt-4">
                <span className="label">Campus</span>
                <div className="flex flex-wrap gap-1.5">
                  {campusOptions.map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setCampus(item)}
                      className={cn(
                        'rounded-full border px-3.5 py-2 text-[11px] font-semibold transition',
                        campus === item
                          ? 'border-forest-900 bg-forest-900 text-cream'
                          : 'border-forest-900/15 bg-white text-forest-900/70 hover:border-forest-900/30'
                      )}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-4">
                <label htmlFor="location" className="label">
                  Pickup point <span className="text-coral">*</span>
                </label>
                <input
                  id="location"
                  value={location}
                  onChange={(event) => setLocation(event.target.value)}
                  placeholder="e.g. Hostel B · Room 12, or Library steps"
                  className="input"
                />
                <p className="mt-1.5 flex items-center gap-1 text-[10px] text-forest-900/70">
                  <Info className="h-3 w-3" /> Choose a public place for first meetings.
                </p>
              </div>
            </section>

            {/* RULES */}
            <section className="card p-5 sm:p-6">
              <label className="flex cursor-pointer items-start gap-3">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(event) => setAgreed(event.target.checked)}
                  className="mt-0.5 h-4 w-4 shrink-0 accent-forest-700"
                />
                <span className="text-[11.5px] leading-relaxed text-forest-900/75">
                  I confirm this is my own item, the photos and condition are honest, and it is not
                  on the prohibited list (weapons, drugs, counterfeits, stolen goods or exam
                  material). I agree to the{' '}
                  <span className="font-semibold text-forest-900 underline underline-offset-2">
                    marketplace rules
                  </span>{' '}
                  and campus pickup policy.
                </span>
              </label>
            </section>

            <div className="flex items-center gap-3 rounded-2xl border border-forest-900/10 bg-white/60 px-4 py-3 text-[10px] text-forest-900/70">
              <ShieldCheck className="h-4 w-4 shrink-0 text-forest-600" />
              Listings are checked by a campus moderator. Suspicious listings are removed and
              repeat offenders lose access.
            </div>

            <button
              type="submit"
              disabled={submitting || uploading}
              className="btn btn-primary h-12 w-full lg:hidden"
            >
              {submitting ? 'Publishing…' : 'Publish listing'}
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          {/* SIDEBAR */}
          <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
            <div className="card p-4">
              <div className="flex items-center justify-between">
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-forest-900/70">
                  Live preview
                </p>
                <span className="flex items-center gap-1 text-[9px] font-semibold text-forest-600">
                  <span className="h-1.5 w-1.5 rounded-full bg-forest-500" /> Updating
                </span>
              </div>

              <div className="mt-3 overflow-hidden rounded-2xl border border-forest-900/10 bg-white">
                <div className="relative aspect-[4/5] bg-sand">
                  {images[0] ? (
                    <img
                      src={images[0].url}
                      alt="Listing preview"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="grid h-full place-items-center px-4 text-center">
                      <div>
                        <ImagePlus className="mx-auto h-7 w-7 text-forest-900/20" />
                        <p className="mt-2 text-[10px] text-forest-900/70">
                          Add a photo to see your listing come to life
                        </p>
                      </div>
                    </div>
                  )}
                  <span className="absolute left-2.5 top-2.5 rounded-full bg-white/90 px-2 py-0.5 text-[8px] font-bold uppercase tracking-wider text-forest-900 backdrop-blur">
                    {condition}
                  </span>
                  {boost && (
                    <span className="absolute bottom-2.5 left-2.5 rounded-full bg-lime-300 px-2 py-0.5 text-[8px] font-bold uppercase tracking-wider text-forest-950">
                      Featured
                    </span>
                  )}
                </div>
                <div className="p-3">
                  <p className="text-[9px] font-bold uppercase tracking-wider text-forest-900/70">
                    {category}
                  </p>
                  <p className="mt-0.5 line-clamp-1 text-[12px] font-semibold text-forest-950">
                    {title || 'Your listing title'}
                  </p>
                  <div className="mt-1 flex items-baseline justify-between">
                    <p className="font-display text-[17px] font-semibold text-forest-950">
                      {previewPrice}
                    </p>
                    {negotiable && (
                      <span className="text-[8px] font-semibold uppercase tracking-wide text-forest-900/75">
                        Negotiable
                      </span>
                    )}
                  </div>
                  <div className="mt-2 flex items-center gap-1.5 border-t border-forest-900/10 pt-2">
                    <Avatar name={user.name} size="xs" ring={false} />
                    <span className="text-[9px] font-semibold text-forest-900/75">
                      {user.name}
                    </span>
                    <BadgeCheck className="h-3 w-3 text-forest-600" />
                    <span className="ml-auto text-[8px] text-forest-900/75">Just now</span>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting || uploading}
                className="btn btn-primary mt-3 hidden h-11 w-full lg:inline-flex"
              >
                {submitting ? 'Publishing…' : 'Publish listing'}
                <ArrowRight className="h-4 w-4" />
              </button>
              <p className="mt-2 text-center text-[9px] text-forest-900/70">
                Free to list · 5% only when it sells
              </p>
            </div>

            <div className="rounded-3xl border border-forest-900/10 bg-white/60 p-4">
              <p className="flex items-center gap-1.5 text-[11px] font-bold text-forest-900">
                <Sparkles className="h-3.5 w-3.5 text-amber" /> Sell faster
              </p>
              <ul className="mt-2.5 space-y-2 text-[10.5px] leading-relaxed text-forest-900/70">
                <li className="flex gap-2">
                  <Check className="mt-0.5 h-3 w-3 shrink-0 text-forest-600" />
                  Listings with 3+ photos get more chats.
                </li>
                <li className="flex gap-2">
                  <Check className="mt-0.5 h-3 w-3 shrink-0 text-forest-600" />
                  Mention the exact condition — trust is the top factor.
                </li>
                <li className="flex gap-2">
                  <Check className="mt-0.5 h-3 w-3 shrink-0 text-forest-600" />
                  Price close to similar listings on the market.
                </li>
              </ul>
              <Link
                to="/browse"
                className="mt-3 inline-flex items-center gap-1 text-[10px] font-semibold text-forest-700 transition hover:text-forest-950"
              >
                Check similar prices <ArrowRight className="h-3 w-3" />
              </Link>
            </div>

            <div className="rounded-3xl bg-forest-950 p-4 text-cream">
              <p className="flex items-center gap-1.5 text-[11px] font-bold text-lime-300">
                <ShieldCheck className="h-3.5 w-3.5" /> Safe selling
              </p>
              <p className="mt-1.5 text-[10px] leading-relaxed text-cream/70">
                Meet in public, inspect together, and keep the chat in Campus Market until the
                order is confirmed.
              </p>
            </div>
          </aside>
        </form>
      </div>
    </div>
  )
}
