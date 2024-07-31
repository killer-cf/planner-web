'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { parseAbsoluteToLocal } from '@internationalized/date'
import { DateInput } from '@nextui-org/date-input'
import { parseISO } from 'date-fns'
import { Calendar, Plus, Tag } from 'lucide-react'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { ActivityFormData, loadActivityFormSchema } from '@/dtos/activity'
import { useCreateActivity } from '@/hooks/activity'
import { useCurrentTripStore } from '@/stores/current-trip'

interface CreateActivityModalProps {
  tripId: string
}

export function CreateActivityModal({ tripId }: CreateActivityModalProps) {
  const { trip } = useCurrentTripStore((state) => ({
    trip: state.trip,
  }))
  const {
    reset,
    control,
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<ActivityFormData>({
    mode: 'onChange',
    resolver: zodResolver(loadActivityFormSchema(trip)),
    defaultValues: {
      title: '',
      occursAt: parseISO(new Date().toISOString()),
    },
  })

  const [isModalOpen, setIsModalOpen] = useState(false)
  const createAct = useCreateActivity()

  async function handleCreateActivity({ occursAt, title }: ActivityFormData) {
    const result = await createAct.mutateAsync({
      tripId,
      occursAt,
      title,
    })

    if (result) {
      toast.success('Atividade cadastrada com sucesso!')
      reset()
      setIsModalOpen(false)
    }

    if (result?.serverError) {
      toast.error(result.serverError)
    }
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="size-5" />
          Nova atividade
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[640px] rounded-xl shadow-shape bg-zinc-900 space-y-5">
        <DialogHeader>
          <DialogTitle>Cadastrar atividade</DialogTitle>
          <DialogDescription>
            Todos convidados podem visualizar as atividades.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(handleCreateActivity)}
          className="space-y-3"
        >
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
                  value={
                    field.value
                      ? parseAbsoluteToLocal(field.value.toISOString())
                      : null
                  }
                  onChange={(date) => date && field.onChange(date.toDate())}
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

          <div className="h-8">
            <p className="text-red-500">
              {errors.occursAt && errors.occursAt.message}
            </p>
            <p className="text-red-500">
              {errors.title && errors.title.message}
            </p>
          </div>

          <Button type="submit" size={'full'} disabled={isSubmitting}>
            <Plus className="size-5" />
            Salvar atividade
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
