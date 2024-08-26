"use client"

import { SignIn } from "@clerk/nextjs"
import { useSearchParams } from "next/navigation"

export default function Page() {
	const searchParams = useSearchParams()

	return (
		<div className="h-screen flex justify-center items-center">
			<SignIn
				initialValues={{ emailAddress: searchParams.get("email") ?? "" }}
			/>
		</div>
	)
}
