import { Slot } from '@radix-ui/react-slot'
import { type VariantProps, cva } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
	'inline-flex items-center justify-center whitespace-nowrap gap-2 rounded-lg font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
	{
		variants: {
			variant: {
				default: 'bg-lime-300 text-lime-950 hover:bg-lime-400',
				destructive:
					'bg-destructive text-destructive-foreground hover:bg-destructive/90',
				outline:
					'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
				secondary: 'bg-zinc-800 text-zinc-200 hover:bg-zinc-700',
				ghost: 'hover:bg-accent hover:text-accent-foreground',
				link: 'text-primary underline-offset-4 hover:underline',
				transparent: 'bg-transparent text-zinc-200'
			},
			size: {
				default: 'h-10 px-5 py-2',
				sm: 'h-9 rounded-md px-3',
				lg: 'h-11 rounded-md px-8',
				icon: 'h-10 w-10',
				icon2: 'h-8 w-8',
				full: 'w-full h-11'
			}
		},
		defaultVariants: {
			variant: 'default',
			size: 'default'
		}
	}
)

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant, size, asChild = false, ...props }, ref) => {
		const Comp = asChild ? Slot : 'button'
		return (
			<Comp
				className={cn(buttonVariants({ variant, size, className }))}
				ref={ref}
				{...props}
			/>
		)
	}
)
Button.displayName = 'Button'

export { Button, buttonVariants }
