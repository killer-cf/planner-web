import { Calendar, MapPin, Settings2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Trip } from '@/dtos/trip'

interface Props {
  trip?: Trip
}

export function DestinationAndDateHeader({ trip }: Props) {
  return (
    <div className="px-4 h-16 rounded-xl bg-zinc-900 shadow-shape flex items-center justify-between">
      <div className="flex items-center gap-2">
        <MapPin className="size-5 text-zinc-400" />
        {trip ? (
          <span className="text-zinc-100">{trip.destination}</span>
        ) : (
          <Skeleton className="w-40 h-5 " />
        )}
      </div>

      <div className="flex items-center gap-5">
        <div className="flex items-center gap-2">
          <Calendar className="size-5 text-zinc-400" />

          {trip ? (
            <span className="text-zinc-100">{trip.starts_at}</span>
          ) : (
            <Skeleton className="w-32 h-5" />
          )}
        </div>

        <div className="w-px h-6 bg-zinc-800" />

        <Button variant={'secondary'}>
          Alterar local/data
          <Settings2 className="size-5" />
        </Button>
      </div>
    </div>
  )
}
