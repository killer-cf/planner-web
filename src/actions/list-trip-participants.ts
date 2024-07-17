'use server'

import { z } from 'zod'

import { ListTripParticipantsResponse } from '@/dtos/participant'
import { api } from '@/lib/api'
import { actionClient } from '@/lib/safe-action'

const listTripParticipantsSchema = z.object({
  tripId: z.string(),
})

export const listTripParticipants = actionClient
  .schema(listTripParticipantsSchema)
  .action(async ({ parsedInput: { tripId } }) => {
    const res = await api
      .get(`api/v1/trips/${tripId}/participants`, {
        next: {
          revalidate: 60 * 60 * 3,
          tags: [`trip:${tripId}:participants`],
        },
      })
      .json<ListTripParticipantsResponse>()

    return res
  })
