'use server'

import type { ListUserTripsResponse } from '@/dtos/trip'
import { api } from '@/lib/api'
import { authActionClient } from '@/lib/safe-action'

export const listUserTrips = authActionClient.action(
	async ({ ctx: { token } }) => {
		const res = await api
			.get('api/v1/trips', {
				headers: {
					Authorization: `Bearer ${token}`
				}
			})
			.json<ListUserTripsResponse>()

		return res
	}
)
