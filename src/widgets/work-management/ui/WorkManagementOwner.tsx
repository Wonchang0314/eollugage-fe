import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import { getHistories, getMembers } from '@/entities'
import { getWeekOfMonth } from '@/shared'
import WorkManagementOwnerClient from './WorkManagementOwnerClient'

export default async function WorkManagementOwner({ storeId }: { storeId: string }) {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: ['members', storeId],
    queryFn: () => getMembers(storeId),
  })
  const members = queryClient.getQueryData(['members', storeId])

  const { year, month, weekOfMonth } = getWeekOfMonth(new Date())
  if (members && Array.isArray(members)) {
    await queryClient.prefetchQuery({
      queryKey: ['histories', members[0]?.memberId, 'WEEKLY', year, month, weekOfMonth],
      queryFn: () =>
        getHistories(storeId, members[0]?.memberId, 'WEEKLY', year, month, weekOfMonth),
    })
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <WorkManagementOwnerClient storeId={storeId} />
    </HydrationBoundary>
  )
}
