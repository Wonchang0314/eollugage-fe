import { useQuery } from '@tanstack/react-query'
import getMembers from '../api/getMembers'
import { Members } from '../types/member'

const useMembers = (storeId: string | null) => {
  const { data: members } = useQuery<Members>({
    queryKey: ['members', storeId],
    queryFn: async () => getMembers(storeId),
  })
  return { members }
}
export default useMembers
