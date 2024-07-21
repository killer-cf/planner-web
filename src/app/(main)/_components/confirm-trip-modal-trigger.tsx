'use client'

import { useUser } from '@clerk/nextjs'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRight, Mail, User } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { createTrip } from '@/actions/create-trip'
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
import { formatDateRange } from '@/utils/format-date-range'

const confirmTripSchema = z.object({
  ownerName: z.string(),
  ownerEmail: z.string().email(),
})

type ConfirmTripData = z.infer<typeof confirmTripSchema>

export function ConfirmTripModalTrigger() {
  const router = useRouter()
  const { user, isLoaded, isSignedIn } = useUser()

  const { destination, endsAt, startsAt, emailsToInvite, reset } = useTripStore(
    (state) => ({
      destination: state.destination,
      endsAt: state.endsAt,
      startsAt: state.startsAt,
      emailsToInvite: state.emailsToInvite,
      reset: state.clearState,
    }),
  )

  const { register, handleSubmit } = useForm<ConfirmTripData>({
    resolver: zodResolver(confirmTripSchema),
    defaultValues: {
      ownerEmail: user?.emailAddresses[0].emailAddress ?? '',
      ownerName: user?.fullName ?? '',
    },
  })

  async function onCreateTrip({ ownerEmail, ownerName }: ConfirmTripData) {
    if (!isLoaded) return

    const searchParams = new URLSearchParams()
    searchParams.set('email', ownerEmail)
    searchParams.set('firstName', ownerName.split(' ')[0])
    searchParams.set('lastName', ownerName.split(' ')[1])

    if (!isSignedIn) {
      router.push(`/sign-in?${searchParams.toString()}`)
      return
    }

    const result = await createTrip({
      destination,
      startsAt,
      endsAt,
      ownerEmail,
      ownerName,
      emailsToInvite,
    })

    if (result?.serverError) toast.error(result.serverError)

    if (result?.data) {
      toast.success('Viagem criada com sucesso!')
      router.push(`/trips/${result.data.tripId}`)
      reset()
    }
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
              {formatDateRange(startsAt.toISOString(), endsAt.toISOString())}
            </span>{' '}
            preencha seus dados abaixo:
          </DialogDescription>
        </DialogHeader>

        <form className="space-y-3" onSubmit={handleSubmit(onCreateTrip)}>
          <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
            <User className="text-zinc-400 size-5" />
            <input
              {...register('ownerName')}
              type="text"
              disabled={!!user}
              placeholder="Seu nome completo"
              className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
            />
          </div>

          <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
            <Mail className="text-zinc-400 size-5" />
            <input
              {...register('ownerEmail')}
              type="email"
              disabled={!!user}
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
