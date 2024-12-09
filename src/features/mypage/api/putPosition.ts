import { axiosInstance } from '@/shared'

async function putPosition(storeId: string, memberId: string, position: string) {
  return axiosInstance.put(`/v1/stores/${storeId}/relations/${memberId}`, {
    role: 'STAFF',
    position,
  })
}

export { putPosition }
