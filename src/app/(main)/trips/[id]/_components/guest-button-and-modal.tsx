'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Mail, Navigation, UserCog } from 'lucide-react'
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
import { useInviteParticipant } from '@/hooks/guests'

const newGuestFormSchema = z.object({
  email: z.string().email(),
})

type NewGuestFormData = z.infer<typeof newGuestFormSchema>

interface Props {
  tripId: string
}

export function GuestButtonAndModal({ tripId }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<NewGuestFormData>({
    resolver: zodResolver(newGuestFormSchema),
  })

  const inviteParticipant = useInviteParticipant()

  async function handleInviteParticipant({ email }: NewGuestFormData) {
    const result = await inviteParticipant.mutateAsync({
      tripId,
      email,
    })

    if (result?.serverError) toast.error(result.serverError)
    if (result?.data) {
      setIsModalOpen(false)
      toast.success('Participante convidado!')
      reset()
    }
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogTrigger asChild>
        <Button variant={'secondary'} size={'full'}>
          <UserCog className="size-5" />
          Gerenciar convidados
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar novo participante</DialogTitle>
          <DialogDescription>
            Adicione um novo participante ao grupo de viagem
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(handleInviteParticipant)}
          className="space-y-3"
        >
          <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
            <Mail className="text-zinc-400 size-5" />
            <input
              {...register('email')}
              placeholder="Email do participante"
              className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
            />
          </div>

          <Button type="submit" size={'full'} disabled={isSubmitting}>
            <Navigation className="size-5" />
            Enviar Convite
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
