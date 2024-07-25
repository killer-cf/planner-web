import { notFound } from 'next/navigation'
import { Suspense } from 'react'

import { getCurrentUser } from '@/actions/get-current-user'
import { getTrip } from '@/actions/get-trip'

import { Activities } from './_components/activities'
import { ActivitiesSkeleton } from './_components/activities-skeleton'
import { CreateActivityModal } from './_components/create-activity-modal'
import { DestinationAndDateHeader } from './_components/destination-and-date-header'
import { Guests } from './_components/guests'
import { ImportantLinks } from './_components/important-links'

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

  const result = await getTrip({ tripId: params.id })

  if (result?.serverError) {
    return notFound()
  }

  return (
    <div className="max-w-6xl px-6 py-10 mx-auto space-y-8">
      <DestinationAndDateHeader trip={result?.data} />

      <main className="flex gap-16 px-4">
        <div className="flex-1 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-semibold">Atividades</h2>
            <CreateActivityModal tripId={params.id} />
          </div>

          <Suspense fallback={<ActivitiesSkeleton />} key={params.id}>
            <Activities tripId={params.id} />
          </Suspense>
        </div>
        <div className="w-80 space-y-6">
          <ImportantLinks tripId={params.id} />
          <div className="w-full h-px bg-zinc-800" />
          <Guests tripId={params.id} />
        </div>
      </main>
    </div>
  )
}
