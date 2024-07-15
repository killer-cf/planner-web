import { format, parseISO } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { CircleCheck } from 'lucide-react'

import { listTripActivities } from '@/actions/list-trip-activities'
import { capitalize } from '@/utils/capitalize'

interface ActivitiesProps {
  tripId: string
}

export async function Activities({ tripId }: ActivitiesProps) {
  const result = await listTripActivities({ tripId })

  if (!result?.data?.activities) {
    return null
  }

  return (
    <div className="space-y-8">
      {result.data.activities.map((activitiesGroup) => (
        <div className="space-y-2.5" key={activitiesGroup.date}>
          <div className="flex gap-2 items-baseline">
            <span className="text-xl text-zinc-300 font-semibold">
              Dia{' '}
              {format(parseISO(activitiesGroup.date), "dd 'de' LLLL", {
                locale: ptBR,
              })}
            </span>
            <span className="text-xs text-zinc-500">
              {capitalize(
                format(parseISO(activitiesGroup.date), 'EEEE', {
                  locale: ptBR,
                }),
              )}
            </span>
          </div>
          {activitiesGroup.activities.length === 0 ? (
            <p className="text-zinc-500 text-sm">
              Nenhuma atividade cadastrada nessa data.
            </p>
          ) : (
            activitiesGroup.activities.map((activity) => (
              <div className="space-y-2.5" key={activity.id}>
                <div className="px-4 py-2.5 bg-zinc-900 rounded-xl shadow-shape flex items-center gap-3">
                  <CircleCheck className="size-5 text-lime-300" />
                  <span className="text-zinc-100">{activity.title}</span>
                  <span className="text-zinc-400 text-sm ml-auto">
                    {format(activity.occurs_at, "HH:mm'h'")}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      ))}
    </div>
  )
}
