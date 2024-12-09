import { useQuery } from '@tanstack/react-query'
import { getImageFromS3 } from '../api/getStoreImage'

export function useGetStoreImage(
  storeId: string,
  presignedURL: string | undefined,
  fileFullName: string,
) {
  const { data, isLoading } = useQuery({
    queryKey: ['getStoreImage', storeId, fileFullName],
    queryFn: () => getImageFromS3(presignedURL ?? ''),
    enabled: presignedURL !== undefined && presignedURL.length > 0 && fileFullName !== 'NONE',
  })
  return { data, isLoading }
}
