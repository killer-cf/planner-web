'use client'

import { SignOutButton, UserButton } from '@clerk/nextjs'
import { useMediaQuery } from '@uidotdev/usehooks'
import { ArrowRightFromLine, Menu } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { useListUserTrips } from '@/hooks/trips'
import { formatDateRange } from '@/utils/format-date-range'

export function HeaderSheet() {
  const isDesktop = useMediaQuery('(min-width: 768px)')
  const { data: trips } = useListUserTrips({ enabled: !isDesktop })

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="secondary" className="md:hidden" size={'icon2'}>
          <Menu className="size-5" />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetHeader>
          <SheetTitle>
            <Image
              src="/logo.svg"
              alt="Plann.er"
              className="h-16"
              width={200}
              height={100}
            />
          </SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>
        <div className="flex flex-col flex-1">
          <div className="flex-1">
            <h4 className="text-medium font-medium text-zinc-200">
              Minhas viagens planejadas
            </h4>
            <div className="flex flex-col space-y-2 py-5">
              {trips?.data?.trips.map((trip) => (
                <Link
                  href={`/trips/${trip.id}`}
                  key={trip.id + trip.destination}
                >
                  <span className="text-zinc-400 underline ">
                    {trip.destination}
                    {' -> '}
                    {formatDateRange(trip.starts_at, trip.ends_at, true)}
                  </span>
                </Link>
              ))}
            </div>
          </div>
          <div className="flex gap-3">
            <UserButton />
            <SignOutButton>
              <Button size={'sm'} variant={'outline'}>
                <p className="text-destructive">Sair</p>
                <ArrowRightFromLine className="size-5 text-destructive" />
              </Button>
            </SignOutButton>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
