import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query'

import { getTrip } from '@/actions/get-trip'
import { updateTrip } from '@/actions/update-trip'
import { GetTripResponse, Trip } from '@/dtos/trip'

interface UseGetTripProps {
  tripId: string
}

export function useGetTrip({ tripId }: UseGetTripProps) {
  return useSuspenseQuery({
    queryKey: ['trip', tripId],
    queryFn: () => getTrip({ tripId }),
  })
}

export const useUpdateTrip = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: updateTrip,
    onSuccess(response, variables) {
      if (!response?.serverError) {
        const updatedTrip: Trip = {
          id: variables.tripId,
          destination: variables.destination,
          is_confirmed: true,
          starts_at: variables.startsAt.toISOString(),
          ends_at: variables.endsAt.toISOString(),
        }
        queryClient.invalidateQueries({
          queryKey: ['trip-activities', variables.tripId],
        })

        return queryClient.setQueryData(
          ['trip', variables.tripId],
          (): { data: GetTripResponse } => {
            return {
              data: {
                trip: updatedTrip,
              },
            }
          },
        )
      }
    },
  })
}
