import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Toaster } from 'sonner'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import BottomNav from './components/BottomNav'
import Landing from './pages/Landing'
import Browse from './pages/Browse'
import ProductDetail from './pages/ProductDetail'
import Sell from './pages/Sell'
import Messages from './pages/Messages'
import Saved from './pages/Saved'
import Profile from './pages/Profile'
import NotFound from './pages/NotFound'

function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const target = document.getElementById(hash.slice(1))
      if (target) {
        const timer = setTimeout(
          () => target.scrollIntoView({ behavior: 'smooth', block: 'start' }),
          120
        )
        return () => clearTimeout(timer)
      }
    }
    window.scrollTo({ top: 0, behavior: 'auto' })
    return undefined
  }, [pathname, hash])

  return null
}

export default function App() {
  const location = useLocation()

  return (
    <div className="flex min-h-screen flex-col">
      <ScrollToTop />
      <Navbar />

      <main className="flex-1">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <Routes location={location}>
              <Route path="/" element={<Landing />} />
              <Route path="/browse" element={<Browse />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/sell" element={<Sell />} />
              <Route path="/messages" element={<Messages />} />
              <Route path="/saved" element={<Saved />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>

      <div className="pb-24 md:pb-0">
        <Footer />
      </div>
      <BottomNav />

      <Toaster
        position="top-center"
        offset={86}
        closeButton
        richColors
        toastOptions={{
          style: {
            borderRadius: '18px',
            fontFamily: '"Plus Jakarta Sans", sans-serif',
          },
        }}
      />
    </div>
  )
}
