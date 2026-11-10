import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Instagram, Mail, MapPin, Send, Sparkles } from 'lucide-react'
import { toast } from 'sonner'

const columns = [
  {
    title: 'Marketplace',
    links: [
      { label: 'Browse all', to: '/browse' },
      { label: 'Sell an item', to: '/sell' },
      { label: 'Messages', to: '/messages' },
      { label: 'Saved listings', to: '/saved' },
    ],
  },
  {
    title: 'Campus Market',
    links: [
      { label: 'How it works', to: '/#how-it-works' },
      { label: 'Trust & safety', to: '/#trust' },
      { label: 'Student stories', to: '/#stories' },
      { label: 'Your profile', to: '/profile' },
    ],
  },
]

export default function Footer() {
  const [email, setEmail] = useState('')

  const subscribe = (event) => {
    event.preventDefault()
    if (!email.includes('@')) {
      toast.error('Enter a valid email address')
      return
    }
    toast.success('You are on the list', {
      description: 'We will send campus drops and new listings every Friday.',
    })
    setEmail('')
  }

  return (
    <footer className="relative mt-24 overflow-hidden bg-forest-950 text-cream">
      <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-forest-600/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-lime-400/10 blur-3xl" />

      <div className="container-x relative pt-16">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.7fr_0.7fr_1fr]">
          <div>
            <Link to="/" className="flex items-center gap-2.5">
              <span className="grid h-10 w-10 place-items-center rounded-2xl bg-lime-300 text-forest-950">
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                >
                  <path d="M16.8 7.4A6.2 6.2 0 1 0 16.8 16.6" />
                </svg>
              </span>
              <span className="flex items-baseline gap-1.5 text-[19px] leading-none">
                <span className="font-extrabold tracking-tight">Campus</span>
                <span className="font-display font-semibold italic text-lime-300">Market</span>
              </span>
            </Link>

            <p className="mt-5 max-w-xs text-sm leading-relaxed text-cream/75">
              The verified, searchable marketplace for Makerere University Jinja Campus. Find it,
              compare it, buy it.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-[11px] font-medium text-cream/70">
                <MapPin className="h-3.5 w-3.5 text-lime-300" /> Jinja, Uganda
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-[11px] font-medium text-cream/70">
                <Sparkles className="h-3.5 w-3.5 text-lime-300" /> 93% would use it
              </span>
            </div>

            <div className="mt-6 flex gap-2">
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-cream/70 transition hover:border-lime-300 hover:text-lime-300"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="mailto:hello@campusmarket.ug"
                aria-label="Email us"
                className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-cream/70 transition hover:border-lime-300 hover:text-lime-300"
              >
                <Mail className="h-4 w-4" />
              </a>
              <a
                href="https://wa.me/256700123456"
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp"
                className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-cream/70 transition hover:border-lime-300 hover:text-lime-300"
              >
                <Send className="h-4 w-4" />
              </a>
            </div>
          </div>

          {columns.map((column) => (
            <div key={column.title}>
              <h2 className="text-[11px] font-bold uppercase tracking-[0.18em] text-cream/65">
                {column.title}
              </h2>
              <ul className="mt-4 space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-sm text-cream/70 transition hover:text-lime-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h2 className="text-[11px] font-bold uppercase tracking-[0.18em] text-cream/65">
              Campus drops
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-cream/75">
              New listings, seller spotlights and launch events — one short email each Friday.
            </p>
            <form onSubmit={subscribe} className="mt-4">
              <div className="flex items-center gap-2 rounded-full border border-white/15 bg-white/5 p-1.5 pl-4 focus-within:border-lime-300/60">
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@students.mak.ac.ug"
                  aria-label="Email address"
                  className="min-w-0 flex-1 bg-transparent text-sm text-cream placeholder:text-cream/75 focus:outline-none"
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-lime-300 text-forest-950 transition hover:bg-lime-400"
                >
                  <ArrowRight className="h-4 w-4" strokeWidth={2.6} />
                </button>
              </div>
            </form>
            <p className="mt-3 text-[11px] leading-relaxed text-cream/75">
              By subscribing you agree to our privacy policy. We never sell student data.
            </p>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-white/10 py-6 text-[11px] text-cream/65 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Campus Market · Group 7 · IST2106 Technopreneurship</p>
          <p className="flex items-center gap-2">
            Built for Makerere Jinja Campus
            <span className="h-1 w-1 rounded-full bg-cream/30" />
            <span className="text-cream/75">Find it. Trust it. Sell it.</span>
          </p>
        </div>
      </div>

      <div className="pointer-events-none select-none overflow-hidden">
        <p
          aria-hidden="true"
          data-wordmark="Campus Market"
          className="translate-y-[18%] whitespace-nowrap text-center font-display text-[16vw] font-semibold leading-none tracking-tight text-white/[0.035] before:content-[attr(data-wordmark)]"
        />
      </div>
    </footer>
  )
}
