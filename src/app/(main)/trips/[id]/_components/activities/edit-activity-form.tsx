'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { parseAbsoluteToLocal } from '@internationalized/date'
import { DateInput } from '@nextui-org/date-input'
import { parseISO } from 'date-fns'
import { Calendar, Tag, Trash } from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Activity, ActivityFormData, activityFormSchema } from '@/dtos/activity'
import { useDeleteActivity, useUpdateActivity } from '@/hooks/activity'

interface EditActivityModalProps {
  activity: Activity
  closeModal: () => void
}

export function EditActivityModal({
  activity,
  closeModal,
}: EditActivityModalProps) {
  const updateActivity = useUpdateActivity()
  const deleteActivity = useDeleteActivity()
  const {
    control,
    handleSubmit,
    register,
    formState: { isSubmitting },
  } = useForm<ActivityFormData>({
    resolver: zodResolver(activityFormSchema),
    defaultValues: {
      title: activity.title,
      occursAt: parseISO(activity.occurs_at),
    },
  })

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
    <DialogContent className="w-[640px] rounded-xl shadow-shape bg-zinc-900">
      <DialogHeader>
        <DialogTitle>Ações da atividade</DialogTitle>
        <DialogDescription>
          Aqui você pode editar a atividade, alterando o título e a data/hora. E
          também pode excluir a atividade.
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit(handleEditActivity)} className="space-y-3">
        <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
          <Tag className="text-zinc-400 size-5" />
          <input
            {...register('title')}
            placeholder="Qual a atividade?"
            className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
          />
        </div>

        <Controller
          control={control}
          name="occursAt"
          render={({ field }) => (
            <div className="h-14 flex-1 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
              <DateInput
                aria-label="Data e hora da atividade"
                value={parseAbsoluteToLocal(field.value.toISOString())}
                onChange={(date) => field.onChange(date.toDate())}
                granularity="minute"
                label={null}
                hideTimeZone
                hourCycle={24}
                startContent={<Calendar className="text-zinc-400 size-5" />}
                classNames={{
                  inputWrapper:
                    'bg-transparent text-lg placeholder-zinc-400 border-none group-hover:bg-zinc-950',
                }}
              />
            </div>
          )}
        />

        <div className="flex gap-2">
          <Button type="submit" className="flex-1" disabled={isSubmitting}>
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
    </DialogContent>
  )
}
