import { axiosServerInstance } from '@/shared'
import { PositionItem } from '@/shared/types/myPageTypes'

async function getPositions(storeId: string): Promise<PositionItem[]> {
  try {
    const { data } = await axiosServerInstance.get(`v1/stores/${storeId}/relations/members`)
    return data
  } catch (error) {
    return []
  }
}

export { getPositions }
