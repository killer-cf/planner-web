'use server'

import { z } from 'zod'

import { api } from '@/lib/api'
import { authActionClient } from '@/lib/safe-action'
import { isParticipantOwner } from '@/utils/is-participant-owner'

const updateTripSchema = z.object({
  tripId: z.string(),
  destination: z.string(),
  startsAt: z.date(),
  endsAt: z.date(),
})

export const updateTrip = authActionClient
  .schema(updateTripSchema)
  .action(async ({ parsedInput: data, ctx: { token } }) => {
    const isOwner = await isParticipantOwner(data.tripId)

    if (!isOwner) {
      throw new Error('Only owner can update the trip')
    }

    await api.put(`api/v1/trips/${data.tripId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      json: {
        destination: data.destination,
        starts_at: data.startsAt,
        ends_at: data.endsAt,
      },
    })
  })
