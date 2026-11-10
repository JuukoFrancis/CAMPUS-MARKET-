import { avatarPalette, cn, initials } from '../lib/utils'

const sizes = {
  xs: 'h-6 w-6 text-[9px]',
  sm: 'h-8 w-8 text-[10px]',
  md: 'h-10 w-10 text-xs',
  lg: 'h-14 w-14 text-base',
  xl: 'h-20 w-20 text-xl',
  '2xl': 'h-28 w-28 text-3xl',
}

export default function Avatar({ name = '', size = 'md', className, ring = true }) {
  return (
    <div
      className={cn(
        'grid shrink-0 place-items-center rounded-full font-bold tracking-wide text-white',
        sizes[size],
        ring && 'ring-2 ring-white/80',
        className
      )}
      style={{ backgroundImage: avatarPalette(name) }}
      aria-hidden="true"
    >
      {initials(name)}
    </div>
  )
}
