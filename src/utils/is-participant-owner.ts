'only server'

import { getCurrentParticipant } from '@/actions/get-current-participant'

export async function isParticipantOwner(tripId: string) {
  const data = await getCurrentParticipant({ tripId })

  if (data?.data) {
    return data.data.participant.is_owner
  } else {
    return false
  }
}
