import { DefaultResponseT, axiosInstance } from '@/shared'

interface GetOrderT {
  title: string
  content: string
}

async function postOrder(body: GetOrderT, storeId: string): Promise<DefaultResponseT> {
  const { data } = await axiosInstance.post(`/v1/stores/${storeId}/orders`, body)
  return data
}

export { postOrder }
export type { GetOrderT }
