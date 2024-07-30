'use client'

import { useMediaQuery } from '@uidotdev/usehooks'
import { ArrowRight } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
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
import { formatDateRange } from '@/utils/format-date-range'

import { ConfirmTripForm } from './confitrm-trip-form'

export function ConfirmTripModalTrigger() {
  const [isOpen, setIsOpen] = useState(false)
  const { destination, endsAt, startsAt } = useTripStore((state) => ({
    destination: state.destination,
    endsAt: state.endsAt,
    startsAt: state.startsAt,
  }))
  const isDesktop = useMediaQuery('(min-width: 768px)')

  if (isDesktop) {
    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button>
            Confirmar viagem
            <ArrowRight className="size-5" />
          </Button>
        </DialogTrigger>
        <DialogContent className="shadow-shape space-y-3">
          <DialogHeader className="px-2.5">
            <DialogTitle className="text-xl">
              Confirmar criação de viagem
            </DialogTitle>
            <DialogDescription>
              Para concluir a criação da viagem para{' '}
              <span className="font-semibold text-zinc-100">{destination}</span>{' '}
              nas datas de{' '}
              <span className="font-semibold text-zinc-100">
                {formatDateRange(startsAt.toISOString(), endsAt.toISOString())}
              </span>{' '}
              preencha seus dados abaixo:
            </DialogDescription>
          </DialogHeader>

          <ConfirmTripForm />
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <Button>
          Confirmar viagem
          <ArrowRight className="size-5" />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="shadow-shape space-y-3 px-2.5 mb-8">
        <DrawerHeader className="gap-3 ">
          <DrawerTitle className="text-left">
            Confirmar criação de viagem
          </DrawerTitle>
          <DrawerDescription className="text-left">
            Para concluir a criação da viagem para{' '}
            <span className="font-semibold text-zinc-100">{destination}</span>{' '}
            nas datas de{' '}
            <span className="font-semibold text-zinc-100">
              {formatDateRange(startsAt.toISOString(), endsAt.toISOString())}
            </span>{' '}
            preencha seus dados abaixo:
          </DrawerDescription>
        </DrawerHeader>

        <ConfirmTripForm />
      </DrawerContent>
    </Drawer>
  )
}
