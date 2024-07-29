import { z } from 'zod'

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

export const activityFormSchema = z.object({
  title: z.string(),
  occursAt: z.coerce.date(),
})

export type ActivityFormData = z.infer<typeof activityFormSchema>
