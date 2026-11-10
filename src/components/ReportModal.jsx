import { useEffect, useState } from 'react'
import { AlertTriangle, Check, Flag, ShieldCheck, X } from 'lucide-react'
import { toast } from 'sonner'
import Modal from './Modal'

const reasons = [
  { id: 'counterfeit', label: 'Counterfeit or fake item' },
  { id: 'condition', label: 'Condition is not as described' },
  { id: 'prohibited', label: 'Prohibited or unsafe item' },
  { id: 'fraud', label: 'Suspected fraud or scam' },
  { id: 'other', label: 'Something else' },
]

export default function ReportModal({ open, onClose, product }) {
  const [reason, setReason] = useState('')
  const [details, setDetails] = useState('')

  useEffect(() => {
    if (open) {
      setReason('')
      setDetails('')
    }
  }, [open])

  const submit = (event) => {
    event.preventDefault()
    if (!reason) {
      toast.error('Choose a reason so we can review it properly')
      return
    }
    toast.success('Report sent to moderation', {
      description: 'A campus moderator will review this listing within 24 hours.',
    })
    onClose()
  }

  return (
    <Modal open={open} onClose={onClose} className="sm:max-w-md">
      <form onSubmit={submit} className="p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-coral/15 text-coral">
              <Flag className="h-5 w-5" />
            </span>
            <div>
              <h2 className="font-display text-xl font-semibold text-forest-950">Report listing</h2>
              <p className="text-[10px] text-forest-900/70">We review every report.</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close report"
            className="grid h-9 w-9 place-items-center rounded-full bg-white text-forest-900 shadow-soft"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-4 flex gap-2.5 rounded-2xl border border-forest-900/10 bg-white p-3">
          <img
            src={product?.images?.[0]}
            alt=""
            className="h-12 w-12 rounded-lg object-cover"
            onError={(event) => {
              event.currentTarget.src = '/images/workspace.jpg'
            }}
          />
          <div className="min-w-0">
            <p className="truncate text-[12px] font-semibold text-forest-950">{product?.title}</p>
            <p className="text-[10px] text-forest-900/70">
              {product?.seller?.name} · {product?.location}
            </p>
          </div>
        </div>

        <p className="label mt-5">
          <AlertTriangle className="h-3.5 w-3.5" /> What is wrong?
        </p>
        <div className="space-y-1.5">
          {reasons.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setReason(item.id)}
              className={`flex w-full items-center gap-3 rounded-xl border px-3 py-2.5 text-left text-[12px] font-medium transition ${
                reason === item.id
                  ? 'border-forest-700 bg-forest-50 text-forest-950'
                  : 'border-forest-900/10 bg-white text-forest-900/70 hover:border-forest-900/25'
              }`}
            >
              <span
                className={`grid h-5 w-5 shrink-0 place-items-center rounded-full border ${
                  reason === item.id
                    ? 'border-forest-700 bg-forest-700 text-white'
                    : 'border-forest-900/20'
                }`}
              >
                {reason === item.id && <Check className="h-3 w-3" strokeWidth={3} />}
              </span>
              {item.label}
            </button>
          ))}
        </div>

        <div className="mt-4">
          <label htmlFor="report-details" className="label">
            Anything else? (optional)
          </label>
          <textarea
            id="report-details"
            value={details}
            onChange={(event) => setDetails(event.target.value)}
            rows={3}
            placeholder="Tell the moderator what you saw…"
            className="input resize-none"
          />
        </div>

        <div className="mt-4 flex items-start gap-2 rounded-xl bg-forest-50 p-3 text-[10px] leading-relaxed text-forest-800">
          <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0" />
          Reports are anonymous to the seller. False reports can lead to account review.
        </div>

        <button type="submit" className="btn btn-primary mt-4 h-11 w-full">
          <Flag className="h-4 w-4" /> Submit report
        </button>
      </form>
    </Modal>
  )
}
