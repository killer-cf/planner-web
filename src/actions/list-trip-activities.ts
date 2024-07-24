'use server'

import { z } from 'zod'

import { ListTripActivitiesResponse } from '@/dtos/activity'
import { api } from '@/lib/api'
import { authActionClient } from '@/lib/safe-action'

const listTripActivitiesSchema = z.object({
  tripId: z.string(),
})

export const listTripActivities = authActionClient
  .schema(listTripActivitiesSchema)
  .action(async ({ parsedInput: { tripId }, ctx: { token } }) => {
    const res = await api
      .get(`api/v1/trips/${tripId}/activities`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        next: {
          revalidate: 60 * 60 * 3,
          tags: [`trip:${tripId}:activities`],
        },
      })
      .json<ListTripActivitiesResponse>()

    return res
  })
