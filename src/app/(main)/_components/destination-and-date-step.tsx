import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRight, MapPin, Settings2 } from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { useTripStore } from '@/stores/trip'

import { DatePickerWithRange } from './date-range-picker'

const destinationAndDateStepSchema = z.object({
  destination: z.string().min(3, { message: 'Mínimo de 3 caracteres' }),
  dateRange: z.object({
    from: z.date(),
    to: z.date(),
  }),
})

type DestinationAndDateStepData = z.infer<typeof destinationAndDateStepSchema>

interface GuestsInputProps {
  isGuestsInputOpen: boolean
  togleGuestsInput: () => void
}

export function DestinationAndDateStep({
  isGuestsInputOpen,
  togleGuestsInput,
}: GuestsInputProps) {
  const { destination, endsAt, startsAt } = useTripStore((state) => ({
    destination: state.destination,
    endsAt: state.endsAt,
    startsAt: state.startsAt,
  }))

  const { register, handleSubmit, control } =
    useForm<DestinationAndDateStepData>({
      resolver: zodResolver(destinationAndDateStepSchema),
      defaultValues: {
        destination: destination ?? '',
        dateRange: {
          from: startsAt,
          to: endsAt,
        },
      },
    })

  const { setDestinationAndDates } = useTripStore((state) => ({
    setDestinationAndDates: state.setDestinationAndDates,
  }))

  function onSubmit({ dateRange, destination }: DestinationAndDateStepData) {
    togleGuestsInput()
    setDestinationAndDates({
      destination,
      startsAt: dateRange.from,
      endsAt: dateRange.to,
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="md:h-16 bg-zinc-900 px-4 py-5 md:py-0 rounded-xl flex flex-col md:flex-row md:items-center md:shadow-shape gap-3">
        <div className="flex items-center gap-2 flex-1">
          <MapPin className="size-5 text-zinc-400" />
          <input
            {...register('destination')}
            type="text"
            disabled={isGuestsInputOpen}
            placeholder="Para onde você vai?"
            className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
          />
        </div>
        <div className="flex items-center">
          <Controller
            name="dateRange"
            control={control}
            render={({ field }) => (
              <DatePickerWithRange
                value={field.value}
                disabled={isGuestsInputOpen}
                onChangeValue={field.onChange}
              />
            )}
          />
        </div>
        <div className="w-px h-6 bg-zinc-800 md:block hidden" />

        {isGuestsInputOpen ? (
          <Button type="submit" variant={'secondary'}>
            Alterar local/data
            <Settings2 className="size-5" />
          </Button>
        ) : (
          <Button type="submit">
            Continuar
            <ArrowRight className="size-5" />
          </Button>
        )}
      </div>
    </form>
  )
}
