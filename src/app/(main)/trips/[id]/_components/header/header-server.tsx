import { HydrationBoundary, dehydrate } from '@tanstack/react-query'

import { getTrip } from '@/actions/get-trip'
import { getQueryClient } from '@/lib/get-query-client'
import { isParticipantOwner } from '@/utils/is-participant-owner'

import { HeaderClient } from './header-client'

interface HeaderProps {
	tripId: string
}

export async function HeaderServer({ tripId }: HeaderProps) {
	const isOwner = await isParticipantOwner(tripId)

	const queryClient = getQueryClient()
	queryClient.prefetchQuery({
		queryKey: ['trip', tripId],
		queryFn: () => getTrip({ tripId })
	})

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<HeaderClient tripId={tripId} isParticipantOwner={isOwner} />
		</HydrationBoundary>
	)
}
