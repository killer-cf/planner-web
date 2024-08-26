import { create } from "zustand"

import type { Trip } from "@/dtos/trip"

export interface CreateTripState {
	trip: Trip
	setCurrentTrip: (data: Trip) => void
}

export const useCurrentTripStore = create<CreateTripState>((set) => ({
	trip: {} as Trip,

	setCurrentTrip: (trip) => set({ trip })
}))
