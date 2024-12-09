'use server'

import { revalidatePath } from 'next/cache'
import { axiosServerInstance } from '@/shared'
import { PutHistory } from '../types/reqBody'

const putHistory = async (
  storeId: string | null,
  memberId: string,
  historyId: string,
  reqBody: PutHistory,
) => {
  if (!storeId) return false
  try {
    const { status, statusText } = await axiosServerInstance.put(
      `/v1/stores/${storeId}/members/${memberId}/histories/${historyId}`,
      reqBody,
    )

    if (status !== 200) {
      throw new Error(statusText)
    }
    revalidatePath(`/${storeId}/manage/edit-attendance`, 'layout')
    return true
  } catch (error) {
    console.error(error)
    return false
  }
}
export default putHistory
