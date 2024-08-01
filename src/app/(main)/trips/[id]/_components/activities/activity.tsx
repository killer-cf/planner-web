'use client'

import { format } from 'date-fns'
import { CircleCheck, Ellipsis } from 'lucide-react'
import { useState } from 'react'

import { ModalDrawer } from '@/components/modal-drawer'
import { Button } from '@/components/ui/button'
import { Activity as ActivityDto } from '@/dtos/activity'

import { EditActivityModal } from './edit-activity-form'

interface ActivityProps {
  activity: ActivityDto
}

export function Activity({ activity }: ActivityProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  function closeModal() {
    setIsModalOpen(false)
  }

  return (
    <div className="space-y-2.5">
      <div className="px-4 py-2.5 bg-zinc-900 rounded-xl shadow-shape flex items-center gap-3">
        <CircleCheck className="size-5 text-lime-300" />
        <span className="text-zinc-100">{activity.title}</span>

        <span className="text-zinc-400 text-sm ml-auto">
          {format(new Date(activity.occurs_at), "HH:mm'h'")}
        </span>
        <ModalDrawer
          title="Ações da atividade"
          description="Aqui você pode editar a atividade, alterando o título e a data/hora. E também pode excluir a atividade."
          open={isModalOpen}
          onChangeOpen={setIsModalOpen}
          content={
            <EditActivityModal activity={activity} closeModal={closeModal} />
          }
        >
          <Button variant={'transparent'} size={'icon2'}>
            <Ellipsis className="size-4" />
          </Button>
        </ModalDrawer>
      </div>
    </div>
  )
}
