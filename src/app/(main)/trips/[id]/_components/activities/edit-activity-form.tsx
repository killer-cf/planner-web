'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { parseAbsoluteToLocal } from '@internationalized/date'
import { DateInput } from '@nextui-org/date-input'
import { parseISO } from 'date-fns'
import { Calendar, Tag, Trash } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Activity,
  ActivityFormData,
  loadActivityFormSchema,
} from '@/dtos/activity'
import { useDeleteActivity, useUpdateActivity } from '@/hooks/activity'
import { useCurrentTripStore } from '@/stores/current-trip'

interface EditActivityModalProps {
  activity: Activity
  closeModal: () => void
}

export function EditActivityModal({
  activity,
  closeModal,
}: EditActivityModalProps) {
  const { trip } = useCurrentTripStore((state) => ({
    trip: state.trip,
  }))
  const updateActivity = useUpdateActivity()
  const deleteActivity = useDeleteActivity()
  const form = useForm<ActivityFormData>({
    mode: 'onChange',
    resolver: zodResolver(loadActivityFormSchema(trip)),
    defaultValues: {
      title: activity.title,
      occursAt: parseISO(activity.occurs_at),
    },
  })
  const {
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = form

  async function handleEditActivity(data: ActivityFormData) {
    const result = await updateActivity.mutateAsync({
      activityId: activity.id,
      ...data,
    })

    if (!result?.serverError) {
      toast.success('Atividade editada com sucesso!')
      closeModal()
    }

    if (result?.serverError) {
      toast.error(result.serverError)
    }
  }

  async function handleDeleteActivity() {
    const result = await deleteActivity.mutateAsync({
      activityId: activity.id,
    })

    if (!result?.serverError) {
      toast.success('Atividade excluída com sucesso!')
      closeModal()
    }

    if (result?.serverError) {
      toast.error(result.serverError)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(handleEditActivity)} className="space-y-3">
        <FormField
          control={form.control}
          name="title"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  isInvalid={fieldState.invalid}
                  icon={Tag}
                  placeholder="Qual a atividade?"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="occursAt"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormControl>
                <div
                  className={`h-14 flex-1 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2 ${fieldState.invalid && 'border-destructive'}`}
                >
                  <DateInput
                    aria-label="Data e hora da atividade"
                    value={
                      field.value
                        ? parseAbsoluteToLocal(field.value.toISOString())
                        : null
                    }
                    onChange={(date) => date && field.onChange(date.toDate())}
                    granularity="minute"
                    label={null}
                    hideTimeZone
                    isInvalid={fieldState.invalid}
                    hourCycle={24}
                    startContent={
                      <Calendar
                        className={`text-zinc-400 size-5 ${fieldState.invalid && 'text-destructive'}`}
                      />
                    }
                    classNames={{
                      base: 'group-data-[invalid=true]:bg-transparent',
                      inputWrapper:
                        'bg-transparent text-lg placeholder-zinc-400 border-none group-hover:bg-zinc-950 group-data-[invalid=true]:bg-inherit group-data-[invalid=true]:hover:bg-inherit group-data-[invalid=true]:focus-within:hover:bg-inherit',
                    }}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-2">
          <Button
            type="submit"
            className="flex-1"
            disabled={isSubmitting || !isValid}
          >
            Salvar
          </Button>

          <Button
            variant={'destructive'}
            type="button"
            onClick={handleDeleteActivity}
          >
            <Trash className="size-5" />
          </Button>
        </div>
      </form>
    </Form>
  )
}
