import { create } from 'zustand'

export interface CreateTripState {
  destination: string
  startsAt: Date
  endsAt: Date
  ownerName: string
  ownerEmail: string
  emailsToInvite: string[]
  setDestinationAndDates: (data: {
    destination: string
    startsAt: Date
    endsAt: Date
  }) => void
  setEmailsToInvite: (emails: string[]) => void
  clearState: () => void
}

export const useTripStore = create<CreateTripState>((set) => ({
  destination: '',
  startsAt: new Date(),
  endsAt: new Date(),
  ownerName: '',
  ownerEmail: '',
  emailsToInvite: [],

  setDestinationAndDates: ({ destination, startsAt, endsAt }) =>
    set({ destination, startsAt, endsAt }),

  setEmailsToInvite: (emails) => set({ emailsToInvite: emails }),

  clearState: () => set({}),
}))
