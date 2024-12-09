import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import { getHistory } from '@/entities'
import AttendanceFormClient from './AttendanceFormClient'

export default async function AttendanceForm({
  storeId,
  type,
  historyId,
  memberId,
}: {
  storeId: string
  type: 'add' | 'edit'
  historyId?: string
  memberId?: string
}) {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: ['history', historyId, memberId],
    queryFn: () => getHistory(storeId, memberId, historyId),
  })
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AttendanceFormClient
        storeId={storeId}
        type={type}
        historyId={historyId}
        memberId={memberId}
      />
    </HydrationBoundary>
  )
}
