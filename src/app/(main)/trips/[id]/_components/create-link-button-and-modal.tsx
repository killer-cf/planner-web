'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Link2, Plus, Tag } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { createLink } from '@/actions/create-link'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

const createLinkFormSchema = z.object({
  title: z.string(),
  url: z.string().url(),
})

type CreateLinkFormData = z.infer<typeof createLinkFormSchema>

interface Props {
  tripId: string
}

export function CreateLinkButtonAndModal({ tripId }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<CreateLinkFormData>({
    resolver: zodResolver(createLinkFormSchema),
  })

  async function handleCreateLink({ title, url }: CreateLinkFormData) {
    const result = await createLink({
      tripId,
      title,
      url,
    })

    if (result?.serverError) toast.error(result.serverError)
    if (result?.data) {
      setIsModalOpen(false)
      toast.success('Link adicionado com sucesso!')
      reset()
    }
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogTrigger asChild>
        <Button variant={'secondary'} size={'full'}>
          <Plus className="size-5" />
          Cadastrar novo link
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Cadastrar novo link</DialogTitle>
          <DialogDescription>
            Adicione um novo link para sua viagem, todos os convidados poderao
            ver.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleCreateLink)} className="space-y-3">
          <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
            <Tag className="text-zinc-400 size-5" />
            <input
              {...register('title')}
              placeholder="Ao oque se refere o link?"
              className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
            />
          </div>

          <div className="h-14 flex-1 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
            <Link2 className="text-zinc-400 size-5" />
            <input
              {...register('url')}
              type="text"
              placeholder="URL do link"
              className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
            />
          </div>

          <Button type="submit" size={'full'} disabled={isSubmitting}>
            <Plus className="size-5" />
            Adicionar link
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
