'use server'

import { z } from 'zod'

import { ListTripParticipantsResponse } from '@/dtos/participant'
import { api } from '@/lib/api'
import { authActionClient } from '@/lib/safe-action'

const listTripParticipantsSchema = z.object({
  tripId: z.string(),
})

export const listTripParticipants = authActionClient
  .schema(listTripParticipantsSchema)
  .action(async ({ parsedInput: { tripId }, ctx: { token } }) => {
    const res = await api
      .get(`api/v1/trips/${tripId}/participants`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        next: {
          revalidate: 60 * 60 * 3,
          tags: [`trip:${tripId}:participants`],
        },
      })
      .json<ListTripParticipantsResponse>()

    return res
  })
