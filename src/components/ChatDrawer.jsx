import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { BadgeCheck, Lock, Send, ShieldCheck, X } from 'lucide-react'
import { formatUGX } from '../lib/utils'
import { autoReply } from '../lib/autoReply'
import Avatar from './Avatar'

const quickReplies = [
  'Is this still available?',
  'Can you do a better price?',
  'Where can we meet?',
]

export default function ChatDrawer({ open, onClose, product }) {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const endRef = useRef(null)
  const timerRef = useRef(null)

  useEffect(() => {
    if (!open || !product) return
    setMessages([
      {
        id: 'welcome',
        from: 'them',
        text: `Hi! Yes, “${product.title}” is still available. Are you buying for yourself?`,
        time: 'now',
      },
    ])
    setInput('')
    setTyping(false)
  }, [open, product])

  useEffect(() => {
    if (!open) return undefined
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [open])

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [messages, typing, open])

  useEffect(
    () => () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    },
    []
  )

  const send = (text) => {
    const trimmed = text.trim()
    if (!trimmed || !product) return
    setMessages((prev) => [
      ...prev,
      {
        id: `me-${Date.now()}`,
        from: 'me',
        text: trimmed,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ])
    setInput('')
    setTyping(true)

    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: `them-${Date.now()}`,
          from: 'them',
          text: autoReply(trimmed, prev.length),
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ])
      setTyping(false)
    }, 1500)
  }

  return (
    <AnimatePresence>
      {open && product && (
        <div className="fixed inset-0 z-[95]">
          <motion.div
            className="absolute inset-0 bg-forest-950/45 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />

          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label={`Chat with ${product.seller.name}`}
            className="absolute right-0 top-0 flex h-full w-full flex-col bg-cream shadow-lift sm:max-w-[430px] sm:rounded-l-[2rem]"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          >
            <div className="flex items-start gap-3 border-b border-forest-900/10 bg-white/80 px-4 py-4 backdrop-blur">
              <Avatar name={product.seller.name} size="md" />
              <div className="min-w-0 flex-1">
                <p className="flex items-center gap-1 text-[13px] font-bold text-forest-950">
                  {product.seller.name}
                  {product.seller.verified && (
                    <BadgeCheck className="h-3.5 w-3.5 text-forest-600" />
                  )}
                </p>
                <p className="flex items-center gap-1.5 text-[10px] text-forest-900/70">
                  <span className="h-1.5 w-1.5 rounded-full bg-forest-500" /> Usually replies in{' '}
                  {product.seller.responseTime}
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close chat"
                className="grid h-8 w-8 place-items-center rounded-full bg-forest-900/5 text-forest-900 transition hover:bg-forest-900/10"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex items-center gap-2.5 border-b border-forest-900/10 bg-white/50 px-4 py-2.5">
              <img
                src={product.images?.[0]}
                alt=""
                className="h-9 w-9 rounded-lg object-cover"
                onError={(event) => {
                  event.currentTarget.src = '/images/workspace.jpg'
                }}
              />
              <div className="min-w-0 flex-1">
                <p className="truncate text-[11px] font-semibold text-forest-950">
                  {product.title}
                </p>
                <p className="text-[10px] text-forest-900/70">{formatUGX(product.price)}</p>
              </div>
              <span className="rounded-full bg-forest-50 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-forest-700">
                {product.condition}
              </span>
            </div>

            <div className="nice-scroll flex-1 space-y-3 overflow-y-auto px-4 py-4">
              <div className="mx-auto flex max-w-[95%] items-start gap-1.5 rounded-xl bg-forest-100/60 px-3 py-2 text-[10px] leading-relaxed text-forest-800">
                <ShieldCheck className="mt-0.5 h-3 w-3 shrink-0" />
                Keep chats in Campus Market until your order is confirmed. Never send money before
                you see the item.
              </div>

              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.from === 'me' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[82%] rounded-2xl px-3.5 py-2.5 text-[12px] leading-relaxed shadow-sm ${
                      message.from === 'me'
                        ? 'rounded-br-md bg-forest-900 text-cream'
                        : 'rounded-bl-md bg-white text-forest-950'
                    }`}
                  >
                    {message.text}
                    <p
                      className={`mt-1 text-[8px] ${
                        message.from === 'me' ? 'text-cream/65' : 'text-forest-900/70'
                      }`}
                    >
                      {message.time}
                    </p>
                  </div>
                </motion.div>
              ))}

              {typing && (
                <div className="flex justify-start">
                  <div className="flex items-center gap-1 rounded-2xl rounded-bl-md bg-white px-3.5 py-3 shadow-sm">
                    {[0, 1, 2].map((dot) => (
                      <motion.span
                        key={dot}
                        className="h-1.5 w-1.5 rounded-full bg-forest-900/30"
                        animate={{ y: [0, -4, 0] }}
                        transition={{
                          duration: 0.7,
                          repeat: Infinity,
                          delay: dot * 0.12,
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}
              <div ref={endRef} />
            </div>

            <div className="border-t border-forest-900/10 bg-white/70 px-4 py-3">
              <div className="hide-scrollbar mb-2 flex gap-1.5 overflow-x-auto">
                {quickReplies.map((reply) => (
                  <button
                    key={reply}
                    type="button"
                    onClick={() => send(reply)}
                    className="shrink-0 rounded-full border border-forest-900/15 bg-white px-2.5 py-1.5 text-[10px] font-semibold text-forest-900/75 transition hover:border-forest-900/30 hover:text-forest-950"
                  >
                    {reply}
                  </button>
                ))}
              </div>

              <form
                onSubmit={(event) => {
                  event.preventDefault()
                  send(input)
                }}
                className="flex items-center gap-2 rounded-2xl border border-forest-900/15 bg-white p-1.5 pl-3.5 focus-within:border-forest-500"
              >
                <input
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  placeholder="Write a message…"
                  aria-label="Message"
                  className="h-9 min-w-0 flex-1 bg-transparent text-[12px] text-forest-950 placeholder:text-forest-900/70 focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={!input.trim()}
                  aria-label="Send message"
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-forest-900 text-lime-300 transition hover:bg-forest-800 disabled:opacity-40"
                >
                  <Send className="h-4 w-4" />
                </button>
              </form>
              <p className="mt-2 flex items-center justify-center gap-1 text-[9px] text-forest-900/70">
                <Lock className="h-2.5 w-2.5" /> WhatsApp is released after order confirmation
              </p>
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  )
}
