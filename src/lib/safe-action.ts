import { HTTPError } from 'ky'
import { createSafeActionClient } from 'next-safe-action'

export const actionClient = createSafeActionClient({
  async handleReturnedServerError(error) {
    if (error instanceof HTTPError) {
      const data = await error.response.json()

      return data.errors[0] || data.error || data.message
    }

    return 'Ocorreu um erro inesperado, tente novamente mais tarde'
  },
})
