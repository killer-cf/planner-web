import { Skeleton } from '@/components/ui/skeleton'

export function HeaderSkeleton() {
  return (
    <div className="px-4 h-16 rounded-xl bg-zinc-900 shadow-shape flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Skeleton className="size-5" />
        <Skeleton className="w-14 h-4 md:w-24" />
      </div>

      <div className="flex items-center gap-5">
        <div className="items-center gap-2 hidden md:flex">
          <Skeleton className="size-5" />
          <Skeleton className="w-44 h-4" />
        </div>

        <div className="w-px h-6 bg-zinc-800 hidden md:block" />

        <Skeleton className="md:w-48 md:h-8 h-4 w-32" />
        <Skeleton className="size-6 md:size-8 rounded-full" />
      </div>
    </div>
  )
}
