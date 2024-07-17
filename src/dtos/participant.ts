export type Participant = {
  id: string
  name: string
  email: string
  is_confirmed: boolean
}

export type ListTripParticipantsResponse = {
  participants: Participant[]
}
