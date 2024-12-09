import { useQuery } from '@tanstack/react-query'
import { getPresignedUrl } from '../api/getPresignedURL'

export function useGetPresignedURL(storeId: string, imageName: string) {
  const { data } = useQuery({
    queryKey: ['getPresignedURL', storeId, imageName],
    queryFn: () => getPresignedUrl(imageName),
    enabled: imageName !== 'NONE',
  })
  return { data }
}
