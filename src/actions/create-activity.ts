'use server'

import { z } from 'zod'

import { api } from '@/lib/api'
import { authActionClient } from '@/lib/safe-action'

const createTripActivitySchema = z.object({
  tripId: z.string(),
  title: z.string(),
  occursAt: z.date(),
})

interface CreateTripActivityResponse {
  activity_id: string
}

export const createTripActivity = authActionClient
  .schema(createTripActivitySchema)
  .action(async ({ parsedInput: data, ctx: { token } }) => {
    const res = await api
      .post(`api/v1/trips/${data.tripId}/activities`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        json: {
          title: data.title,
          occurs_at: data.occursAt,
        },
      })
      .json<CreateTripActivityResponse>()

    return { activityId: res.activity_id }
  })
