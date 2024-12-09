'use server'

import { axiosInstance } from '@/shared'
import { Member } from '../types/member'

const getMember = async (storeId: string, memberId: string): Promise<Member> => {
  try {
    const { data } = await axiosInstance.get(`/stores/${storeId}/relations/${memberId}`)
    return data
  } catch (e) {
    return {
      memberId: '',
      name: '',
      position: '',
      phoneNumber: '',
    }
  }
}
export default getMember
