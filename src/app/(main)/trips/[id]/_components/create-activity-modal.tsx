'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Calendar, Plus, Tag } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
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
import { useCreateActivity } from '@/hooks/activity'

const createActivitySchema = z.object({
  title: z.string(),
  occursAt: z.coerce.date(),
})

type CreateActivityData = z.infer<typeof createActivitySchema>

interface CreateActivityModalProps {
  tripId: string
}

export function CreateActivityModal({ tripId }: CreateActivityModalProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const {
    reset,
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<CreateActivityData>({
    resolver: zodResolver(createActivitySchema),
  })

  const createAct = useCreateActivity()

  async function handleCreateActivity({ occursAt, title }: CreateActivityData) {
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
          Cadastrar atividade
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

          <div className="h-14 flex-1 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
            <Calendar className="text-zinc-400 size-5" />
            <input
              {...register('occursAt')}
              type="datetime-local"
              placeholder="Data e horário da atividade"
              className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
            />
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
