"use server"

import { z } from "zod"

import { api } from "@/lib/api"
import { authActionClient } from "@/lib/safe-action"
import { isParticipantOwner } from "@/utils/is-participant-owner"

const inviteParticipantSchema = z.object({
	tripId: z.string(),
	email: z.string().email()
})

interface InviteParticipantResponse {
	participant_id: string
}

export const inviteParticipant = authActionClient
	.schema(inviteParticipantSchema)
	.action(async ({ parsedInput: data, ctx: { token } }) => {
		const isOwner = await isParticipantOwner(data.tripId)

		if (!isOwner) {
			throw new Error("Only owner can invite participants")
		}

		const res = await api
			.post(`api/v1/trips/${data.tripId}/invites`, {
				headers: {
					Authorization: `Bearer ${token}`
				},
				json: { email: data.email }
			})
			.json<InviteParticipantResponse>()

		return { participantId: res.participant_id }
	})
