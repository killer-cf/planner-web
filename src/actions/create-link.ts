'use server'

import { revalidateTag } from 'next/cache'
import { z } from 'zod'

import { api } from '@/lib/api'
import { authActionClient } from '@/lib/safe-action'

const createLinkSchema = z.object({
  tripId: z.string(),
  title: z.string(),
  url: z.string(),
})

interface CreateLinkResponse {
  link_id: string
}

export const createLink = authActionClient
  .schema(createLinkSchema)
  .action(async ({ parsedInput: data, ctx: { token } }) => {
    const res = await api
      .post(`api/v1/trips/${data.tripId}/links`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        json: {
          title: data.title,
          url: data.url,
        },
      })
      .json<CreateLinkResponse>()

    revalidateTag(`trip:${data.tripId}:links`)

    return { linkId: res.link_id }
  })
