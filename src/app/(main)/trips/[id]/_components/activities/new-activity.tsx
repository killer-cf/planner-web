'use client'

import { Plus } from 'lucide-react'
import { useState } from 'react'

import { ModalDrawer } from '@/components/modal-drawer'
import { Button } from '@/components/ui/button'

import { CreateActivityForm } from './create-activity-form'

export function NewActivity() {
	const [isModalOpen, setIsModalOpen] = useState(false)

	function closeModal() {
		setIsModalOpen(false)
	}

	return (
		<ModalDrawer
			title="Cadastrar atividade"
			description="Todos convidados podem visualizar as atividades."
			open={isModalOpen}
			onChangeOpen={setIsModalOpen}
			content={<CreateActivityForm closeModal={closeModal} />}
		>
			<Button>
				<Plus className="size-5" />
				Nova atividade
			</Button>
		</ModalDrawer>
	)
}
