import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query'

import { createLink } from '@/actions/create-link'
import { listTripLinks } from '@/actions/list-trip-links'
import { ListTripLinksResponse } from '@/dtos/link'

interface UseListLinksProps {
  tripId: string
}

export function useListLinks({ tripId }: UseListLinksProps) {
  return useSuspenseQuery({
    queryKey: ['trip-important-links', tripId],
    queryFn: () => listTripLinks({ tripId }),
  })
}

export const useCreateLink = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: createLink,
    onSuccess(response, variables) {
      if (response?.data) {
        const linkId = response.data.linkId

        return queryClient.setQueryData(
          ['trip-important-links', variables.tripId],
          (data: {
            data: ListTripLinksResponse
          }): { data: ListTripLinksResponse } => {
            if (!data) {
              return {
                data: {
                  links: [
                    { id: linkId, title: variables.title, url: variables.url },
                  ],
                },
              }
            }

            return {
              data: {
                links: [
                  ...data.data.links,
                  { id: linkId, title: variables.title, url: variables.url },
                ],
              },
            }
          },
        )
      }
    },
  })
}
