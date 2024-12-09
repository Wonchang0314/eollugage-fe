import { useQuery } from '@tanstack/react-query'
import getWorkStatus from '../api/getWorkStatus'

const useWorkStatus = (storeId: string) => {
  const { data: workStatus } = useQuery({
    initialData: null,
    queryKey: ['workStatus'],
    queryFn: () => getWorkStatus(storeId),
  })
  return { workStatus }
}
export default useWorkStatus
