import { Link } from 'react-router-dom'
import { Compass, Home, Search } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="container-x flex min-h-[65vh] flex-col items-center justify-center py-16 text-center">
      <span className="grid h-16 w-16 place-items-center rounded-3xl bg-lime-300 text-forest-950 shadow-soft">
        <Compass className="h-7 w-7" />
      </span>
      <p className="mt-6 font-display text-[clamp(3.5rem,10vw,6rem)] font-semibold leading-none tracking-tight text-forest-950">
        404
      </p>
      <h1 className="mt-2 font-display text-2xl font-semibold text-forest-950">
        This aisle doesn't exist.
      </h1>
      <p className="mt-2 max-w-sm text-sm leading-relaxed text-forest-900/70">
        The page may have moved, or the listing was sold. Let's get you back to something useful.
      </p>
      <div className="mt-7 flex flex-wrap justify-center gap-2">
        <Link to="/" className="btn btn-primary h-11 px-5">
          <Home className="h-4 w-4" /> Back home
        </Link>
        <Link to="/browse" className="btn btn-ghost h-11 px-5">
          <Search className="h-4 w-4" /> Browse listings
        </Link>
      </div>
    </div>
  )
}
