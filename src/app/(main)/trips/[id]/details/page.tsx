import { isParticipantOwner } from '@/utils/is-participant-owner'

import { GuestsClient } from '../_components/guests/guests-client'
import { ImportantLinksClient } from '../_components/important-links/important-links-client'

interface DetailsPageProps {
	params: {
		id: string
	}
}

export default async function DetailsPage({ params }: DetailsPageProps) {
	const isOwner = await isParticipantOwner(params.id)

	return (
		<div className="space-y-6 px-1 h-screen">
			<ImportantLinksClient tripId={params.id} />
			<div className="w-full h-px bg-zinc-800" />
			<GuestsClient tripId={params.id} isParticipantOwner={isOwner} />
		</div>
	)
}
