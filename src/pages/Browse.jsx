import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import {
  BadgeCheck,
  ChevronDown,
  RotateCcw,
  Search,
  SearchX,
  SlidersHorizontal,
  X,
} from 'lucide-react'
import {
  campusOptions,
  categories,
  conditionOptions,
  sortOptions,
} from '../data/market'
import { useApp } from '../context/AppContext'
import { cn, formatUGX } from '../lib/utils'
import ProductCard from '../components/ProductCard'
import CategoryIcon from '../components/CategoryIcon'
import Modal from '../components/Modal'
import EmptyState from '../components/EmptyState'

const MAX_PRICE = 1300000

function FiltersPanel({
  category,
  setCategory,
  conditions,
  toggleCondition,
  maxPrice,
  setMaxPrice,
  campus,
  setCampus,
  verifiedOnly,
  setVerifiedOnly,
  reset,
  counts,
  activeCount,
}) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-[11px] font-bold uppercase tracking-[0.16em] text-forest-900/70">
          Filters
        </h3>
        <button
          type="button"
          onClick={reset}
          className="inline-flex items-center gap-1 text-[11px] font-semibold text-forest-700 transition hover:text-forest-950"
        >
          <RotateCcw className="h-3 w-3" /> Reset
        </button>
      </div>

      <div>
        <p className="mb-2.5 text-[13px] font-semibold text-forest-950">Category</p>
        <div className="space-y-0.5">
          <button
            type="button"
            onClick={() => setCategory('All')}
            className={cn(
              'flex w-full items-center gap-2.5 rounded-xl px-2.5 py-2 text-left text-[13px] transition',
              category === 'All'
                ? 'bg-forest-900 font-semibold text-cream'
                : 'text-forest-900/70 hover:bg-forest-50'
            )}
          >
            <span
              className={cn(
                'grid h-7 w-7 place-items-center rounded-lg',
                category === 'All' ? 'bg-white/10 text-lime-300' : 'bg-forest-50 text-forest-700'
              )}
            >
              <Search className="h-3.5 w-3.5" />
            </span>
            All listings
            <span
              className={cn(
                'ml-auto text-[10px]',
                category === 'All' ? 'text-cream/70' : 'text-forest-900/75'
              )}
            >
              {counts.total}
            </span>
          </button>

          {categories.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setCategory(item.id)}
              className={cn(
                'flex w-full items-center gap-2.5 rounded-xl px-2.5 py-2 text-left text-[13px] transition',
                category === item.id
                  ? 'bg-forest-900 font-semibold text-cream'
                  : 'text-forest-900/70 hover:bg-forest-50'
              )}
            >
              <span
                className={cn(
                  'grid h-7 w-7 place-items-center rounded-lg',
                  category === item.id
                    ? 'bg-white/10 text-lime-300'
                    : 'bg-forest-50 text-forest-700'
                )}
              >
                <CategoryIcon name={item.icon} className="h-3.5 w-3.5" />
              </span>
              <span className="truncate">{item.label}</span>
              <span
                className={cn(
                  'ml-auto text-[10px]',
                  category === item.id ? 'text-cream/70' : 'text-forest-900/75'
                )}
              >
                {counts[item.id] || 0}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="border-t border-forest-900/10 pt-5">
        <div className="flex items-center justify-between">
          <p className="text-[13px] font-semibold text-forest-950">Max price</p>
          <span className="rounded-full bg-forest-50 px-2 py-0.5 text-[10px] font-bold text-forest-700">
            {formatUGX(maxPrice)}
          </span>
        </div>
        <input
          type="range"
          min={0}
          max={MAX_PRICE}
          step={10000}
          value={maxPrice}
          onChange={(event) => setMaxPrice(Number(event.target.value))}
          aria-label="Maximum price"
          className="mt-4 h-1.5 w-full cursor-pointer appearance-none rounded-full bg-forest-900/10 accent-forest-600"
        />
        <div className="mt-2 flex justify-between text-[10px] text-forest-900/70">
          <span>UGX 0</span>
          <span>UGX 1.3M</span>
        </div>
      </div>

      <div className="border-t border-forest-900/10 pt-5">
        <p className="mb-2.5 text-[13px] font-semibold text-forest-950">Condition</p>
        <div className="space-y-2">
          {conditionOptions.map((condition) => {
            const checked = conditions.includes(condition)
            return (
              <label
                key={condition}
                className="flex cursor-pointer items-center gap-2.5 text-[13px]"
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggleCondition(condition)}
                  className="h-4 w-4 rounded border-forest-900/25 accent-forest-700"
                />
                <span
                  className={cn(
                    'transition',
                    checked ? 'font-semibold text-forest-950' : 'text-forest-900/75'
                  )}
                >
                  {condition}
                </span>
                <span className="ml-auto text-[10px] text-forest-900/75">
                  {counts[`c:${condition}`] || 0}
                </span>
              </label>
            )
          })}
        </div>
      </div>

      <div className="border-t border-forest-900/10 pt-5">
        <p className="mb-2.5 text-[13px] font-semibold text-forest-950">Campus</p>
        <div className="flex flex-wrap gap-1.5">
          {['All', ...campusOptions].map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setCampus(item)}
              className={cn(
                'rounded-full border px-3 py-1.5 text-[11px] font-semibold transition',
                campus === item
                  ? 'border-forest-900 bg-forest-900 text-cream'
                  : 'border-forest-900/15 bg-white text-forest-900/75 hover:border-forest-900/30'
              )}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-forest-900/10 pt-5">
        <div>
          <p className="flex items-center gap-1 text-[13px] font-semibold text-forest-950">
            <BadgeCheck className="h-3.5 w-3.5 text-forest-600" /> Verified sellers only
          </p>
          <p className="mt-0.5 text-[10px] text-forest-900/70">Student ID checked</p>
        </div>
        <button
          type="button"
          role="switch"
          aria-checked={verifiedOnly}
          onClick={() => setVerifiedOnly(!verifiedOnly)}
          className={cn(
            'flex h-6 w-11 shrink-0 items-center rounded-full p-0.5 transition',
            verifiedOnly ? 'bg-forest-700' : 'bg-forest-900/15'
          )}
        >
          <span
            className={cn(
              'h-5 w-5 rounded-full bg-white shadow transition',
              verifiedOnly && 'translate-x-5'
            )}
          />
        </button>
      </div>

      <div className="rounded-2xl bg-forest-50 p-3.5">
        <p className="text-[11px] font-semibold text-forest-900">
          {activeCount > 0 ? `${activeCount} filter${activeCount > 1 ? 's' : ''} active` : 'No filters yet'}
        </p>
        <p className="mt-0.5 text-[10px] leading-relaxed text-forest-900/70">
          Tip: filter by hostel to find things you can collect on foot.
        </p>
      </div>
    </div>
  )
}

export default function Browse() {
  const { allProducts } = useApp()
  const [searchParams] = useSearchParams()

  const [query, setQuery] = useState(searchParams.get('q') || '')
  const [category, setCategory] = useState(searchParams.get('cat') || 'All')
  const [conditions, setConditions] = useState([])
  const [maxPrice, setMaxPrice] = useState(MAX_PRICE)
  const [campus, setCampus] = useState('All')
  const [verifiedOnly, setVerifiedOnly] = useState(false)
  const [sort, setSort] = useState('recommended')
  const [filtersOpen, setFiltersOpen] = useState(false)

  useEffect(() => {
    setQuery(searchParams.get('q') || '')
    setCategory(searchParams.get('cat') || 'All')
  }, [searchParams])

  const toggleCondition = (condition) => {
    setConditions((prev) =>
      prev.includes(condition) ? prev.filter((item) => item !== condition) : [...prev, condition]
    )
  }

  const reset = () => {
    setQuery('')
    setCategory('All')
    setConditions([])
    setMaxPrice(MAX_PRICE)
    setCampus('All')
    setVerifiedOnly(false)
    setSort('recommended')
  }

  const counts = useMemo(() => {
    const result = { total: allProducts.length }
    categories.forEach((item) => {
      result[item.id] = allProducts.filter((product) => product.category === item.id).length
    })
    conditionOptions.forEach((condition) => {
      result[`c:${condition}`] = allProducts.filter(
        (product) => product.condition === condition
      ).length
    })
    return result
  }, [allProducts])

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase()
    const result = allProducts.filter((product) => {
      const matchesQuery =
        !term ||
        product.title.toLowerCase().includes(term) ||
        product.description.toLowerCase().includes(term) ||
        product.category.toLowerCase().includes(term) ||
        product.seller.name.toLowerCase().includes(term) ||
        (product.tags || []).some((tag) => tag.toLowerCase().includes(term))

      const matchesCategory = category === 'All' || product.category === category
      const matchesCondition =
        conditions.length === 0 || conditions.includes(product.condition)
      const matchesPrice = product.price <= maxPrice
      const matchesCampus = campus === 'All' || product.campus === campus
      const matchesVerified = !verifiedOnly || product.seller.verified

      return (
        matchesQuery &&
        matchesCategory &&
        matchesCondition &&
        matchesPrice &&
        matchesCampus &&
        matchesVerified
      )
    })

    if (sort === 'price-asc') return [...result].sort((a, b) => a.price - b.price)
    if (sort === 'price-desc') return [...result].sort((a, b) => b.price - a.price)
    if (sort === 'newest') return result
    return [...result].sort((a, b) => Number(b.featured) - Number(a.featured))
  }, [allProducts, query, category, conditions, maxPrice, campus, verifiedOnly, sort])

  const activeCount =
    (category !== 'All' ? 1 : 0) +
    conditions.length +
    (maxPrice < MAX_PRICE ? 1 : 0) +
    (campus !== 'All' ? 1 : 0) +
    (verifiedOnly ? 1 : 0)

  const activeChips = [
    category !== 'All' && { key: 'cat', label: category, clear: () => setCategory('All') },
    ...conditions.map((condition) => ({
      key: `cond-${condition}`,
      label: condition,
      clear: () => toggleCondition(condition),
    })),
    maxPrice < MAX_PRICE && {
      key: 'price',
      label: `Under ${formatUGX(maxPrice)}`,
      clear: () => setMaxPrice(MAX_PRICE),
    },
    campus !== 'All' && { key: 'campus', label: campus, clear: () => setCampus('All') },
    verifiedOnly && {
      key: 'verified',
      label: 'Verified only',
      clear: () => setVerifiedOnly(false),
    },
  ].filter(Boolean)

  const panelProps = {
    category,
    setCategory,
    conditions,
    toggleCondition,
    maxPrice,
    setMaxPrice,
    campus,
    setCampus,
    verifiedOnly,
    setVerifiedOnly,
    reset,
    counts,
    activeCount,
  }

  return (
    <div>
      <section className="relative overflow-hidden border-b border-forest-900/10 bg-white/55">
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-lime-300/30 blur-3xl" />
        <div className="container-x relative py-10 sm:py-14">
          <p className="eyebrow">The marketplace</p>
          <div className="mt-2 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="font-display text-[clamp(2.2rem,5vw,3.6rem)] font-semibold leading-[0.98] tracking-tight text-forest-950">
                The campus, <span className="italic text-forest-600">searchable.</span>
              </h1>
              <p className="mt-3 max-w-lg text-sm leading-relaxed text-forest-900/70">
                {allProducts.length} live listings from verified students. Search by name, compare
                prices, filter by hostel and save what you like.
              </p>
            </div>

            <div className="w-full max-w-md rounded-2xl border border-forest-900/10 bg-white p-1.5 shadow-soft">
              <div className="flex items-center gap-2 px-2.5">
                <Search className="h-4 w-4 shrink-0 text-forest-900/70" />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search iPhone, textbooks, chapati…"
                  aria-label="Search listings"
                  className="h-10 w-full bg-transparent text-sm text-forest-950 placeholder:text-forest-900/70 focus:outline-none"
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery('')}
                    aria-label="Clear search"
                    className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-forest-900/5 text-forest-900/70 transition hover:bg-forest-900/10"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container-x py-8 sm:py-10">
        <h2 className="sr-only">Browse listings</h2>
        <div className="grid gap-8 lg:grid-cols-[252px_1fr]">
          <aside className="hidden lg:block">
            <div className="sticky top-24 rounded-3xl border border-forest-900/10 bg-white p-5 shadow-soft">
              <FiltersPanel {...panelProps} />
            </div>
          </aside>

          <div>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setFiltersOpen(true)}
                  className="btn btn-ghost h-10 px-4 lg:hidden"
                >
                  <SlidersHorizontal className="h-4 w-4" />
                  Filters
                  {activeCount > 0 && (
                    <span className="grid h-5 min-w-5 place-items-center rounded-full bg-forest-900 px-1 text-[10px] font-bold text-cream">
                      {activeCount}
                    </span>
                  )}
                </button>
                <p className="text-[13px] font-semibold text-forest-900/75">
                  <span className="font-bold text-forest-950">{filtered.length}</span>{' '}
                  {filtered.length === 1 ? 'listing' : 'listings'}
                  {category !== 'All' && (
                    <span className="text-forest-900/70"> in {category}</span>
                  )}
                </p>
              </div>

              <div className="relative">
                <select
                  value={sort}
                  onChange={(event) => setSort(event.target.value)}
                  aria-label="Sort listings"
                  className="h-10 appearance-none rounded-full border border-forest-900/15 bg-white pl-4 pr-9 text-[12px] font-semibold text-forest-900 focus:border-forest-500 focus:outline-none"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-forest-900/70" />
              </div>
            </div>

            {activeChips.length > 0 && (
              <div className="mt-3 flex flex-wrap items-center gap-1.5">
                {activeChips.map((chip) => (
                  <button
                    key={chip.key}
                    type="button"
                    onClick={chip.clear}
                    className="inline-flex items-center gap-1.5 rounded-full bg-forest-900 px-2.5 py-1 text-[10px] font-semibold text-cream transition hover:bg-forest-800"
                  >
                    {chip.label}
                    <X className="h-3 w-3 opacity-60" />
                  </button>
                ))}
                <button
                  type="button"
                  onClick={reset}
                  className="ml-1 text-[10px] font-semibold text-forest-900/70 underline-offset-2 hover:text-forest-900 hover:underline"
                >
                  Clear all
                </button>
              </div>
            )}

            {filtered.length > 0 ? (
              <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-9 sm:gap-x-6 md:grid-cols-3">
                {filtered.map((product, index) => (
                  <ProductCard key={product.id} product={product} index={index} />
                ))}
              </div>
            ) : (
              <div className="mt-6">
                <EmptyState
                  icon={SearchX}
                  title="No listings match that search"
                  description="Try a different keyword, widen your price range, or clear the filters to see everything on campus."
                  actionLabel="Clear all filters"
                  onAction={reset}
                />
              </div>
            )}

            {filtered.length > 0 && (
              <div className="mt-12 rounded-3xl border border-forest-900/10 bg-white/60 px-6 py-5 text-center">
                <p className="text-[12px] font-semibold text-forest-900/75">
                  Can't find it? Post a wanted request in Messages — or list something yourself.
                </p>
                <div className="mt-3 flex flex-wrap justify-center gap-2">
                  <Link to="/sell" className="btn btn-primary h-10 px-4 text-[12px]">
                    Sell an item
                  </Link>
                  <Link to="/messages" className="btn btn-ghost h-10 px-4 text-[12px]">
                    Ask on chat
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Modal open={filtersOpen} onClose={() => setFiltersOpen(false)} className="sm:max-w-md">
        <div className="p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-xl font-semibold text-forest-950">Filters</h2>
            <button
              type="button"
              onClick={() => setFiltersOpen(false)}
              aria-label="Close filters"
              className="grid h-9 w-9 place-items-center rounded-full bg-white text-forest-900 shadow-soft"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <FiltersPanel {...panelProps} />
          <button
            type="button"
            onClick={() => setFiltersOpen(false)}
            className="btn btn-primary mt-6 h-12 w-full"
          >
            Show {filtered.length} {filtered.length === 1 ? 'listing' : 'listings'}
          </button>
        </div>
      </Modal>
    </div>
  )
}
