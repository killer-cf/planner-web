'use client'

import { UserButton } from '@clerk/nextjs'
import { useMediaQuery } from '@uidotdev/usehooks'
import { Calendar, MapPin, Menu } from 'lucide-react'
import { useEffect } from 'react'

import { Button } from '@/components/ui/button'
import { useGetTrip } from '@/hooks/trips'
import { useCurrentTripStore } from '@/stores/current-trip'
import { formatDateRange } from '@/utils/format-date-range'

import { UpdateTripButton } from '../update-trip-button'

interface Props {
  tripId: string
}

export function HeaderClient({ tripId }: Props) {
  const { data } = useGetTrip({ tripId })
  const isDesktop = useMediaQuery('(min-width: 768px)')

  const { setCurrentTrip } = useCurrentTripStore((state) => ({
    setCurrentTrip: state.setCurrentTrip,
  }))

  useEffect(() => {
    if (!data?.data?.trip) {
      return
    }
    setCurrentTrip(data?.data?.trip)
  }, [data?.data?.trip, setCurrentTrip])

  if (!data?.data) {
    return null
  }

  return (
    <div className="md:px-4 px-3 h-16 rounded-xl bg-zinc-900 shadow-shape flex items-center justify-between">
      <div className="flex items-center gap-2">
        <MapPin className="size-5 text-zinc-400" />
        <span className="text-zinc-100">{data.data.trip.destination}</span>
      </div>

      <div className="flex items-center md:gap-5 gap-2">
        <div className="flex items-center gap-2">
          <Calendar className="size-5 text-zinc-400 hidden md:block" />
          <span className="text-zinc-100">
            {formatDateRange(
              data.data.trip.starts_at,
              data.data.trip.ends_at,
              !isDesktop,
            )}
          </span>
        </div>

        <div className="md:items-center gap-5 hidden md:flex">
          <div className="w-px h-6 bg-zinc-800" />

          <UpdateTripButton trip={data.data.trip} />

          <UserButton />
        </div>

        <Button variant="secondary" className="md:hidden" size={'icon2'}>
          <Menu className="size-5" />
        </Button>
      </div>
    </div>
  )
}
