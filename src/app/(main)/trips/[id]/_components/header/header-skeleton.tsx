import { Skeleton } from '@/components/ui/skeleton'

export function HeaderSkeleton() {
  return (
    <div className="px-4 h-16 rounded-xl bg-zinc-900 shadow-shape flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Skeleton className="size-5" />
        <Skeleton className="w-24 h-4" />
      </div>

      <div className="flex items-center gap-5">
        <div className="flex items-center gap-2">
          <Skeleton className="size-5" />
          <Skeleton className="w-44 h-4" />
        </div>

        <div className="w-px h-6 bg-zinc-800" />

        <Skeleton className="w-48 h-8" />
        <Skeleton className="size-8 rounded-full" />
      </div>
    </div>
  )
}
