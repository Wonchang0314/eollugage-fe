import { axiosInstance } from '@/shared'
import { DutyT } from '@/entities/home/api/home'

interface GetTodayDutyResponse {
  storeId: string
  date: string
  histories: DutyT[]
}

async function getTodayDuty(storeId: string, date: string): Promise<GetTodayDutyResponse> {
  const { data } = await axiosInstance.get(`/v1/stores/${storeId}/members/on-duty`, {
    params: {
      date,
    },
  })
  return data
}

export { getTodayDuty }
