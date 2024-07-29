import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query'

import { createLink } from '@/actions/create-link'
import { deleteLink } from '@/actions/delete-links'
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

export const useDeleteLink = ({ tripId }: { tripId: string }) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deleteLink,
    onSuccess(response, variables) {
      if (response?.serverError) {
        return
      }

      return queryClient.setQueryData(
        ['trip-important-links', tripId],
        (data: {
          data: ListTripLinksResponse
        }): { data: ListTripLinksResponse } => {
          const updatedLinks = data.data.links.filter(
            (link) => link.id !== variables.linkId,
          )

          return {
            data: {
              links: updatedLinks,
            },
          }
        },
      )
    },
  })
}
