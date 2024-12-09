import { useMutation } from '@tanstack/react-query'
import { postMember } from '../api/postMember'
import { MemberInfoT } from '../api/member'

function usePostMember(storeId: string, memberId: string) {
  const memberInfo: MemberInfoT = {
    role: 'STAFF',
    position: '직원',
  }
  const { mutate } = useMutation({
    mutationKey: ['postMember', storeId, memberId],
    mutationFn: () => postMember(storeId, memberId, memberInfo),
  })

  return { mutate }
}

export { usePostMember }
