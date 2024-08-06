'use client'

import { UserButton } from '@clerk/nextjs'
import { Calendar, MapPin, Settings2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useMediaQuery } from 'usehooks-ts'

import { ModalDrawer } from '@/components/modal-drawer'
import { Button } from '@/components/ui/button'
import { useGetTrip } from '@/hooks/trips'
import { useCurrentTripStore } from '@/stores/current-trip'
import { formatDateRange } from '@/utils/format-date-range'

import { EditTripForm } from '../edit-trip-form'
import { HeaderSheet } from './header-sheet'

interface Props {
  tripId: string
  isParticipantOwner: boolean
}

export function HeaderClient({ tripId, isParticipantOwner }: Props) {
  const [isEditTripModalOpen, setIsEditTripModalOpen] = useState(false)
  const { data } = useGetTrip({ tripId })
  const isDesktop = useMediaQuery('(min-width: 768px)')

  const { setCurrentTrip } = useCurrentTripStore((state) => ({
    setCurrentTrip: state.setCurrentTrip,
  }))

  function closeModal() {
    setIsEditTripModalOpen(false)
  }

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

          {isParticipantOwner && (
            <ModalDrawer
              title="Informações da viagem"
              description="Você pode alterar o local e a data da viagem a qualquer momento."
              content={<EditTripForm closeModal={closeModal} />}
              open={isEditTripModalOpen}
              onChangeOpen={setIsEditTripModalOpen}
            >
              <Button variant={'secondary'}>
                <p className="hidden md:block">Alterar local/data</p>
                <Settings2 className="size-5" />
              </Button>
            </ModalDrawer>
          )}

          <UserButton />
        </div>

        <HeaderSheet isParticipantOwner={isParticipantOwner} />
      </div>
    </div>
  )
}
