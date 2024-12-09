import { StoreInfoT } from '@/entities'
import { DefaultResponseT, axiosInstance } from '@/shared'

async function postStoreInfo(body: StoreInfoT): Promise<DefaultResponseT> {
  const { data } = await axiosInstance.post('/v1/stores', body)
  return data
}

export { postStoreInfo }
