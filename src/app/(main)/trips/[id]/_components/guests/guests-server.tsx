import { dehydrate, HydrationBoundary } from '@tanstack/react-query'

import { listTripParticipants } from '@/actions/list-trip-participants'
import { getQueryClient } from '@/lib/get-query-client'

import { GuestsClient } from './guests-client'
import { isParticipantOwner } from '@/utils/is-participant-owner'

interface GuestsProps {
  tripId: string
}

export async function GuestsServer({ tripId }: GuestsProps) {
  const isOwner = await isParticipantOwner(tripId)
  const queryClient = getQueryClient()
  queryClient.prefetchQuery({
    queryKey: ['trip-participants', tripId],
    queryFn: async () => listTripParticipants({ tripId }),
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <GuestsClient tripId={tripId} isParticipantOwner={isOwner} />
    </HydrationBoundary>
  )
}
