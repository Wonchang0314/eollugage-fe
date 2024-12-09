import { useMutation, useQueryClient } from '@tanstack/react-query'
import { postOrder, GetOrderT } from '../api/postOrder'

function usePostOrder(order: GetOrderT, storeId: string) {
  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationKey: ['postOrder', storeId, order],
    mutationFn: () => postOrder(order, storeId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getOrder', storeId] })
    },
  })

  return { mutate }
}

export { usePostOrder }
