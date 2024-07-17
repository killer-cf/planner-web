'use server'

import { z } from 'zod'

import { ListTripLinksResponse } from '@/dtos/link'
import { api } from '@/lib/api'
import { actionClient } from '@/lib/safe-action'

const listTripLinksSchema = z.object({
  tripId: z.string(),
})

export const listTripLinks = actionClient
  .schema(listTripLinksSchema)
  .action(async ({ parsedInput: { tripId } }) => {
    const res = await api
      .get(`api/v1/trips/${tripId}/links`, {
        next: {
          revalidate: 60 * 60 * 3,
          tags: [`trip:${tripId}:links`],
        },
      })
      .json<ListTripLinksResponse>()

    return res
  })
