"use server"

import { z } from "zod"

import { api } from "@/lib/api"
import { authActionClient } from "@/lib/safe-action"

const updateTripActivitySchema = z.object({
	activityId: z.string(),
	title: z.string(),
	occursAt: z.date()
})

export const updateTripActivity = authActionClient
	.schema(updateTripActivitySchema)
	.action(async ({ parsedInput: data, ctx: { token } }) => {
		await api
			.put(`api/v1/activities/${data.activityId}`, {
				headers: {
					Authorization: `Bearer ${token}`
				},
				json: {
					title: data.title,
					occurs_at: data.occursAt
				}
			})
			.json()
	})
