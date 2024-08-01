import { notFound } from 'next/navigation'
import { Suspense } from 'react'

import { getCurrentUser } from '@/actions/get-current-user'

import { ActivitiesServer } from './_components/activities/activities-server'
import { ActivitiesSkeleton } from './_components/activities/activities-skeleton'
import { NewActivity } from './_components/activities/new-activity'
import { GuestsServer } from './_components/guests/guests-server'
import { GuestsSkeleton } from './_components/guests/guests-skeleton'
import { ImportantLinksServer } from './_components/important-links/important-links-server'
import { ImportantLinksSkeleton } from './_components/important-links/important-links-skeleton'

interface TripPageProps {
  params: {
    id: string
  }
}

export default async function TripPage({ params }: TripPageProps) {
  const data = await getCurrentUser()

  if (!data?.data?.trip_ids.includes(params.id)) {
    return notFound()
  }

  return (
    <main className="flex gap-16 md:px-4">
      <div className="flex-1 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="md:text-3xl text-2xl font-semibold">Atividades</h2>
          <NewActivity />
        </div>

        <Suspense fallback={<ActivitiesSkeleton />}>
          <ActivitiesServer tripId={params.id} />
        </Suspense>
      </div>
      <div className="w-80 space-y-6 hidden">
        <Suspense fallback={<ImportantLinksSkeleton />}>
          <ImportantLinksServer tripId={params.id} />
        </Suspense>
        <div className="w-full h-px bg-zinc-800" />
        <Suspense fallback={<GuestsSkeleton />}>
          <GuestsServer tripId={params.id} />
        </Suspense>
      </div>
    </main>
  )
}
