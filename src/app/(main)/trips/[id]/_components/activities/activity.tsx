'use client'

import { DialogTrigger } from '@radix-ui/react-dialog'
import { format } from 'date-fns'
import { CircleCheck, Ellipsis } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Dialog } from '@/components/ui/dialog'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { Activity as ActivityDto } from '@/dtos/activity'

import { EditActivityModal } from './edit-activity-form'

interface ActivityProps {
  activity: ActivityDto
}

export function Activity({ activity }: ActivityProps) {
  return (
    <div className="space-y-2.5" key={activity.id}>
      <div className="px-4 py-2.5 bg-zinc-900 rounded-xl shadow-shape flex items-center gap-3">
        <CircleCheck className="size-5 text-lime-300" />
        <span className="text-zinc-100">{activity.title}</span>

        <span className="text-zinc-400 text-sm ml-auto">
          {format(new Date(activity.occurs_at), "HH:mm'h'")}
        </span>
        <TooltipProvider>
          <Dialog>
            <Tooltip>
              <TooltipTrigger asChild>
                <DialogTrigger asChild>
                  <Button variant={'transparent'} size={'icon2'}>
                    <Ellipsis className="size-4" />
                  </Button>
                </DialogTrigger>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-sm">Mais ações</p>
              </TooltipContent>
            </Tooltip>
            <EditActivityModal activity={activity} />
          </Dialog>
        </TooltipProvider>
      </div>
    </div>
  )
}
