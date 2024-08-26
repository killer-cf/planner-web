'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Mail, Navigation } from 'lucide-react'
import { useParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useInviteParticipant } from '@/hooks/guests'

const newGuestFormSchema = z.object({
	email: z.string().email()
})

type NewGuestFormData = z.infer<typeof newGuestFormSchema>

interface CreateGuestFormProps {
	closeModal: () => void
}

export function GuestsForm({ closeModal }: CreateGuestFormProps) {
	const params = useParams<{ id: string }>()
	const form = useForm<NewGuestFormData>({
		resolver: zodResolver(newGuestFormSchema)
	})

	const {
		handleSubmit,
		reset,
		formState: { isSubmitting }
	} = form

	const inviteParticipant = useInviteParticipant()

	async function handleInviteParticipant({ email }: NewGuestFormData) {
		const result = await inviteParticipant.mutateAsync({
			tripId: params.id,
			email
		})

		if (result?.serverError) toast.error(result.serverError)
		if (result?.data) {
			closeModal()
			toast.success('Participante convidado!')
			reset()
		}
	}

	return (
		<Form {...form}>
			<form
				onSubmit={handleSubmit(handleInviteParticipant)}
				className="space-y-3"
			>
				<FormField
					control={form.control}
					name="email"
					render={({ field, fieldState }) => (
						<FormItem>
							<FormControl>
								<Input
									{...field}
									isInvalid={fieldState.invalid}
									icon={Mail}
									placeholder="Email do participante"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button type="submit" size={'full'} disabled={isSubmitting}>
					<Navigation className="size-5" />
					Enviar Convite
				</Button>
			</form>
		</Form>
	)
}
