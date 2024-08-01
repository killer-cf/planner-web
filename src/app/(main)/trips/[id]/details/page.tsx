'use client'

import { useMediaQuery } from '@uidotdev/usehooks'
import { notFound } from 'next/navigation'

import { GuestsClient } from '../_components/guests/guests-client'
import { ImportantLinksClient } from '../_components/important-links/important-links-client'

interface DetailsPageProps {
  params: {
    id: string
  }
}

export default function DetailsPage({ params }: DetailsPageProps) {
  const isDesktop = useMediaQuery('(min-width: 768px)')

  if (isDesktop) notFound()

  return (
    <div className="space-y-6 px-1 h-screen">
      <ImportantLinksClient tripId={params.id} />
      <div className="w-full h-px bg-zinc-800" />
      <GuestsClient tripId={params.id} />
    </div>
  )
}
