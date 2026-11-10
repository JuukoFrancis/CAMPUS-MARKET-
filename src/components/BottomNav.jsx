import { Link, useLocation } from 'react-router-dom'
import { Home, LayoutGrid, MessageCircle, Heart, Plus } from 'lucide-react'

const items = [
  { to: '/', label: 'Home', icon: Home, end: true },
  { to: '/browse', label: 'Browse', icon: LayoutGrid },
  { to: '/sell', label: 'Sell', icon: Plus, center: true },
  { to: '/messages', label: 'Chat', icon: MessageCircle },
  { to: '/saved', label: 'Saved', icon: Heart },
]

export default function BottomNav() {
  const location = useLocation()

  return (
    <nav
      className="fixed inset-x-3 bottom-3 z-[60] md:hidden"
      aria-label="Mobile navigation"
    >
      <div className="mx-auto grid max-w-md grid-cols-5 items-end rounded-[26px] border border-white/70 bg-cream/90 px-2 pb-2 pt-2 shadow-lift backdrop-blur-xl">
        {items.map((item) => {
          const active = item.end
            ? location.pathname === item.to
            : location.pathname.startsWith(item.to)
          const Icon = item.icon

          if (item.center) {
            return (
              <Link
                key={item.to}
                to={item.to}
                className="flex flex-col items-center gap-1"
                aria-label="Sell an item"
              >
                <span className="-mt-6 grid h-12 w-12 place-items-center rounded-full bg-forest-900 text-lime-300 shadow-lift ring-4 ring-cream transition active:scale-95">
                  <Icon className="h-5 w-5" strokeWidth={2.6} />
                </span>
                <span className="text-[10px] font-semibold text-forest-900/75">{item.label}</span>
              </Link>
            )
          }

          return (
            <Link
              key={item.to}
              to={item.to}
              className={`flex flex-col items-center gap-1 rounded-2xl py-1.5 transition ${
                active ? 'text-forest-950' : 'text-forest-900/70'
              }`}
            >
              <span
                className={`grid h-8 w-8 place-items-center rounded-full transition ${
                  active ? 'bg-lime-300' : 'bg-transparent'
                }`}
              >
                <Icon className="h-[18px] w-[18px]" strokeWidth={active ? 2.4 : 2} />
              </span>
              <span className="text-[10px] font-semibold">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
