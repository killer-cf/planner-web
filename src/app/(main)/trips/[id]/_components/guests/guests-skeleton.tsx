import { Skeleton } from '@/components/ui/skeleton'

export function GuestsSkeleton() {
  return (
    <div className="space-y-6">
      <h2 className="font-semibold text-xl">Convidados</h2>

      <div className="space-y-5">
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-1.5">
            <Skeleton className="w-20 h-4" />
            <Skeleton className="w-48 h-3" />
          </div>
          <Skeleton className="size-5" />
        </div>

        <div className="flex items-center justify-between gap-4">
          <div className="space-y-1.5">
            <Skeleton className="w-20 h-4" />
            <Skeleton className="w-48 h-3" />
          </div>
          <Skeleton className="size-5" />
        </div>

        <div className="flex items-center justify-between gap-4">
          <div className="space-y-1.5">
            <Skeleton className="w-20 h-4" />
            <Skeleton className="w-48 h-3" />
          </div>
          <Skeleton className="size-5" />
        </div>
      </div>
    </div>
  )
}
