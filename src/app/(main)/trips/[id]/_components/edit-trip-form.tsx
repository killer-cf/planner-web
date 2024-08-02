'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { parseISO } from 'date-fns'
import { MapPin } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { DatePickerWithRange } from '@/app/(main)/_components/date-range-picker'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useUpdateTrip } from '@/hooks/trips'
import { useCurrentTripStore } from '@/stores/current-trip'

const updateTripFormSchema = z.object({
  destination: z
    .string()
    .min(4, { message: 'Destino deve conter no mínimo 4 caracteres' }),
  dateRange: z.object({
    from: z.date(),
    to: z.date(),
  }),
})

type UpdateTripFormData = z.infer<typeof updateTripFormSchema>

interface EditTripFormProps {
  closeModal: () => void
}

export function EditTripForm({ closeModal }: EditTripFormProps) {
  const { trip } = useCurrentTripStore((state) => ({
    trip: state.trip,
  }))
  const updateTrip = useUpdateTrip()
  const form = useForm<UpdateTripFormData>({
    mode: 'onChange',
    resolver: zodResolver(updateTripFormSchema),
    defaultValues: {
      destination: trip.destination,
      dateRange: {
        from: parseISO(trip.starts_at),
        to: parseISO(trip.ends_at),
      },
    },
  })

  const {
    formState: { isSubmitting, isValid },
  } = form

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
      closeModal()
    }
  }

  return (
    <Form {...form}>
      <form
        className="space-y-3"
        onSubmit={form.handleSubmit(handleUpdateTrip)}
      >
        <FormField
          control={form.control}
          name="destination"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  isInvalid={fieldState.invalid}
                  icon={MapPin}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="dateRange"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="h-14 flex-1 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
                  <DatePickerWithRange
                    value={field.value}
                    onChangeValue={field.onChange}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isSubmitting || !isValid} size={'full'}>
          Salvar alterações
        </Button>
      </form>
    </Form>
  )
}
