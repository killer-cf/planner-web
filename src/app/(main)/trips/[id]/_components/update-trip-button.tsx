'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { MapPin, Settings2 } from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

import { updateTrip } from '@/actions/update-trip'
import { DatePickerWithRange } from '@/app/(main)/_components/date-range-picker'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Trip } from '@/dtos/trip'

const updateTripFormSchema = z.object({
  destination: z.string(),
  dateRange: z.object({
    from: z.date(),
    to: z.date(),
  }),
})

type UpdateTripFormData = z.infer<typeof updateTripFormSchema>

interface UpdateTripButtonProps {
  trip: Trip
}

export function UpdateTripButton({ trip }: UpdateTripButtonProps) {
  const { register, handleSubmit, control } = useForm<UpdateTripFormData>({
    resolver: zodResolver(updateTripFormSchema),
    defaultValues: {
      destination: trip.destination,
      dateRange: {
        from: new Date(trip.starts_at),
        to: new Date(trip.ends_at),
      },
    },
  })

  async function handleUpdateTrip({
    dateRange,
    destination,
  }: UpdateTripFormData) {
    await updateTrip({
      tripId: trip.id,
      endsAt: dateRange.to,
      startsAt: dateRange.from,
      destination,
    })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={'secondary'}>
          Alterar local/data
          <Settings2 className="size-5" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Informações da viagem</DialogTitle>
          <DialogDescription>
            Você pode alterar o local e a data da viagem a qualquer momento.
          </DialogDescription>
        </DialogHeader>
        <form className="space-y-3" onSubmit={handleSubmit(handleUpdateTrip)}>
          <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
            <MapPin className="text-zinc-400 size-5" />
            <input
              {...register('destination')}
              className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
            />
          </div>

          <div className="h-14 flex-1 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
            <Controller
              name="dateRange"
              control={control}
              render={({ field }) => (
                <DatePickerWithRange
                  value={field.value}
                  onChangeValue={field.onChange}
                />
              )}
            />
          </div>

          <Button size={'full'}>Salvar alterações</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
