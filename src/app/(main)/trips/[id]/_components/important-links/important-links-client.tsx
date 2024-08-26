'use client'

import { Plus, Trash } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { toast } from 'sonner'

import { ModalDrawer } from '@/components/modal-drawer'
import { Button } from '@/components/ui/button'
import { useDeleteLink, useListLinks } from '@/hooks/links'

import { CreateLinkForm } from './create-link-form'
import { ImportantLinksSkeleton } from './important-links-skeleton'

interface ImportantLinksProps {
	tripId: string
}

export function ImportantLinksClient({ tripId }: ImportantLinksProps) {
	const [isModalOpen, setIsModalOpen] = useState(false)

	function closeModal() {
		setIsModalOpen(false)
	}
	const { data, isLoading } = useListLinks({ tripId })
	const deleteLink = useDeleteLink({ tripId })

	if (!data?.data || isLoading) {
		return <ImportantLinksSkeleton />
	}

	async function handleDeleteLink(id: string) {
		const result = await deleteLink.mutateAsync({ linkId: id })

		if (!result?.serverError) {
			toast.success('Link deletado com sucesso!')
		}

		if (result?.serverError) {
			toast.error(result.serverError)
		}
	}

	return (
		<div className="space-y-6">
			<h2 className="font-semibold text-xl">Links importantes</h2>

			<div className="space-y-5">
				{data.data.links.map((link) => (
					<div
						className="flex items-center justify-between gap-4"
						key={link.id}
					>
						<div className="space-y-1.5">
							<span className="block font-medium text-zinc-100">
								{link.title}
							</span>
							<Link
								href={link.url}
								className="block text-xs text-zinc-400 truncate hover:text-zinc-200"
							>
								{link.url}
							</Link>
						</div>
						<Button
							variant={'ghost'}
							size={'icon2'}
							className="shrink-0"
							onClick={() => handleDeleteLink(link.id)}
							disabled={deleteLink.isPending}
						>
							<Trash className="size-4 text-red-500" />
						</Button>
					</div>
				))}
			</div>

			<ModalDrawer
				title="Cadastrar novo link"
				description="Adicione um novo link para sua viagem, todos os convidados poderão ver."
				open={isModalOpen}
				onChangeOpen={setIsModalOpen}
				content={<CreateLinkForm closeModal={closeModal} />}
			>
				<Button variant={'secondary'} size={'full'}>
					<Plus className="size-5" />
					Cadastrar novo link
				</Button>
			</ModalDrawer>
		</div>
	)
}
