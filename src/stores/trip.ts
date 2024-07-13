import { create } from 'zustand'

export interface CreateTripState {
  destination: string
  startsAt: Date
  endsAt: Date
  ownerName: string
  ownerEmail: string
  emailsToInvite: string[]

  setOwner: (name: string, email: string) => void
  setDestinationAndDates: (data: {
    destination: string
    startsAt: Date
    endsAt: Date
  }) => void
  clearState: () => void
}

export const useTripStore = create<CreateTripState>((set, get) => ({
  destination: '',
  startsAt: new Date(),
  endsAt: new Date(),
  ownerName: '',
  ownerEmail: '',
  emailsToInvite: [],

  setOwner: (name, email) => set({ ownerName: name, ownerEmail: email }),

  setDestinationAndDates: ({ destination, startsAt, endsAt }) =>
    set({ destination, startsAt, endsAt }),

  clearState: () => set({}),
}))
