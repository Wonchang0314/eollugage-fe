import { StoreInfoT } from '@/entities'
import { DefaultResponseT, axiosInstance } from '@/shared'

async function putStoreDetail(body: StoreInfoT, storeId: string): Promise<DefaultResponseT> {
  const { data } = await axiosInstance.put(`/v1/stores/${storeId}`, body)
  return data
}

export { putStoreDetail }
