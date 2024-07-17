import { Link2 } from 'lucide-react'
import Link from 'next/link'

import { listTripLinks } from '@/actions/list-trip-links'

import { CreateLinkButtonAndModal } from './create-link-button-and-modal'

interface ImportantLinksProps {
  tripId: string
}

export async function ImportantLinks({ tripId }: ImportantLinksProps) {
  const result = await listTripLinks({ tripId })

  if (!result?.data) return null

  return (
    <div className="space-y-6">
      <h2 className="font-semibold text-xl">Links importantes</h2>

      <div className="space-y-5">
        {result.data.links.map((link) => (
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
            <Link2 className="size-5 text-zinc-400 shrink-0" />
          </div>
        ))}
      </div>

      <CreateLinkButtonAndModal tripId={tripId} />
    </div>
  )
}
