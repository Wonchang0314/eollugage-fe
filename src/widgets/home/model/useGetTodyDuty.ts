import { useQuery } from '@tanstack/react-query'
import { getTodayDuty } from '../api/getTodayDuty'

function useGetTodayDuty(storeId: string, date: string) {
  const { data } = useQuery({
    queryKey: ['getTodayDuty', storeId, date],
    queryFn: () => getTodayDuty(storeId, date),
  })

  return { data }
}

export { useGetTodayDuty }
