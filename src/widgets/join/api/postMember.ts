import { DefaultResponseT, axiosInstance } from '@/shared'
import { MemberInfoT } from './member'

async function postMember(
  storeId: string,
  memberId: string,
  body: MemberInfoT,
): Promise<DefaultResponseT> {
  const { data } = await axiosInstance.post(`/v1/stores/${storeId}/relations/${memberId}`, body)
  return data
}

export { postMember }
