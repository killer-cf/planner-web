import { UserButton } from '@clerk/nextjs'
import { Calendar, MapPin } from 'lucide-react'

import { Trip } from '@/dtos/trip'
import { formatDateRange } from '@/utils/format-date-range'

import { UpdateTripButton } from './update-trip-button'

interface Props {
  trip?: Trip
}

export function DestinationAndDateHeader({ trip }: Props) {
  if (!trip) {
    return null
  }

  return (
    <div className="px-4 h-16 rounded-xl bg-zinc-900 shadow-shape flex items-center justify-between">
      <div className="flex items-center gap-2">
        <MapPin className="size-5 text-zinc-400" />
        <span className="text-zinc-100">{trip.destination}</span>
      </div>

      <div className="flex items-center gap-5">
        <div className="flex items-center gap-2">
          <Calendar className="size-5 text-zinc-400" />
          <span className="text-zinc-100">
            {formatDateRange(trip.starts_at, trip.ends_at)}
          </span>
        </div>

        <div className="w-px h-6 bg-zinc-800" />

        <UpdateTripButton trip={trip} />
        <UserButton />
      </div>
    </div>
  )
}
