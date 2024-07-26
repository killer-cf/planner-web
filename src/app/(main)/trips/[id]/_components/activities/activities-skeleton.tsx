export function ActivitiesSkeleton() {
  return (
    <div className="space-y-8">
      {[1, 2, 3].map((index) => (
        <div className="space-y-2.5" key={index}>
          <div className="flex gap-2 items-baseline">
            <span className="text-xl text-zinc-300 font-semibold">
              <span className="animate-pulse bg-zinc-800 rounded-lg h-5 w-10 block" />
            </span>
            <span className="text-xs text-zinc-500">
              <span className="animate-pulse bg-zinc-800 rounded-lg h-5 w-10 block" />
            </span>
          </div>
          {[1, 2, 3].map((index) => (
            <div className="space-y-2.5" key={index}>
              <div className="px-4 py-2.5 bg-zinc-900 rounded-xl shadow-shape flex items-center gap-3">
                <span className="animate-pulse bg-zinc-800 rounded-lg h-5 w-10 block" />
                <span className="text-zinc-100">
                  <span className="animate-pulse bg-zinc-800 rounded-lg h-5 w-10 block" />
                </span>
                <span className="text-zinc-400 text-sm ml-auto">
                  <span className="animate-pulse bg-zinc-800 rounded-lg h-5 w-10 block" />
                </span>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
