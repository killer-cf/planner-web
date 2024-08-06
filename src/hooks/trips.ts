import {
  useMutation,
  useQuery,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query'

import { getTrip } from '@/actions/get-trip'
import { listUserTrips } from '@/actions/list-user-trips'
import { updateTrip } from '@/actions/update-trip'
import { GetTripResponse, ListUserTripsResponse, Trip } from '@/dtos/trip'

interface UseGetTripProps {
  tripId: string
}

export function useGetTrip({ tripId }: UseGetTripProps) {
  return useSuspenseQuery({
    queryKey: ['trip', tripId],
    queryFn: () => getTrip({ tripId }),
  })
}

export function useListUserTrips({ enabled = true }) {
  return useQuery({
    queryKey: ['trips'],
    queryFn: () => listUserTrips(),
    enabled,
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
          starts_at: variables.startsAt.toISOString(),
          ends_at: variables.endsAt.toISOString(),
        }
        queryClient.invalidateQueries({
          queryKey: ['trip-activities', variables.tripId],
        })

        queryClient.setQueryData(
          ['trips'],
          (
            oldData: { data: ListUserTripsResponse } | undefined,
          ): { data: ListUserTripsResponse } => {
            if (oldData) {
              return {
                data: {
                  ...oldData.data,
                  trips: oldData.data.trips.map((trip) =>
                    trip.id === variables.tripId ? updatedTrip : trip,
                  ),
                },
              }
            } else {
              return {
                data: {
                  trips: [updatedTrip],
                },
              }
            }
          },
        )

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
