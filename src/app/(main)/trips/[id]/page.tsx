import { notFound } from 'next/navigation'
import { Suspense } from 'react'

import { getCurrentUser } from '@/actions/get-current-user'

import { ActivitiesServer } from './_components/activities/activities-server'
import { ActivitiesSkeleton } from './_components/activities/activities-skeleton'
import { CreateActivityModal } from './_components/create-activity-modal'
import { GuestsServer } from './_components/guests/guests-server'
import { GuestsSkeleton } from './_components/guests/guests-skeleton'
import { HeaderServer } from './_components/header/header-server'
import { HeaderSkeleton } from './_components/header/header-skeleton'
import { ImportantLinksServer } from './_components/important-links/important-links-server'
import { ImportantLinksSkeleton } from './_components/important-links/important-links-skeleton'
import { NavBottom } from './_components/nav-botton'

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
    <div className="max-w-6xl px-6 py-5 md:py-10 mx-auto space-y-8">
      <div>
        <Suspense fallback={<HeaderSkeleton />} key={params.id}>
          <HeaderServer tripId={params.id} />
        </Suspense>
      </div>
      <main className="flex gap-16 md:px-4">
        <div className="flex-1 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="md:text-3xl text-2xl font-semibold">Atividades</h2>
            <CreateActivityModal tripId={params.id} />
          </div>

          <Suspense fallback={<ActivitiesSkeleton />} key={params.id}>
            <ActivitiesServer tripId={params.id} />
          </Suspense>
        </div>
        <div className="w-80 space-y-6 hidden">
          <Suspense fallback={<ImportantLinksSkeleton />} key={params.id}>
            <ImportantLinksServer tripId={params.id} />
          </Suspense>
          <div className="w-full h-px bg-zinc-800" />
          <Suspense fallback={<GuestsSkeleton />} key={params.id}>
            <GuestsServer tripId={params.id} />
          </Suspense>
        </div>
      </main>
      <NavBottom />
    </div>
  )
}
