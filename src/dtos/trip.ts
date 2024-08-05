export type Trip = {
  id: string
  destination: string
  starts_at: string
  ends_at: string
}

export type GetTripResponse = {
  trip: Trip
}

export type ListUserTripsResponse = {
  trips: Trip[]
}
