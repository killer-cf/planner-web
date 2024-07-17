'use server'

import { revalidateTag } from 'next/cache'
import { z } from 'zod'

import { api } from '@/lib/api'
import { actionClient } from '@/lib/safe-action'

const creatLinkSchema = z.object({
  tripId: z.string(),
  title: z.string(),
  url: z.string(),
})

interface CreateLinkResponse {
  link_id: string
}

export const createLink = actionClient
  .schema(creatLinkSchema)
  .action(async ({ parsedInput: data }) => {
    const res = await api
      .post(`api/v1/trips/${data.tripId}/links`, {
        json: {
          title: data.title,
          url: data.url,
        },
      })
      .json<CreateLinkResponse>()

    revalidateTag(`trip:${data.tripId}:links`)

    return { linkId: res.link_id }
  })
