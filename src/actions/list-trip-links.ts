'use server'

import { z } from 'zod'

import { ListTripLinksResponse } from '@/dtos/link'
import { api } from '@/lib/api'
import { authActionClient } from '@/lib/safe-action'

const listTripLinksSchema = z.object({
  tripId: z.string(),
})

export const listTripLinks = authActionClient
  .schema(listTripLinksSchema)
  .action(async ({ parsedInput: { tripId }, ctx: { token } }) => {
    const res = await api
      .get(`api/v1/trips/${tripId}/links`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        next: {
          revalidate: 60 * 60 * 3,
          tags: [`trip:${tripId}:links`],
        },
      })
      .json<ListTripLinksResponse>()

    return res
  })
