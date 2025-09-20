import { useTransition } from 'react'

export default function PendingAction({ action, render }) {
  const [isPending, startTransition] = useTransition()

  function onNavigate(event, stopPropagation = false) {
    if (event && event.preventDefault) {
      event.preventDefault()
    }
    if (stopPropagation && event?.stopPropagation) {
      event.stopPropagation()
    }

    startTransition(async () => {
      await action?.()
    })
  }

  return <>{render?.({ isPending, onNavigate })}</>
}
