"use server"

import { z } from "zod"

import type { GetCurrentParticipantResponse } from "@/dtos/participant"
import { api } from "@/lib/api"
import { authActionClient } from "@/lib/safe-action"

const getCurrentParticipantSchema = z.object({
	tripId: z.string()
})

export const getCurrentParticipant = authActionClient
	.schema(getCurrentParticipantSchema)
	.action(async ({ parsedInput: { tripId }, ctx: { token } }) => {
		const res = await api
			.get(`api/v1/trips/${tripId}/current_participant`, {
				headers: {
					Authorization: `Bearer ${token}`
				}
			})
			.json<GetCurrentParticipantResponse>()

		return res
	})
