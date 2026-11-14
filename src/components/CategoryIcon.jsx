import {
  Bike,
  BookOpen,
  Lamp,
  Laptop,
  Shirt,
  Sparkles,
  Wand2,
} from 'lucide-react'

const map = {
  Laptop,
  Shirt,
  Bike,
  Sparkles,
  BookOpen,
  Wand2,
  Lamp,
}

export default function CategoryIcon({ name, className = 'h-5 w-5' }) {
  const Icon = map[name] || Sparkles
  return <Icon className={className} strokeWidth={1.8} />
}
