'use client'

import { format, parseISO } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import { useListActivities } from '@/hooks/activity'
import { capitalize } from '@/utils/capitalize'

import { Activity } from './activity'

interface ActivitiesClientProps {
  tripId: string
}

export function ActivitiesClient({ tripId }: ActivitiesClientProps) {
  const { data } = useListActivities({ tripId })

  const result = data?.data

  return (
    <div className="space-y-8">
      {result?.activities.map((activitiesGroup) => (
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
              <Activity activity={activity} key={activity.id} />
            ))
          )}
        </div>
      ))}
    </div>
  )
}
