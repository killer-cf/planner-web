'use server'

import { z } from 'zod'

import type { ListTripActivitiesResponse } from '@/dtos/activity'
import { api } from '@/lib/api'
import { authActionClient } from '@/lib/safe-action'

const listTripActivitiesSchema = z.object({
	tripId: z.string()
})

export const listTripActivities = authActionClient
	.schema(listTripActivitiesSchema)
	.action(async ({ parsedInput: { tripId }, ctx: { token } }) => {
		const res = await api
			.get(`api/v1/trips/${tripId}/activities`, {
				headers: {
					Authorization: `Bearer ${token}`
				}
			})
			.json<ListTripActivitiesResponse>()

		return res
	})
