import { dehydrate, HydrationBoundary } from '@tanstack/react-query'

import { listTripLinks } from '@/actions/list-trip-links'
import { getQueryClient } from '@/lib/get-query-client'

import { ImportantLinksClient } from './important-links-client'

interface ImportantLinksProps {
  tripId: string
}

export async function ImportantLinksServer({ tripId }: ImportantLinksProps) {
  const queryClient = getQueryClient()
  queryClient.prefetchQuery({
    queryKey: ['trip-important-links', tripId],
    queryFn: async () => listTripLinks({ tripId }),
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ImportantLinksClient tripId={tripId} />
    </HydrationBoundary>
  )
}
