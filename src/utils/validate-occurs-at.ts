import dayjs from 'dayjs'

import { Trip } from '@/dtos/trip'

export const validateOccursAt = (occursAt: Date, trip: Trip) => {
  const occursAtDate = dayjs(occursAt)
  const startDate = dayjs(trip.starts_at).startOf('day')
  const endDate = dayjs(trip.ends_at).endOf('day')

  if (!occursAtDate.isValid()) {
    return false
  }
  if (occursAtDate.isBefore(startDate) || occursAtDate.isAfter(endDate)) {
    return false
  }
  return true
}
