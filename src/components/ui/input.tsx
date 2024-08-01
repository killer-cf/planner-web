import { LucideIcon } from 'lucide-react'
import * as React from 'react'

import { cn } from '@/lib/utils'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  isInvalid?: boolean
  icon?: LucideIcon
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, isInvalid = false, icon: Icon, ...props }, ref) => {
    return (
      <div
        className={`h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2 ${isInvalid && 'border-destructive'}`}
      >
        {Icon && (
          <Icon
            className={`text-zinc-400 size-5 ${isInvalid && 'text-destructive'}`}
          />
        )}

        <input
          type={type}
          className={cn(
            'flex bg-transparent text-lg placeholder-zinc-400 outline-none flex-1 file:border-0 file:text-sm file:font-medium disabled:cursor-not-allowed disabled:opacity-50',
            className,
          )}
          ref={ref}
          {...props}
        />
      </div>
    )
  },
)
Input.displayName = 'Input'

export { Input }
