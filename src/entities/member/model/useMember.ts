import { useQuery } from '@tanstack/react-query'
import { Member } from '../types/member'
import getMember from '../api/getMember'

const useMember = (storeId: string, memberId: string) => {
  const { data: member } = useQuery<Member>({
    queryKey: ['member', storeId, memberId],
    queryFn: () => getMember(storeId, memberId),
  })
  return { member }
}
export default useMember
