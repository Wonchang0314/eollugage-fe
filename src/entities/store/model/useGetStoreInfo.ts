import { useQuery } from '@tanstack/react-query'
import { getStoreInfo } from '../api/getStoreInfo'

export function useGetStoreInfo(storeId: string) {
  const { data } = useQuery({
    queryKey: ['getStoreInfo', storeId],
    queryFn: () => getStoreInfo(storeId),
  })

  return { data }
}
