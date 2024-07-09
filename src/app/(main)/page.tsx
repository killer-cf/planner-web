'use client'

import { MapPin, Calendar, Settings2, ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { useState } from 'react'

import { GuestsModalTrigger } from './_components/guests-modal-trigger'
import { ConfirmTripModalTrigger } from './_components/confirm-trip-modal-trigger'

export default function Home() {
  const [isGuestsInputOpen, setIsGuestsInputOpen] = useState(false)

  function openGuestsInput() {
    setIsGuestsInputOpen(true)
  }

  function closeGuestsInput() {
    setIsGuestsInputOpen(false)
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
          <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">
            <div className="flex items-center gap-2 flex-1">
              <MapPin className="size-5 text-zinc-400" />
              <input
                type="text"
                disabled={isGuestsInputOpen}
                placeholder="Para onde você vai?"
                className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
              />
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="size-5 text-zinc-400" />
              <input
                type="text"
                disabled={isGuestsInputOpen}
                placeholder="Quando?"
                className="bg-transparent text-lg placeholder-zinc-400 w-40 outline-none"
              />
            </div>
            <div className="w-px h-6 bg-zinc-800" />

            {isGuestsInputOpen ? (
              <button
                onClick={closeGuestsInput}
                className="bg-zinc-800 text-zinc-200 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-zinc-700"
              >
                Alterar local/data
                <Settings2 className="size-5" />
              </button>
            ) : (
              <button
                onClick={openGuestsInput}
                className="bg-lime-300 text-lime-950 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-lime-400"
              >
                Continuar
                <ArrowRight className="size-5" />
              </button>
            )}
          </div>

          {isGuestsInputOpen && (
            <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">
              <GuestsModalTrigger />

              <div className="w-px h-6 bg-zinc-800" />

              <ConfirmTripModalTrigger />
            </div>
          )}
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
