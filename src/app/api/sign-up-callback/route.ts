import { auth, clerkClient } from '@clerk/nextjs/server'
import { revalidateTag } from 'next/cache'
import { redirect } from 'next/navigation'
import { type NextRequest, NextResponse } from 'next/server'

import { env } from '@/env'

export async function GET(req: NextRequest) {
	const searchParams = req.nextUrl.searchParams
	const participantEmail = searchParams.get('email')
	const tripId = searchParams.get('trip_id')

	if (participantEmail) {
		const { userId } = auth()

		if (!userId) {
			return new NextResponse('Unauthorized', { status: 401 })
		}

		await clerkClient.users.updateUserMetadata(userId, {
			publicMetadata: {
				participant_email: participantEmail
			}
		})
	}

	if (tripId) {
		revalidateTag(`trip:${tripId}:participants`)
		redirect(`${env.NEXT_PUBLIC_APP_URL}/trips/${tripId}`)
	}

	redirect(env.NEXT_PUBLIC_APP_URL)
}
