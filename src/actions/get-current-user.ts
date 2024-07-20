'use server'

import { auth } from '@clerk/nextjs/server'

import { GetCurrentUserResponse } from '@/dtos/user'
import { api } from '@/lib/api'
import { actionClient } from '@/lib/safe-action'

export const getCurrentUser = actionClient.action(async () => {
  const { userId } = auth()

  if (!userId) {
    throw new Error('User logged out')
  }

  const res = await api
    .get(`api/v1/users/${userId}`, {
      cache: 'no-cache',
    })
    .json<GetCurrentUserResponse>()

  return res.user
})
