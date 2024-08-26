import {
	QueryClient,
	defaultShouldDehydrateQuery,
	isServer
} from "@tanstack/react-query"

function makeQueryClient() {
	return new QueryClient({
		defaultOptions: {
			queries: {
				staleTime: Number.POSITIVE_INFINITY
			},
			dehydrate: {
				// include pending queries in dehydration
				shouldDehydrateQuery: (query) =>
					defaultShouldDehydrateQuery(query) || query.state.status === "pending"
			}
		}
	})
}

let browserQueryClient: QueryClient | undefined

export function getQueryClient() {
	if (isServer) {
		return makeQueryClient()
	}
	if (!browserQueryClient) browserQueryClient = makeQueryClient()
	return browserQueryClient
}
