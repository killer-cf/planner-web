'use client'

import { useMediaQuery } from '@uidotdev/usehooks'
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
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'

import { CreateLinkForm } from './create-link-form'

export function CreateLinkButtonAndModal() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const isDesktop = useMediaQuery('(min-width: 768px)')

  function closeModal() {
    setIsModalOpen(false)
  }

  if (isDesktop) {
    return (
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogTrigger asChild>
          <Button variant={'secondary'} size={'full'}>
            <Plus className="size-5" />
            Cadastrar novo link
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cadastrar novo link</DialogTitle>
            <DialogDescription>
              Adicione um novo link para sua viagem, todos os convidados poderão
              ver.
            </DialogDescription>
          </DialogHeader>
          <CreateLinkForm closeModal={closeModal} />
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DrawerTrigger asChild>
        <Button variant={'secondary'} size={'full'}>
          <Plus className="size-5" />
          Cadastrar novo link
        </Button>
      </DrawerTrigger>
      <DrawerContent className="shadow-shape space-y-3 px-2.5 mb-8">
        <DrawerHeader>
          <DrawerTitle className="text-left">Cadastrar novo link</DrawerTitle>
          <DrawerDescription className="text-left">
            Adicione um novo link para sua viagem, todos os convidados poderão
            ver.
          </DrawerDescription>
        </DrawerHeader>
        <CreateLinkForm closeModal={closeModal} />
      </DrawerContent>
    </Drawer>
  )
}
