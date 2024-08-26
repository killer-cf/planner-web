"use client"

import { QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

import { getQueryClient } from "@/lib/get-query-client"

export function ReactQueryProvider({
	children
}: {
	children: React.ReactNode
}) {
	const queryClient = getQueryClient()

	return (
		<QueryClientProvider client={queryClient}>
			<ReactQueryDevtools />
			{children}
		</QueryClientProvider>
	)
}
