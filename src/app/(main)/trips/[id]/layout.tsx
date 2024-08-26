import { type ReactNode, Suspense } from 'react'

import { HeaderServer } from './_components/header/header-server'
import { HeaderSkeleton } from './_components/header/header-skeleton'
import { NavBottom } from './_components/nav-botton'

interface OneTripLayoutProps {
	children: ReactNode
	params: {
		id: string
	}
}

export default function OneTripLayout({
	params,
	children
}: OneTripLayoutProps) {
	return (
		<div className="max-w-6xl px-6 py-5 md:py-10 mx-auto space-y-4 md:space-y-8 mb-24 md:mb-10">
			<div>
				<Suspense fallback={<HeaderSkeleton />}>
					<HeaderServer tripId={params.id} />
				</Suspense>
			</div>
			{children}
			<NavBottom tripId={params.id} />
		</div>
	)
}
