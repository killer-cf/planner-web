"use server"

import { z } from "zod"

import { api } from "@/lib/api"
import { authActionClient } from "@/lib/safe-action"

const createTripSchema = z.object({
	ownerName: z.string(),
	ownerEmail: z.string().email(),
	destination: z.string(),
	startsAt: z.date(),
	endsAt: z.date(),
	emailsToInvite: z.array(z.string())
})

interface CreateTripResponse {
	trip_id: string
}

export const createTrip = authActionClient
	.schema(createTripSchema)
	.action(async ({ parsedInput: data, ctx: { token } }) => {
		const res = await api
			.post("api/v1/trips", {
				headers: {
					Authorization: `Bearer ${token}`
				},
				json: {
					destination: data.destination,
					emails_to_invite: data.emailsToInvite,
					ends_at: data.endsAt,
					starts_at: data.startsAt,
					owner_email: data.ownerEmail,
					owner_name: data.ownerName
				}
			})
			.json<CreateTripResponse>()

		return { tripId: res.trip_id }
	})
