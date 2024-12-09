'use server'

import { axiosServerInstance } from '@/shared'
import { StoreInfoT } from './store'

async function getStoreInfo(storeId: string): Promise<StoreInfoT> {
  const { data } = await axiosServerInstance.get(`/v1/stores/${storeId}`)
  return data
}

export { getStoreInfo }
