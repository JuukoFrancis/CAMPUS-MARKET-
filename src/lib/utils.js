export const cn = (...classes) => classes.filter(Boolean).join(' ')

export const formatUGX = (amount) =>
  `UGX ${new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(
    Number(amount) || 0
  )}`

export const compactUGX = (amount) => {
  const n = Number(amount) || 0
  if (n >= 1_000_000) return `UGX ${(n / 1_000_000).toFixed(1).replace('.0', '')}M`
  if (n >= 1_000) return `UGX ${Math.round(n / 1_000)}k`
  return `UGX ${n}`
}

export const initials = (name = '') =>
  name
    .split(' ')
    .filter(Boolean)
    .map((word) => word[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

export const commission = (price, rate = 0.05) => Math.round(Number(price) * rate)

export const orderRef = () =>
  `CM-${Math.random().toString(36).slice(2, 6).toUpperCase()}${Math.floor(
    Math.random() * 90 + 10
  )}`

export const avatarPalette = (name = '') => {
  const palettes = [
    ['#237C4B', '#0B1F16'],
    ['#F2B34B', '#FF7A59'],
    ['#B5D62F', '#237C4B'],
    ['#3E8E7E', '#123A25'],
    ['#C08552', '#5B3A29'],
    ['#7C6BC4', '#2D2551'],
    ['#E07A5F', '#7A2E1D'],
    ['#5B8E7D', '#1B4332'],
  ]
  let hash = 0
  for (let i = 0; i < name.length; i += 1) hash = name.charCodeAt(i) + ((hash << 5) - hash)
  const [from, to] = palettes[Math.abs(hash) % palettes.length]
  return `linear-gradient(135deg, ${from}, ${to})`
}

export const clamp = (value, min, max) => Math.min(Math.max(value, min), max)
