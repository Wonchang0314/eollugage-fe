import { axiosInstance } from '@/shared'

async function postPosition(storeId: string, memberId: string, position: string) {
  return axiosInstance.post(`/v1/stores/${storeId}/relations/${memberId}`, {
    role: 'STAFF',
    position,
  })
}

export { postPosition }
