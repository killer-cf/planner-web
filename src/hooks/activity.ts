import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query'

import { createTripActivity } from '@/actions/create-activity'
import { listTripActivities } from '@/actions/list-trip-activities'
import { updateTripActivity } from '@/actions/update-activity'

interface UseListActivitiesProps {
  tripId: string
}

export function useListActivities({ tripId }: UseListActivitiesProps) {
  return useSuspenseQuery({
    queryKey: ['trip-activities', tripId],
    queryFn: () => listTripActivities({ tripId }),
  })
}

export const useCreateActivity = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: createTripActivity,
    onSuccess(response, variables) {
      queryClient.invalidateQueries({
        queryKey: ['trip-activities', variables.tripId],
      })
    },
  })
}

export const useUpdateActivity = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: updateTripActivity,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['trip-activities'],
      })
    },
  })
}
