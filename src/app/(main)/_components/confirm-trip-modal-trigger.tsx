'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { format, isSameMonth } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { ArrowRight, Mail, User } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useTripStore } from '@/stores/trip'

const confirmTripSchema = z.object({
  ownerName: z.string(),
  ownerEmail: z.string().email(),
})

type ConfirmTripData = z.infer<typeof confirmTripSchema>

export function ConfirmTripModalTrigger() {
  const router = useRouter()

  const { destination, endsAt, startsAt } = useTripStore((state) => ({
    destination: state.destination,
    endsAt: state.endsAt,
    startsAt: state.startsAt,
  }))

  const { register, handleSubmit } = useForm<ConfirmTripData>({
    resolver: zodResolver(confirmTripSchema),
  })

  const formatDateRange = useCallback((startDate: Date, endDate: Date) => {
    if (isSameMonth(startDate, endDate)) {
      if (format(startDate, 'd') === format(endDate, 'd')) {
        return `${format(startDate, 'd')} de ${format(startDate, 'MMMM', { locale: ptBR })} de ${format(startDate, 'yyyy')}`
      }
      return `${format(startDate, 'd')} a ${format(endDate, 'd')} de ${format(startDate, 'MMMM', { locale: ptBR })} de ${format(startDate, 'yyyy')}`
    } else {
      return `${format(startDate, 'd')} de ${format(startDate, 'MMMM')} a ${format(endDate, 'd')} de ${format(endDate, 'MMMM', { locale: ptBR })} de ${format(endDate, 'yyyy')}`
    }
  }, [])

  function createTrip({ ownerEmail, ownerName }: ConfirmTripData) {
    console.log(ownerName, ownerEmail)
    // router.push('/trips/123')
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          Confirmar viagem
          <ArrowRight className="size-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[640px] shadow-shape space-y-3">
        <DialogHeader>
          <DialogTitle>Confirmar criação de viagem</DialogTitle>
          <DialogDescription>
            Para concluir a criação da viagem para{' '}
            <span className="font-semibold text-zinc-100">{destination}</span>{' '}
            nas datas de{' '}
            <span className="font-semibold text-zinc-100">
              {formatDateRange(startsAt, endsAt)}
            </span>{' '}
            preencha seus dados abaixo:
          </DialogDescription>
        </DialogHeader>

        <form className="space-y-3" onSubmit={handleSubmit(createTrip)}>
          <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
            <User className="text-zinc-400 size-5" />
            <input
              {...register('ownerName')}
              type="text"
              placeholder="Seu nome completo"
              className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
            />
          </div>

          <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
            <Mail className="text-zinc-400 size-5" />
            <input
              {...register('ownerEmail')}
              type="email"
              placeholder="Seu e-mail pessoal"
              className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
            />
          </div>

          <Button type="submit" size={'full'}>
            Confirmar criação da viagem
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
