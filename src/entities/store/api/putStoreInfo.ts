import { DefaultResponseT, axiosInstance } from '@/shared'
import { StoreInfoT } from './store'

async function putStoreInfo(body: StoreInfoT, storeId: string): Promise<DefaultResponseT> {
  const { data } = await axiosInstance.put(`/v1/stores/${storeId}`, body)
  return data
}

export { putStoreInfo }
