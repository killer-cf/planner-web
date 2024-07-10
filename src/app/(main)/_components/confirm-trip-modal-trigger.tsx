'use client'

import { ArrowRight, Mail, User } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

export function ConfirmTripModalTrigger() {
  const router = useRouter()

  function createTrip() {
    router.push('/trips/123')
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          Confirmar viagem
          <ArrowRight className="size-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[640px] shadow-shape space-y-3">
        <DialogHeader>
          <DialogTitle>Confirmar criação de viagem</DialogTitle>
          <DialogDescription>
            Para concluir a criação da viagem para{' '}
            <span className="font-semibold text-zinc-100">
              Florianópolis, Brasil
            </span>{' '}
            nas datas de{' '}
            <span className="font-semibold text-zinc-100">
              16 a 27 de Agosto de 2024
            </span>{' '}
            preencha seus dados abaixo:
          </DialogDescription>
        </DialogHeader>

        <form className="space-y-3">
          <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
            <User className="text-zinc-400 size-5" />
            <input
              type="text"
              name="name"
              placeholder="Seu nome completo"
              className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
            />
          </div>

          <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
            <Mail className="text-zinc-400 size-5" />
            <input
              type="email"
              name="email"
              placeholder="Seu e-mail pessoal"
              className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
            />
          </div>

          <Button type="submit" size={'full'} onClick={createTrip}>
            Confirmar criação da viagem
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
