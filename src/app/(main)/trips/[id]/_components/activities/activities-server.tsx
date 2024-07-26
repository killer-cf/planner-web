import { dehydrate, HydrationBoundary } from '@tanstack/react-query'

import { listTripActivities } from '@/actions/list-trip-activities'
import { getQueryClient } from '@/lib/get-query-client'

import { ActivitiesClient } from './activities-client'

interface ActivitiesProps {
  tripId: string
}

export async function ActivitiesServer({ tripId }: ActivitiesProps) {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  const queryClient = getQueryClient()
  queryClient.prefetchQuery({
    queryKey: ['trip-activities', tripId],
    queryFn: async () => listTripActivities({ tripId }),
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ActivitiesClient tripId={tripId} />
    </HydrationBoundary>
  )
}
