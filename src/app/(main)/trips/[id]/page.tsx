import { getTrip } from '@/actions/get-trip'

import { Activities } from './_components/activities'
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
  const result = await getTrip({ tripId: params.id })

  return (
    <div className="max-w-6xl px-6 py-10 mx-auto space-y-8">
      <DestinationAndDateHeader trip={result?.data} />

      <main className="flex gap-16 px-4">
        <div className="flex-1 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-semibold">Atividades</h2>
            <CreateActivityModal tripId={params.id} />
          </div>

          <Activities tripId={params.id} />
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
