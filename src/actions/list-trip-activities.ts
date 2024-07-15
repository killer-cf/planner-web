'use server'

import { z } from 'zod'

import { ListTripActivitiesResponse } from '@/dtos/activity'
import { api } from '@/lib/api'
import { actionClient } from '@/lib/safe-action'

const listTripActivitiesSchema = z.object({
  tripId: z.string(),
})

export const listTripActivities = actionClient
  .schema(listTripActivitiesSchema)
  .action(async ({ parsedInput: { tripId } }) => {
    const res = await api
      .get(`api/v1/trips/${tripId}/activities`, {
        next: {
          revalidate: 60 * 60 * 3,
          tags: [`trip:${tripId}:activities`],
        },
      })
      .json<ListTripActivitiesResponse>()

    return res
  })
