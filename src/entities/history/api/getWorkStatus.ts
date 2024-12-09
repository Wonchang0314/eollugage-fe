'use server'

import { axiosServerInstance } from '@/shared'

const getWorkStatus = async (
  storeId: string | null,
): Promise<'NOT_WORKING' | 'START_WORKING' | 'END_WORKING' | null> => {
  if (storeId === null) return null
  try {
    const { data } = await axiosServerInstance.get(`/v1/stores/${storeId}/work/status`)
    return data
  } catch (e) {
    console.error('error', e)
    return null
  }
}

export default getWorkStatus
