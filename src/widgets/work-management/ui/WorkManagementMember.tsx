import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import { getWeekOfMonth } from '@/shared'
import { getHistories, getWorkStatus, UserInfo } from '@/entities'
import AttendanceInfo from './AttendanceInfo'
import AttendanceRegister from './AttendanceRegister'
import WorkManagementMemberHeader from './WorkManagementMemberHeader'

export default async function WorkManagementMember({
  storeId,
  userInfo,
}: {
  storeId: string
  userInfo: UserInfo
}) {
  const queryClient = new QueryClient()
  const { year, month, weekOfMonth } = getWeekOfMonth(new Date())
  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ['histories', userInfo.id, 'WEEKLY', year, month, weekOfMonth],
      queryFn: () => getHistories(storeId, userInfo.id, 'WEEKLY', year, month, weekOfMonth),
    }),
    queryClient.prefetchQuery({
      queryKey: ['workStatus'],
      queryFn: () => getWorkStatus(storeId),
    }),
  ])

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div>
        <WorkManagementMemberHeader userName={userInfo.name} />
        <AttendanceRegister storeId={storeId} />
        <AttendanceInfo storeId={storeId} memberId={userInfo.id} isOwner={false} />
      </div>
    </HydrationBoundary>
  )
}
