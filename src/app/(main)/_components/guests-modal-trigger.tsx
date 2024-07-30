'use client'

import { useMediaQuery } from '@uidotdev/usehooks'
import { UserRoundPlus } from 'lucide-react'
import { useState } from 'react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { useTripStore } from '@/stores/trip'

import { Guests } from './guests'
import { GuestsForm } from './guests-form'

export function GuestsModalTrigger() {
  const [isOpen, setIsOpen] = useState(false)
  const isDesktop = useMediaQuery('(min-width: 768px)')

  const { emailsToInvite } = useTripStore((state) => ({
    emailsToInvite: state.emailsToInvite,
  }))

  if (isDesktop) {
    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
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
        </DialogTrigger>
        <DialogContent className="w-[640px] shadow-shape space-y-3">
          <DialogHeader>
            <DialogTitle>Selecionar convidados</DialogTitle>
            <DialogDescription>
              Os convidados irão receber um convite no email para confirmar a
              participação na viagem.
            </DialogDescription>
          </DialogHeader>
          <Guests />

          <div className="w-full h-px bg-zinc-800" />

          <GuestsForm />
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
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
      </DrawerTrigger>
      <DrawerContent className="shadow-shape space-y-3 px-2.5 mb-8">
        <DrawerHeader className="gap-3">
          <DrawerTitle className="text-left">Selecionar convidados</DrawerTitle>
          <DrawerDescription className="text-left">
            Os convidados irão receber um convite no email para confirmar a
            participação na viagem.
          </DrawerDescription>
        </DrawerHeader>
        <Guests />

        <div className="h-px bg-zinc-800 mx-2.5" />

        <GuestsForm />
      </DrawerContent>
    </Drawer>
  )
}
