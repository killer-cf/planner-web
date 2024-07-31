'use client'

import { Plus } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

import { CreateActivityForm } from './activities/create-activity-form'

export function CreateActivityModal() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  function closeModal() {
    setIsModalOpen(false)
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="size-5" />
          Nova atividade
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[640px] rounded-xl shadow-shape bg-zinc-900 space-y-5">
        <DialogHeader>
          <DialogTitle>Cadastrar atividade</DialogTitle>
          <DialogDescription>
            Todos convidados podem visualizar as atividades.
          </DialogDescription>
        </DialogHeader>

        <CreateActivityForm closeModal={closeModal} />
      </DialogContent>
    </Dialog>
  )
}
