'use client'

import { CircleCheck, CircleDashed, UserCog } from 'lucide-react'

import { ModalDrawer } from '@/components/modal-drawer'
import { Button } from '@/components/ui/button'
import { useListParticipants } from '@/hooks/guests'

import { GuestsForm } from './guests-form'

interface GuestsProps {
  tripId: string
}

export function GuestsClient({ tripId }: GuestsProps) {
  const { data } = useListParticipants({ tripId })

  if (!data?.data) return null

  return (
    <div className="space-y-6">
      <h2 className="font-semibold text-xl">Convidados</h2>

      <div className="space-y-5">
        {data.data.participants.map((participant) => (
          <div
            key={participant.id}
            className="flex items-center justify-between gap-4"
          >
            <div className="space-y-1.5">
              <span className="block font-medium text-zinc-100">
                {participant.user?.name ?? ''}
              </span>
              <span className="block text-sm text-zinc-400 truncate">
                {participant.user?.email ?? participant.email}
              </span>
            </div>

            {participant.is_confirmed ? (
              <CircleCheck className="text-lime-300 size-5 shrink-0" />
            ) : (
              <CircleDashed className="text-zinc-400 size-5 shrink-0" />
            )}
          </div>
        ))}
        {data.data.participants.length === 0 && (
          <p className="text-zinc-400">Nenhum convidado adicionado</p>
        )}
      </div>

      <ModalDrawer
        title="Adicionar novo participante"
        description="Adicione um novo participante ao grupo de viagem"
        form={GuestsForm}
      >
        <Button variant={'secondary'} size={'full'}>
          <UserCog className="size-5" />
          Gerenciar convidados
        </Button>
      </ModalDrawer>
    </div>
  )
}
