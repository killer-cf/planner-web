'use client'

import { CalendarRange, Info } from 'lucide-react'
import { usePathname } from 'next/navigation'

import { Button } from '@/components/ui/button'

export function NavBottom() {
  const pathname = usePathname()
  const isTrip = pathname.includes('trips') && !pathname.includes('details')
  const isDetails = pathname.includes('details') && pathname.includes('trips')

  return (
    <nav className="md:hidden px-3 h-16 rounded-xl bg-zinc-900 items-center shadow-shape flex gap-2 fixed bottom-4 right-5 left-5">
      <Button className="flex-1" variant={isTrip ? 'default' : 'secondary'}>
        <CalendarRange className="size-5" />
        <span>Atividades</span>
      </Button>
      <Button variant={isDetails ? 'default' : 'secondary'} className="flex-1">
        <Info className="size-5" />
        <span>Detalhes</span>
      </Button>
    </nav>
  )
}
