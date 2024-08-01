'use client'

import { AtSign, Plus } from 'lucide-react'
import { FormEvent } from 'react'

import { Button } from '@/components/ui/button'
import { useTripStore } from '@/stores/trip'

export function GuestsForm() {
  const { setEmailsToInvite, emailsToInvite } = useTripStore((state) => ({
    setEmailsToInvite: state.setEmailsToInvite,
    emailsToInvite: state.emailsToInvite,
  }))

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
  return (
    <form
      onSubmit={addNewEmailToInvite}
      className="py-5 md:bg-zinc-950 md:border md:border-zinc-800 rounded-lg flex md:flex-row flex-col md:items-center md:gap-2 gap-4"
    >
      <div className="px-2 flex items-center flex-1 gap-2 md:bg-inherit bg-zinc-950 border md:border-none border-zinc-800 rounded-lg h-16 md:h-full py-3 md:py-0">
        <AtSign className="text-zinc-400 size-5" />
        <input
          type="email"
          name="email"
          placeholder="Digite o email do convidado"
          className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1 flex"
        />
      </div>

      <Button type="submit">
        Convidar
        <Plus className="size-5" />
      </Button>
    </form>
  )
}
