import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query'

import { createTripActivity } from '@/actions/create-activity'
import { listTripActivities } from '@/actions/list-trip-activities'

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
