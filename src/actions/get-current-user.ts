'use server'

import { GetCurrentUserResponse } from '@/dtos/user'
import { api } from '@/lib/api'
import { authActionClient } from '@/lib/safe-action'

export const getCurrentUser = authActionClient.action(
  async ({ ctx: { token, userId } }) => {
    const res = await api
      .get(`api/v1/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .json<GetCurrentUserResponse>()

    return res.user
  },
)
