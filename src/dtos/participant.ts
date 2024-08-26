export type Participant = {
	id: string
	name: string
	email: string
	is_confirmed: boolean
	is_owner: boolean
	user: {
		id: string
		name: string
		email: string
	} | null
}

export type ListTripParticipantsResponse = {
	participants: Participant[]
}

export type GetCurrentParticipantResponse = {
	participant: Participant
}
