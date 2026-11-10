import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowLeft,
  BadgeCheck,
  ExternalLink,
  Lock,
  MessageCircle,
  Search,
  Send,
  ShieldCheck,
} from 'lucide-react'
import { conversations } from '../data/market'
import { useApp } from '../context/AppContext'
import { cn, formatUGX } from '../lib/utils'
import { autoReply } from '../lib/autoReply'
import Avatar from '../components/Avatar'

const quickReplies = [
  'Is this still available?',
  'Can we meet at the library?',
  'Can you do a better price?',
]

export default function Messages() {
  const { allProducts } = useApp()
  const [threads, setThreads] = useState(() =>
    conversations.map((thread) => ({ ...thread, messages: [...thread.messages] }))
  )
  const [activeId, setActiveId] = useState(conversations[0].id)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const scrollRef = useRef(null)
  const cardRef = useRef(null)
  const timers = useRef([])

  const active = threads.find((thread) => thread.id === activeId)
  const activeProduct = active
    ? allProducts.find((product) => product.id === active.productId)
    : null

  const unreadTotal = threads.reduce((total, thread) => total + (thread.unread || 0), 0)

  useEffect(() => {
    setThreads((prev) =>
      prev.map((thread) => (thread.id === activeId ? { ...thread, unread: 0 } : thread))
    )
  }, [activeId])

  useEffect(() => {
    const node = scrollRef.current
    if (node) node.scrollTo({ top: node.scrollHeight, behavior: 'smooth' })
  }, [activeId, active?.messages.length, typing])

  useEffect(
    () => () => {
      timers.current.forEach((timer) => clearTimeout(timer))
    },
    []
  )

  const selectThread = (id) => {
    setActiveId(id)
    setMobileOpen(true)
    if (window.matchMedia('(max-width: 767px)').matches) {
      window.setTimeout(() => {
        cardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 80)
    }
  }

  const closeThread = () => {
    setMobileOpen(false)
    if (window.matchMedia('(max-width: 767px)').matches) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const send = (text) => {
    const trimmed = text.trim()
    if (!trimmed || !active) return

    const message = {
      id: `me-${Date.now()}`,
      from: 'me',
      text: trimmed,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }

    setThreads((prev) =>
      prev.map((thread) =>
        thread.id === active.id
          ? { ...thread, messages: [...thread.messages, message], unread: 0 }
          : thread
      )
    )
    setInput('')
    setTyping(true)

    const timer = setTimeout(() => {
      setTyping(false)
      setThreads((prev) =>
        prev.map((thread) =>
          thread.id === active.id
            ? {
                ...thread,
                messages: [
                  ...thread.messages,
                  {
                    id: `them-${Date.now()}`,
                    from: 'them',
                    text: autoReply(trimmed, thread.messages.length),
                    time: new Date().toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    }),
                  },
                ],
              }
            : thread
        )
      )
    }, 1600)
    timers.current.push(timer)
  }

  const visibleThreads = threads.filter(
    (thread) =>
      !query.trim() ||
      thread.seller.name.toLowerCase().includes(query.trim().toLowerCase()) ||
      thread.productTitle.toLowerCase().includes(query.trim().toLowerCase())
  )

  return (
    <div>
      <section className="border-b border-forest-900/10 bg-white/55">
        <div className="container-x py-9 sm:py-12">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow">Messages</p>
              <h1 className="mt-2 font-display text-[clamp(2.1rem,4.5vw,3.2rem)] font-semibold leading-[1] tracking-tight text-forest-950">
                Chats that stay <span className="italic text-forest-600">on campus.</span>
              </h1>
              <p className="mt-3 max-w-lg text-sm leading-relaxed text-forest-900/70">
                Ask about condition, agree a pickup point, then confirm your order. WhatsApp
                unlocks only after confirmation.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-forest-900/10 bg-white px-3 py-1.5 text-[11px] font-semibold text-forest-900/70">
                <MessageCircle className="h-3.5 w-3.5 text-forest-600" /> {threads.length}{' '}
                conversations
              </span>
              {unreadTotal > 0 && (
                <span className="rounded-full bg-coral px-3 py-1.5 text-[11px] font-bold text-forest-950">
                  {unreadTotal} unread
                </span>
              )}
            </div>
          </div>
        </div>
      </section>

      <div className="container-x py-7 sm:py-9">
        <div ref={cardRef} className="card scroll-mt-24 overflow-hidden">
          <div className="grid h-[calc(100vh-260px)] min-h-[500px] md:min-h-[540px] md:grid-cols-[320px_1fr]">
            {/* THREAD LIST */}
            <div
              className={cn(
                'min-h-0 flex-col border-r border-forest-900/10 bg-white',
                mobileOpen ? 'hidden md:flex' : 'flex'
              )}
            >
              <div className="border-b border-forest-900/10 p-3.5">
                <div className="flex items-center gap-2 rounded-xl bg-cream px-3 py-2">
                  <Search className="h-3.5 w-3.5 shrink-0 text-forest-900/70" />
                  <input
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Search chats…"
                    aria-label="Search conversations"
                    className="h-7 w-full bg-transparent text-[12px] text-forest-950 placeholder:text-forest-900/70 focus:outline-none"
                  />
                </div>
              </div>

              <div className="nice-scroll flex-1 overflow-y-auto p-2">
                {visibleThreads.length === 0 && (
                  <p className="px-3 py-8 text-center text-[11px] text-forest-900/70">
                    No chats match that search.
                  </p>
                )}

                {visibleThreads.map((thread) => {
                  const isActive = thread.id === activeId
                  const last = thread.messages[thread.messages.length - 1]
                  return (
                    <button
                      key={thread.id}
                      type="button"
                      onClick={() => selectThread(thread.id)}
                      className={cn(
                        'flex w-full items-start gap-2.5 rounded-2xl p-2.5 text-left transition',
                        isActive ? 'bg-forest-50' : 'hover:bg-cream/70'
                      )}
                    >
                      <Avatar name={thread.seller.name} size="md" />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1">
                          <p className="truncate text-[12px] font-bold text-forest-950">
                            {thread.seller.name}
                          </p>
                          {thread.seller.verified && (
                            <BadgeCheck className="h-3 w-3 shrink-0 text-forest-600" />
                          )}
                          <span className="ml-auto shrink-0 text-[9px] text-forest-900/70">
                            {last.time}
                          </span>
                        </div>
                        <p className="mt-0.5 truncate text-[9px] font-semibold uppercase tracking-wide text-forest-900/70">
                          {thread.productTitle}
                        </p>
                        <div className="mt-1 flex items-center gap-2">
                          <p
                            className={cn(
                              'truncate text-[10.5px]',
                              thread.unread > 0
                                ? 'font-semibold text-forest-900'
                                : 'text-forest-900/70'
                            )}
                          >
                            {last.from === 'me' ? 'You: ' : ''}
                            {last.text}
                          </p>
                          {thread.unread > 0 && (
                            <span className="ml-auto grid h-4 min-w-4 shrink-0 place-items-center rounded-full bg-coral px-1 text-[8px] font-bold text-forest-950">
                              {thread.unread}
                            </span>
                          )}
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>

              <div className="border-t border-forest-900/10 p-3">
                <p className="flex items-start gap-1.5 text-[9px] leading-relaxed text-forest-900/70">
                  <ShieldCheck className="mt-0.5 h-3 w-3 shrink-0 text-forest-600" />
                  Keep chats here until your order is confirmed. Never send money before seeing the
                  item.
                </p>
              </div>
            </div>

            {/* CHAT PANEL */}
            {active ? (
              <div
                className={cn(
                  'min-h-0 flex-col bg-cream',
                  mobileOpen ? 'flex' : 'hidden md:flex'
                )}
              >
                <div className="flex items-center gap-2.5 border-b border-forest-900/10 bg-white px-3.5 py-3">
                  <button
                    type="button"
                    onClick={closeThread}
                    aria-label="Back to conversations"
                    className="grid h-8 w-8 place-items-center rounded-full bg-forest-900/5 text-forest-900 md:hidden"
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </button>
                  <Avatar name={active.seller.name} size="md" />
                  <div className="min-w-0 flex-1">
                    <p className="flex items-center gap-1 text-[13px] font-bold text-forest-950">
                      {active.seller.name}
                      {active.seller.verified && (
                        <BadgeCheck className="h-3.5 w-3.5 text-forest-600" />
                      )}
                    </p>
                    <p className="flex items-center gap-1.5 text-[9.5px] text-forest-900/70">
                      <span className="h-1.5 w-1.5 rounded-full bg-forest-500" />
                      Online · replies in {active.seller.responseTime}
                    </p>
                  </div>
                  <Link
                    to={`/product/${active.productId}`}
                    className="hidden items-center gap-1 rounded-full border border-forest-900/10 bg-cream px-2.5 py-1.5 text-[10px] font-semibold text-forest-900/75 transition hover:border-forest-900/25 hover:text-forest-950 sm:inline-flex"
                  >
                    View listing <ExternalLink className="h-3 w-3" />
                  </Link>
                </div>

                {activeProduct && (
                  <div className="flex items-center gap-2.5 border-b border-forest-900/10 bg-forest-50/70 px-3.5 py-2">
                    <img
                      src={activeProduct.images?.[0]}
                      alt=""
                      className="h-8 w-8 rounded-lg object-cover"
                      onError={(event) => {
                        event.currentTarget.src = '/images/workspace.jpg'
                      }}
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[10.5px] font-semibold text-forest-950">
                        {activeProduct.title}
                      </p>
                      <p className="text-[9px] text-forest-900/70">
                        {formatUGX(activeProduct.price)} · {activeProduct.condition}
                      </p>
                    </div>
                    <span className="rounded-full bg-white px-2 py-0.5 text-[8px] font-bold uppercase tracking-wide text-forest-700">
                      {activeProduct.campus}
                    </span>
                  </div>
                )}

                <div ref={scrollRef} className="nice-scroll flex-1 space-y-3 overflow-y-auto px-4 py-4">
                  <div className="mx-auto flex max-w-[92%] items-start gap-1.5 rounded-xl bg-forest-100/60 px-3 py-2 text-[10px] leading-relaxed text-forest-800">
                    <ShieldCheck className="mt-0.5 h-3 w-3 shrink-0" />
                    Do not share bank details or mobile-money PINs. Meet in a public campus space.
                  </div>

                  <p className="text-center text-[9px] font-semibold uppercase tracking-wider text-forest-900/70">
                    Today
                  </p>

                  <AnimatePresence initial={false}>
                    {active.messages.map((message) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={cn(
                          'flex',
                          message.from === 'me' ? 'justify-end' : 'justify-start'
                        )}
                      >
                        <div
                          className={cn(
                            'max-w-[78%] rounded-2xl px-3.5 py-2.5 text-[12px] leading-relaxed shadow-sm',
                            message.from === 'me'
                              ? 'rounded-br-md bg-forest-900 text-cream'
                              : 'rounded-bl-md bg-white text-forest-950'
                          )}
                        >
                          {message.text}
                          <p
                            className={cn(
                              'mt-1 text-[8px]',
                              message.from === 'me' ? 'text-cream/65' : 'text-forest-900/70'
                            )}
                          >
                            {message.time}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>

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
                </div>

                <div className="border-t border-forest-900/10 bg-white/70 px-3.5 py-3">
                  <div className="hide-scrollbar mb-2 flex gap-1.5 overflow-x-auto">
                    {quickReplies.map((reply) => (
                      <button
                        key={reply}
                        type="button"
                        onClick={() => send(reply)}
                        className="shrink-0 rounded-full border border-forest-900/15 bg-white px-2.5 py-1.5 text-[10px] font-semibold text-forest-900/70 transition hover:border-forest-900/30 hover:text-forest-950"
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
                      placeholder={`Message ${active.seller.name.split(' ')[0]}…`}
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
                  <p className="mt-2 flex items-center justify-center gap-1 text-[9px] text-forest-900/75">
                    <Lock className="h-2.5 w-2.5" /> WhatsApp is released after order confirmation
                  </p>
                </div>
              </div>
            ) : (
              <div className="grid place-items-center bg-cream p-10 text-center">
                <div>
                  <MessageCircle className="mx-auto h-8 w-8 text-forest-900/20" />
                  <p className="mt-3 font-display text-lg font-semibold text-forest-950">
                    Choose a conversation
                  </p>
                  <p className="mt-1 text-[11px] text-forest-900/70">
                    Your chats with verified student sellers appear here.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-forest-900/10 bg-white/60 px-4 py-3">
          <p className="text-[11px] text-forest-900/70">
            Looking for something specific? Start from a listing and chat with the seller.
          </p>
          <Link
            to="/browse"
            className="text-[11px] font-semibold text-forest-700 transition hover:text-forest-950"
          >
            Browse listings →
          </Link>
        </div>
      </div>
    </div>
  )
}
