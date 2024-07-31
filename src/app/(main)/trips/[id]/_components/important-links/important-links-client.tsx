'use client'

import { Trash } from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { useDeleteLink, useListLinks } from '@/hooks/links'

import { CreateLinkButtonAndModal } from './create-link-button-and-modal'

interface ImportantLinksProps {
  tripId: string
}

export function ImportantLinksClient({ tripId }: ImportantLinksProps) {
  const { data } = useListLinks({ tripId })
  const deleteLink = useDeleteLink({ tripId })

  if (!data?.data) return null

  async function handleDeleteLink(id: string) {
    const result = await deleteLink.mutateAsync({ linkId: id })

    if (!result?.serverError) {
      toast.success('Link deletado com sucesso!')
    }

    if (result?.serverError) {
      toast.error(result.serverError)
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="font-semibold text-xl">Links importantes</h2>

      <div className="space-y-5">
        {data.data.links.map((link) => (
          <div
            className="flex items-center justify-between gap-4"
            key={link.id}
          >
            <div className="space-y-1.5">
              <span className="block font-medium text-zinc-100">
                {link.title}
              </span>
              <Link
                href={link.url}
                className="block text-xs text-zinc-400 truncate hover:text-zinc-200"
              >
                {link.url}
              </Link>
            </div>
            <Button
              variant={'ghost'}
              size={'icon2'}
              className="shrink-0"
              onClick={() => handleDeleteLink(link.id)}
              disabled={deleteLink.isPending}
            >
              <Trash className="size-4 text-red-500" />
            </Button>
          </div>
        ))}
      </div>

      <CreateLinkButtonAndModal />
    </div>
  )
}
