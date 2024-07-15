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
