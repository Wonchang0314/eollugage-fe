import { useMutation } from '@tanstack/react-query'
import { putPosition } from '../api/putPosition'

function usePutPosition() {
  const { mutate } = useMutation({
    mutationKey: ['putPosition'],
    mutationFn: ({
      storeId,
      memberId,
      position,
    }: {
      storeId: string
      memberId: string
      position: string
    }) => putPosition(storeId, memberId, position),
  })
  return { mutate }
}

export { usePutPosition }
