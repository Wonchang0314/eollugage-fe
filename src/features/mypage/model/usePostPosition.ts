import { useMutation } from '@tanstack/react-query'
import { postPosition } from '@/features/mypage/api/postPosition'

function usePostPosition() {
  const { mutate } = useMutation({
    mutationKey: ['postPosition'],
    mutationFn: ({
      storeId,
      memberId,
      position,
    }: {
      storeId: string
      memberId: string
      position: string
    }) => postPosition(storeId, memberId, position),
  })
  return { mutate }
}

export { usePostPosition }