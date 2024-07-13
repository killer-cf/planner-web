'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

import { DestinationAndDateStep } from './_components/destination-and-date-step'
import { InviteGuestsStep } from './_components/invite-guests-step'

export default function Home() {
  const [isGuestsInputOpen, setIsGuestsInputOpen] = useState(false)

  function togleGuestInput() {
    setIsGuestsInputOpen(!isGuestsInputOpen)
  }

  return (
    <div className="h-screen flex items-center justify-center bg-pattern bg-no-repeat bg-center">
      <div className="max-w-3xl w-full px-6 space-y-10 text-center">
        <div className="flex flex-col items-center gap-3">
          <Image src="/logo.svg" alt="Plann.er" width={200} height={200} />
          <p className="text-lg text-zinc-300">
            Convide seus amigos e planeje sua próxima viagem!
          </p>
        </div>

        <div className="space-y-4">
          <DestinationAndDateStep
            isGuestsInputOpen={isGuestsInputOpen}
            togleGuestsInput={togleGuestInput}
          />

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
            políticas de provacidade.
          </Link>
        </p>
      </div>
    </div>
  )
}
