'use server'

import { z } from 'zod'

import { api } from '@/lib/api'
import { authActionClient } from '@/lib/safe-action'

const deleteLinkSchema = z.object({
  linkId: z.string(),
})

export const deleteLink = authActionClient
  .schema(deleteLinkSchema)
  .action(async ({ parsedInput: data, ctx: { token } }) => {
    await api
      .delete(`api/v1/links/${data.linkId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .json()
  })
