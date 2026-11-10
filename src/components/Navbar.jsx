import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import {
  Heart,
  Menu,
  MessageCircle,
  Plus,
  Search,
  ShieldCheck,
  Sparkles,
  X,
} from 'lucide-react'
import { useApp } from '../context/AppContext'
import { initials } from '../lib/utils'
import Avatar from './Avatar'

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/browse', label: 'Browse' },
  { to: '/sell', label: 'Sell' },
  { to: '/messages', label: 'Messages' },
  { to: '/saved', label: 'Saved' },
]

export default function Navbar() {
  const { user, saved } = useApp()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-[60] border-b transition-all duration-300 ${
        scrolled
          ? 'border-forest-900/10 bg-cream/85 shadow-[0_10px_30px_-24px_rgba(8,33,21,0.5)] backdrop-blur-xl'
          : 'border-transparent bg-cream/60 backdrop-blur-md'
      }`}
    >
      <div className="container-x flex h-[72px] items-center justify-between gap-4">
        <Link to="/" className="group flex items-center gap-2.5">
          <span className="grid h-10 w-10 place-items-center rounded-2xl bg-forest-900 text-lime-300 shadow-soft transition group-hover:rotate-[-6deg]">
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
            <span className="font-extrabold tracking-tight text-forest-950">Campus</span>
            <span className="font-display font-semibold italic text-forest-700">Market</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                `rounded-full px-4 py-2 text-[13px] font-semibold transition ${
                  isActive
                    ? 'bg-forest-900 text-cream shadow-soft'
                    : 'text-forest-900/70 hover:bg-white/70 hover:text-forest-950'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to="/browse"
            aria-label="Search listings"
            className="hidden h-10 w-10 place-items-center rounded-full border border-forest-900/10 bg-white/70 text-forest-900 transition hover:bg-white sm:grid"
          >
            <Search className="h-[18px] w-[18px]" />
          </Link>

          <Link
            to="/saved"
            aria-label={saved.length > 0 ? `Saved listings, ${saved.length} saved` : 'Saved listings'}
            className="relative hidden h-10 w-10 place-items-center rounded-full border border-forest-900/10 bg-white/70 text-forest-900 transition hover:bg-white sm:grid"
          >
            <Heart className="h-[18px] w-[18px]" />
            {saved.length > 0 && (
              <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-coral px-1 text-[10px] font-bold text-forest-950 ring-2 ring-cream">
                {saved.length}
              </span>
            )}
          </Link>

          <Link to="/sell" className="btn btn-accent hidden h-10 px-4 sm:inline-flex">
            <Plus className="h-4 w-4" strokeWidth={2.6} />
            Sell an item
          </Link>

          <Link
            to="/profile"
            className="ml-0.5 rounded-full ring-offset-2 ring-offset-cream transition hover:ring-2 hover:ring-forest-300"
            aria-label={`${initials(user.name)} — ${user.name} profile`}
          >
            <Avatar name={user.name} size="md" />
          </Link>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="grid h-10 w-10 place-items-center rounded-full border border-forest-900/10 bg-white/70 text-forest-950 lg:hidden"
            aria-expanded={open}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="container-x pb-4 lg:hidden"
          >
            <div className="card overflow-hidden p-2">
              {links.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.end}
                  className={({ isActive }) =>
                    `flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                      isActive
                        ? 'bg-forest-900 text-cream'
                        : 'text-forest-900/75 hover:bg-forest-50'
                    }`
                  }
                >
                  {link.label}
                  {link.to === '/messages' && (
                    <span className="flex items-center gap-1 text-[11px] font-medium opacity-70">
                      <MessageCircle className="h-3.5 w-3.5" /> 3 new
                    </span>
                  )}
                  {link.to === '/saved' && saved.length > 0 && (
                    <span className="rounded-full bg-coral/15 px-2 py-0.5 text-[11px] font-bold text-coral">
                      {saved.length}
                    </span>
                  )}
                </NavLink>
              ))}

              <div className="mt-2 grid gap-2 border-t border-forest-900/10 p-2 pt-3">
                <Link to="/sell" className="btn btn-accent h-11 w-full">
                  <Plus className="h-4 w-4" strokeWidth={2.6} /> Sell an item
                </Link>
                <div className="flex items-center gap-2 rounded-2xl bg-forest-50 px-3 py-2.5 text-xs text-forest-900/70">
                  <ShieldCheck className="h-4 w-4 text-forest-600" />
                  Verified students only
                  <Sparkles className="ml-auto h-4 w-4 text-amber" />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
