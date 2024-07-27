'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { parseISO } from 'date-fns'
import { MapPin, Settings2 } from 'lucide-react'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

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
import { useUpdateTrip } from '@/hooks/trips'

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
  const updateTrip = useUpdateTrip()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { register, handleSubmit, control } = useForm<UpdateTripFormData>({
    resolver: zodResolver(updateTripFormSchema),
    defaultValues: {
      destination: trip.destination,
      dateRange: {
        from: parseISO(trip.starts_at),
        to: parseISO(trip.ends_at),
      },
    },
  })

  async function handleUpdateTrip({
    dateRange,
    destination,
  }: UpdateTripFormData) {
    const result = await updateTrip.mutateAsync({
      tripId: trip.id,
      endsAt: dateRange.to,
      startsAt: dateRange.from,
      destination,
    })

    if (result?.serverError) toast.error(result.serverError)
    else {
      toast.success('Viagem atualizada com sucesso')
      setIsDialogOpen(false)
    }
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
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
