'use client'

import { Calendar, Plus, Tag } from 'lucide-react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

export function CreateActivityModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="bg-lime-300 text-lime-950 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-lime-400">
          <Plus className="size-5" />
          Cadastrar atividade
        </button>
      </DialogTrigger>
      <DialogContent className="w-[640px] rounded-xl shadow-shape bg-zinc-900 space-y-5">
        <DialogHeader>
          <DialogTitle>Cadastrar atividade</DialogTitle>
          <DialogDescription>
            Todos convidados podem visualizar as atividades.
          </DialogDescription>
        </DialogHeader>

        <form className="space-y-3">
          <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
            <Tag className="text-zinc-400 size-5" />
            <input
              name="title"
              placeholder="Qual a atividade?"
              className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
            />
          </div>

          <div className="h-14 flex-1 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
            <Calendar className="text-zinc-400 size-5" />
            <input
              type="datetime-local"
              name="occurs_at"
              placeholder="Data e horário da atividade"
              className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
            />
          </div>

          <button className="bg-lime-300 text-lime-950 w-full justify-center rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-lime-400">
            <Plus className="size-5" />
            Salvar atividade
          </button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
