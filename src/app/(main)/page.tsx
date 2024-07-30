'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

import { useTripStore } from '@/stores/trip'

import { DestinationAndDateStep } from './_components/destination-and-date-step'
import { InviteGuestsStep } from './_components/invite-guests-step'

export default function Home() {
  const { destination, endsAt, startsAt } = useTripStore((state) => ({
    destination: state.destination,
    endsAt: state.endsAt,
    startsAt: state.startsAt,
  }))
  const [isGuestsInputOpen, setIsGuestsInputOpen] = useState(
    !!(destination && startsAt && endsAt),
  )

  function togleGuestInput() {
    setIsGuestsInputOpen(!isGuestsInputOpen)
  }

  return (
    <div className="h-screen flex items-center justify-center bg-pattern bg-no-repeat bg-center">
      <div className="max-w-xl md:max-w-3xl w-full px-6 space-y-10 text-center">
        <div className="flex flex-col items-center gap-3">
          <Image src="/logo.svg" alt="Plann.er" width={200} height={200} />
          <p className="text-lg text-zinc-300">
            Convide seus amigos e planeje sua próxima viagem!
          </p>
        </div>

        <div className="md:space-y-4 md:bg-inherit bg-zinc-900 rounded-xl shadow-shape md:shadow-none">
          <DestinationAndDateStep
            isGuestsInputOpen={isGuestsInputOpen}
            togleGuestsInput={togleGuestInput}
          />

          <div className="mx-4 h-px bg-zinc-800 md:hidden" />

          {isGuestsInputOpen && <InviteGuestsStep />}
        </div>

        <p className="text-zinc-500">
          Ao planejar sua viagem pelo plann.er você automaticamente concorda{' '}
          <br /> com nossos{' '}
          <Link className="text-zinc-300 underline" href={'#'}>
            termos de uso
          </Link>{' '}
          e{' '}
          <Link className="text-zinc-300 underline" href={'#'}>
            políticas de privacidade.
          </Link>
        </p>
      </div>
    </div>
  )
}
