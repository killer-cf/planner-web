'use client'

import { useMediaQuery } from '@uidotdev/usehooks'
import { Dispatch, ReactNode, SetStateAction } from 'react'

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
  content: ReactNode
  children: ReactNode
  open: boolean
  onChangeOpen: Dispatch<SetStateAction<boolean>>
}

export function ModalDrawer({
  content,
  description,
  children,
  title,
  open,
  onChangeOpen,
}: ModalDrawerProps) {
  const isDesktop = useMediaQuery('(min-width: 768px)')

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={onChangeOpen}>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          {content}
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={onChangeOpen}>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent className="shadow-shape space-y-3 px-2.5 mb-8">
        <DrawerHeader className="px-2.5">
          <DrawerTitle className="text-left">{title}</DrawerTitle>
          <DrawerDescription className="text-left">
            {description}
          </DrawerDescription>
        </DrawerHeader>
        <div className="px-2.5">{content}</div>
      </DrawerContent>
    </Drawer>
  )
}
