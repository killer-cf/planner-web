'use server'

import { z } from 'zod'

import { GetTripResponse } from '@/dtos/trip'
import { api } from '@/lib/api'
import { authActionClient } from '@/lib/safe-action'

const getTripSchema = z.object({
  tripId: z.string(),
})

export const getTrip = authActionClient
  .schema(getTripSchema)
  .action(async ({ parsedInput: { tripId }, ctx: { token } }) => {
    const res = await api
      .get(`api/v1/trips/${tripId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        next: {
          revalidate: 60 * 60 * 3,
          tags: [`trip:${tripId}`],
        },
      })
      .json<GetTripResponse>()

    return res.trip
  })
