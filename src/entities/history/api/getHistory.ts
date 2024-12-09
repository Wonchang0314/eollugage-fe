'use server'

import { axiosServerInstance } from '@/shared'

const getHistory = async (
  storeId: string | undefined,
  memberId: string | undefined,
  historyId: string | undefined,
) => {
  try {
    if (!storeId || !memberId || !historyId)
      throw new Error('storeId, memberId, historyId are required')

    const { data } = await axiosServerInstance.get(
      `/v1/stores/${storeId}/members/${memberId}/histories/${historyId}`,
    )
    return data
  } catch (e) {
    console.error('error', e)
    return null
  }
}
export default getHistory
