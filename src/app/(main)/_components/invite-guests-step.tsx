import { ConfirmTripModalTrigger } from './confirm-trip-modal-trigger'
import { GuestsModalTrigger } from './guests-modal-trigger'

export function InviteGuestsStep() {
  return (
    <div className="md:h-16 bg-zinc-900 md:py-0 py-5 px-4 rounded-xl flex md:flex-row flex-col md:items-center md:shadow-shape md:gap-3 gap-5">
      <GuestsModalTrigger />
      <div className="w-px h-6 bg-zinc-800 md:block hidden" />
      <ConfirmTripModalTrigger />
    </div>
  )
}
