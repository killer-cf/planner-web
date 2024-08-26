import { auth, clerkClient } from "@clerk/nextjs/server"
import { HTTPError } from "ky"
import { createSafeActionClient } from "next-safe-action"

export const actionClient = createSafeActionClient({
	async handleReturnedServerError(error) {
		if (error instanceof HTTPError) {
			const data = await error.response.json<{
				errors: string[]
				error: string
				message: string
			}>()

			if (data.errors && data.errors.length > 0) {
				return data.errors[0]
			}

			return data.error || data.message
		}

		return "Ocorreu um erro inesperado, tente novamente mais tarde"
	}
})

export const authActionClient = actionClient.use(async ({ next }) => {
	const { userId, sessionId } = auth()

	if (!userId || !sessionId) {
		throw new Error("User logged out")
	}

	const token = await clerkClient().sessions.getToken(sessionId, "default")

	return next({ ctx: { userId, token: token.jwt } })
})
