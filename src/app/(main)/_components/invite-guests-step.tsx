'use client'

import { DialogDescription } from '@radix-ui/react-dialog'
import { ArrowRight, UserRoundPlus } from 'lucide-react'
import { useState } from 'react'

import { ModalDrawer } from '@/components/modal-drawer'
import { Button } from '@/components/ui/button'
import { useTripStore } from '@/stores/trip'
import { formatDateRange } from '@/utils/format-date-range'

import { ConfirmTripForm } from './confitrm-trip-form'
import { Guests } from './guests'
import { GuestsForm } from './guests-form'

export function InviteGuestsStep() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)
  const { emailsToInvite, destination, endsAt, startsAt } = useTripStore(
    (state) => ({
      emailsToInvite: state.emailsToInvite,
      destination: state.destination,
      endsAt: state.endsAt,
      startsAt: state.startsAt,
    }),
  )

  return (
    <div className="md:h-16 bg-zinc-900 md:py-0 py-5 px-4 rounded-xl flex md:flex-row flex-col md:items-center md:shadow-shape md:gap-3 gap-5">
      <ModalDrawer
        title="Selecionar convidados"
        description="Os convidados irão receber um convite no email para confirmar a participação na viagem."
        open={isModalOpen}
        onChangeOpen={setIsModalOpen}
        content={
          <>
            <Guests />
            <div className="w-full h-px bg-zinc-800" />
            <GuestsForm />
          </>
        }
      >
        <button
          type="button"
          className="flex items-center gap-2 flex-1 text-left"
        >
          <UserRoundPlus className="size-5 text-zinc-400" />
          {emailsToInvite.length > 0 ? (
            <span className="text-zinc-100 text-lg flex-1">
              {emailsToInvite.length} pessoa(s) convidada(s)
            </span>
          ) : (
            <span className="text-zinc-400 text-lg flex-1">
              Quem estará na viagem?
            </span>
          )}
        </button>
      </ModalDrawer>
      <div className="w-px h-6 bg-zinc-800 md:block hidden" />
      <ModalDrawer
        title="Confirmar criação de viagem"
        description={
          <DialogDescription>
            Para concluir a criação da viagem para{' '}
            <span className="font-semibold text-zinc-100">{destination}</span>{' '}
            nas datas de{' '}
            <span className="font-semibold text-zinc-100">
              {formatDateRange(startsAt.toISOString(), endsAt.toISOString())}
            </span>{' '}
            preencha seus dados abaixo:
          </DialogDescription>
        }
        open={isConfirmModalOpen}
        onChangeOpen={setIsConfirmModalOpen}
        content={<ConfirmTripForm />}
      >
        <Button>
          Confirmar viagem
          <ArrowRight className="size-5" />
        </Button>
      </ModalDrawer>
    </div>
  )
}
