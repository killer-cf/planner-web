'use client'

import { AtSign, Plus, UserRoundPlus, X } from 'lucide-react'
import { FormEvent, useState } from 'react'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

export function GuestsModalTrigger() {
  const [emailsToInvite, setEmailsToInvite] = useState([
    'kilder@live.com',
    'john@acme.com',
  ])

  function addNewEmailToInvite(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const data = new FormData(event.currentTarget)
    const email = data.get('email')?.toString()

    if (!email) {
      return
    }

    if (emailsToInvite.includes(email)) {
      return
    }

    setEmailsToInvite([...emailsToInvite, email])

    event.currentTarget.reset()
  }

  function removeEmailFromInvites(emailToRemove: string) {
    const newEmailList = emailsToInvite.filter(
      (email) => email !== emailToRemove,
    )

    setEmailsToInvite(newEmailList)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          className="flex items-center gap-2 flex-1 text-left"
        >
          <UserRoundPlus className="size-5 text-zinc-400" />
          {emailsToInvite.length > 0 ? (
            <span className="text-zinc-100 text-lg flex-1">
              {emailsToInvite.length} pessoa(s) convidada(s)
            </span>
          ) : (
            <span className="text-zinc-400 text-lg flex-1">
              Quem estará na viagem?
            </span>
          )}
        </button>
      </DialogTrigger>
      <DialogContent className="w-[640px] shadow-shape space-y-3">
        <DialogHeader>
          <DialogTitle>Selecionar convidados</DialogTitle>
          <DialogDescription>
            Os convidados irão receber um convite no email para confirmar a
            participação na viagem.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-wrap gap-2">
          {emailsToInvite.map((email) => {
            return (
              <div
                key={email}
                className="py-1.5 px-2.5 rounded-md bg-zinc-800 flex items-center gap-2"
              >
                <span className="text-zinc-300">{email}</span>
                <button type="button">
                  <X
                    onClick={() => removeEmailFromInvites(email)}
                    className="size-4 text-zinc-400"
                  />
                </button>
              </div>
            )
          })}
        </div>

        <div className="w-full h-px bg-zinc-800" />

        <form
          onSubmit={addNewEmailToInvite}
          className="p-2.5 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2"
        >
          <div className="px-2 flex items-center flex-1 gap-2">
            <AtSign className="text-zinc-400 size-5" />
            <input
              type="email"
              name="email"
              placeholder="Digite o email do convidado"
              className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
            />
          </div>

          <Button type="submit">
            Convidar
            <Plus className="size-5" />
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
