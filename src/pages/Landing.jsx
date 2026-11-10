import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Camera,
  Check,
  ChevronDown,
  Flag,
  Lock,
  MapPin,
  MessageCircle,
  Plus,
  Quote,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  Wallet,
} from 'lucide-react'
import { categories, products as seedProducts, stats, testimonials } from '../data/market'
import { useApp } from '../context/AppContext'
import { formatUGX } from '../lib/utils'
import ProductCard from '../components/ProductCard'
import CategoryIcon from '../components/CategoryIcon'
import Reveal from '../components/Reveal'
import Avatar from '../components/Avatar'

const featuredTabs = ['All', 'Electronics', 'Fashion', 'Food', 'Books', 'Hostel & Home']

const steps = [
  {
    number: '01',
    title: 'Verify your student account',
    body: 'Sign up with your registration number. A campus moderator checks it, so every buyer and seller is a real Makerere Jinja student.',
    icon: ShieldCheck,
  },
  {
    number: '02',
    title: 'List it or find it',
    body: 'Post with a real photo, price and honest condition. Search by name, compare prices and filter by hostel or campus.',
    icon: Camera,
  },
  {
    number: '03',
    title: 'Chat, meet, done',
    body: 'Chat in-app, confirm your order, then meet at a campus pickup point. WhatsApp is released only after confirmation.',
    icon: MessageCircle,
  },
]

const trustPoints = [
  {
    icon: BadgeCheck,
    title: 'Verified students only',
    body: 'Registration numbers are checked by a campus moderator. No strangers, no fake sellers.',
  },
  {
    icon: Camera,
    title: 'Photo and condition required',
    body: 'Every listing shows the real item and its honest condition. No more surprises at pickup.',
  },
  {
    icon: Flag,
    title: 'Report in one tap',
    body: 'Suspicious listings go straight to moderation, and repeat offenders lose access.',
  },
  {
    icon: Wallet,
    title: 'Fees only on success',
    body: 'Basic listing is free. We take 5% from the seller only when a sale completes.',
  },
]

export default function Landing() {
  const navigate = useNavigate()
  const { allProducts } = useApp()
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')
  const [tab, setTab] = useState('All')

  const submitSearch = (event) => {
    event.preventDefault()
    const params = new URLSearchParams()
    if (query.trim()) params.set('q', query.trim())
    if (category !== 'All') params.set('cat', category)
    navigate(`/browse${params.toString() ? `?${params.toString()}` : ''}`)
  }

  const quickSearch = (term) => {
    navigate(`/browse?q=${encodeURIComponent(term)}`)
  }

  const featured = allProducts
    .filter((product) => tab === 'All' || product.category === tab)
    .sort((a, b) => Number(b.featured) - Number(a.featured))
    .slice(0, 8)

  return (
    <div className="overflow-hidden">
      {/* HERO */}
      <section className="relative">
        <div className="pointer-events-none absolute -right-32 -top-24 h-[420px] w-[420px] rounded-full bg-lime-300/35 blur-3xl" />
        <div className="pointer-events-none absolute -left-40 top-40 h-[380px] w-[380px] rounded-full bg-forest-300/25 blur-3xl" />

        <div className="container-x relative grid items-center gap-12 pb-14 pt-10 lg:grid-cols-[1.02fr_0.98fr] lg:gap-6 lg:pb-24 lg:pt-16">
          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-forest-900/10 bg-white/80 py-1.5 pl-2 pr-3.5 text-[11px] font-semibold text-forest-900 shadow-soft backdrop-blur"
            >
              <span className="relative grid h-5 w-5 place-items-center rounded-full bg-lime-300">
                <span className="absolute inset-0 animate-pulse-ring rounded-full bg-lime-400/70" />
                <span className="relative h-1.5 w-1.5 rounded-full bg-forest-950" />
              </span>
              Piloting now · Makerere Jinja Campus
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="mt-6 font-display text-[clamp(2.9rem,7.2vw,5.1rem)] font-semibold leading-[0.94] tracking-[-0.035em] text-forest-950"
            >
              Your campus.
              <br />
              Your{' '}
              <span className="relative inline-block italic text-forest-600">
                marketplace.
                <svg
                  viewBox="0 0 300 22"
                  className="absolute -bottom-2 left-0 h-3 w-full text-lime-400 sm:-bottom-3 sm:h-4"
                  fill="none"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path
                    d="M4 15C60 6 140 4 296 9"
                    stroke="currentColor"
                    strokeWidth="8"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.12 }}
              className="mt-7 max-w-lg text-[15px] leading-relaxed text-forest-900/70 sm:text-base"
            >
              Buy and sell with verified students across every hostel and campus. Real photos,
              honest condition, searchable prices — no more scrolling through WhatsApp groups.
            </motion.p>

            <motion.form
              onSubmit={submitSearch}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.18 }}
              className="mt-8 max-w-xl rounded-[24px] border border-forest-900/10 bg-white p-2 shadow-lift"
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                <div className="flex flex-1 items-center gap-2 rounded-2xl px-3">
                  <Search className="h-[18px] w-[18px] shrink-0 text-forest-900/70" />
                  <input
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="What are you looking for?"
                    aria-label="Search listings"
                    className="h-11 w-full min-w-0 bg-transparent text-sm text-forest-950 placeholder:text-forest-900/70 focus:outline-none"
                  />
                </div>

                <div className="relative hidden h-8 w-px bg-forest-900/10 sm:block" />

                <div className="relative">
                  <select
                    value={category}
                    onChange={(event) => setCategory(event.target.value)}
                    aria-label="Category"
                    className="h-11 w-full appearance-none rounded-2xl bg-transparent pl-3 pr-9 text-[13px] font-semibold text-forest-900/75 focus:outline-none sm:w-auto"
                  >
                    <option value="All">All categories</option>
                    {categories.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-forest-900/70" />
                </div>

                <button type="submit" className="btn btn-primary h-11 px-6">
                  Search
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </motion.form>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.28 }}
              className="mt-4 flex flex-wrap items-center gap-2"
            >
              <span className="text-[11px] font-semibold uppercase tracking-wider text-forest-900/70">
                Trending
              </span>
              {['iPhone', 'sneakers', 'chapati', 'textbooks', 'braiding'].map((term) => (
                <button
                  key={term}
                  type="button"
                  onClick={() => quickSearch(term)}
                  className="rounded-full border border-forest-900/10 bg-white/60 px-3 py-1.5 text-[11px] font-semibold text-forest-900/70 transition hover:border-forest-900/25 hover:bg-white hover:text-forest-950"
                >
                  {term}
                </button>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.34 }}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              <div className="flex -space-x-2.5">
                {['Brian Ochieng', 'Sharon Nabirye', 'Joel Mugisha', 'Mercy Auma'].map((name) => (
                  <Avatar key={name} name={name} size="sm" />
                ))}
                <span className="grid h-8 w-8 place-items-center rounded-full bg-forest-900 text-[9px] font-bold text-lime-300 ring-2 ring-white">
                  +206
                </span>
              </div>
              <div>
                <div className="flex items-center gap-1">
                  {[0, 1, 2, 3, 4].map((star) => (
                    <Star key={star} className="h-3 w-3 fill-amber text-amber" />
                  ))}
                  <span className="ml-1 text-[11px] font-bold text-forest-900">93%</span>
                </div>
                <p className="mt-0.5 text-[11px] text-forest-900/70">
                  13 of 14 students said they would use Campus Market
                </p>
              </div>
            </motion.div>
          </div>

          {/* HERO COLLAGE */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto aspect-[5/5.4] w-full max-w-[520px] lg:max-w-[560px]"
            aria-hidden="true"
          >
            <div className="absolute left-[9%] top-[13%] h-[66%] w-[72%] rounded-[46%] bg-lime-300/60 blur-2xl" />
            <div className="absolute right-[6%] top-[1%] h-24 w-24 rounded-full border border-forest-900/10 bg-white/40" />
            <div className="absolute bottom-[16%] left-[2%] h-16 w-16 rounded-2xl border border-forest-900/10 bg-white/40 backdrop-blur" />

            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute left-[3%] top-[12%] z-10 w-[58%]"
            >
              <div className="-rotate-[6deg] overflow-hidden rounded-[2rem] border-[5px] border-white bg-white shadow-lift">
                <div className="relative">
                  <img
                    src="/images/iphone-1.jpg"
                    alt="iPhone for sale"
                    className="aspect-[4/5] w-full object-cover"
                  />
                  <span className="absolute left-2.5 top-2.5 rounded-full bg-white/90 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-forest-900 backdrop-blur">
                    Like new
                  </span>
                  <div className="absolute inset-x-2 bottom-2 rounded-xl bg-white/90 p-2 backdrop-blur">
                    <p className="text-[9px] font-semibold uppercase tracking-wider text-forest-900/70">
                      Electronics
                    </p>
                    <p className="truncate text-[11px] font-bold text-forest-950">
                      iPhone 11 · 64GB
                    </p>
                    <p className="font-display text-sm font-semibold text-forest-950">
                      {formatUGX(950000)}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
              className="absolute right-[1%] top-[2%] z-20 w-[37%]"
            >
              <div className="rotate-[7deg] overflow-hidden rounded-[1.6rem] border-4 border-white bg-white shadow-lift">
                <img
                  src="/images/sneakers-1.jpg"
                  alt="Nike sneakers for sale"
                  className="aspect-square w-full object-cover"
                />
                <div className="px-2 py-2">
                  <p className="truncate text-[10px] font-bold text-forest-950">Nike AF1 · 42</p>
                  <p className="font-display text-[11px] font-semibold text-forest-900/70">
                    {formatUGX(180000)}
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
              className="absolute bottom-[8%] right-[2%] z-10 w-[44%]"
            >
              <div className="rotate-[4deg] overflow-hidden rounded-[1.6rem] border-4 border-white bg-white shadow-lift">
                <img
                  src="/images/chapati-1.jpg"
                  alt="Chapati and beans plate"
                  className="aspect-[4/3] w-full object-cover"
                />
                <div className="flex items-center justify-between gap-1 px-2 py-2">
                  <p className="truncate text-[10px] font-bold text-forest-950">Chapati & beans</p>
                  <span className="rounded-full bg-lime-200 px-1.5 py-0.5 text-[8px] font-bold text-forest-900">
                    Fresh
                  </span>
                </div>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
              className="absolute bottom-[1%] left-[1%] z-30 w-[56%]"
            >
              <div className="rounded-2xl border border-white/70 bg-white/95 p-3.5 shadow-lift backdrop-blur">
                <div className="flex items-center justify-between">
                  <span className="font-display text-3xl font-semibold leading-none text-forest-950">
                    93%
                  </span>
                  <span className="rounded-full bg-lime-200 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-forest-800">
                    Survey
                  </span>
                </div>
                <p className="mt-1.5 text-[10px] leading-snug text-forest-900/75">
                  would use Campus Market to buy and sell
                </p>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-forest-900/10">
                  <motion.div
                    className="h-full rounded-full bg-forest-600"
                    initial={{ width: 0 }}
                    animate={{ width: '93%' }}
                    transition={{ duration: 1.4, delay: 0.8 }}
                  />
                </div>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.9 }}
              className="absolute right-[4%] top-[47%] z-30"
            >
              <div className="flex items-center gap-2 rounded-full border border-white/70 bg-white/95 py-1.5 pl-1.5 pr-3.5 shadow-lift backdrop-blur">
                <span className="grid h-7 w-7 place-items-center rounded-full bg-forest-900 text-lime-300">
                  <BadgeCheck className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-[10px] font-bold leading-tight text-forest-950">
                    Verified student
                  </p>
                  <p className="text-[8px] leading-tight text-forest-900/70">Makerere · Jinja</p>
                </div>
              </div>
            </motion.div>

            <Sparkles className="absolute left-[1%] top-[5%] h-6 w-6 text-amber" strokeWidth={1.6} />
            <span className="absolute right-[10%] top-[38%] h-2 w-2 rounded-full bg-coral" />
            <span className="absolute bottom-[40%] left-[0%] h-3 w-3 rounded-full border-2 border-forest-600" />
          </motion.div>
        </div>
      </section>

      {/* STATS STRIP */}
      <section className="border-y border-forest-900/10 bg-white/55">
        <div className="container-x grid grid-cols-2 gap-y-8 py-10 md:grid-cols-4 md:py-12">
          {stats.map((stat, index) => (
            <Reveal
              key={stat.label}
              delay={index * 0.06}
              className={`px-2 sm:px-6 ${index > 0 ? 'md:border-l md:border-forest-900/10' : ''}`}
            >
              <p className="font-display text-4xl font-semibold tracking-tight text-forest-950 sm:text-[2.75rem]">
                {stat.value}
              </p>
              <p className="mt-1 text-[13px] font-semibold text-forest-900">{stat.label}</p>
              <p className="mt-0.5 text-[11px] text-forest-900/70">{stat.note}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="container-x py-20 sm:py-24">
        <Reveal className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow">Browse the market</p>
            <h2 className="mt-2 max-w-xl font-display text-[clamp(2rem,4vw,2.9rem)] font-semibold leading-[1.05] tracking-tight text-forest-950">
              Everything students sell, in one searchable place.
            </h2>
          </div>
          <Link
            to="/browse"
            className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-forest-800 transition hover:gap-3"
          >
            Browse all listings <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>

        <div className="mt-9 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
          {categories.map((category, index) => (
            <Reveal key={category.id} delay={index * 0.04}>
              <Link
                to={`/browse?cat=${encodeURIComponent(category.id)}`}
                className="group flex h-full flex-col justify-between rounded-3xl border border-forest-900/10 bg-white p-5 transition duration-300 hover:-translate-y-1 hover:border-forest-900 hover:bg-forest-950 hover:shadow-lift"
              >
                <div className="flex items-start justify-between">
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-forest-50 text-forest-700 transition group-hover:bg-lime-300 group-hover:text-forest-950">
                    <CategoryIcon name={category.icon} className="h-5 w-5" />
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-forest-900/25 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-lime-300" />
                </div>
                <div className="mt-8">
                  <h3 className="text-[15px] font-semibold text-forest-950 transition group-hover:text-cream">
                    {category.label}
                  </h3>
                  <p className="mt-0.5 text-[11px] text-forest-900/70 transition group-hover:text-cream/70">
                    {category.blurb}
                  </p>
                  <p className="mt-2 text-[10px] font-bold uppercase tracking-wider text-forest-900/70 transition group-hover:text-lime-300/80">
                    {category.count} listings
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}

          <Reveal delay={0.28}>
            <Link
              to="/sell"
              className="group flex h-full min-h-[172px] flex-col justify-between rounded-3xl bg-lime-300 p-5 transition duration-300 hover:-translate-y-1 hover:bg-lime-400 hover:shadow-lift"
            >
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-forest-950 text-lime-300">
                <Plus className="h-5 w-5" strokeWidth={2.6} />
              </span>
              <div className="mt-8">
                <h3 className="text-[15px] font-semibold text-forest-950">Got something to sell?</h3>
                <p className="mt-1 inline-flex items-center gap-1.5 text-[11px] font-semibold text-forest-900/75">
                  List it free <ArrowRight className="h-3.5 w-3.5" />
                </p>
              </div>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* FEATURED */}
      <section className="border-y border-forest-900/10 bg-white/55 py-20 sm:py-24">
        <div className="container-x">
          <Reveal className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="eyebrow flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-coral" /> Fresh on campus
              </p>
              <h2 className="mt-2 max-w-xl font-display text-[clamp(2rem,4vw,2.9rem)] font-semibold leading-[1.05] tracking-tight text-forest-950">
                Real listings from verified students.
              </h2>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-forest-900/70">
                Every item has a photo, a price and an honest condition note. Save what you like,
                chat, then meet on campus.
              </p>
            </div>
            <Link
              to="/browse"
              className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-forest-800 transition hover:gap-3"
            >
              Browse all listings <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="hide-scrollbar mt-7 flex gap-2 overflow-x-auto pb-1">
              {featuredTabs.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setTab(item)}
                  className={`shrink-0 rounded-full px-4 py-2 text-[12px] font-semibold transition ${
                    tab === item
                      ? 'bg-forest-900 text-cream shadow-soft'
                      : 'border border-forest-900/10 bg-white text-forest-900/75 hover:border-forest-900/25 hover:text-forest-950'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </Reveal>

          <div className="mt-7 grid grid-cols-2 gap-x-4 gap-y-9 sm:gap-x-6 md:grid-cols-3 xl:grid-cols-4">
            {featured.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>

          {featured.length === 0 && (
            <div className="mt-8 rounded-3xl border border-dashed border-forest-900/15 bg-white/60 px-6 py-14 text-center">
              <p className="font-display text-xl font-semibold text-forest-950">
                Nothing listed in {tab} yet.
              </p>
              <p className="mt-1 text-sm text-forest-900/70">
                Be the first seller — basic listings are free.
              </p>
              <Link to="/sell" className="btn btn-primary mt-5 h-11 px-5">
                Sell an item
              </Link>
            </div>
          )}

          <div className="mt-10 flex justify-center">
            <Link to="/browse" className="btn btn-ghost h-12 px-6">
              See all {seedProducts.length + 1} listings
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="container-x scroll-mt-24 py-20 sm:py-24">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">How it works</p>
          <h2 className="mt-2 font-display text-[clamp(2rem,4vw,2.9rem)] font-semibold leading-[1.05] tracking-tight text-forest-950">
            From WhatsApp chaos to one clean marketplace.
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-forest-900/70">
            Three steps, built around how students actually trade — fast, nearby and on a phone.
          </p>
        </Reveal>

        <div className="relative mt-12 grid gap-4 md:grid-cols-3 md:gap-6">
          <div className="absolute left-[16%] right-[16%] top-[46px] hidden border-t border-dashed border-forest-900/20 md:block" />
          {steps.map((step, index) => (
            <Reveal key={step.number} delay={index * 0.08} className="relative">
              <div className="h-full rounded-3xl border border-forest-900/10 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:shadow-lift">
                <div className="flex items-center justify-between">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-forest-900 text-lime-300">
                    <step.icon className="h-5 w-5" strokeWidth={1.9} />
                  </span>
                  <span
                    data-step={step.number}
                    aria-hidden="true"
                    className="font-display text-4xl font-semibold text-forest-900/10 before:content-[attr(data-step)]"
                  />
                </div>
                <h3 className="mt-6 text-lg font-semibold text-forest-950">{step.title}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-forest-900/70">{step.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1} className="mt-8 flex flex-wrap items-center justify-center gap-3 text-[11px] font-medium text-forest-900/70">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 shadow-soft">
            <Check className="h-3.5 w-3.5 text-forest-600" /> Free basic listing
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 shadow-soft">
            <Check className="h-3.5 w-3.5 text-forest-600" /> In-app chat first
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 shadow-soft">
            <Check className="h-3.5 w-3.5 text-forest-600" /> Public pickup points
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 shadow-soft">
            <Check className="h-3.5 w-3.5 text-forest-600" /> Report any listing
          </span>
        </Reveal>
      </section>

      {/* TRUST */}
      <section id="trust" className="container-x scroll-mt-24">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] bg-forest-950 px-6 py-12 text-cream sm:px-10 lg:px-14 lg:py-16">
            <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-forest-600/25 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 left-1/3 h-64 w-64 rounded-full bg-lime-400/10 blur-3xl" />
            <div className="pointer-events-none absolute inset-0 bg-grid opacity-40" />

            <div className="relative grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
              <div>
                <p className="inline-flex items-center gap-2 rounded-full border border-lime-300/25 bg-lime-300/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-lime-300">
                  <ShieldCheck className="h-3.5 w-3.5" /> Trust is the product
                </p>
                <h2 className="mt-5 max-w-lg font-display text-[clamp(2rem,4vw,3rem)] font-semibold leading-[1.03] tracking-tight">
                  Built to fix what WhatsApp groups can't.
                </h2>
                <p className="mt-4 max-w-md text-sm leading-relaxed text-cream/75">
                  Students named poor quality, fraud and unreliable users as their biggest fears.
                  Every design decision here answers one of them.
                </p>

                <div className="mt-8 grid gap-x-6 gap-y-6 sm:grid-cols-2">
                  {trustPoints.map((point) => (
                    <div key={point.title} className="flex gap-3">
                      <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/5 text-lime-300">
                        <point.icon className="h-4 w-4" strokeWidth={1.9} />
                      </span>
                      <div>
                        <h3 className="text-[13px] font-semibold text-cream">{point.title}</h3>
                        <p className="mt-1 text-[11.5px] leading-relaxed text-cream/65">
                          {point.body}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* PHONE MOCK */}
              <div className="relative mx-auto w-[270px] sm:w-[300px]">
                <div className="absolute -inset-6 rounded-[3.5rem] bg-lime-300/10 blur-2xl" />
                <div className="relative rounded-[2.8rem] border-[7px] border-forest-900 bg-forest-900 shadow-lift">
                  <div className="overflow-hidden rounded-[2.2rem] bg-cream">
                    <div className="flex items-center justify-between px-5 pt-3 text-[9px] font-bold text-forest-950/70">
                      <span>9:41</span>
                      <span className="h-1.5 w-14 rounded-full bg-forest-950/80" />
                      <span className="flex items-center gap-1">
                        <span className="h-1.5 w-1.5 rounded-full bg-forest-950/60" />
                        <span className="h-1.5 w-1.5 rounded-full bg-forest-950/60" />
                        <span className="h-1.5 w-1.5 rounded-full bg-forest-950/60" />
                      </span>
                    </div>

                    <div className="px-3.5 pb-5 pt-3">
                      <div className="rounded-2xl bg-white p-2 shadow-soft">
                        <div className="relative overflow-hidden rounded-xl">
                          <img
                            src="/images/iphone-1.jpg"
                            alt=""
                            className="h-28 w-full object-cover"
                          />
                          <span className="absolute left-2 top-2 rounded-full bg-white/90 px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wide text-forest-900">
                            Like new
                          </span>
                        </div>
                        <div className="flex items-end justify-between gap-2 px-1 pb-1 pt-2">
                          <div>
                            <p className="text-[10px] font-bold text-forest-950">iPhone 11 · 64GB</p>
                            <p className="font-display text-[13px] font-semibold text-forest-950">
                              {formatUGX(950000)}
                            </p>
                          </div>
                          <span className="flex items-center gap-1 text-[8px] font-semibold text-forest-900/70">
                            <BadgeCheck className="h-3 w-3 text-forest-600" /> Brian
                          </span>
                        </div>
                      </div>

                      <div className="mt-3 space-y-2">
                        <div className="ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-md bg-forest-900 px-3 py-2 text-[9.5px] leading-snug text-cream">
                          Can I pick it up today?
                        </div>
                        <div className="w-fit max-w-[88%] rounded-2xl rounded-bl-md bg-white px-3 py-2 text-[9.5px] leading-snug text-forest-950 shadow-soft">
                          Yes — order confirmed ✅
                        </div>
                        <div className="w-fit max-w-[88%] rounded-2xl rounded-bl-md bg-white px-3 py-2 text-[9.5px] leading-snug text-forest-950 shadow-soft">
                          Meet at Hostel B by 6pm.
                        </div>
                      </div>

                      <div className="mt-3 rounded-2xl bg-lime-300 p-3">
                        <p className="flex items-center gap-1 text-[8px] font-bold uppercase tracking-[0.12em] text-forest-900/70">
                          <Lock className="h-2.5 w-2.5" /> Contact unlocked
                        </p>
                        <p className="mt-1 text-[11px] font-bold text-forest-950">
                          +256 700 123 456
                        </p>
                        <p className="text-[8px] leading-snug text-forest-900/70">
                          WhatsApp released after order confirmation
                        </p>
                      </div>

                      <div className="mt-3 flex items-center justify-center gap-1 text-[8px] font-medium text-forest-900/70">
                        <ShieldCheck className="h-2.5 w-2.5" /> 5% commission · only on success
                      </div>
                    </div>
                  </div>
                </div>

                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -right-5 top-16 rotate-[6deg] rounded-2xl border border-white/20 bg-white/95 px-3 py-2 shadow-lift"
                >
                  <p className="flex items-center gap-1.5 text-[9px] font-bold text-forest-950">
                    <span className="grid h-5 w-5 place-items-center rounded-full bg-forest-900 text-lime-300">
                      <Check className="h-3 w-3" strokeWidth={3} />
                    </span>
                    Order confirmed
                  </p>
                </motion.div>

                <motion.div
                  animate={{ y: [0, 6, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                  className="absolute -left-6 bottom-20 rotate-[-5deg] rounded-2xl border border-white/20 bg-cream px-3 py-2 shadow-lift"
                >
                  <p className="text-[8px] font-bold uppercase tracking-wider text-forest-900/70">
                    Student verified
                  </p>
                  <p className="mt-0.5 flex items-center gap-1 text-[9px] font-bold text-forest-950">
                    <BadgeCheck className="h-3 w-3 text-forest-600" /> 24/U/23962/PS
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* STORIES */}
      <section id="stories" className="container-x scroll-mt-24 py-20 sm:py-24">
        <Reveal className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow">What students told us</p>
            <h2 className="mt-2 max-w-xl font-display text-[clamp(2rem,4vw,2.9rem)] font-semibold leading-[1.05] tracking-tight text-forest-950">
              The problem, in their own words.
            </h2>
          </div>
          <p className="max-w-xs text-[11px] leading-relaxed text-forest-900/70">
            From 14 interviews, 12–13 October 2026. Stated intent still has to become real
            behaviour — that is what the pilot tests.
          </p>
        </Reveal>

        <div className="mt-9 grid gap-4 md:grid-cols-3">
          {testimonials.map((item, index) => (
            <Reveal key={item.name} delay={index * 0.07}>
              <figure className="flex h-full flex-col rounded-3xl border border-forest-900/10 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:shadow-lift">
                <Quote className="h-7 w-7 text-lime-500" strokeWidth={1.5} />
                <blockquote className="mt-4 flex-1 font-display text-[19px] font-medium italic leading-snug text-forest-950">
                  “{item.quote}”
                </blockquote>
                <figcaption className="mt-6 border-t border-forest-900/10 pt-4">
                  <p className="text-[12px] font-bold text-forest-950">{item.name}</p>
                  <p className="text-[11px] text-forest-900/70">{item.detail}</p>
                  <span className="mt-2 inline-flex rounded-full bg-forest-50 px-2.5 py-1 text-[10px] font-semibold text-forest-700">
                    {item.tag}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container-x">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] bg-forest-900 px-6 py-14 text-center text-cream sm:px-12 sm:py-16">
            <div className="pointer-events-none absolute -left-16 -top-16 h-56 w-56 rounded-full bg-lime-300/15 blur-2xl" />
            <div className="pointer-events-none absolute -bottom-24 -right-10 h-64 w-64 rounded-full bg-forest-500/30 blur-3xl" />
            <div className="pointer-events-none absolute inset-0 bg-dots opacity-[0.15]" />

            <div className="relative mx-auto max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-lime-300">
                <Sparkles className="h-3.5 w-3.5" /> First 30 sellers list free + get a boost
              </span>
              <h2 className="mt-5 font-display text-[clamp(2.1rem,5vw,3.4rem)] font-semibold leading-[1.02] tracking-tight">
                Your next customer is already on campus.
              </h2>
              <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-cream/75">
                Turn the clothes, books and gadgets sitting in your room into income. It takes two
                minutes and costs nothing until you sell.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link to="/sell" className="btn btn-accent h-12 w-full px-6 sm:w-auto">
                  Start selling free <ArrowRight className="h-4 w-4" />
                </Link>
                <Link to="/browse" className="btn btn-dark-ghost h-12 w-full px-6 sm:w-auto">
                  Browse the market
                </Link>
              </div>
              <p className="mt-5 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[10px] font-medium text-cream/75">
                <span className="inline-flex items-center gap-1">
                  <Check className="h-3 w-3" /> Verified students only
                </span>
                <span className="inline-flex items-center gap-1">
                  <Check className="h-3 w-3" /> Basic listing free
                </span>
                <span className="inline-flex items-center gap-1">
                  <Check className="h-3 w-3" /> 5% only when you sell
                </span>
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* LOCAL FLAVOUR */}
      <section className="container-x mt-16 flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-forest-900/10 bg-white/60 px-6 py-5">
        <p className="flex items-center gap-2 text-[12px] font-medium text-forest-900/75">
          <MapPin className="h-4 w-4 text-forest-600" />
          Built for Makerere University Jinja Campus — Campus A, Campus B and beyond.
        </p>
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-forest-900/70">
          Find it · Trust it · Sell it
        </p>
      </section>
    </div>
  )
}
