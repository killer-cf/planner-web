"use server"

import { z } from "zod"

import { api } from "@/lib/api"
import { authActionClient } from "@/lib/safe-action"

const deleteTripActivitySchema = z.object({
	activityId: z.string()
})

export const deleteTripActivity = authActionClient
	.schema(deleteTripActivitySchema)
	.action(async ({ parsedInput: data, ctx: { token } }) => {
		await api
			.delete(`api/v1/activities/${data.activityId}`, {
				headers: {
					Authorization: `Bearer ${token}`
				}
			})
			.json()
	})
