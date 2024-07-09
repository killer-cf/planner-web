import { ConfirmTripModalTrigger } from './confirm-trip-modal-trigger'
import { GuestsModalTrigger } from './guests-modal-trigger'

export function InviteGuestsStep() {
  return (
    <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">
      <GuestsModalTrigger />
      <div className="w-px h-6 bg-zinc-800" />
      <ConfirmTripModalTrigger />
    </div>
  )
}
