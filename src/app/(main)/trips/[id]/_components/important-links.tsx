import { Link2, Plus } from 'lucide-react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'

export function ImportantLinks() {
  return (
    <div className="space-y-6">
      <h2 className="font-semibold text-xl">Links importantes</h2>

      <div className="space-y-5">
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-1.5">
            <span className="block font-medium text-zinc-100">
              Reserva do AirBnB
            </span>
            <Link
              href={'#'}
              className="block text-xs text-zinc-400 truncate hover:text-zinc-200"
            >
              https://airbnb.com.br/rooms/12345654654646545646546546354654564
            </Link>
          </div>
          <Link2 className="size-5 text-zinc-400 shrink-0" />
        </div>

        <div className="flex items-center justify-between gap-4">
          <div className="space-y-1.5">
            <span className="block font-medium text-zinc-100">
              Reserva do AirBnB
            </span>
            <Link
              href={'#'}
              className="block text-xs text-zinc-400 truncate hover:text-zinc-200"
            >
              https://airbnb.com.br/rooms/12345654654646545646546546354654564
            </Link>
          </div>
          <Link2 className="size-5 text-zinc-400 shrink-0" />
        </div>
      </div>

      <Button variant={'secondary'} size={'full'}>
        <Plus className="size-5" />
        Cadatrar novo link
      </Button>
    </div>
  )
}
