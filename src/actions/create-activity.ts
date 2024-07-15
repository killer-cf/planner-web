'use server'

import { revalidateTag } from 'next/cache'
import { z } from 'zod'

import { api } from '@/lib/api'
import { actionClient } from '@/lib/safe-action'

const creatTripActivitySchema = z.object({
  tripId: z.string(),
  title: z.string(),
  occursAt: z.date(),
})

interface CreateTripActivityResponse {
  activity_id: string
}

export const createTripActivity = actionClient
  .schema(creatTripActivitySchema)
  .action(async ({ parsedInput: data }) => {
    const res = await api
      .post(`api/v1/trips/${data.tripId}/activities`, {
        json: {
          title: data.title,
          occurs_at: data.occursAt,
        },
      })
      .json<CreateTripActivityResponse>()

    revalidateTag(`trip:${data.tripId}:activities`)

    return { activityId: res.activity_id }
  })
