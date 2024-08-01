'use client'

import { useMediaQuery } from '@uidotdev/usehooks'
import { ReactElement, ReactNode, useState } from 'react'

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

interface ModalDrawerProps {
  title: string
  description: ReactNode
  form: ({ closeModal }: { closeModal: () => void }) => ReactElement
  children: ReactNode
}

export function ModalDrawer({
  form: Form,
  description,
  children,
  title,
}: ModalDrawerProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const isDesktop = useMediaQuery('(min-width: 768px)')

  function closeModal() {
    setIsModalOpen(false)
  }

  if (isDesktop) {
    return (
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          <Form closeModal={closeModal} />
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent className="shadow-shape space-y-3 px-2.5 mb-8">
        <DrawerHeader className="px-2.5">
          <DrawerTitle className="text-left">{title}</DrawerTitle>
          <DrawerDescription className="text-left">
            {description}
          </DrawerDescription>
        </DrawerHeader>
        <div className="px-2.5">
          <Form closeModal={closeModal} />
        </div>
      </DrawerContent>
    </Drawer>
  )
}
