import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  BadgeCheck,
  Check,
  ChevronRight,
  Copy,
  MapPin,
  MessageCircle,
  ShieldCheck,
  ShoppingBag,
  Store,
  Wallet,
  X,
} from 'lucide-react'
import { toast } from 'sonner'
import { commission, formatUGX, orderRef } from '../lib/utils'
import Modal from './Modal'
import Avatar from './Avatar'

const pickupOptions = [
  {
    id: 'campus',
    label: 'Campus pickup',
    note: 'Collect from the seller’s hostel or campus point',
    icon: Store,
  },
  {
    id: 'public',
    label: 'Public meeting point',
    note: 'Library steps, main gate or the campus canteen',
    icon: MapPin,
  },
]

export default function OrderModal({ open, onClose, product }) {
  const [step, setStep] = useState('details')
  const [pickup, setPickup] = useState('campus')
  const [note, setNote] = useState('')
  const [loading, setLoading] = useState(false)
  const [reference, setReference] = useState('CM-0000')

  useEffect(() => {
    if (!open) return
    setStep('details')
    setPickup('campus')
    setNote('')
    setLoading(false)
    setReference(orderRef())
  }, [open])

  if (!product) return null

  const fee = commission(product.price)
  const payout = product.price - fee
  const whatsapp = `https://wa.me/${product.seller.phone?.replace(/\D/g, '') || '256700123456'}?text=${encodeURIComponent(
    `Hi ${product.seller.name.split(' ')[0]}, I confirmed an order for "${product.title}" on Campus Market (${reference}).`
  )}`

  const confirm = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setStep('success')
      toast.success('Order confirmed', {
        description: `${reference} · ${product.title}`,
      })
    }, 950)
  }

  const copyNumber = async () => {
    try {
      await navigator.clipboard.writeText(product.seller.phone || '+256 700 123 456')
      toast.success('WhatsApp number copied')
    } catch {
      toast.error('Could not copy — long-press the number instead')
    }
  }

  return (
    <Modal open={open} onClose={onClose} className="sm:max-w-md">
      <div className="p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="eyebrow">{step === 'success' ? 'Order complete' : 'Secure order'}</p>
            <h2 className="mt-1 font-display text-2xl font-semibold tracking-tight text-forest-950">
              {step === 'success' ? 'You’re all set.' : 'Confirm your order'}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close order"
            className="grid h-9 w-9 place-items-center rounded-full bg-white text-forest-900 shadow-soft"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {step === 'details' ? (
          <>
            <div className="mt-5 flex gap-3 rounded-2xl border border-forest-900/10 bg-white p-3">
              <img
                src={product.images?.[0]}
                alt=""
                className="h-20 w-20 shrink-0 rounded-xl object-cover"
                onError={(event) => {
                  event.currentTarget.src = '/images/workspace.jpg'
                }}
              />
              <div className="min-w-0">
                <p className="line-clamp-2 text-[13px] font-semibold text-forest-950">
                  {product.title}
                </p>
                <p className="mt-1 font-display text-lg font-semibold text-forest-950">
                  {formatUGX(product.price)}
                </p>
                <p className="mt-0.5 flex items-center gap-1 text-[10px] text-forest-900/70">
                  <BadgeCheck className="h-3 w-3 text-forest-600" />
                  {product.seller.name} · {product.condition}
                </p>
              </div>
            </div>

            <div className="mt-4 space-y-2 rounded-2xl bg-white/70 p-4 text-[12px]">
              <div className="flex justify-between text-forest-900/70">
                <span>Item price</span>
                <span className="font-semibold text-forest-950">{formatUGX(product.price)}</span>
              </div>
              <div className="flex justify-between text-forest-900/70">
                <span>Buyer fee</span>
                <span className="font-semibold text-forest-700">Free</span>
              </div>
              <div className="flex justify-between text-forest-900/70">
                <span>Seller commission (5%)</span>
                <span className="font-semibold text-forest-900/70">−{formatUGX(fee)}</span>
              </div>
              <div className="border-t border-dashed border-forest-900/15 pt-2">
                <div className="flex justify-between">
                  <span className="font-semibold text-forest-950">Seller receives</span>
                  <span className="font-display text-base font-semibold text-forest-950">
                    {formatUGX(payout)}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-5">
              <p className="label">
                <MapPin className="h-3.5 w-3.5" /> How will you collect it?
              </p>
              <div className="grid gap-2">
                {pickupOptions.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setPickup(option.id)}
                    className={`flex items-center gap-3 rounded-2xl border p-3 text-left transition ${
                      pickup === option.id
                        ? 'border-forest-700 bg-forest-50 ring-1 ring-forest-700'
                        : 'border-forest-900/10 bg-white hover:border-forest-900/25'
                    }`}
                  >
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white text-forest-700 shadow-sm">
                      <option.icon className="h-4 w-4" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[12px] font-semibold text-forest-950">
                        {option.label}
                      </span>
                      <span className="block text-[10px] text-forest-900/70">{option.note}</span>
                    </span>
                    <span
                      className={`grid h-5 w-5 shrink-0 place-items-center rounded-full border ${
                        pickup === option.id
                          ? 'border-forest-700 bg-forest-700 text-white'
                          : 'border-forest-900/20'
                      }`}
                    >
                      {pickup === option.id && <Check className="h-3 w-3" strokeWidth={3} />}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-4">
              <label htmlFor="order-note" className="label">
                <MessageCircle className="h-3.5 w-3.5" /> Note for the seller (optional)
              </label>
              <textarea
                id="order-note"
                value={note}
                onChange={(event) => setNote(event.target.value)}
                rows={2}
                placeholder={`e.g. I can collect around 5pm from ${product.location}`}
                className="input resize-none"
              />
            </div>

            <div className="mt-4 flex items-start gap-2 rounded-xl bg-forest-50 p-3 text-[10px] leading-relaxed text-forest-800">
              <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0" />
              No payment is taken in this pilot. You inspect the item at pickup, then pay the
              seller directly.
            </div>

            <button
              type="button"
              onClick={confirm}
              disabled={loading}
              className="btn btn-primary mt-4 h-12 w-full"
            >
              {loading ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-cream/30 border-t-cream" />
                  Confirming…
                </>
              ) : (
                <>
                  <ShoppingBag className="h-4 w-4" /> Confirm order · {formatUGX(product.price)}
                </>
              )}
            </button>
            <p className="mt-2 text-center text-[9px] text-forest-900/70">
              By confirming you agree to meet at a public campus point and inspect the item first.
            </p>
          </>
        ) : (
          <div className="mt-6">
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', damping: 14, stiffness: 220 }}
              className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-lime-300"
            >
              <span className="grid h-14 w-14 place-items-center rounded-full bg-forest-900 text-lime-300">
                <Check className="h-7 w-7" strokeWidth={3} />
              </span>
            </motion.div>

            <p className="mt-5 text-center text-[11px] font-semibold uppercase tracking-[0.16em] text-forest-900/70">
              Order {reference}
            </p>
            <h3 className="mt-1 text-center font-display text-xl font-semibold text-forest-950">
              {product.seller.name.split(' ')[0]} has been notified
            </h3>
            <p className="mx-auto mt-2 max-w-xs text-center text-[12px] leading-relaxed text-forest-900/70">
              Your contact is now unlocked. Message the seller to agree a time, then meet at{' '}
              <span className="font-semibold text-forest-900">
                {pickup === 'campus' ? product.location : 'the library steps'}
              </span>
              .
            </p>

            <div className="mt-5 rounded-2xl border border-forest-900/10 bg-white p-4">
              <div className="flex items-center gap-3">
                <Avatar name={product.seller.name} size="md" />
                <div className="min-w-0 flex-1">
                  <p className="flex items-center gap-1 text-[13px] font-bold text-forest-950">
                    {product.seller.name}
                    <BadgeCheck className="h-3.5 w-3.5 text-forest-600" />
                  </p>
                  <p className="text-[10px] text-forest-900/70">Verified student seller</p>
                </div>
                <span className="rounded-full bg-forest-50 px-2 py-1 text-[9px] font-bold uppercase tracking-wide text-forest-700">
                  Online
                </span>
              </div>

              <div className="mt-3 flex items-center justify-between gap-2 rounded-xl bg-lime-100 p-3">
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-wider text-forest-900/70">
                    WhatsApp · unlocked
                  </p>
                  <p className="mt-0.5 text-[13px] font-bold text-forest-950">
                    {product.seller.phone || '+256 700 123 456'}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={copyNumber}
                  aria-label="Copy WhatsApp number"
                  className="grid h-9 w-9 place-items-center rounded-xl bg-white text-forest-900 shadow-sm transition hover:bg-forest-50"
                >
                  <Copy className="h-4 w-4" />
                </button>
              </div>

              <a
                href={whatsapp}
                target="_blank"
                rel="noreferrer"
                className="btn btn-primary mt-3 h-11 w-full"
              >
                <MessageCircle className="h-4 w-4" /> Message on WhatsApp
              </a>
            </div>

            <div className="mt-4 space-y-2 rounded-2xl bg-white/60 p-4 text-[11px] text-forest-900/75">
              <p className="flex items-center gap-2">
                <Check className="h-3.5 w-3.5 text-forest-600" /> Inspect the item before paying.
              </p>
              <p className="flex items-center gap-2">
                <Check className="h-3.5 w-3.5 text-forest-600" /> Meet in a public campus space.
              </p>
              <p className="flex items-center gap-2">
                <Wallet className="h-3.5 w-3.5 text-forest-600" /> Seller pays 5% only after the sale
                completes.
              </p>
            </div>

            <div className="mt-4 flex gap-2">
              <button type="button" onClick={onClose} className="btn btn-ghost h-11 flex-1">
                Done
              </button>
              <Link to="/messages" onClick={onClose} className="btn btn-primary h-11 flex-1">
                Open messages <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </Modal>
  )
}
