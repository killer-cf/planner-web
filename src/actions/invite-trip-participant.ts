'use server'

import { revalidateTag } from 'next/cache'
import { z } from 'zod'

import { api } from '@/lib/api'
import { actionClient } from '@/lib/safe-action'

const inviteParticipantSchema = z.object({
  tripId: z.string(),
  email: z.string().email(),
})

interface InviteParticipantResponse {
  trip_id: string
}

export const inviteParticipant = actionClient
  .schema(inviteParticipantSchema)
  .action(async ({ parsedInput: data }) => {
    const res = await api
      .post(`api/v1/trips/${data.tripId}/invites`, {
        json: {
          email: data.email,
        },
      })
      .json<InviteParticipantResponse>()

    revalidateTag(`trip:${data.tripId}:participants`)

    return { tripId: res.trip_id }
  })
