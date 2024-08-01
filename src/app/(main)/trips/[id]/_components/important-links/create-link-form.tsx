'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Link2, Plus, Tag } from 'lucide-react'
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
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useCreateLink } from '@/hooks/links'

const createLinkFormSchema = z.object({
  title: z
    .string()
    .min(4, { message: 'O título deve ter no mínimo 4 caracteres' }),
  url: z.string().url({ message: 'URL inválida' }),
})

type CreateLinkFormData = z.infer<typeof createLinkFormSchema>

interface CreateLinkFormProps {
  closeModal: () => void
}

export function CreateLinkForm({ closeModal }: CreateLinkFormProps) {
  const params = useParams<{ id: string }>()
  const createLink = useCreateLink()
  const form = useForm<CreateLinkFormData>({
    mode: 'onChange',
    resolver: zodResolver(createLinkFormSchema),
  })

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting, isValid },
  } = form

  async function handleCreateLink({ title, url }: CreateLinkFormData) {
    const result = await createLink.mutateAsync({
      tripId: params.id,
      title,
      url,
    })

    if (result?.serverError) toast.error(result.serverError)
    if (result?.data) {
      closeModal()
      toast.success('Link adicionado com sucesso!')
      reset()
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(handleCreateLink)} className="space-y-3">
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
                  placeholder="Ao oque se refere o link?"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="url"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  isInvalid={fieldState.invalid}
                  icon={Link2}
                  placeholder="URL do link"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" size={'full'} disabled={isSubmitting || !isValid}>
          <Plus className="size-5" />
          Adicionar link
        </Button>
      </form>
    </Form>
  )
}
