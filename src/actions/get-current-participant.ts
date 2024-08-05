'use server'

import { z } from 'zod'

import { api } from '@/lib/api'
import { authActionClient } from '@/lib/safe-action'
import { GetCurrentParticipantResponse } from '@/dtos/participant'

const getCurrentParticipantSchema = z.object({
  tripId: z.string(),
})

export const getCurrentParticipant = authActionClient
  .schema(getCurrentParticipantSchema)
  .action(async ({ parsedInput: { tripId }, ctx: { token } }) => {
    const res = await api
      .get(`api/v1/trips/${tripId}/current_participant`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .json<GetCurrentParticipantResponse>()

    return res
  })
