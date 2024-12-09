import { useQuery } from '@tanstack/react-query'
import { getOrder } from '../api/getOrder'

function useGetOrder(storeId: string) {
  const { data } = useQuery({
    queryKey: ['getOrder', storeId],
    queryFn: () => getOrder(storeId),
  })

  return { data }
}

export { useGetOrder }
