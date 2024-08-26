import { auth, currentUser } from '@clerk/nextjs/server'
import { revalidateTag } from 'next/cache'
import { redirect } from 'next/navigation'
import { type NextRequest, NextResponse } from 'next/server'

import { env } from '@/env'

export async function GET(req: NextRequest) {
	const searchParams = req.nextUrl.searchParams
	const tripId = searchParams.get('trip_id')

	if (!tripId) {
		redirect(env.NEXT_PUBLIC_APP_URL)
	}

	try {
		const { userId } = auth()

		if (!userId) {
			return new NextResponse('Unauthorized', { status: 401 })
		}

		const user = await currentUser()

		if (!user) {
			return new NextResponse('Unauthorized', { status: 401 })
		}
	} catch {
		return new NextResponse('Erro to check session', { status: 500 })
	}

	revalidateTag(`trip:${tripId}:participants`)
	redirect(`${env.NEXT_PUBLIC_APP_URL}/trips/${tripId}`)
}
