import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query'

import { inviteParticipant } from '@/actions/invite-trip-participant'
import { listTripParticipants } from '@/actions/list-trip-participants'
import { ListTripParticipantsResponse, Participant } from '@/dtos/participant'

interface UseListParticipantsProps {
  tripId: string
}

export function useListParticipants({ tripId }: UseListParticipantsProps) {
  return useSuspenseQuery({
    queryKey: ['trip-participants', tripId],
    queryFn: () => listTripParticipants({ tripId }),
  })
}

export const useInviteParticipant = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: inviteParticipant,
    onSuccess(response, variables) {
      if (response?.data) {
        const participantId = response.data.participantId

        const participant: Participant = {
          id: participantId,
          email: variables.email,
          is_confirmed: false,
          name: '',
          user: null,
        }

        return queryClient.setQueryData(
          ['trip-participants', variables.tripId],
          (data: {
            data: ListTripParticipantsResponse
          }): { data: ListTripParticipantsResponse } => {
            const updatedParticipants = [...data.data.participants, participant]

            return {
              data: {
                participants: updatedParticipants,
              },
            }
          },
        )
      }
    },
  })
}
