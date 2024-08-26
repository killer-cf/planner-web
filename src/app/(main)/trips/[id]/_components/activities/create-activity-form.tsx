'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { parseAbsoluteToLocal } from '@internationalized/date'
import { DateInput } from '@nextui-org/date-input'
import { parseISO } from 'date-fns'
import { Calendar, Plus, Tag } from 'lucide-react'
import { useParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { type ActivityFormData, loadActivityFormSchema } from '@/dtos/activity'
import { useCreateActivity } from '@/hooks/activity'
import { useCurrentTripStore } from '@/stores/current-trip'

interface CreateActivityModalProps {
	closeModal: () => void
}

export function CreateActivityForm({ closeModal }: CreateActivityModalProps) {
	const params = useParams<{ id: string }>()
	const { trip } = useCurrentTripStore((state) => ({
		trip: state.trip
	}))
	const form = useForm<ActivityFormData>({
		mode: 'onChange',
		resolver: zodResolver(loadActivityFormSchema(trip)),
		defaultValues: {
			title: '',
			occursAt: parseISO(new Date().toISOString())
		}
	})
	const {
		reset,
		handleSubmit,
		formState: { isSubmitting, isValid }
	} = form

	const createAct = useCreateActivity()

	async function handleCreateActivity({ occursAt, title }: ActivityFormData) {
		const result = await createAct.mutateAsync({
			tripId: params.id,
			occursAt,
			title
		})

		if (result) {
			toast.success('Atividade cadastrada com sucesso!')
			reset()
			closeModal()
		}

		if (result?.serverError) {
			toast.error(result.serverError)
		}
	}
	return (
		<Form {...form}>
			<form onSubmit={handleSubmit(handleCreateActivity)} className="space-y-3">
				<FormField
					control={form.control}
					name="title"
					render={({ field, fieldState }) => (
						<FormItem>
							<FormControl>
								<Input
									{...field}
									isInvalid={fieldState.invalid}
									icon={Tag}
									placeholder="Qual a atividade?"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="occursAt"
					render={({ field, fieldState }) => (
						<FormItem>
							<FormControl>
								<div
									className={`h-14 flex-1 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2 ${fieldState.invalid && 'border-destructive'}`}
								>
									<DateInput
										aria-label="Data e hora da atividade"
										value={
											field.value
												? parseAbsoluteToLocal(field.value.toISOString())
												: null
										}
										onChange={(date) => date && field.onChange(date.toDate())}
										granularity="minute"
										label={null}
										hideTimeZone
										isInvalid={fieldState.invalid}
										hourCycle={24}
										startContent={
											<Calendar
												className={`text-zinc-400 size-5 ${fieldState.invalid && 'text-destructive'}`}
											/>
										}
										classNames={{
											base: 'group-data-[invalid=true]:bg-transparent',
											inputWrapper:
												'bg-transparent text-lg placeholder-zinc-400 border-none group-hover:bg-zinc-950 group-data-[invalid=true]:bg-inherit group-data-[invalid=true]:hover:bg-inherit group-data-[invalid=true]:focus-within:hover:bg-inherit'
										}}
									/>
								</div>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button type="submit" size={'full'} disabled={isSubmitting || !isValid}>
					<Plus className="size-5" />
					Salvar atividade
				</Button>
			</form>
		</Form>
	)
}
