'use server'

import { axiosServerInstance } from '@/shared'
import { Members } from '../types/member'

const getMembers = async (storeId: string | null): Promise<Members> => {
  if (storeId === null) return []
  try {
    const { data } = await axiosServerInstance.get(`/v1/stores/${storeId}/relations/members`)
    return data
  } catch (e) {
    console.error(e)
    return []
  }
}
export default getMembers
