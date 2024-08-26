import { z } from 'zod'

import { validateOccursAt } from '@/utils/validate-occurs-at'

import type { Trip } from './trip'

export type Activity = {
	id: string
	title: string
	occurs_at: string
}

export type ListTripActivitiesResponse = {
	activities: {
		date: string
		activities: Activity[]
	}[]
}

export function loadActivityFormSchema(trip: Trip) {
	return activityFormSchema.refine(
		(data) => {
			return validateOccursAt(data.occursAt, trip)
		},
		{
			message: 'A atividade não pode acontecer fora do período da viagem.',
			path: ['occursAt']
		}
	)
}

export const activityFormSchema = z.object({
	title: z
		.string()
		.min(4, { message: 'O título deve ter no mínimo 4 caracteres' }),
	occursAt: z.coerce.date()
})

export type ActivityFormData = z.infer<typeof activityFormSchema>
