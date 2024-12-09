import { StoreInfoT } from '@/entities'
import { axiosInstance } from '@/shared'

interface GetStoreInfoPrefixResponse extends StoreInfoT {
  storeId: string
}
async function getStoreInfoPrefix(stordIdPrefix: string): Promise<GetStoreInfoPrefixResponse> {
  const { data } = await axiosInstance.get(`/v1/stores/search/${stordIdPrefix}`)
  return data
}

export { getStoreInfoPrefix }
