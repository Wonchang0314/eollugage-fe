import { axiosInstance } from '@/shared'
import { PostHistory } from '../types/reqBody'

const postHistory = async (storeId: string | null, memberId: string, reqBody: PostHistory) => {
  if (!storeId) return false
  try {
    const { status, statusText } = await axiosInstance.post(
      `/v1/stores/${storeId}/members/${memberId}/histories`,
      reqBody,
    )

    if (status !== 200) {
      throw new Error(statusText)
    }
    return true
  } catch (error) {
    return false
  }
}
export default postHistory
