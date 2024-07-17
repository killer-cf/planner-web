import { CircleCheck, CircleDashed } from 'lucide-react'

import { listTripParticipants } from '@/actions/list-trip-participants'

import { GuestButtonAndModal } from './guest-button-and-modal'

interface GuestsProps {
  tripId: string
}

export async function Guests({ tripId }: GuestsProps) {
  const result = await listTripParticipants({ tripId })

  if (!result?.data) return null

  return (
    <div className="space-y-6">
      <h2 className="font-semibold text-xl">Convidados</h2>

      <div className="space-y-5">
        {result.data.participants.map((participant) => (
          <div
            key={participant.id}
            className="flex items-center justify-between gap-4"
          >
            <div className="space-y-1.5">
              <span className="block font-medium text-zinc-100">
                {participant.name}
              </span>
              <span className="block text-sm text-zinc-400 truncate">
                {participant.email}
              </span>
            </div>

            {participant.is_confirmed ? (
              <CircleCheck className="text-lime-300 size-5 shrink-0" />
            ) : (
              <CircleDashed className="text-zinc-400 size-5 shrink-0" />
            )}
          </div>
        ))}
        {result.data.participants.length === 0 && (
          <p className="text-zinc-400">Nenhum convidado adicionado</p>
        )}
      </div>

      <GuestButtonAndModal tripId={tripId} />
    </div>
  )
}
