import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import {
  defaultUser,
  products as seedProducts,
  seedUserListings,
} from '../data/market'

const AppContext = createContext(null)

const readStorage = (key, fallback) => {
  try {
    const raw = window.localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

export function AppProvider({ children }) {
  const [saved, setSaved] = useState(() => readStorage('cm_saved', ['p1', 'p9']))
  const [userListings, setUserListings] = useState(() =>
    readStorage('cm_listings', seedUserListings)
  )

  useEffect(() => {
    try {
      window.localStorage.setItem('cm_saved', JSON.stringify(saved))
    } catch {
      /* storage unavailable */
    }
  }, [saved])

  useEffect(() => {
    try {
      window.localStorage.setItem('cm_listings', JSON.stringify(userListings))
    } catch {
      /* storage unavailable */
    }
  }, [userListings])

  const allProducts = useMemo(
    () => [...userListings, ...seedProducts],
    [userListings]
  )

  const toggleSaved = (id) => {
    const isSaved = saved.includes(id)
    setSaved(isSaved ? saved.filter((item) => item !== id) : [...saved, id])
    return !isSaved
  }

  const addListing = (listing) => setUserListings((prev) => [listing, ...prev])

  const removeListing = (id) =>
    setUserListings((prev) => prev.filter((listing) => listing.id !== id))

  const value = {
    user: defaultUser,
    saved,
    savedProducts: allProducts.filter((product) => saved.includes(product.id)),
    userListings,
    allProducts,
    toggleSaved,
    addListing,
    removeListing,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const context = useContext(AppContext)
  if (!context) throw new Error('useApp must be used within AppProvider')
  return context
}
