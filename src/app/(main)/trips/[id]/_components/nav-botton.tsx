'use client'

import { CalendarRange, Info } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Button } from '@/components/ui/button'

interface NavBottomProps {
	tripId: string
}

export function NavBottom({ tripId }: NavBottomProps) {
	const pathname = usePathname()
	const isTrip = pathname.includes('trips') && !pathname.includes('details')
	const isDetails = pathname.includes('details') && pathname.includes('trips')

	return (
		<nav className="md:hidden px-3 h-16 rounded-xl bg-zinc-900 items-center shadow-shape flex gap-2 fixed bottom-4 right-5 left-5">
			<Link href={`/trips/${tripId}`} className="flex-1">
				<Button variant={isTrip ? 'default' : 'secondary'} className="w-full">
					<CalendarRange className="size-5" />
					<span>Atividades</span>
				</Button>
			</Link>

			<Link href={`/trips/${tripId}/details`} className="flex-1">
				<Button
					variant={isDetails ? 'default' : 'secondary'}
					className="w-full"
				>
					<Info className="size-5" />
					<span>Detalhes</span>
				</Button>
			</Link>
		</nav>
	)
}
