'use server'

import { revalidateTag } from 'next/cache'
import { z } from 'zod'

import { api } from '@/lib/api'
import { actionClient } from '@/lib/safe-action'

const updateTripSchema = z.object({
  tripId: z.string(),
  destination: z.string(),
  startsAt: z.date(),
  endsAt: z.date(),
})

export const updateTrip = actionClient
  .schema(updateTripSchema)
  .action(async ({ parsedInput: data }) => {
    await api.put(`api/v1/trips/${data.tripId}`, {
      json: {
        destination: data.destination,
        starts_at: data.startsAt,
        ends_at: data.endsAt,
      },
    })

    revalidateTag(`trip:${data.tripId}`)
  })
