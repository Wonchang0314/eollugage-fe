import { axiosInstance } from '@/shared'
import { OrderT } from '@/entities/home/api/home'

async function getOrder(storeId: string): Promise<OrderT[]> {
  const { data } = await axiosInstance.get(`/v1/stores/${storeId}/orders`)
  return data
}

export { getOrder }
