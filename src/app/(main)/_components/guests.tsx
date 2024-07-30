'use client'

import { X } from 'lucide-react'

import { useTripStore } from '@/stores/trip'

export function Guests() {
  const { setEmailsToInvite, emailsToInvite } = useTripStore((state) => ({
    setEmailsToInvite: state.setEmailsToInvite,
    emailsToInvite: state.emailsToInvite,
  }))

  function removeEmailFromInvites(emailToRemove: string) {
    const newEmailList = emailsToInvite.filter(
      (email) => email !== emailToRemove,
    )

    setEmailsToInvite(newEmailList)
  }

  return (
    <div className="flex flex-wrap gap-2 px-2.5">
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
  )
}
