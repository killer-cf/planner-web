export type User = {
	id: string
	name: string
	email: string
	trip_ids: string[]
}

export type GetCurrentUserResponse = {
	user: User
}
